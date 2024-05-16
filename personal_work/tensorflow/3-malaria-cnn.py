import os
import math
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '1'
import tensorflow as tf
import tensorflow.keras as keras
import tensorflow.keras.metrics as metrics
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import tensorflow_datasets as tfds
import sklearn.metrics as skmetrics


# DATA PREPROCESSING
IM_SIZE = 224
def preprocess(elem):
    """ Doubles the resolution of the image and
        normalizes all RGB values between some value between 0 and 1 """
    return tf.image.resize(elem['image'], (IM_SIZE, IM_SIZE)) / 255.0, elem['label']

def ds_splits(ds, train_r=0.8, eval_r=0.1, test_r=0.1):
    """ Partitions a dataset for training, evaluation, and testing sections.

        Given three values: params train_r, eval_r, and test_r,
        partitions the dataset ds such that each resulting dataset
        has length equal to its ratio multiplied by the full length """
    DS_SIZE = len(ds)
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


# CONSTRUCTING THE MODEL // CUSTOM LAYERS
"""
    each CONV layer reduces multiple dimensions into simpler bounds
    each POOL layer reduces the size of the dimensions themselves
    the calculation happens in the Dense layers,
    repeated conv/pool layers just process the image

    INPUT: 224 x 224 x 3 TENSOR -> 150528 pre-normalized params
    CONV: 6 kernel=5 tensors
    NORMALIZE:
    POOL: 1 2x2 tensor stride=2
    CONV: 16 kernel=5 tensors
    NORMALIZE:
    POOL: 1 2x2 tensor stride=2

    flatten into 2704 nodes
    100
    10
    2 """

class CustomDense(keras.layers.Layer):
    """ Custom implementation of the Dense layer """
    def __init__(self, output_units, activation):
        super(CustomDense, self).__init__()
        self.output_units = output_units
        self.activation = activation

    def build(self, input_shape):
        init = keras.initializers.Ones()
        self._weights = self.add_weight(
                shape=(input_shape[-1], self.output_units),
                initializer=init,
                trainable=True)
        self._biases = self.add_weight(
                shape=(self.output_units,),
                initializer=init,
                trainable=True)

    def call(self, inputs):
        pre_activation = tf.matmul(inputs, self._weights) + self._biases
        if self.activation == 'relu':
            return tf.nn.relu(pre_activation)
        elif self.activation == 'sigmoid':
            return tf.math.sigmoid(pre_activation)
        return pre_activation

class FeatureExtractor(keras.layers.Layer):
    """ Repeated convolution, batch, and pooling layers
        to process the main features of the input data """
    def __init__(self, filters, kernel_size, strides, activation, pool_size):
        super(FeatureExtractor, self).__init__()
        self.conv1 = keras.layers.Conv2D(
                filters=filters,
                kernel_size=kernel_size,
                strides=strides,
                activation=activation)
        self.batch1 = keras.layers.BatchNormalization()
        self.pool1 = keras.layers.MaxPool2D(
                strides=2 * strides,
                pool_size=pool_size)
        self.conv2 = keras.layers.Conv2D(
                filters=2 * filters,
                kernel_size=kernel_size,
                strides=strides,
                activation=activation)
        self.batch2 = keras.layers.BatchNormalization()
        self.pool2 = keras.layers.MaxPool2D(
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
        self.feature_extractor = FeatureExtractor(8, 3, 1, 'relu', 2)
        self.flatten = keras.layers.Flatten()
        self.dense1 = CustomDense(100, activation=activation)
        self.batch1 = keras.layers.BatchNormalization()
        self.dense2 = CustomDense(10, activation=activation)
        self.batch2 = keras.layers.BatchNormalization()
        self.out = CustomDense(1, activation='sigmoid')

    def call(self, x, training):
        x = self.feature_extractor(x)
        x = self.flatten(x)
        x = self.dense1(x)
        x = self.batch1(x)
        x = self.dense2(x)
        x = self.batch2(x)
        x = self.out(x)
        return x


def run_model(model, ds, gens=2, lr=0.001, plot=False):
    ds_train = ds[0]
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

    model.compile(optimizer=op, loss=bce, metrics=model_metrics)
    # binary crossentropy is used for binary classification
    # if fit:
    model.fit(ds_train, epochs=gens, verbose=1)
    ds_eval = ds[1]
    results = model.evaluate(ds_eval)

    # plot model performance
    if plot:
        plt.suptitle('training accuracy')
        plt.plot(range(gens), train_acc)
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
    # print(labels.shape, results.shape)

    confusion_matrix = skmetrics.confusion_matrix(labels, results)
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

def visualize_data(ds, num=4):
    dim = math.ceil(math.sqrt(num))

    def error_type(label):
        val = tf.get_static_value(label)
        if val == 0:
            return 'Parasitized'
        return 'Healthy'

    ds_use = ds.take(num)
    for i, (image, label) in enumerate(ds_use):
        plt.subplot(dim, dim, i+1)
        plt.imshow(image)
        plt.title(label)
        plt.axis('off')
    plt.show()


# MEASURES OF ACCURACY
"""
    Precision: TP / (TP + FP)
    Recall: TP / (TP + FN)
    Accuracy: (TN + TP) / (TN + TP + FN + FP)
    Specificity: TN / (TN + FP)

    In a problem like this, false negatives are really bad
    So the priority should be maximizing recall instead of accuracy
    The threshold for declaring a test as positive or negative
    should be at the point that minimizes false negatives
    while being high enough that the true positives and true negatives aren't affected

    The lower the threshold, the less false negatives
        (because it's easier to produce a positive)
    but also causes more false positives
    and an excessively low threshold will turn true negatives into false positives
    The opposite is true for maximizing precision, increase threshold
    """


def __main__():
    ds_load = tfds.load('malaria', shuffle_files=True)['train']
    ds_load = ds_load.map(preprocess)
    ds_set = ds_splits(ds_load, train_r=0.06)

    def run():
        model = MalariaModel()
        model, performance = run_model(model, ds_set, gens=1, plot=False)
        df = pd.DataFrame(performance)
        print(df)
        dataplot(model, ds_set, plot=True)
    run()

if __name__ == '__main__':
    __main__()
