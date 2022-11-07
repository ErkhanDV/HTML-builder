const fs = require('fs');
const path = require('path');
const streamWrite = fs.WriteStream(`${__dirname}/project-dist/bundle.css`);

fs.readdir(`${__dirname}/styles`, {withFileTypes: true}, (err, files) => {
  files.forEach(elem => {
    if (elem.isFile() && path.extname(elem.name) == '.css') {
      const readStream = fs.createReadStream(`${__dirname}/styles/${elem.name}`, 'utf-8');
      readStream.on('data', chunk => {
        streamWrite.write(chunk.toString() + '\n');
      });
    }
  })
})
