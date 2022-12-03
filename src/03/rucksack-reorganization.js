const sumArray = require('../common/utils.js').sumArray;
const lineReader = require('line-reader');

(() => {

    const INPUT_DATA_PATH = './src/03/input.txt';

    // Part 1 - Items of the same type in each rucksack that are split between compartments
    let problemItems = [];

    // Part 2 - The rucksacks in the current group of 3 rucksacks
    let elfGroupRucksacks = [];

    // Part 2 - The list of item types found to be common in each group of 3 
    let elfGroupCommonItems = []

    // Iterate through the whole input file line by line.
    lineReader.eachLine(INPUT_DATA_PATH, (line, last) => {

        // Part 1 - Find items in both compartments and add to an array
        let compartments = splitRucksack(line);
        problemItems = problemItems.concat(getItemsInAll(...compartments));

        // Part 2 - Add the current rucksack inventory to the comparison group.
        elfGroupRucksacks.push(line);

        // When we reach 3 rucksacks, compare the items in them all to find the common item
        if(elfGroupRucksacks.length === 3) {

            let commonItems = getItemsInAll(...elfGroupRucksacks);
            elfGroupCommonItems = elfGroupCommonItems.concat(commonItems);

            // Reset the array
            elfGroupRucksacks = [];

        }
    
        // After the last rucksack, sum the priorities and print the answers
        if(last) {
            
            let problemItemsPriorities = problemItems.map((item) => getPriority(item));
            let elfGroupCommonItemsPriorities = elfGroupCommonItems.map((item) => getPriority(item));

            console.log("The answer to Part One is:", sumArray(problemItemsPriorities));
            console.log("The answer to Part Two is:", sumArray(elfGroupCommonItemsPriorities));

            return;

        }

    });

})();


/**
 * 
 * @param   {String} rucksack String representing unique items in a rucksack.
 * @returns {Array}           An array of strings representing the two rucksack
 *                            compartments.
 */
function splitRucksack(rucksack) {

    let firstCompartment = rucksack.substring(0,rucksack.length / 2);
    let secondCompartment = rucksack.substring(rucksack.length / 2, rucksack.length);

    return [firstCompartment, secondCompartment];

}


/**
 * Look for items that are common between all the strings supplied.
 * @param   {String} collection 1-n strings representing a collection of items.
 * @returns {Array}             A deduplicated array of items that are in all
 *                              input strings.
 */
function getItemsInAll() {
    let firstCollection = [...arguments[0]];
    let itemsInAll = [];

    // Loop through items in the first collection, looking for a match in
    // all other collections. Only if an item is in all collections will 
    // it be added to the list of results. 
    firstCollection.forEach((item) => {
    
        let i = 1;

        while(i < arguments.length) {
            if(arguments[i].indexOf(item) === -1) return;
            i++;
        }

        // Only push the letter if it doesn't already exist (deduplication)
        if(itemsInAll.indexOf(item) === -1) itemsInAll.push(item);
    });
    
    return itemsInAll;
}


/**
 * Get the priority rating for a given input letter
 * @param   {String}  letter A letter of the alphabet.
 * @returns {Integer}        Priority rating from 1-52.
 */
function getPriority(letter) {
    const ALPHABET = [..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"];
    return ALPHABET.indexOf(letter) + 1;
}
