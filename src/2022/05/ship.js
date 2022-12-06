function Ship(stateAsRowStrings) {
    
    this.stacks = parseState(stateAsRowStrings);

    this.getStacks = () => {
        return this.stacks;
    }

    /**
     * Gets the top crate of each stack
     * @returns {Array} Ordered list of crates at the top of 
     *                  each stack
     */
    this.getStackTops = () => {

        let stackTops = [];

        this.stacks.forEach((stack) => {
            stackTops.push(stack[stack.length - 1]);
        });

        return stackTops;
        
    }

    /**
     * Executes a move.
     * @param   {String} moveStr A string instruction in the form:
     *                           "move 3 from 5 to 9".
     * @param   {Number} model   9000 or 9001 - the model of crane
     *                           doing the move
     * @returns {void}
     */
    this.doMove = (moveStr, model) => {

        const regexp = /([0-9]+)/g
        const moveNums = [...moveStr.match(regexp)];  

        const numCrates = moveNums[0];
        const fromStack = moveNums[1] - 1; // Stack 1 is index 0 etc
        const toStack   = moveNums[2] - 1;
        
        if(model === 9000) {
            // For as many crates as we have to move, pop/push the stacks
            // one at a time.
            for(let i = 0; i < numCrates; i++) {
                this.stacks[toStack].push(this.stacks[fromStack].pop());
            }
        } 
        
        if(model === 9001) {

            // "Lift" numCrates from the old stack and concat onto the 
            // new stack.
            let crates = this.stacks[fromStack].splice(
                this.stacks[fromStack].length - numCrates
            );
            
            this.stacks[toStack] = this.stacks[toStack].concat(crates);

        }

        return;

    }
    
}

/**
 *
 * @param {Array} stateAsRowStrings Array of strings, each representing a 
 *                                  horizontal row of crates. 
 * @returns {Array}                 Array of arrays, each representing one
 *                                  stack of crates.
 */
function parseState(stateAsRowStrings) {
                              
    // Output array representing "stacks" ("stack" = array of crates).
    let stacks = [];

    // Go through each row from bottom to top creating an array of crates.
    // i-2 because (1) we don't need the stack number row.
    // {1,4} because each crate consist of 4 columns (or 3 for the last one).
    for(let i = stateAsRowStrings.length - 2; i >= 0; i--) {

        // For each horizontal row (string), break it into 4-char chunks,
        // then trim each chunk and lose the square brackets.
        let crateRow = stateAsRowStrings[i].match(/.{1,4}/g).map((crate) => { 
            return crate.trim().replace("[","").replace("]",""); 
        });
        
        // Loop the crate row, stacking a crate onto each stack, left to right.
        for(let j = 0; j < crateRow.length; j++) {

            // Create array to represent the stack on the first run.
            if(typeof stacks[j] === "undefined") stacks[j] = [];

            // Don't push an empty element. If there's no crate to stack, move right. 
            if(crateRow[j].length === 0) continue;
            
            stacks[j].push(crateRow[j]);

        }

    }

    return stacks;
}

module.exports = {
    Ship
}