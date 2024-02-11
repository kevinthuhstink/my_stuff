import os
import math
import random
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '1'
import tensorflow as tf
import tensorflow_datasets as tfds
import tensorflow_probability as tfp
import numpy as np
import pandas as pd
import albumentations as A
import matplotlib.pyplot as plt
import sklearn.metrics as skmetrics

keras = tf.keras
metrics = tf.keras.metrics
layers = tf.keras.layers


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

def lr_scheduler(epoch, lr):
    curve_amp = 1 / (epoch // 10 + 1)
    lr_func = lr * tf.math.cos((epoch % 10) * math.pi/27)
    return curve_amp * lr_func


# MODEL/LAYER SUBCLASSING
class Augmenter(layers.Layer):
    """ Applies some random transformations on the input data
        during model training. """
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
        to process the main features of the input data """
    def __init__(self, filters, kernel_size, strides, activation, pool_size):
        super(FeatureExtractor, self).__init__()
        self.conv1 = layers.Conv2D(
                filters=filters,
                kernel_size=kernel_size,
                strides=strides,
                activation=activation,
                padding='valid',
                kernel_regularizer=keras.regularizers.L2(0.01))
        self.batch1 = layers.BatchNormalization()
        self.pool1 = layers.MaxPool2D(
                strides=2 * strides,
                pool_size=pool_size)
        self.conv2 = layers.Conv2D(
                filters=2 * filters,
                kernel_size=kernel_size,
                strides=strides,
                activation=activation,
                padding='valid',
                kernel_regularizer=keras.regularizers.L2(0.01))
        self.batch2 = layers.BatchNormalization()
        self.pool2 = layers.MaxPool2D(
                strides=2 * strides,
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
    """ A set of dense layers to determine whether a cell has malaria
        after being processed by a feature extractor """
    def __init__(self, activation='relu'):
        super(MalariaModel, self).__init__()
        self.augmenter = Augmenter()
        self.feature_extractor = FeatureExtractor(8, 3, 1, 'relu', 2)
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
            # metrics.Precision(name='precision'),
            # metrics.Recall(name='recall'),
            # metrics.AUC(name='auc'),
            ]

    training_end = keras.callbacks.EarlyStopping(patience=3, monitor='loss')
    lr_scheduler_cb = keras.callbacks.LearningRateScheduler(lr_scheduler, verbose=1)

    log_fpath = os.path.join(os.getcwd(), 'logs/log.txt')
    checkpt_fpath = os.path.join(os.getcwd(), 'logs/checkpoint.tf')
    csv_log = keras.callbacks.CSVLogger(log_fpath)
    checkpoint = keras.callbacks.ModelCheckpoint(
            checkpt_fpath,
            monitor='loss',
            mode='min',
            save_best_only=True)

    callbacks = [lr_scheduler_cb, training_end, checkpoint]
    if log:
        callbacks.append(csv_log)

    model.compile(optimizer=op, loss=bce, metrics=model_metrics)
    ds_train = ds[0]
    stat = model.fit(ds_train, epochs=epochs, verbose=1, callbacks=callbacks)
    ds_eval = ds[1]
    results = model.evaluate(ds_eval)

    if plot:
        plt.suptitle('training accuracy')
        plt.plot(range(epochs), stat['loss'])
        plt.show()
    return model, zip(model.metrics_names, results)

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
    ds_set = handle_data(split_ratios=(0.4, 0.05, 0.05))
    # ds_set = handle_data()

    def run():
        model = MalariaModel()
        model, performance = run_model(model, ds_set)
        df = pd.DataFrame(performance)
        print(df)
        dataplot(model, ds_set)
    run()

if __name__ == '__main__':
    __main__()
