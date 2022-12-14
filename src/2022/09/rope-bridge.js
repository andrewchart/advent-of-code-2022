const lineReader = require('line-reader');

const Rope = require('./rope.js').Rope;

(() => {
   
    const INPUT_DATA_PATH = './src/2022/09/input.txt';
    
    let ropes = [new Rope(2), new Rope(10)];

    ropes.forEach((rope, index) => {

        let tail = rope.knots[rope.knots.length - 1];
        let positionsVistedByTail = [];

        //Iterate through the whole input file, parsing the input
        lineReader.eachLine(INPUT_DATA_PATH, function(line, last) {

            [direction, amount] = line.split(' ');

            // We move step by step and capture the tail position 
            // every time, since we need to know all the grid 
            // locations it has visited, not just its resting 
            // position following each move.
            for(let i = 0; i < amount; i++) {
                
                rope.moveHead(direction);

                // Turn the co-ordinates into a json string
                coordString = JSON.stringify(tail.pos);

                // If they haven't been visited before, add them to the array
                if(!positionsVistedByTail.includes(coordString)) {
                    positionsVistedByTail.push(coordString);
                }

            }
            
            // On the last run, deliver the answers
            if(last) {
                
                let part = (index === 0) ? "One" : "Two";
                console.log(`The answer to Part ${part} is:`, positionsVistedByTail.length);
                return;

            }

        });

    });
    
})();
