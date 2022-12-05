const lineReader = require('line-reader');

const Shape = require('./shapes.js').Shape;

(() => {
   
    const INPUT_DATA_PATH = './src/2022/02/input.txt';

    let totalScoreOriginalStrategy = 0;
    let totalScoreUpdatedStraregy = 0;

    // Iterate through the whole input file line by line.
    lineReader.eachLine(INPUT_DATA_PATH, (line, last) => {

        totalScoreOriginalStrategy += getRoundScore(line, 1);
        totalScoreUpdatedStraregy  += getRoundScore(line, 2);
    
        // On the last run, print the answers
        if(last) {

            console.log("The answer to Part One is:", totalScoreOriginalStrategy);
            console.log("The answer to Part Two is:", totalScoreUpdatedStraregy);
            return;

        }

    });

})();

/**
 * Get the score for a given strategy and input
 * @param   {String}  input      Input to drive outcome, expressed as a
 *                               string e.g. "A X".
 * @param   {Integer} strategy   Number representing how to interpret the 
 *                               input. 1 for part one, 2 for part two.
 * @returns {Number}             Score associated with this strategy + input.
 */
function getRoundScore(input, strategy) {
    
    let theirShape = new Shape(input.substring(0,1));
    let yourShape;

    // Work out your shape depending on the strategy we're following
    if(strategy === 1) {
        // Your shape depends on the input
        yourShape = new Shape(input.substring(2,3));
    } 
    
    if(strategy === 2) {
        // Your shape depends on the desired outcome
        switch(input.substring(2,3)) {

            // You want to lose
            case 'X':
                yourShape = new Shape(theirShape.beatsShapes[0]);
                break;

            // You want to draw
            case 'Y':
                yourShape = new Shape(theirShape.name);
                break;
            
            // You want to win
            case 'Z':
                yourShape = new Shape(theirShape.beatenByShapes[0]);
                break;
        }
    }

    // Actual outcome: You Draw
    if(theirShape.name === yourShape.name) {
        return yourShape.score + 3;
    } 
    
    // Actual outcome: You Lose
    else if(yourShape.isBeatenBy(theirShape)) {
        return yourShape.score + 0;
    }

    // Actual outcome: You Win
    else {
        return yourShape.score + 6;
    }

}
