export default {
  isOwner:function(req,res){
    if(req.user){
      return true;
    } else {
      return false;
    }
  },
  statusUI:function(req,res){
    let authStatusUI = '<a href="/login/google">Google</a> | <a href="/login/naver">Naver</a> | <a href="/login/kakao">Kakao</a>'
    if(this.isOwner(req, res)){
      console.log(res)
      authStatusUI = ` <a href="/logout">logout</a>`;
    }
    return authStatusUI;
  }
};