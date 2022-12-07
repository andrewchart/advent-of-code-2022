const fs = require('fs');

(()=>{

    const INPUT_DATA_PATH = './src/2022/06/input.txt';

    const input = fs.readFileSync(INPUT_DATA_PATH).toString();

    console.log("The answer to Part One is:", getFirstWindowOfUniqueChars(input, 4));
    console.log("The answer to Part Two is:", getFirstWindowOfUniqueChars(input, 14));
    
    return;

})();


/**
 * Works out how many unique characters need to be read
 * from a string to arrive at a window of N unique characters.
 * 
 * @param   {String} string     Input string to search
 * @param   {Number} windowSize The width of the window array
 * @returns {Number}            Number of characters read
 */
function getFirstWindowOfUniqueChars(string, windowSize) {

    let charsProcessed = 0;
    let currentWindow = [];

    // Create an array from the string and iterate it
    // .every can be broken with a falsy return
    string.split("").every((letter) => {

        currentWindow.push(letter);

        while(currentWindow.length > windowSize) {
            currentWindow.shift();
        }

        charsProcessed++;

        let uniqueChars = new Set(currentWindow);

        // If the string is as long as the desired window and
        // the number of unique chars is equal to the window 
        // length, stop looping.
        if( currentWindow.length === windowSize &&
            currentWindow.length === uniqueChars.size ) {
                return false;
            }

        return true;

    });

    // Number of characters processed to arrive  
    // at a unique string of windowSize
    return charsProcessed;

}
