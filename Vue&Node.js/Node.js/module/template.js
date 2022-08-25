// template object
let template = {
  html:(title, list, body, control,authStatusUI=`<a href="/login">login</a>`) => {
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      ${authStatusUI}
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
    </html>`
  },
  list: (filelist) => {
    let list = '<ul>';
    let i=0;
    while(i < filelist.length){
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i += 1;
    }
    list = list + '</ul>'
    return list
  },
};
module.exports = template;