from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

# 1.
iris = load_iris()
X = iris.data
y = iris.target

# 2.
train_X, test_X, train_y, test_y = train_test_split(X, y, test_size=0.3, random_state=1)


# 3.
model = DecisionTreeClassifier()

# 4.
model.fit(train_X, train_y)

# 5.
pred = model.predict(test_X)
for i in range(len(test_X)):
    print(f'{test_X[i]} : {pred[i]}')

print(model.score(test_X, test_y))