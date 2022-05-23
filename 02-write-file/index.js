const fs = require('fs');
const path = require('path');
const readline = require('readline');

fs.writeFile(
    path.join(__dirname, 'text.txt'), '',
    (err) => { if (err) throw err; }
);

const { stdin, stdout, exit } = process;
stdout.write('Выполните ввод текста\n');

const byeBye = () => {stdout.write('\nТы заходи, если что\n'); exit();}
stdin.on('data', data => {
  const writeText = data.toString();  
  if(writeText.trim() === 'exit') byeBye();
  fs.appendFile(
    path.join(__dirname, 'text.txt'), `${writeText}`,
    err => { if (err) throw err; }
  );  
});

process.on('SIGINT', byeBye);