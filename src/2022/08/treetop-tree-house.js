const fs = require('fs');

const Forest = require('./forest.js').Forest;

(()=>{

    const INPUT_DATA_PATH = './src/2022/08/input.txt';

    const input = fs.readFileSync(INPUT_DATA_PATH).toString();

    const forest = new Forest(input);

    // Part 1: Count the visible trees
    let visibleTrees = forest.treeGrid.filter(tree => tree.getCurrentVisibility() === true);
    console.log("The answer to Part One is:", visibleTrees.length);

    // Part 2: Work out the highest possible scenic score
    let scenicScores = []

    forest.treeGrid.forEach((tree) => {
        let score = tree.getScenicScore();
        if(!scenicScores.includes(score)) scenicScores.push(score);
    });

    console.log("The answer to Part Two is:", Math.max(...scenicScores));

})();
