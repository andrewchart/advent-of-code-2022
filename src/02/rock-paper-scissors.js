const lineReader = require('line-reader');

const Shape = require('./shapes.js').Shape;

(() => {
   
    const INPUT_DATA_PATH = './src/02/input.txt';

    let totalScore = 0;

    // Iterate through the whole input file line by line.
    lineReader.eachLine(INPUT_DATA_PATH, (line, last) => {

        totalScore += getRoundScore(line);
    
        // On the last run, print the answers
        if(last) {

            console.log("The answer to Part One is:", totalScore);
            return;

        }

    });

})();

/**
 * Get the score for a given strategy 
 * @param   {String} strategy Strategy expressed as a string e.g. "A X"
 * @returns {Number}          Score associated with this strategy
 */
function getRoundScore(strategy) {
    
    let theirShape = new Shape(strategy.substring(0,1));
    let yourShape = new Shape(strategy.substring(2,3));
    
    // You Draw
    if(theirShape.name === yourShape.name) {
        return yourShape.score + 3;
    } 
    
    // You Win
    else if(yourShape.beats(theirShape)) {
        return yourShape.score + 6;
    }

    // You Lose
    else {
        return yourShape.score + 0;
    }

}
