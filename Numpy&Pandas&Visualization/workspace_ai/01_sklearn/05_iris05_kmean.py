from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import pandas as pd

# 1
iris = load_iris()
X = iris.data
y = iris.target

# 2.

train_X, test_X, train_y, test_y = train_test_split(X, y, test_size=0.3, random_state=1)

# 비지도 학습은 알아서 값을 출력해줌(X만 주어지고 y는 알아서 출력함)

# 3.
model = KMeans(n_clusters=3)

# 4.
model.fit(train_X)

# 5.
pred = model.predict(test_X)
print(test_X)
print(pred)

# 어떻게 군집할건지 그려보자
df = pd.DataFrame(test_X)
df.columns = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width']
df['category'] = pd.DataFrame(pred)

centers = pd.DataFrame(model.cluster_centers_)
centers.columns = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width']
center_X = centers['sepal_length']
center_y = centers['sepal_width']

plt.scatter(df['sepal_length'], df['sepal_width'], c=df['category'])
plt.scatter(center_X, center_y, s=100, c='r', marker='*')
plt.show()