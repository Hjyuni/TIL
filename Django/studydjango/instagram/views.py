# render : templates를 쓰는 인자
from django.shortcuts import render
from .models import Post

# Create your views here.
def post_list(req):
  qs = Post.objects.all()
  # q는 검색어 : q가 있으면 q에 담긴 값, 없으면 ''을 가져와줘
  q = req.GET.get('q','')
  if q :
   qs = qs.filter(message__icontains=q)
  # instagram/templates/instagrm/post_list.html
  return render(req, 'instagram/post_list.html', {
    'post_list' : qs,
    'q': q,
  }) 