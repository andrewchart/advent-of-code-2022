const lineReader = require('line-reader');

(() => {
   
    const INPUT_DATA_PATH = './src/04/input.txt';

    // Part 1 - Track the number of pairs that have ranges that overlap one another fully
    let assignmentPairsOverlappedFully = 0;

    // Part 2 - Track the number of pairs that have ranges that have any overlap including full overlap
    let assignmentPairsOverlappedAtAll = 0;

    // Iterate through the whole input file line by line.
    lineReader.eachLine(INPUT_DATA_PATH, (line, last) => {
        
        let elfPair = getAssignments(line);
        
        if(assignmentsOverlapFully(elfPair[0], elfPair[1]))
            assignmentPairsOverlappedFully++;

        if(assignmentsOverlapAtAll(elfPair[0], elfPair[1]))
            assignmentPairsOverlappedAtAll++;

        // On the last run, print the answers
        if(last) {

            console.log("The answer to Part One is:", assignmentPairsOverlappedFully);
            console.log("The answer to Part Two is:", assignmentPairsOverlappedAtAll);
            return;

        }

    });

})();


/**
 * Turns a pair of ranges into two arrays
 * @param   {String} input A string representing a pair of ranges e.g. "3-3,14-25"
 * @returns {Array}        An array containing two arrays which contain every 
 *                         element of both ranges
 */
function getAssignments(input) {

    let ranges = [];
    let output = [];
   
    // Split the input string into two ranges, and each range into a lo + hi value
    input.split(',').forEach((rangeStr) => ranges.push(rangeStr.split('-')));
    
    // Expand each range array into an array of elements
    ranges.forEach((range) => {
        let lo = parseInt(range[0]);
        let hi = parseInt(range[1]);
        let expandedRange = [];

        for(i = lo; i <= hi; i++) {
            expandedRange.push(i);
        }

        // Add the expanded range to the output array
        output.push(expandedRange);
    });

    return output;

}


/**
 * Compare two arrays and determine whether one fully overlaps the other.
 * Note: it shouldn't matter which array overlaps which.
 * @param {Array} assignment1 A set of unique elements in ascending numerical order.
 * @param {Array} assignment2 Ditto.
 */
function assignmentsOverlapFully(assignment1, assignment2) {
    
    // We'll iterate over the shorter array (the one that might be fully overlapped)
    // If both arrays are the same length, it wouldn't matter which we process
    const assignmentToIterate = (assignment1.length < assignment2.length) 
        ? 0  // Iterate over the first array if it is shorter
        : 1; // Iterate over the second array if it is shorter (or the same)

    const longerArray = (assignmentToIterate === 0) ? 1 : 0;

    // If the shorter array contains an item that's not in the longer one, add to 
    // the "difference" array.
    let difference = arguments[assignmentToIterate].filter(
        (item) => !arguments[longerArray].includes(item)    
    );

    // If the difference array is empty, the shorter array is fully overlapped
    // by the longer array.
    return (difference.length === 0) ? true : false;

}


/**
 * Compare two arrays and determine whether any elements are common between the two.
 * @param {Array} assignment1 A set of unique elements in ascending numerical order.
 * @param {Array} assignment2 Ditto.
 */
 function assignmentsOverlapAtAll(assignment1, assignment2) {

    let assignmentsOverlapAtAll = false;
    
    // We'll iterate over the shorter array (just to save work, this time!)
    const assignmentToIterate = (assignment1.length < assignment2.length) 
        ? 0  // Iterate over the first array if it is shorter
        : 1; // Iterate over the second array if it is shorter (or the same)

    const longerArray = (assignmentToIterate === 0) ? 1 : 0;

    // We'll loop over the shorter array. As soon as we find an item that's common, 
    // we know there is overlap and can break the loop / return true.
    arguments[assignmentToIterate].forEach((item) => {
        if(arguments[longerArray].includes(item)) {
            assignmentsOverlapAtAll = true;
            return;
        }
    });

    // If we get here with no common items found, the var remains false; there
    // is no overlap
    return assignmentsOverlapAtAll;

}