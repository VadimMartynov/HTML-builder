const { stdin, stdout} = process;
const path = require('path');
const fs = require('fs');
stdout.write('Hi, enter text:\n');

fs.appendFile(path.join(__dirname, 'text.txt'),'',() => {});
fs.truncate(path.join(__dirname,'text.txt'), () => {});

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
