let fs = require('fs');
fs.readFile('./data/CSS', 'utf8', (err, data) => {
  console.log(data);
});