const fs = require('fs');
const path = require('path');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err; }  
);



function style() {
  fs.writeFile(
    path.join(__dirname, 'project-dist', `style.css`), '',
  (err) => { if (err) throw err; }
  );

  fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
    if(err) { throw err } else {   
      files.forEach((file) => {
        if(path.extname(file).slice(1) === 'css') {
          let readableStream = fs.createReadStream(path.join(__dirname, 'styles', `${file}`), 'utf-8');
          readableStream.on('data', (data) => {
            fs.appendFile(path.join(__dirname, 'project-dist', `style.css`), data, (error) => { 
              if (error)  throw err });
          })
        }
      })
    }
  })
}
style()

function copy() {
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
      if (err) throw err;
    });
    fs.readdir(path.join(__dirname, 'assets'), (err, files) => {
        if(err) throw err;
        files.forEach((file) => {
          fs.readdir(path.join(__dirname, 'assets', `${file}`),(err, directs) => {
            if(err) throw err;
            fs.mkdir(path.join(__dirname, 'project-dist', 'assets', `${file}`), { recursive: true }, (err) => {
              if (err) throw err;     
            });
            directs.forEach((direct) => {
              fs.copyFile(
                path.join(__dirname, 'assets', `${file}`, `${direct}`), 
                path.join(__dirname, 'project-dist', 'assets', `${file}`, `${direct}`), 
                err => {if(err) throw err; })
            })
          });
        }); 
    })
}
copy()


function change() {
  fs.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'), (err) => {
    if (err) throw err;
    fs.readFile(path.join(__dirname, 'project-dist', 'index.html'), 'utf8', (err, data) => {
      if(err) throw err;
      fs.readdir(path.join(__dirname, 'components'), {withFileTypes: true},(err, section) => {
        if (err) throw err;
        section.forEach((div) => {
          fs.readFile(path.join(__dirname, 'components', div.name), 'utf8', (err, divContent) => {
            if(err) throw err;
            let divName = `{{${div.name.split('.')[0]}}}`;
            data = data.replace(divName, divContent);
            fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), data, (err) => {
              if(err) throw err;
            });
          });
        });
      });
    });
  });
}
change();
