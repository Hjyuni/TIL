module.exports = {
  HTML:(title, list, body, control, authStatusUI = `<a href="/auth/login">login</a> | <a href="/auth/register">REGISTER</a>`)=>{
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${authStatusUI}
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },list:(filelist)=>{
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
      list += `<li><a href="/topic/${filelist[i].id}">${filelist[i].title}</a></li>`;
      i = i + 1;
    }
    list +='</ul>';
    return list;
  }
}
