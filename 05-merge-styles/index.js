const path = require('path');
const fs = require('fs');
let readableStream,writeableStream;

fs.unlink(path.join(__dirname, 'project-dist','bundle.css'), ()=>{});

fs.readdir(path.join(__dirname,'styles'), (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (file.substring(file.lastIndexOf('.')) == '.css') {
      readableStream = fs.createReadStream(path.join(__dirname, 'styles',file),'utf-8');
      writeableStream =fs.createWriteStream(path.join(__dirname, 'project-dist','bundle.css'));
      readableStream.on('data', chunk => writeableStream.write(chunk));
    }  
  });
});
