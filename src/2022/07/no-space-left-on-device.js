const fs = require('fs');

const FileSystem = require('./file-system.js').FileSystem;

(()=>{

    const INPUT_DATA_PATH = './src/2022/07/input.txt';

    const input = fs.readFileSync(INPUT_DATA_PATH).toString();

    let fileSysModel = new FileSystem(input);

    //console.log(fileSysModel.getTree());
    console.log(fileSysModel.cwd);

})();

