/**
 * Models a cheeky monkey 🐒
 */
class Monkey {
    constructor(            
        monkeyId,
        items,
        worryFuncParts,
        testFuncDivisibleBy,
        throwsToWhenTrue,
        throwsToWhenFalse
    ) {
        this.monkeyId = monkeyId;
        this.items = items;
        this.itemsInspected = 0;
        this.throwsToWhenTrue = throwsToWhenTrue;
        this.throwsToWhenFalse = throwsToWhenFalse;

        this.inspect = (oldWorry) => {
            
            let [ operator, number ] = worryFuncParts;

            if(number === 'old') {
                number = oldWorry;
            }
            
            switch(operator) {
                case '*':
                    return parseInt(oldWorry) * parseInt(number);

                case '+':
                    return parseInt(oldWorry) + parseInt(number);
            }

            throw new Error('Could not calculate Worry');

        };

        this.calm = (worryLevel) => {
            return Math.floor(worryLevel/3);
        }

        this.test = (worryLevel) => {
            if(worryLevel % testFuncDivisibleBy === 0) return true;
            return false;
        }
    }

    /**
     * Runs through the inspect/calm/test/throw cycle for each item in
     * the monkey's current inventory.
     * 
     * @returns {Array} Array of objects specifying throws to execute.
     */
    takeTurn() {

        let throws = [];

        while(this.items.length > 0) {

            let worry, to;

            // Inspect item, increase worry level
            worry = this.inspect(this.items[0]);
            this.itemsInspected++;

            // Inspection over, calm down
            worry = this.calm(worry);

            // Run the test and register the throw
            if(this.test(worry) === true) {
                to = this.throwsToWhenTrue;
            } else {
                to = this.throwsToWhenFalse;
            }

            throws.push({ worry, to });

            // Update items array
            this.items.shift();

        }

        return throws;
    }

}

module.exports = {
    Monkey
}