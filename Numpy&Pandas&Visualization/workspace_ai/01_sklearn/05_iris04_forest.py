from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# 1.
iris = load_iris()
X = iris.data
y = iris.target

# 2.
train_X, test_X, train_y, test_y = train_test_split(X, y, test_size=0.3, random_state=1)

# 3.
model = RandomForestClassifier()

# 4.
model.fit(train_X, train_y)

# 5.
pred = model.predict(test_X)
print(test_X)
print(pred)

print(model.score(test_X, test_y))
