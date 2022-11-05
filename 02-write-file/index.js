const fs = require('fs');
const { stdin, stdout } = process;
const streamWrite = fs.WriteStream('./02-write-file/text.txt');
const toExit = () => {
  stdout.write('Now check text.txt');
  process.exit();
}

stdout.write('Enter text to write it to file\n');
process.on('SIGINT', toExit);
stdin.on('data', chunk => {
  if (chunk.toString().trim() == 'exit') {
    toExit();
  } else {
    streamWrite.write(chunk);
  }
});
