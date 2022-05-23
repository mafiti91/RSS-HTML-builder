const fs = require('fs');
const path = require('path');

const info = (file) => { 
    let arr = [];
    fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
        if (err) console.log('ERROR OUTPUT TASK 3', err);             
        arr.push(file.name.split('.').slice(0, -1).join('.'))
        arr.push(path.extname(file.name).slice(1));
        arr.push(stats.size + 'b');          
        console.log(arr.join(' - ')); 
    })    
};

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
    if(err) {console.log('ERROR TASK 3');}   
    files.forEach((file) => { if(file.isFile()) { info(file) }            
    })      
});