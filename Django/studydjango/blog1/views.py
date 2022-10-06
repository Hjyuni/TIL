from django.shortcuts import render

# Create your views here.
from .models import Post

def post_list(request):
    # DB에서 모든 포스팅을 가져와
    qs = Post.objects.all() # QuerySet
    # 목록을 리스트로 가져와
    return render(request, 'blog1/post_list.html',{
        'post_list' : qs,
    })