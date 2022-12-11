const fs = require('fs');

const Forest = require('./forest.js').Forest;
const Tree = require('./forest.js').Tree;

(()=>{

    const INPUT_DATA_PATH = './src/2022/08/input.txt';

    const input = fs.readFileSync(INPUT_DATA_PATH).toString();

    const forest = new Forest(input);

    // Part 1: Count the visible trees
    let visibleTrees = forest.treeGrid.filter(tree => tree.getCurrentVisibility() === true);
    console.log("The answer to Part One is:", visibleTrees.length);

})();
