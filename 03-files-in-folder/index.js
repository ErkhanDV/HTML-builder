const fs = require('fs');
const { stdout } = process;

fs.readdir(`${__dirname}/secret-folder`, {withFileTypes: true}, (err, files) => {
  files.forEach(elem => {
    if (elem.isFile()) {
      const name = elem.name.split('.')[0];
      const extension = elem.name.split('.')[1];
      fs.stat(`${__dirname}/secret-folder/${elem.name}`, (err, stats) => {
        stdout.write(`${name} - ${extension} - ${(stats.size/1024).toFixed(3)}kb\n`);
      });
    }
  })
})
