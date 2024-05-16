import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import tensorflow as tf
import numpy as np

# np and tf conversion
np_array = np.array(range(8))
tf_from_np = tf.convert_to_tensor(np_array)
# print(tf_from_np)


# TENSOR METHODS
# properties dtype, shape, ndim/rank
def tensor_methods():
    tf_tensor = tf.constant(range(6))
    tf_tensor = tf.fill([6,], 3)
    tf_ones = tf.ones([3, 3], dtype=tf.int32)
    # tf_tensor_cast = tf.cast(tf_tensor, dtype=tf.bool)
    tf_eye = tf.eye(num_rows=3) #identity matrices
    print(tf_tensor)
    print(tf_eye)
    print(tf_ones == tf.ones_like(tf_tensor)) # performs a broadcast...


# RANDOM DISTRIBUTION
# normal, gamma, poisson distributions, etc.
def tensor_gen():
    t_rand1 = tf.random.uniform(
        shape=[3, 3, 3],
        minval=0,
        maxval=10,
        dtype=tf.int32)
    # print(tf.random.normal([3, 3]))
    # print(tf.random.gamma([3, 3]))
    # print(tf.random.poisson([3, 3]))
    # default [0, 1), maxval required for ints
    # can set seed as a constant for reproducible values
    # print(t_rand1)
    """ tf.random.set_seed(0)
    for i in range(5):
        print(tf.random.uniform(shape=[3,], seed=0)) """
    t_rand2 = tf.random.uniform(
        shape=[3, 3, 3],
        minval=0,
        maxval=10,
        dtype=tf.int32)
    return (t_rand1, t_rand2)
t_rand1, t_rand2 = tensor_gen()
# shapes (3,3,3)


# TENSOR INDEXING
# the only new concept is the spread operator for dimensions
def tensor_indexing():
    print(t_rand1[..., 0])
    # forEach 1d tensor, replace with its first element
    # 3d -> 2d
    print(t_rand1[..., 0, 0])
    # forEach 2d tensor, replace with its first element
    # 3d -> 1d
    pass


# TENSOR MATH FUNCTIONS
# functions are applied on EACH ELEMENT, not the tensor
def tensor_math(): # tensor broadcasting
    tmath1 = tf.random.uniform(
        shape=[6,1],
        minval=0,
        maxval=10,
        dtype=tf.int32)
    tmath2 = tf.random.uniform(
        shape=[1,6],
        minval=0,
        maxval=10,
        dtype=tf.int32)
    # print(tmath1)
    # print(tmath2)
    # print(tf.math.multiply(tmath1, tmath2))
    # print(tf.math.multiply(tmath2, tmath1)) identical
    ''' works by stretching (6,1) -> (6,6)
                 stretching (1,6) -> (6,6)
        then multiplying by element '''
    print(t_rand2, '\n', tf.math.reduce_sum(t_rand2, axis=2))
    ''' given a tensor with 3 dimensions, reduce_sum:
    along axis 1 sums all values with identical 0,2 indices
    sum(tensor[i,:,j]) -> tensor with shape (i,j)
    along axis 0 sums all values with identical 1,2 indices
    sum(tensor[i,j]) -> tensor with shape (i,j)
    dimensions are ordered by left to right [0][1][2]'''


# LINEAR ALGEBRA
# a matrix is considered sparse when the number of non-zero elements
# roughly equals the number of columns or rows of the matrix
# get used to using floats for everything
def tensor_linalg():
    mat1 = tf.random.uniform(
        shape=[4,4],
        minval=0,
        maxval=10,
        dtype=tf.int32)
    mat2 = tf.random.uniform(
        shape=[4,4],
        minval=0,
        maxval=10,
        dtype=tf.int32)
    print(mat1, '\n', mat2)
    # print(mat1 @ mat2) # matrix multiplication
    # print(tf.transpose(mat1))
    mat_lower = tf.linalg.band_part(mat1, -1, 0)
    mat_upper = tf.linalg.band_part(mat1, 0, -1)
    # print(mat_lower, '\n', mat_upper)
    # print(mat_lower @ mat_upper) # zeroes top left
    # print(mat_upper @ mat_lower) # zeroes at bot right
    mat1_inv = tf.linalg.inv(tf.cast(mat1, dtype=tf.float32))
    # print(mat1_inv @ mat1)
    ''' notes on einsum
    for every unique letter in the equation,
    it represents a unique index to be acted on independently
        ex. matrix multiplication requires a triple nested for loop
            mat1[i,j] * mat2[j,k] => mat_s[i,k]
            so its einsum eq would be 'ij,jk->ik'
        ex. reduction eliminates an entire axis
            mat[i,j,k] => mat[i,k]
            'ijk->ik'
        ex. full reduction eliminates everything
            mat[i,j,k] => scalar
            'ijk'
    extremely useful '''
    # adds all entries with identical j (axis 0)
    # print(tf.math.reduce_sum(mat1, axis=0))
    # print(tf.einsum('ij->j', mat1)) # all with same i are summed into j
    # print(tf.math.reduce_sum(t_rand1, axis=2))
    # print(tf.einsum('ijk->ij', t_rand1)) # all with same k are summed into ij '''
    # "holds" axes 0,1 and runs matrix multiplication on axes 2,3
    A = np.random.randn(2,4,4,2)
    B = np.random.randn(2,4,4,1)
    print(np.einsum('bcij,bcik -> bcjk', A, B).shape)


# COMMON TENSOR FUNCTIONS
def tensor_common_funcs():
    t_big1 = tf.random.uniform(
        shape=[2,4,1,5],
        minval=0,
        maxval=10,
        dtype=tf.int32)
    t_big2 = tf.random.uniform(
        shape=[4,1,9,1],
        minval=0,
        maxval=10,
        dtype=tf.int32)
    # tf.expand_dims(t_rand1, axis=1) # sticks a 1-len dim to be that axis
    # tf.squeeze(t_rand1) # kicks out all 1-len dims
    # print(tf.reshape(t_big1, [10,4])) # preserves element order
    print(t_rand1)
    # print(tf.transpose(t_rand1))
    # equals tf.einsum('abcd... -> ...dcba', ts)

    # print(tf.stack([t_rand1, t_rand2]))
    # concats equal-shaped tensors and creates a new axis
    # tf.stack(shape(3,3,3), shape(3,3,3)) -> ts.shape(2,3,3,3)
    # tf.stack(...axis=1) -> ts.shape(3,2,3,3), unwrap axis 0 and stack

    # eqv tf.concat([tf.expand_dims(ts, axis) for ts in tensors], axis)
    # tf.concat([shape(1,2,3), shape(1,2,3)], axis=2) -> ts.shape(1,2,6)
    # concats equal-shaped tensors without creating a new axis

    ts_pad = tf.constant([[1,2],[0,0],[3,3]])
    # ts_pad.shape ought to be (ts.rank, 2)
    # axis 0: pad 1 set of zeroes before content and 2 sets after
    # print(tf.pad(t_rand1, ts_pad))

    # grab elements from desired axis to fill the gather indices
    gather_indices = tf.constant([2,2,2])
    g_indices2 = tf.constant([[0,1],[1,2]])
    g_indiceseye = tf.constant(range(t_rand1.shape[0]))
    # print(tf.gather(t_rand1, gather_indices)) # shape(3,3,3)
    # print(tf.gather(tf.expand_dims(t_rand1, 0), g_indices2, axis=2))
    # shape(1,3,2,2,3)
    # shape(1,3,3,3) gathered by shape(2,2) at axis 2
    # shape(2,2)s replace axis 2, each containing the shape(3) contained by the outer shape(1,3)s
    # forEach shape(1,3), it stores a shape(2,2) which each contain a shape(3)
    # the shape has the same shape as the input,
    # but the axis replaced by the shape of the index
    # print(tf.gather(t_rand1, g_indiceseye)) # identical

    # treats the lists of gather_indices as complete indices
    # rather than individual axis indices
    gather_indices = tf.constant(list(map(lambda i: [i,i,i], range(3))))
    # print(tf.gather_nd(t_rand1, gather_indices))
    # gathers slices when gather_indices don't span the full rank of params
    # print(tf.gather_nd(t_rand1, tf.constant([[1,2],[0,2]])))
    # suppose i wanted individual tensors from the batch of params
    g_indicesbatch = tf.zeros([1,9,1], dtype=tf.int32)
    # requires 9 because dim0 contains 3 elements, dim1 contains 3*3 elements,
    # so to batch gather elements in dim2, it needs 9 elements forEach dim0+1
    print(tf.gather_nd(t_rand1, g_indicesbatch, batch_dims=2))
    pass


# RAGGED TENSORS
def ragged_tensors():
    rts = tf.ragged.boolean_mask(t_rand1, tf.constant(True == tf.zeros([3,3,3])))
    # an all false boolean mask hides all values it matches up against
    # print(rts)
    rts = tf.RaggedTensor.from_row_limits([5,6,7,8,9,10,11,12], [1,2,3,4,5,6,7,8])
    # contains a list of ascending values corresponding to the full length of the tensor at that position
    # cumulative version of from_row_splits
    print(rts)
    pass


# SPARSE TENSORS
def sparse_tensors():
    sts = tf.sparse.SparseTensor([[1,1],[2,2],[3,3]], [1,2,3], [6,6])
    print(tf.sparse.to_dense(sts))
    # sticks values 1,2,3 at those positions, zeroes otherwise in a shape(6,6)
    pass
