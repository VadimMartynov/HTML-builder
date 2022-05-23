const { stdin, stdout, stderr } = process;
const path = require('path');
const fs = require('fs');
stdout.write('Hi, enter text:\n');

fs.appendFile(path.join(__dirname, 'text.txt'),'',err => {});
fs.truncate(path.join(__dirname,'text.txt'), err => {});

stdin.on('data', config => {
    let str = config.toString();
    str = str.trim();
    if (str == 'exit') {
        stdout.write('Bye');
        process.exit();
    }
    fs.appendFile(
        path.join(__dirname, 'text.txt'),
        str +'\n',
        err => {
            if (err) throw err;
        }
    );
});

process.on('SIGINT', () => {
    console.log('Bye');
    process.exit();
});  
