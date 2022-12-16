const fs = require('fs');

const { Monkey } = require('./monkey.js');

(() => {
   
    const INPUT_DATA_PATH = './src/2022/11/input.txt';

    const input = fs.readFileSync(INPUT_DATA_PATH).toString();

    // Part 1: Find the two monkeys with the most inspections over 20 
    // rounds, and multiply them together to work out the monkey business.
    let monkeys = parseInput(input);

    let rounds = 20;

    // Play out the rounds
    for(let i = 0; i < rounds; i++) {

        monkeys.forEach((monkey) => {

            // Construct array of throws to make
            let throws = monkey.takeTurn();
            
            // Execute the throws in order
            throws.forEach((thrw) => {
                monkeys[thrw.to].items.push(thrw.worry);
            });

        });

    }

    let monkeyBusiness = monkeys
        .map(monkey => monkey.itemsInspected)
        .sort((a, b) => a - b)
        .reverse()
        .slice(0,2)
        .reduce((a, b) => a * b);

    console.log("The answer to Part One is:", monkeyBusiness);


    // Part 2: 10000 rounds and no chill = astronomical monkey beez
    monkeys = parseInput(input);
    
    rounds = 10000;

    // Construct the new calming function, using the lowest common
    // multiple for all monkeys' tests to keep worry levels low.
    const LCM = monkeys
        .map(monkey => monkey.testFuncDivisibleBy)
        .reduce((a, b) => a * b);

    let newCalmFunc = (worryLevel) => {
        return worryLevel % LCM;
    }

    // Play out the rounds
    for(let i = 0; i < rounds; i++) {

        monkeys.forEach((monkey) => {

            // Construct array of throws to make
            let throws = monkey.takeTurn(newCalmFunc);
            
            // Execute the throws in order
            throws.forEach((thrw) => {
                monkeys[thrw.to].items.push(thrw.worry);
            });

        });

    }

    monkeyBusiness = monkeys
        .map(monkey => monkey.itemsInspected)
        .sort((a, b) => a - b)
        .reverse()
        .slice(0,2)
        .reduce((a, b) => a * b);

    console.log("The answer to Part Two is:", monkeyBusiness);

})();


/**
 * Converts the structured text of the puzzle input
 * into Monkey objects.
 * @param {String} input  Puzzle input
 * @returns 
 */
function parseInput(input) {
    
    let monkeys = [];
    let monkeyDefs = input.split("\n\n");

    monkeyDefs.forEach(def => {

        let lines = def.split("\n").map(line => line.trim());

        // One liners to clean up the input
        let monkeyId = parseInt(lines[0].replace(/[A-Za-z:\s]+/g, ''));
        let items = lines[1].replace(/[A-Za-z:\s]+/g, '').split(',').map(item => parseInt(item));
        let worryFuncParts = lines[2].replace('Operation: new = old ', '').split(' ');
        let testFuncDivisibleBy = parseInt(lines[3].replace('Test: divisible by ', ''));
        let throwsToWhenTrue = parseInt(lines[4].replace(/[A-Za-z:\s]+/g, ''));
        let throwsToWhenFalse = parseInt(lines[5].replace(/[A-Za-z:\s]+/g, ''));

        monkeys.push(new Monkey(
            monkeyId,
            items,
            worryFuncParts,
            testFuncDivisibleBy,
            throwsToWhenTrue,
            throwsToWhenFalse
        ));

    });

    return monkeys;

}
