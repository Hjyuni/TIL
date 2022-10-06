from django.db import models

# Create your models here.
# 포스팅 저장하기
class Post(models.Model):
    # CharField : 최대 길이 정의가 필요한 문자열(단일 라인 입력)
    # TextField : 길이 정의가 필요하지 않은 문자열(다중 행 크기 조정 가능한 입력)
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)