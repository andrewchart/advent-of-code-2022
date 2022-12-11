const fs = require('fs');

const FileSystem = require('./file-system.js').FileSystem;

(()=>{

    const INPUT_DATA_PATH = './src/2022/07/input.txt';

    const input = fs.readFileSync(INPUT_DATA_PATH).toString();

    let fileSysModel = new FileSystem(input);

    // Part 1: Search for directories with size <= 100000
    const searchParams = {
        fsObjTypes: ["Dir"],
        size: {
            min: 0,
            max: 100000
        }
    }

    let searchResults = fileSysModel.getTree().searchDir(searchParams, true);
    
    let sumDirSizes = searchResults.reduce((totalSize, currentDir) => {
        return totalSize + currentDir.size;
    }, 0);

    console.log("The answer to Part One is:", sumDirSizes);

})();

