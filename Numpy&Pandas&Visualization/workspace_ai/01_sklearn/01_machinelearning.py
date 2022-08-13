# pip install sklearn
from sklearn.linear_model import LinearRegression
import numpy as np
import matplotlib.pyplot as plt

x = np.array([1, 2, 3, 4, 5])
y = np.array([2, 4, 6, 8, 10])

linear = LinearRegression()
print(x.reshape(-1, 1))
linear.fit(x.reshape(-1, 1), y)

test_x = np.array([6, 7, 8, 9, 10])
predict = linear.predict(test_x.reshape(-1, 1))
print(predict)

plt.plot(test_x, predict)
plt.show()