const { stdin, stdout, stderr } = process;
const path = require('path');
const fs = require('fs');
stdout.write('Hi, enter text:\n');



stdin.on('data', config => {
    let str = config.toString();
    str = str.trim();
    if (str == 'exit') {
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