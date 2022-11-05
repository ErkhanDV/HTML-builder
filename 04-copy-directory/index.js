const fs = require('fs');
const path = require('path');
const { stdout } = process;
const targetDir = 'files-copy';
const pathFrom = './04-copy-directory/files/';
const pathTo = './04-copy-directory/files-copy/';

const makeDir = () => {
  fs.mkdir(path.join(__dirname, targetDir), (err) => {
    stdout.write('Directory created successfully!\n');
  });
}
const copyFiles = () => {
  fs.readdir(pathFrom, (err, files) => {
    files.forEach(file => {
      fs.copyFile(
        pathFrom + file,
        pathTo + file,
        (err) => {if (err) throw err}
      );
    });
    stdout.write('Files are copyed!\n');
  })
}
fs.rm(pathTo, { recursive: true }, err => {
  makeDir();
  copyFiles();
})
