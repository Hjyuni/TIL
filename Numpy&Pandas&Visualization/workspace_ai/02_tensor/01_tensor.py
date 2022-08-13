import tensorflow as tf

# print(tf.__version__)
# 상수 노드
node = tf.constant(100)

# session : 그래프를 실행시켜주는 역할(runner)
sess = tf.Session()

print(sess.run(node))

"""
tensorflow
-Tensor     : 데이터 저장 객체(placeholder)
-Variable   : Weight, Bias
-Operation  : H = W * X + b (node, 식) -> 그래프(tensor -> operation -> tensor -> operation -> ,,,)
-Session    : 실행 환경
"""
