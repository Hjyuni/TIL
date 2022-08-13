import tensorflow as tf
from tensorflow_core.examples.tutorials.mnist import input_data

# conda uninstall tensorflow : 2 버전 있어서
# pip install tensorflow==1.15

# 1
mnist = input_data.read_data_sets('data/mnist/',one_hot=True)
# one_hot : 앞에서 했던 상중하라 같음 예) 상: [1,0,0] 중:[0,1,0] ..

X = tf.placeholder(shape=[None,784],dtype=tf.float32)
# 784 : 28*28
y = tf.placeholder(shape=[None,10],dtype=tf.float32)
# 10 : 숫자가 0~9까지라서 0,0,0,0,0,0,0 // 1,1,1,1,1,1,1,1, ,,

# 2
W1 = tf.Variable(tf.random_normal([784,256]),name='weight1')
b1 = tf.Variable(tf.random_normal([256]),name='bias1')
layer1 = tf.nn.relu(tf.matmul(X,W1)+b1)

W2 = tf.Variable(tf.random_normal([256,256]),name='weight2')
b2 = tf.Variable(tf.random_normal([256]),name='bias2')
layer2 = tf.nn.relu(tf.matmul(layer1,W2)+b2)

W3 = tf.Variable(tf.random_normal([256,10]),name='weight3')
b3 = tf.Variable(tf.random_normal([10]),name='bias3')

logit = tf.matmul(layer2,W3) + b3
H = tf.nn.relu(logit)

# 3
loss = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits_v2(logits=logit,labels=y))

train = tf.train.AdamOptimizer(learning_rate=0.001).minimize(loss)

sess = tf.Session()
sess.run(tf.global_variables_initializer())

# 4
num_of_epoch = 30 # 총 학습의 개수
batch_size = 100 # 학습 한 번당 100개로 잘라서 학습하겠다 : total_iter = int(mnist.train.num_examples / batch_size)
for step in range(num_of_epoch):
    total_iter = int(mnist.train.num_examples / batch_size)
    for i in range(total_iter):
        batch_x , batch_y = mnist.train.next_batch(batch_size)
        # next_batch -> train, test ... set 만들고 내가 넣어주는 만큼 빼준다고 .. ?
        _ , loss_val = sess.run([train,loss],feed_dict={X:batch_x , y:batch_y})
        if step % 3 ==0 :
            print(f'loss: {loss_val}')

# 5
predict = tf.argmax(H,1)
correct = tf.equal(predict,tf.argmax(y,1))
accuracy = tf.reduce_mean(tf.cast(correct,dtype=tf.float32))
print(f'acc: {sess.run(accuracy,feed_dict={X:mnist.test.images , y:mnist.test.labels})}')