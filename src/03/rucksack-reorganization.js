const sumArray = require('../common/utils.js').sumArray;
const lineReader = require('line-reader');

(() => {

    const INPUT_DATA_PATH = './src/03/input.txt';

    let problemItems = [];

    // Iterate through the whole input file line by line.
    lineReader.eachLine(INPUT_DATA_PATH, (line, last) => {

        // Find items in both compartments and add to an array
        problemItems = problemItems.concat(getItemsInBoth(line));
    
        // On the last run, sum the priorities and print the answers
        if(last) {

            let summingArray = problemItems.map((item) => getPriority(item));

            console.log("The answer to Part One is:", sumArray(summingArray));
            console.log("The answer to Part Two is:");
            
            return;

        }

    });

})();

/**
 * 
 * @param   {String} rucksack String representing unique items in a rucksack
 * @returns {Array}           An deduplicated array of items that are in both
 *                            compartments of the rucksack
 */
function getItemsInBoth(rucksack) {
    let contents = [...rucksack];
    let itemsInBoth = [];

    let firstCompartment = contents.slice(0,contents.length / 2);
    let secondCompartment = contents.slice(contents.length / 2, contents.length);

    // Look through the first compartment and compare with items in the second
    firstCompartment.forEach((item) => {

        // When a value is in both compartments, add to an array 
        // (but don't duplicate items already in the array)
        if(secondCompartment.includes(item) && itemsInBoth.indexOf(item) === -1) {
            itemsInBoth.push(item);
        }

    });

    return itemsInBoth;
}


/**
 * Get the priority rating for a given input letter
 * @param   {String}  letter    A letter of the alphabet.
 * @returns {Integer}           Priority rating from 1-52.
 */
function getPriority(letter) {
    const ALPHABET = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    return ALPHABET.indexOf(letter) + 1;
}

