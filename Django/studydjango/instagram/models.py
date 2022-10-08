from email.policy import default
from tabnanny import verbose
from django.db import models

# Create your models here.
class Post(models.Model):
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