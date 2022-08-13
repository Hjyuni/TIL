# pip install pandas
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

# 1. 데이터 준비
# df = pd.read_csv('soldiers.csv', encoding='euc-kr')
# print(df)

# header=0은 0번째 행으로 컬럼 이름으로 지정(말로 이해 안되겠으면 한 번 지우고 실행해보기)
names = ['순번', 'date', '가슴둘레', '소매길이', 'height', '허리둘레', '샅높이', '머리둘레', '발길이', 'weight']
df = pd.read_csv('soldiers.csv', encoding='euc-kr', names=names,header=0, low_memory=False)
# print(df)
df = df[['date', 'height', 'weight']]
# print(df)
# print(len(df))
df.dropna(inplace=True)  # 결측치 inplace=True 하면 원본을 바꿔버리는 거임. 저거 안해주면 df=df.dropna()해주면 댐
# print(len(df))

# 년도만 남기자
df['date'] = list(map(lambda x: int(str(x)[:4]) if len(str(x)) > 4 else x, df['date']))
# print(df)

# 키를 float으로 바꾸고 cm도 제거하자!
df['height'] = list(map(lambda x: float(str(x)[:5]) if len(str(x)) > 5 else x, df['height']))
# print(df)

# 몸무게를 float으로 바꾸자! (kg도 제거하자)
df['weight'] = list(map(lambda x: str(x).split()[0], df['weight']))
df['weight'] = list(map(lambda x: float(x) if x else None, df['weight']))
df.dropna(inplace=True)
# print(df)
# print(len(df))

X = df['weight']
y = df['height']

# 2. 데이터 분할
# train_X, test_X
train_X, test_X, train_y, test_y = train_test_split(X, y, test_size=0.3, random_state=1)
# print(train_X)
# print(train_y)
train_X = train_X.values.reshape(-1, 1)
test_X = test_X.values.reshape(-1, 1)

# 3. 학습에 관련된 거 모델 준비
linear = LinearRegression()

# 4. 학습
linear.fit(train_X, train_y)

# 5. 예측 및 평가
predict = linear.predict(test_X)
# print(test_X)
# print(predict)

print(linear.predict([[70]]))

plt.plot(test_X, test_y, 'b.')
plt.plot(test_X, predict, 'r.')

plt.xlim(20, 150)
plt.ylim(150, 220)
plt.grid()

plt.show()