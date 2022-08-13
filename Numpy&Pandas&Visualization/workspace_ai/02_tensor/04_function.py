def f(x):
    return 2 * x + 1


X = [1, 2, 3, 4, 5]
y = list(map(lambda x: f(x), X))
print(X, y)
