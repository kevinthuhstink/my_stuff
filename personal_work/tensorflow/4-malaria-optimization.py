import os
import math
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
    DS_SIZE = len(ds_load)

    def preprocess(ds):
        """ Preprocesses on freshly loaded data before augmenting individual inputs

            Sets the resolution of the image to IM_SIZE and
            normalizes all RGB values between between 0 and 1 """
        def resize(elem):
            return tf.image.resize(elem['image'], (IM_SIZE, IM_SIZE)) / 255.0, elem['label']
        return ds.map(resize)
    # print(next(ds_load.take(1).as_numpy_iterator()))
    ds = preprocess(ds_load)
<<<<<<< HEAD
    # print(next(ds.take(1).as_numpy_iterator()))
=======
>>>>>>> refs/remotes/origin/main

    def augment(ds):
        """ Augments the input data by applying transformations on the data.

            For every element in the input data, possible transformations like
            left-right reflections, brightness, and rotations construct
            new data inputs that broaden the input dataset. """
        augment_list = []

        def three_rot(ds):
            def rot(image, label):
                return tf.image.rot90(image), label
            rot_once = ds.map(rot)
            rot_twice = rot_once.map(rot)
            rot_thrice = rot_twice.map(rot)
            return [rot_once, rot_twice, rot_thrice]
        augment_list = augment_list + three_rot(ds)

        for augmented_ds in augment_list:
            ds = ds.concatenate(augmented_ds)
        ds.shuffle(DS_SIZE * 4)
        return ds
    ds = augment(ds)

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
            plt.title(label)
            plt.axis('off')
        plt.show()
    if plot:
        visualize()

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

class AugmentLayer(layers.Layer):
    """ Can be used to let the model process the data insteead of preprocessing
        May cause batching to break if the inputs are unequal in size """
    def __init__(self):
        super(ResizerLayer, self).__init__()
        self.resizer = layers.Resizing(IM_SIZE, IM_SIZE)
        self.rescale = layers.Rescaling(1.0 / 255)
        self.rotate = layers.RandomRotation((0, 1))
        self.flip = tf.image.stateless_random_flip_left_right

    def call(self, x, training=False):
        x = self.resizer(x)
        x = self.rescale(x)
        if training:
            x = self.rotate(x)
            # x = tf.image.rot90(x)
            self.flip(x)
        return x

def mixup(data1, data2):
    """ Applies a mixup transformation on two images.

        Takes two images and their corresponding labels,
        and outputs a merged image based on a preselected mixup factor.
        Parameters data1 and data2 are tuples,
        the first index containing the image and the second containing its label. """
    lamda = tf.distributions.Beta(0.2, 0.2).sample(1)[0]
    image_merged = lamda * data1[0] + (1 - lamda) * data2[0]
    label_merged = lamda * data1[1] + (1 - lamda) * data2[1]
    return image_merged, label_merged

def cutmix(image_cut, image_from=None, crop_box=None):
    """ Applies a cutmix transformation on two images.

        Takes two images and their corresponding labels,
        and outputs an image where a section is cropped out of image_crop
        and replaced with a section from image_from.
            If image_from is not provided, the output image is only cropped
            and no replacement is made

        The offset determines where the crop is made, and
        crop_size determines how large that crop is.
        Both values are randomly selected, and the cropped section's
        dimensions are determined from a beta distribution. """
    # produce images and labels from data
    lamda = tf.distributions.Beta(0.2, 0.2).sample(2)
    im_cut = tf.image.resize(image_cut[0], (IM_SIZE, IM_SIZE))
    lb_cut = image_cut[1]
    if not image_from:
        im_from = tf.zeros((IM_SIZE, IM_SIZE, 3))
        lb_from = tf.constant(0.)
    else:
        im_from = tf.image.resize(image_crop[0], (IM_SIZE, IM_SIZE))
        lb_from = image_crop[1]

    def rand_crop_box():
        """ Produces a random box to crop and replace if crop_box isn't specified. """
        # get the dimensions and position of the section to cut and replace
        pos_x = tf.random.uniform((1,), 0, IM_SIZE, dtype=tf.int32)
        pos_y = tf.random.uniform((1,), 0, IM_SIZE, dtype=tf.int32)

        crop_width = tf.cast(IM_SIZE * tf.math.sqrt(1 - lamda[0]), dtype=tf.int32)
        crop_height = tf.cast(IM_SIZE * tf.math.sqrt(1 - lamda[1]), dtype=tf.int32)

        # ensure boundaries are within image dimensions
        pos_xl = tf.clip_by_value(pos_x - crop_width // 2, 0, IM_SIZE)
        pos_yu = tf.clip_by_value(pos_y - crop_height // 2, 0, IM_SIZE)
        pos_xr = tf.clip_by_value(pos_x + crop_width // 2, 0, IM_SIZE)
        pos_yd = tf.clip_by_value(pos_y + crop_height // 2, 0, IM_SIZE)
        return pos_xl, pos_xr, pos_yu, pos_yr

    if not crop_box:
        pos_xl, pos_xr, pos_yu, pos_yr = rand_crop_box()
    else:
        pos_xl, pos_xr, pos_yu, pos_yr = crop_box
    crop_width = pos_xr - pos_xl
    crop_height = pos_yd - pos_yu

    # cut im_cut and replace from im_from
    subimage_part = tf.image.crop_to_bounding_box(
            im_from, pos_yu, pos_xl, crop_height, crop_width)
    subimage = tf.pad_to_bounding_box(
            subimage_part, pos_yu, pos_xl, IM_SIZE, IM_SIZE)
    cut_part = tf.image.crop_to_bounding_box(
            im_cut, pos_yu, pos_xl, crop_height, crop_width)
    cut = tf.image.crop_to_bounding_box(
            cut_part, pos_yu, pos_xl, crop_height, crop_width)
    augmented_img = im_cut - cut + subimage
    augmented_label = lamda * lb_cut + (1 - lamda) * lb_from
    return augmented_img, augmented_label

# using Albumentations
transforms = A.Compose([
    A.Resize(IM_SIZE, IM_SIZE),
    A.OneOf([A.HorizontalFlip(), A.VerticalFlip()], p=0.3),
    A.RandomRotate90(),
    A.RandomBrightnessContrast(
        brightness_limit=0.2,
        contrast_limit=0.2,
        always_apply=False,
        p=0.5),
    # A.Cutout(num_holes=16, p=0.2)
    ])

def albument(image, label):
    """ Applies a series of transformations described by transforms.

        Uses albumentations to make these transforms extremely simple,
        tf.numpy_function wraps the albumentation function in a tf tensor,
        allowing dataset elements (image, labels) to be composed from within this function. """
    def img_albument(image):
        data = {'image': image}
        data_aug = transforms(**data)
        img_aug = data_aug['image']
        img_aug = tf.cast(img_aug / 255.0, tf.float32)
        # img_aug = tf.image.resize(img_aug, size=(IM_SIZE, IM_SIZE))

    album_augment = tf.numpy_function(func=img_albument, inp=(image, label), Tout=tf.float32)
    return album_augment, label


# CALLBACKS
class ShowValues(keras.callbacks.Callback):
    def on_epoch_end(self, epoch, logs):
        print("\nEpoch {}, loss = {}".format(epoch, logs['loss']))

    def on_batch_end(self, batch, logs):
        print("\nBatch {}, loss = {}".format(batch, logs['loss']))

def lr_scheduler(epoch, lr):
    curve_amp = 1 / (epoch // 10 + 1)
    lr_func = lr * tf.math.cos((epoch % 10) * math.pi/27)
    return curve_amp * lr_func


# MODEL/LAYER SUBCLASSING
class CustomDense(layers.Layer):
    """ Custom implementation of the Dense layer """
    def __init__(self, output_units, activation):
        super(CustomDense, self).__init__()
        self.output_units = output_units
        self.activation = activation

    def build(self, input_shape):
        self._weights = self.add_weight(
                shape=(input_shape[-1], self.output_units),
                initializer='random_normal',
                trainable=True,
                name='dense_weights')
        self._biases = self.add_weight(
                shape=(self.output_units,),
                initializer='random_normal',
                trainable=True,
                name='dense_biases')

    def call(self, inputs):
        pre_activation = tf.matmul(inputs, self._weights) + self._biases
        if self.activation == 'relu':
            return tf.nn.relu(pre_activation)
        elif self.activation == 'sigmoid':
            return tf.math.sigmoid(pre_activation)
        return pre_activation

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

class MalariaModel(keras.Model): # DOESN'T WORK
    """ A set of dense layers to determine whether a cell has malaria
        after being processed by a feature extractor """
    def __init__(self, activation='relu'):
        super(MalariaModel, self).__init__()
        self.feature_extractor = FeatureExtractor(8, 3, 1, 'relu', 2)
        self.flatten = layers.Flatten()
        self.dropout = layers.Dropout(.2),
        self.dense1 = CustomDense(100, activation=activation)
        self.batch1 = layers.BatchNormalization()
        self.dense2 = CustomDense(10, activation=activation)
        self.batch2 = layers.BatchNormalization()
        self.out = CustomDense(1, activation='sigmoid')

    def call(self, x, training):
        x = self.feature_extractor(x)
        x = self.flatten(x)
        self.dropout
        x = self.dense1(x)
        x = self.batch1(x)
        self.dropout
        x = self.dense2(x)
        x = self.batch2(x)
        x = self.out(x)
        return x


# CUSTOM METRICS AND LOSSES
class CustomBCE(keras.losses.Loss):
    def __init__(self, FACTOR=1.):
        super(CustomBCE, self).__init__()
        self.FACTOR = FACTOR

    def call(self, y_true, y_pred):
        bce = keras.losses.BinaryCrossentropy()
        return bce(y_true, y_pred) * self.FACTOR

class CustomAccuracy(metrics.Metric):
    def __init__(self, name='custom_accuracy'):
        super(CustomAccuracy, self).__init__(name=name)
        self.success = self.add_weight(name='successes', initializer='zeros')
        self.trials = self.add_weight(name='trials', initializer='zeros')

    def update_state(self, y_true, y_pred, sample_weight=None):
        # OKAYY??? THEY DIDNT TELL ME THIS SHIT IN THE DOCUMENTATION???
        # so when the shapes of your inputs are unhappy (32,) vs. (32,1)
        # binary_accuracy flips its shit
        y_true = tf.expand_dims(tf.cast(y_true, tf.float32), axis=-1)
        out = metrics.binary_accuracy(y_true, y_pred)
        # print(y_true, y_pred, out)
        self.success.assign_add(tf.math.count_nonzero(out, dtype=tf.float32))
        self.trials.assign_add(tf.cast(len(out), tf.float32))

    def result(self):
        return self.success / self.trials

'''
malaria_model = tf.keras.Sequential([
    layers.InputLayer(input_shape = (244, 244, 3)),
    FeatureExtractor(6, 3, 1, 'relu', 2),
    layers.Dropout(.2),
    layers.Flatten(),
    layers.Dropout(.2),
    CustomDense(100, activation = "relu"),
    layers.BatchNormalization(),
    CustomDense(10, activation = "relu"),
    layers.BatchNormalization(),
    CustomDense(1, activation = "sigmoid"),
    ])'''


# RUNNING THE MODEL
def run_model(model, ds, epochs=1, lr=0.001, log=False, plot=False):
    # optimizer and loss
    op = keras.optimizers.Adam(learning_rate=lr)
    bce = keras.losses.BinaryCrossentropy()

    # metrics
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

    # callbacks
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
    model.fit(ds_train, epochs=epochs, verbose=1, callbacks=callbacks)
    ds_eval = ds[1]
    results = model.evaluate(ds_eval)

    # plot model performance
    if plot:
        plt.suptitle('training accuracy')
        plt.plot(range(epochs), train_acc)
        plt.show()
    return model, zip(model.metrics_names, results)

def custom_fit(model, ds):
    """ Accomplishes the same as model.fit.

        For each epoch and each batch in the epoch,
        take steps based on the gradient of the loss function (bce).
        GradientTape context manager lets you define some numbers,
        and then once youre done defining it you can take a gradient
        of some of the defined values.
        We calculate loss within the GradientTape context manager,
        leave the context manager, then grab the gradient w.r.t. the weights. """

    loss_func = CustomBCE()
    fit_metrics = [CustomAccuracy(), metrics.BinaryAccuracy()]
    optimizer = keras.optimizers.Adam(learning_rate=0.001)

    @tf.function
    def training_block(x_batch, y_batch):
        with tf.GradientTape() as G: # calculate the gradient for this step
            # G.watch(model.trainable_weights)
            y_pred = model(x_batch, training=True)
            loss = loss_func(y_batch, y_pred)

        batch_gradient = G.gradient(loss, model.trainable_weights)
        optimizer.apply_gradients(zip(batch_gradient, model.trainable_weights))
        return y_pred, loss

    for epoch in range(1): # for one epoch,
        for step, (x_batch, y_batch) in enumerate(ds): # after every batch,
            y_pred, loss = training_block(x_batch, y_batch)
            for metric in fit_metrics:
                metric.update_state(y_batch, y_pred)
            if step % 100 == 0:
                tf.print("Current loss: ", loss)
                for metric in fit_metrics:
                    tf.print(metric.name, metric.result())

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
    global MalariaModel
    ds_set = handle_data(split_ratios=(0.1, 0.05, 0.05))
    # ds_set = handle_data()
    malaria_model = MalariaModel()
    # print(malaria_model.summary())

    def run():
        nonlocal malaria_model
        malaria_model, performance = run_model(malaria_model, ds_set, epochs=30)
        df = pd.DataFrame(performance)
        print(df)
        dataplot(model, ds_set)
    run()
    # custom_fit(model, ds_set[0])

if __name__ == '__main__':
    __main__()
