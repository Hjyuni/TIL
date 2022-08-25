let express = require('express');
let router = express.Router();
let template = require('../lib/template.js');
let auth = require('../lib/auth')

router.get('/', (req, res) => {
  let title = 'Welcome';
  let description = 'Hello, Node.js';
  let list = template.list(req.list);
  let html = template.HTML(title, list,
    `<h2>${title}</h2>${description}
    <img src="/imgs/hello.jpg" style="width:300px; display:block; margin-top:10px;">`,
    `<a href="/topic/create">create</a>`,
    auth.statusUI(req,res)
  );
res.send(html)
});
module.exports=router;