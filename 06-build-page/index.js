const path = require('path');
const fs = require('fs');
let n=0,strTemplate,mas = [],output;
let readCssStream,writeCssStream,readableStream;
const template = fs.createReadStream(path.join(__dirname, 'template.html'),'utf-8');

fs.stat(path.join(__dirname, 'project-dist'), err => { //   --------------------Создание папки, в случае не существования
  if (err) {
    fs.mkdir(path.join(__dirname, 'project-dist'), err => {
      if (err) throw err;
    }); 
  }
});

fs.unlink(path.join(__dirname, 'project-dist','style.css'),() => {});  //--Удаление старого CSS файла

function deleteDir(files,pathCopy) {    //--------------------------------------Удаление старых директорий
  fs.rmdir(path.join(__dirname, 'project-dist','assets'), () => {});
  files = pathCopy;
}
function copy(files,pathCopy) {  //---------------------------------------------Копирование файлов и директорий
  fs.mkdir(path.join(__dirname,'project-dist', pathCopy), () => {});
  files.forEach(file => {
    fs.stat(path.join(__dirname, pathCopy,file), (err,stats) => {
      if (stats.isDirectory()) {
        fs.readdir(path.join(__dirname,pathCopy+'\\'+file), (err, files1) => {
          if (err) throw err;
          copy(files1,pathCopy+'\\'+file);
        });
      } else {
        fs.copyFile(path.join(__dirname,pathCopy+'\\'+file), path.join(__dirname,'project-dist',pathCopy+'\\'+file), err => {
          if(err) throw err; 
        });
      }
    });
  });
}

fs.readdir(path.join(__dirname,'assets'), (err, files) => { // ----------------Вызов удаления и копирования файлов и директорий
  if (err) throw err;
  deleteDir(files,'assets');
  copy(files,'assets');
});

fs.readdir(path.join(__dirname,'components'), (err, files) => { //-------------Запись в массив данных компонентов
  if (err) throw err;
  output = fs.createWriteStream(path.join(__dirname,'project-dist','index.html'));
  files.forEach(file => {
    if (file.substring(file.lastIndexOf('.')) == '.html') {
      readableStream = fs.createReadStream(path.join(__dirname, 'components',file),'utf-8');
      readableStream.on('data', chunk => mas[n++] = ['{{'+file.substring(0,file.lastIndexOf('.'))+'}}',chunk]);
    }
  });
});

template.on('data', chunk => strTemplate = chunk); //-------------------------Запись в строку данных шаблона

template.on('end', () => { // ------------------------------------------------Запись в файл index.html
  for (let i=0;i<mas.length;i++) {
    strTemplate=strTemplate.replace(new RegExp(mas[i][0],'gi'),mas[i][1]);    
  }
  output.write(strTemplate);
});

fs.readdir(path.join(__dirname,'styles'), (err, files) => { //----------------Объединение стилей и запись в style.css
  if (err) throw err;
  files.forEach(file => {
    if (file.substring(file.lastIndexOf('.')) == '.css') {
      readCssStream = fs.createReadStream(path.join(__dirname, 'styles',file),'utf-8');
      writeCssStream =fs.createWriteStream(path.join(__dirname, 'project-dist','style.css'));
      readCssStream.on('data', chunk => writeCssStream.write(chunk));
    }  
  });
});