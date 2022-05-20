const { stdin, stdout, stderr } = process;
const path = require('path');
const fs = require('fs');

fs.stat(path.join(__dirname, 'files-copy'), err => {
    if (err) {
        fs.mkdir(path.join(__dirname, 'files-copy'), err => {
            if (err) throw err;
        });
    }
});

fs.readdir(path.join(__dirname,'files'), (err, files) => {
    if (err) throw err;
      
    files.forEach(file => {
        fs.copyFile(path.join(__dirname,'files',file), path.join(__dirname,'files-copy',file), err => {
            if(err) throw err; 
         });
    });
});