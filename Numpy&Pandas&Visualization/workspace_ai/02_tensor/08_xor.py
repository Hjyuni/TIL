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
W = tf.Variable(tf.random_normal([2, 1]), name='weight')
b = tf.Variable(tf.random_normal([1]), name='bias')

logit = tf.matmul(X, W) + b
H = tf.sigmoid(logit)

# 3.
loss = tf.reduce_mean(tf.nn.sigmoid_cross_entropy_with_logits(logits=logit, labels=y))

# optimizer
train = tf.train.GradientDescentOptimizer(learning_rate=0.01).minimize(loss)

# session
sess = tf.Session()
sess.run(tf.global_variables_initializer())

# 4.
for step in range(30000):
    _, loss_val = sess.run([train, loss], feed_dict={X: X_data, y: y_data})
    if step % 1000 == 0:
        print(f'loss:{loss_val}')

# 5.
print(sess.run(H, feed_dict={X: X_data}))
