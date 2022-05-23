const path = require('path');
const fs = require('fs');
fs.readdir(path.join(__dirname,'secret-folder'), (err, files) => {
  if (err) throw err;   
  files.forEach(file => {
    fs.stat(path.join(__dirname,'secret-folder',file),(err,stats) => {   
      if (err) throw err;
      if (!stats.isDirectory()) {
        console.log(file.substring(0,file.lastIndexOf('.')) + ' - ' + file.substring(file.lastIndexOf('.')+1) + ' - ' +stats.size/1000 + 'kb');
      }
    });
  });
});