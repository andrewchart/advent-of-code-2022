const lineReader = require('line-reader');

const Ship = require('./ship.js').Ship;

(() => {
   
    const INPUT_DATA_PATH = './src/2022/05/input.txt';

    let state = [];
    let moves = [];
    let readingState = true;

    //Iterate through the whole input file, parsing the input
    lineReader.eachLine(INPUT_DATA_PATH, function(line, last) {

        // The first newline separates the state from the moves.
        // When we hit the newline, don't add it to the state string.
        // Just flip the var then start parsing the moves.
        if(line === "") {
            readingState = false;
            return;
        }

        if(readingState) {
            state.push(line);
        } else {
            moves.push(line);
        }

        // On the last run, process the inputs
        if(last) {

            let ship = new Ship(state);

            moves.forEach((move) => ship.doMove(move));

            console.log("The answer to Part One is:", ship.getStackTops().join(""));
            console.log("The answer to Part Two is:");
            return;

        }

    });

})();
