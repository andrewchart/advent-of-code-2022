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

            const originalState = state;

            // Part 1 - Move crates one at a time
            let ship9000 = new Ship(originalState);
            moves.forEach((move) => ship9000.doMove(move, 9000));
            console.log("The answer to Part One is:", ship9000.getStackTops().join(""));

            // Part 2 - Move crates all in one go
            let ship9001 = new Ship(originalState);
            moves.forEach((move) => ship9001.doMove(move, 9001));
            console.log("The answer to Part Two is:", ship9001.getStackTops().join(""));
            return;

        }

    });

})();
