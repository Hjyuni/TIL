from django.contrib import admin
from .models import Post
# Register your models here.

# 1
# admin.site.register(Post)

# 2
"""
class PostAdmin(admin.ModelAdmin):
  pass

admin.site.register(Post, PostAdmin)
"""

# 3
@admin.register(Post) #Wrapping
class PostAdmin(admin.ModelAdmin):
  list_display = ['id','message', 'message_length', 'is_public','created_at', 'updated_at']
  # 원하는 객체에 링크넣기
  list_display_links = ['message']
  # admin page 내 검색기능 넣기
  search_fields = ['message']
  # 지정 필드값을 필터링 옵션 제공
  list_filter = ['message']

  # 모델에서 자주 사용하지 않는다면 admin에서도 정의 가능
  # def message_length(self, post):
  #   return len(post.message)