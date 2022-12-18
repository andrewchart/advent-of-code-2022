const fs = require('fs');
const { Grid } = require('./grid.js');

(() => {
   
    const INPUT_DATA_PATH = './src/2022/12/input.txt';

    const input = fs.readFileSync(INPUT_DATA_PATH).toString();
    
    let grid = new Grid(input);

    grid.getAllPaths();

    let pathsThatMetGoal = grid.paths.filter(path => path.goal === true);
    let pathLengths = pathsThatMetGoal.map(path => path.getNumberOfSteps());
    console.log("The answer to Part 1 is:", Math.min(...pathLengths));

})();
