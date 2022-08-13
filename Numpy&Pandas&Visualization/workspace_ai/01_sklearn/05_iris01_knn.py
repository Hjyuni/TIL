from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
# 지우고 써보기
# 데이터 준비
iris = load_iris()
X = iris.data
y = iris.target

# 데이터 분할
train_X, test_X, train_y, test_y = train_test_split(X, y, test_size=0.3, random_state=1)

# 준비
model = KNeighborsClassifier()

# 학습
model.fit(train_X, train_y)

# 예측
pred = model.predict(test_X)
for i in range(len(test_X)):
    print(f'{test_X[i]} 예측: {iris.target_names[pred[i]]} / 실제 : {iris.target_names[test_y[i]]}')

print(f'acc: {model.score(test_X, test_y)}')
