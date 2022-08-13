import tensorflow as tf

# 1.
X_data = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
]
y_data = [
    [0],
    [1],
    [1],
    [0]
]
X = tf.placeholder(shape=[None, 2], dtype=tf.float32)
y = tf.placeholder(shape=[None, 1], dtype=tf.float32)

# 2.
# 입력층
W1 = tf.Variable(tf.random_normal([2, 10]), name='weight1')
b1 = tf.Variable(tf.random_normal([10]), name='bias1')
layer1 = tf.sigmoid(tf.matmul(X, W1) + b1)

# 히든층
W2 = tf.Variable(tf.random_normal([10, 20]), name='weight2')
b2 = tf.Variable(tf.random_normal([20]), name='bias2')
layer2 = tf.sigmoid(tf.matmul(layer1, W2) + b2)

W3 = tf.Variable(tf.random_normal([20,10]), name='weight3')
b3 = tf.Variable(tf.random_normal([10]), name='bias3')
layer3 = tf.sigmoid(tf.matmul(layer2, W3) + b3)

# 출력층
W4 = tf.Variable(tf.random_normal([10,1]), name='weight4')
b4 = tf.Variable(tf.random_normal([1]), name='bias4')

logit = tf.matmul(layer3, W4) + b4
H = tf.matmul(layer3, W4) + b4

# 3.
loss = tf.reduce_mean(tf.nn.sigmoid_cross_entropy_with_logits(logits=logit, labels=y))

# optimizer
train = tf.train.GradientDescentOptimizer(learning_rate=0.1).minimize(loss)

# session
sess = tf.Session()
sess.run(tf.global_variables_initializer())

# 4.
for step in range(10000):
    _, loss_val = sess.run([train, loss], feed_dict={X:X_data, y:y_data})
    if step%1000 == 0:
        print(f'loss: {loss_val}')

# 5.
print(sess.run(H, feed_dict={X: X_data}))

predict = tf.cast(H > 0.5, dtype=tf.float32)
correct = tf.equal(predict, y)
accuracy = tf.reduce_mean(tf.cast(correct, dtype=tf.float32))
print(sess.run(accuracy, feed_dict={X: X_data, y: y_data}))