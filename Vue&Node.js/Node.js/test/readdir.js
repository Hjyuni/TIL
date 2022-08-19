let testFolder = './data/';
let fs = require('fs');
 
fs.readdir(testFolder, (error, filelist) => {
  filelist.forEach(file => {
    console.log(file)
  });
});

// fs.readdir(testFolder, function(error, filelist){
//   console.log(filelist);
// })