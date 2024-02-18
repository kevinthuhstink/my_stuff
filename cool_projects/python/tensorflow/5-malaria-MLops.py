import os
import io
import math
import datetime
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '1'
import tensorflow as tf
import tensorflow_datasets as tfds
import tensorflow_probability as tfp
import numpy as np
import pandas as pd
import seaborn
import albumentations as A
import matplotlib.pyplot as plt
import sklearn.metrics as skmetrics

keras = tf.keras
metrics = tf.keras.metrics
layers = tf.keras.layers
callbacks = tf.keras.callbacks

exec_time = datetime.datetime.now().strftime('%d-%m-%Y_%H:%M:%S')
LOGS_DIR = './logs/' + exec_time
CHECKPOINT_DIR = LOGS_DIR + '-model'
IMAGE_DIR = LOGS_DIR + '-images'

log_writer = tf.summary.create_file_writer(LOGS_DIR)
image_writer = tf.summary.create_file_writer(IMAGE_DIR)


# DATA PREPROCESSING
IM_SIZE=244
def handle_data(plot=False, split_ratios=(0.8, 0.1, 0.1)):
    """ Reads, preprocesses and parititions data from a file

        plot: Determines whether the input data will be displayed
        IM_SIZE: Determinees the size of the input data images
        split_ratios: Determines what proportion of the base dataset
                      is used for training, evaluation, and testing """
    ds_load = tfds.load('malaria', shuffle_files=True)['train']
    def preprocess(elem):
        image = tf.image.resize(elem['image'], (IM_SIZE, IM_SIZE))
        return image, elem['label']
    ds = ds_load.map(preprocess)
    # dtype: tuple of shapes(224,224,3) and scalar


    def visualize(ds):
        """ Displays the data provided by preprocessing and augmenting """
        ds_use = ds.take(4)
        def error_type(label):
            val = tf.get_static_value(label)
            if val == 0:
                return 'Parasitized'
            return 'Healthy'
        for i, (image, label) in enumerate(ds_use):
            plt.subplot(2, 2, i+1)
            plt.imshow(image)
            plt.title(error_type(label))
            plt.axis('off')
        plt.show()
    if plot:
        visualize(ds)


    def ds_splits(ds):
        """ Partitions a dataset for training, evaluation, and testing sections.

            Given three values: params train_r, eval_r, and test_r,
            partitions the dataset ds such that each resulting dataset
            has length equal to its ratio multiplied by the full length """
        DS_SIZE = len(ds)
        train_r, eval_r, test_r = split_ratios
        TRAIN = int(train_r * DS_SIZE)
        EVAL = int(eval_r * DS_SIZE)
        TEST = int(test_r * DS_SIZE)

        ds_train = ds.take(TRAIN).shuffle(
                buffer_size=8,
                reshuffle_each_iteration=True).batch(32).prefetch(tf.data.AUTOTUNE)
        ds_eval = ds.skip(TRAIN).take(EVAL).shuffle(
                buffer_size=8,
                reshuffle_each_iteration=True).batch(32).prefetch(tf.data.AUTOTUNE)
        ds_test = ds.skip(TRAIN + EVAL).take(TEST)
        return ds_train, ds_eval, ds_test
    return ds_splits(ds)


# MODEL/LAYER SUBCLASSING
class Augmenter(layers.Layer):
    """ Normalizes and augments input data during training.

        Possible transformations include a random rotation and
        a flip in horizontal or vertical or both directions. """

    def __init__(self):
        super(Augmenter, self).__init__()
        self.rescale = layers.Rescaling(1/255.)
        self.rotate = layers.RandomRotation(factor=1)
        self.flip = layers.RandomFlip()

    def call(self, x, training):
        x = self.rescale(x)
        if training:
            x = self.rotate(x)
            x = self.flip(x)
        return x


class FeatureExtractor(layers.Layer):
    """ Repeated convolution, batch, and pooling layers
        to process the main features of the input image """

    def __init__(self):
        super(FeatureExtractor, self).__init__()
        self.conv1 = layers.Conv2D(
                filters=6,
                kernel_size=6,
                strides=1,
                activation='relu',
                padding='valid',
                kernel_regularizer=keras.regularizers.L2(0.01))
        self.batch1 = layers.BatchNormalization()
        self.pool1 = layers.MaxPool2D(
                strides=2,
                pool_size=pool_size)

        self.conv2 = layers.Conv2D(
                filters=16,
                kernel_size=4,
                strides=1,
                activation='relu',
                padding='valid',
                kernel_regularizer=keras.regularizers.L2(0.01))
        self.batch2 = layers.BatchNormalization()
        self.pool2 = layers.MaxPool2D(
                strides=2,
                pool_size=pool_size)

    def call(self, x, training):
        x = self.conv1(x)
        x = self.batch1(x)
        x = self.pool1(x)
        x = self.conv2(x)
        x = self.batch2(x)
        x = self.pool2(x)
        return x


class MalariaModel(keras.Model):
    """ A convolutional neural net that takes images of cells as input
        and returns a value that determines if the input cell has been
        parasitized by malaria. """

    def __init__(self, activation='relu'):
        super(MalariaModel, self).__init__()
        self.augmenter = Augmenter()
        self.feature_extractor = FeatureExtractor()
        self.flatten = layers.Flatten()
        self.dense1 = layers.Dense(100, activation=activation)
        self.batch1 = layers.BatchNormalization()
        self.dense2 = layers.Dense(10, activation=activation)
        self.batch2 = layers.BatchNormalization()
        self.out = layers.Dense(1, activation='sigmoid')

    def call(self, x, training):
        x = self.augmenter(x)
        x = self.feature_extractor(x)
        x = self.flatten(x)
        x = self.dense1(x)
        x = self.batch1(x)
        x = self.dense2(x)
        x = self.batch2(x)
        x = self.out(x)
        return x


# CALLBACKS
class ConfusionMatrix(callbacks.Callback):
    """ Logs a confusion matrix at the end of every epoch. """

    def on_epoch_end(self, epoch, logs):
        tp = logs['true_positives']
        fp = logs['false_positives']
        tn = logs['true_negatives']
        fn = logs['false_negatives']

        confusion_matrix = tf.constant([[tp, fp], [fn, tn]])
        print(confusion_matrix)

        plt.figure()
        seaborn.heatmap(confusion_matrix, annot=True)
        plt.title('Confusion Matrix')
        plt.ylabel('True Values')
        plt.xlabel('Predicted Values')
        plt.axis('off')

        img_buffer = io.BytesIO()
        plt.savefig(img_buffer, format='png')
        cm_image = tf.expand_dims(
                tf.io.decode_png(img_buffer.getvalue()), 0)

        with image_writer.as_default():
            tf.summary.image("Training data: confusion matrix", cm_image, step=epoch)


def lr_scheduler(epoch, lr):
    curve_amp = 1 / (epoch // 10 + 1)
    lr_func = lr * tf.math.cos((epoch % 10) * math.pi/27)
    lr_val = curve_amp * lr_func

    with log_writer.as_default():
        tf.summary.scalar('Learning Rate', data=lr_val, step=epoch)
    return lr_val


# RUNNING THE MODEL
def run_model(model, ds, epochs=1, lr=0.001, log=False, plot=False):
    op = keras.optimizers.Adam(learning_rate=lr)
    bce = keras.losses.BinaryCrossentropy()

    model_metrics = [
            metrics.TruePositives(name='true_positives'),
            metrics.FalsePositives(name='false_positives'),
            metrics.TrueNegatives(name='true_negatives'),
            metrics.FalseNegatives(name='false_negatives'),
            metrics.BinaryAccuracy(name='accuracy'),
            metrics.Precision(name='precision'),
            metrics.Recall(name='recall'),
            metrics.AUC(name='auc'),
            ]

    training_end = callbacks.EarlyStopping(patience=3, monitor='loss')
    lr_scheduler_cb = callbacks.LearningRateScheduler(lr_scheduler, verbose=1)
    csv_log = callbacks.CSVLogger(LOGS_DIR)
    tensorboard_cb = callbacks.TensorBoard(log_dir=LOGS_DIR)
    checkpoint = callbacks.ModelCheckpoint(
            CHECKPOINT_DIR,
            monitor='loss',
            mode='min',
            save_best_only=True)
    confusion_matrix_cb = ConfusionMatrix()


    model_callbacks = [
            lr_scheduler_cb,
            training_end,
            checkpoint,
            tensorboard_cb,
            confusion_matrix_cb
            ]
    if log:
        model_callbacks.append(csv_log)

    ds_train = ds[0]
    ds_eval = ds[1]
    model.compile(optimizer=op, loss=bce, metrics=model_metrics)
    stat = model.fit(
            ds_train,
            epochs=epochs,
            verbose=1,
            callbacks=model_callbacks,
            validation_data=ds_eval)

    if plot:
        plt.suptitle('training loss')
        plt.plot(range(epochs), stat['loss'])
        plt.plot(range(epochs), stat['val_loss'])
        plt.show()
    return model, stat.history


def dataplot(model, ds, plot=False):
    """ Displays the data and predictions provided by the malaria model """
    ds_test = ds[2]
    labels = []
    for img, label in ds_test.as_numpy_iterator():
        labels.append(label)

    model_use = ds_test.batch(32).prefetch(tf.data.AUTOTUNE)
    results = model.predict(model_use)
    results = results.squeeze().round().astype('int32')
    # print(labels, results)

    confusion_matrix = tf.math.confusion_matrix(labels, results)
    print(confusion_matrix)

    if plot:
        fp, tp, thresholds = skmetrics.roc_curve(labels, results)
        plt.plot(fp, tp)
        plt.xlabel('False positive rate')
        plt.ylabel('True positive rate')
        plt.grid()

        for i in range(0, len(thresholds), 20):
            plt.text(fp[i], tp[i], thresholds[i])
        plt.show()


# MAIN
def __main__():
    ds_set = handle_data(split_ratios=(0.02, 0.01, 0.01))
    # ds_set = handle_data()

    def run():
        model = MalariaModel()
        model, performance = run_model(model, ds_set, epochs=2)
        df = pd.DataFrame(performance)
        print(df)
        # dataplot(model, ds_set)
    run()

if __name__ == '__main__':
    __main__()
