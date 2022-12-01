const sumArray = require('../common/utils.js').sumArray;
const lineReader = require('line-reader');

(() => {
   
    const INPUT_DATA_PATH = './src/01/input.txt';

    let summingArray = [];
    let answerArray = [];

    // Iterate through the whole input file line by line.
    lineReader.eachLine(INPUT_DATA_PATH, (line, last) => {

        let lineAsInt = parseInt(line);
        
        // If the line contains a number, add it to the sumArray.
        if(!isNaN(lineAsInt)) {
            summingArray.push(lineAsInt);
        } 
        
        // When we encounter a non number i.e. the newline, (or on 
        // the last run) sum the summingArray contents and push to 
        // the answerArray.  
        if(isNaN(lineAsInt) || last) {

            answerArray.push(sumArray(summingArray));

            // Reset the numbers in the array to sum
            summingArray = [];

        }
    
        // On the last run, sort the array high to low then print 
        // the answer.
        if(last) {

            answerArray.sort(function(a, b) {
                return b - a;
            });

            console.log("The answer to Part One is:", answerArray[0]);
            console.log("The answer to Part Two is:", sumArray(answerArray.slice(0,3)));
            
            return;

        }

    });

})();

