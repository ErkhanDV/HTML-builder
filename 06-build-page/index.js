const fs = require('fs');
const path = require('path');
const writeHTML = data => fs.promises.appendFile(`${__dirname}/project-dist/index.html`, data);
const clearHTML = () => fs.promises.writeFile(`${__dirname}/project-dist/index.html`, '');
const streamWriteCSS = fs.WriteStream(`${__dirname}/project-dist/style.css`);
const readTemplate = () => fs.promises.readFile(`${__dirname}/template.html`, 'utf-8');
const readContainer = container => fs.promises.readFile(`${__dirname}/components/${container}.html`, 'utf-8');
const { stdout } = process;
const targetDir = './project-dist/';
const pathFrom = `${__dirname}/assets/`;
const pathTo = `${__dirname}/project-dist/assets/`;

const makeDir = () => {
  fs.mkdir(path.join(__dirname, targetDir), (err) => {
    stdout.write('Project directory created successfully.\n');
  });
}

const makeAssets = () => {
  fs.mkdir(path.join(path.join(__dirname, targetDir), 'assets'), (err) => {
    stdout.write('Project directory created successfully.\n');
  });
}

const findTags = async () => {
  await clearHTML();
  const chunk = await readTemplate();
  const tagsList = chunk.split('\r\n');
  for (const elem of tagsList) {
    if (elem.indexOf('{') != -1) {
      const elemArr = elem.split(' ');
      const tagName = elemArr[elemArr.length - 1].replace(/[{}]/g, '');
      const result = await readContainer(tagName);
      await writeHTML(`${result}\n`);
    } else {
      await writeHTML(`${elem}\n`);
    }
  }
}

fs.readdir(`${__dirname}/styles`, {withFileTypes: true}, (err, files) => {
  files.forEach(elem => {
    if (elem.isFile() && path.extname(elem.name) == '.css') {
      const readStream = fs.createReadStream(`${__dirname}/styles/${elem.name}`, 'utf-8');
      readStream.on('data', chunk => {
        streamWriteCSS.write(chunk.toString() + '\n');
      });
    }
  })
})

const copyMaster = (pathFrom, pathTo) => {
  fs.readdir(pathFrom, {withFileTypes: true}, (err, files) => {
    files.forEach(elem => {
      if (elem.isFile()) {
        fs.copyFile(
          pathFrom + elem.name,
          pathTo + elem.name,
          (err) => {if (err) throw err}
        );
      } else {
        fs.mkdir(path.join(pathTo, elem.name), (err) => {
          stdout.write(`Directory '${elem.name}' created successfully!\n`);
        });
        copyMaster(pathFrom + elem.name + '/', pathTo + elem.name + '/');
      }
    })
  })
}

fs.rm(pathTo, { recursive: true }, err => {
  makeAssets();
  copyMaster(pathFrom, pathTo);
})

makeDir();
findTags();
