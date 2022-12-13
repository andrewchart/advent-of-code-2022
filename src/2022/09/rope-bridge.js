const lineReader = require('line-reader');

const Rope = require('./rope.js').Rope;

(() => {
   
    const INPUT_DATA_PATH = './src/2022/09/input.txt';

    let shortRope = new Rope(1);
    let shortRopePositionsVistedByTail = [];

    //Iterate through the whole input file, parsing the input
    lineReader.eachLine(INPUT_DATA_PATH, function(line, last) {

        [direction, amount] = line.split(' ');

        // Part 1: We move step by step and capture the tail 
        // position every time, since we need to know all the
        // grid positions it has visited, not just its resting 
        // position following each move.
        for(let i = 0; i < amount; i++) {
            shortRope.moveHead(direction);

            // Turn the co-ordinates into a json string
            coordString = JSON.stringify(shortRope.tailPos);

            // If they haven't been visited before, add them to the array
            if(!shortRopePositionsVistedByTail.includes(coordString)) {
                shortRopePositionsVistedByTail.push(coordString);
            }
        }
        
        // On the last run, deliver the answers
        if(last) {
            
            console.log("The answer to Part One is:", shortRopePositionsVistedByTail.length);
            console.log("The answer to Part Two is:");
            return;

        }

    });

})();
