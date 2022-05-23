const path = require('path');
const fs = require('fs');

fs.stat(path.join(__dirname, 'files-copy'), err => {
    if (err) {
        fs.mkdir(path.join(__dirname, 'files-copy'), err => {
            if (err) throw err;
        });
    }
});
fs.readdir(path.join(__dirname,'files-copy'), (err, files) => {
    if (files) {
        files.forEach(file => {
            fs.unlink(path.join(__dirname,'files-copy', file), err =>{});
        })
    } 
});
fs.readdir(path.join(__dirname,'files'), (err, files) => {
    if (err) throw err;
    copy(files,'');
});

function copy(files,pathCopy) {  
    fs.mkdir(path.join(__dirname,'files-copy', pathCopy), err => {});
    files.forEach(file => {

        fs.stat(path.join(__dirname,'files',pathCopy,file), (err,stats) => {
            if (stats.isDirectory()) {
                fs.readdir(path.join(__dirname,'files'+pathCopy+'\\'+file), (err, files1) => {
                    if (err) throw err;
                    copy(files1,pathCopy+'\\'+file);
                });
            } else {
                fs.copyFile(path.join(__dirname,'files'+pathCopy+'\\'+file), path.join(__dirname,'files-copy',pathCopy+'\\'+file), err => {
                    if(err) throw err; 
                 });
            }
        })
    })
}