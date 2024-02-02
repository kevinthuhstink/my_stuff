import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '1'
import tensorflow as tf
import tensorflow.keras as keras
import numpy as np
import pandas as pd
import matplotlib as mpl
import matplotlib.pyplot as plt
import seaborn as sns

# since the data has 8 columns, the input tensor has shape (datapoints, 8)
# the output is a scalar

data = pd.read_csv('datasets/vehicles-mini.csv')
in_data = tf.convert_to_tensor(np.array(data))[:,3:-1]
out_data = tf.cast(tf.convert_to_tensor(np.array(data))[:,-1], dtype=tf.float32)
print(in_data.shape, out_data.shape)

# normalize the dataset w/ respect to the mean and variance
# scales inputs into a distribution centered at 0 with stddev 0
normalizer = keras.layers.Normalization()
normalizer.adapt(in_data)

# create the linear regression sequential data model for this dataset
relu = keras.activations.relu
linreg_model = keras.Sequential([
    keras.layers.Input(shape=(8,)),
    normalizer,
    keras.layers.Dense(64, activation=relu),
    keras.layers.Dense(16, activation=relu),
    keras.layers.Dense(1)
    ])
""" tf.keras.utils.plot_model(
        linreg_model,
        to_file="model_images/2-linreg-model.png",
        show_shapes=True)
linreg_model.summary() """

# error measurement
mae = keras.losses.MeanAbsoluteError()
mse = keras.losses.MeanSquaredError()
hub = keras.losses.Huber()
# sample model:
#   model.compile(loss=hub)

# validatng and testing the model
# feeding data its never seen by splitting the training data into sections
DATASET_SIZE = len(in_data)
TRAIN = int(.9 * DATASET_SIZE)
TEST = int(.1 * DATASET_SIZE)
# ds contains 900 elements of ([input params], output value)
in_train = in_data[:TRAIN]
in_test = in_data[-1 * TEST:]
out_train = out_data[:TRAIN]
out_test = out_data[-1 * TEST:]
ds = tf.data.Dataset.from_tensor_slices((in_train, out_train))
ds = ds.shuffle(8).batch(32).prefetch(tf.data.AUTOTUNE)
ds_test = tf.data.Dataset.from_tensor_slices(in_test)
ds_test = ds_test.shuffle(8).batch(32).prefetch(tf.data.AUTOTUNE)

# stochastic gradient descent
# W = Wp - LR * dL/dWp
def run_model(model, gens, lr=0.001, plot=True, plot_range=None):
    # Primes the model and measures its performance
    op = keras.optimizers.Adam(learning_rate=lr)
    model.compile(optimizer=op, loss=mae)
    stat = model.fit(ds, epochs=gens, verbose=0)
    losses = stat.history['loss']

    # test the model
    global out_test;
    results = tf.squeeze(model.predict(ds_test))
    error = tf.math.abs(results - out_test)
    perror = error / out_test
    mean_error = tf.get_static_value(tf.math.reduce_mean(perror))
    stddev_error = tf.get_static_value(tf.math.reduce_std(perror))

    # plot model performance
    if plot:
        fig, (loss_plot, results_plot) = plt.subplots(2)
        loss_plot.set_title('losses // results error')
        loss_plot.plot(range(gens), losses)
        # loss_plot.legend(['training'])

        results_plot.set_yscale('log')
        results_plot.bar(range(error.shape[0]), error)
        results_plot.legend('prediction error', loc='lower right')
        plt.show()

    return {'values': out_test,
            'outputs': results,
            'error': error,
            'perror': perror,}, mean_error, stddev_error


# performance, mean, std = run_model(linreg_model, 10, plot=False)
performance, mean, std = run_model(
        linreg_model, 500, plot=True, plot_range=(200,500))
model_data = pd.DataFrame(data=performance)
print(model_data)
print('Mean', mean)
print('Standard Deviation', std)
