import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression


def celsius_to_fahrenheit(x):
    return x * 1.8 + 32


# 데이터 준비
data_C = np.array(range(0, 100))
data_F = celsius_to_fahrenheit(data_C)

X = data_C
y = data_F

# 데이터 분할
train_X, test_X, train_y, test_y = train_test_split(X, y, test_size=0.3, random_state=1)
train_X = train_X.reshape(-1, 1)
test_X = test_X.reshape(-1, 1)

# 준비
linear = LinearRegression()

# 학습
linear.fit(train_X, train_y)

# 예측
predict = linear.predict(test_X)
print(test_X)
print(predict)

pred_f = linear.predict([[30]])
print('30 to fahrenheit:', pred_f)
acc = linear.score(test_X, test_y)
print(acc)
