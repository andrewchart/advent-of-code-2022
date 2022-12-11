const fs = require('fs');

const FileSystem = require('./file-system.js').FileSystem;

(()=>{

    const INPUT_DATA_PATH = './src/2022/07/input.txt';

    const input = fs.readFileSync(INPUT_DATA_PATH).toString();

    let fileSysModel = new FileSystem(input);
    let searchParams, searchResults;

    // Part 1: Search for directories with size <= 100000 and sum their sizes
    searchParams = {
        fsObjTypes: ["Dir"],
        size: {
            min: 0,
            max: 100000
        }
    }

    searchResults = fileSysModel.getTree().searchDir(searchParams, true);
    
    let sumDirSizes = searchResults.reduce((totalSize, currentDir) => {
        return totalSize + currentDir.size;
    }, 0);

    console.log("The answer to Part One is:", sumDirSizes);


    // Part 2: Find the smallest directory that could be deleted
    // to free up enough space for the update.
    const DISK_SPACE = 70000000;
    const USED_SPACE = fileSysModel.getTree().size;
    const REQD_SPACE = 30000000;

    let minDirSizeToDelete = REQD_SPACE - (DISK_SPACE - USED_SPACE);
    
    searchParams = {
        fsObjTypes: ["Dir"],
        size: {
            min: minDirSizeToDelete,
            max: Infinity
        }
    }

    searchResults = fileSysModel.getTree().searchDir(searchParams, true);

    // Reduce results to the smallest dir
    let dirToDelete = searchResults.reduce((prevDir, currentDir) => {
        if(prevDir.size <= currentDir.size) {
            return prevDir;
        } else {
            return currentDir;
        }
    });

    console.log("The answer to Part Two is:", dirToDelete.size);

})();
