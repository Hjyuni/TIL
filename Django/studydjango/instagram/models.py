from django.conf import settings
from django.db import models

# Create your models here.
class Post(models.Model):
  author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  message = models.TextField()
  # upload_to에 함수사용 가능
  photo = models.ImageField(blank=True,upload_to='instagram/post/%Y%m%d')
  is_public = models.BooleanField(default=False, verbose_name='공개여부')
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateField(auto_now=True)

  # Java toString
  # 어떠한 객체에 대한 문자열 표현이 필요 할 때
  def __str__(self):
    # Post의 message값을 가져와 줘
    return f"{self.message}"

  def message_length(self):
    return len(self.message)
  # 항목 이름 바꾸기
  message_length.short_description = '메세지 글자수'

  class Meta:
    # orderby: id 역순
    ordering = ['-id']

class Comment(models.Model):
  # 외래키 지정법: models.ForeignKey(to, on_delete=)
  # to: 대상모델, 클래스를 직접 지정하거나 클래스 명을 문자열로 지정. 자기 참조는 self
  # on_delete: record 삭제 시 rule (CASCADE, PROTECT, SET_NULL, SET_DEFAULT, SET, DO_NOTHING)
  post = models.ForeignKey(Post, on_delete = models.CASCADE) # post_id 필드 생성
  message = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateField(auto_now=True)