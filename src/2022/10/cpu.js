/**
 * Model a ticking CPU
 */
class CPU {

    constructor() {
        this.cycle = 0; // Current cycle
        this.x = 1;     // Output register
        this.signalStrength = 0;
        this.cmdQueue = [];
    }


    /**
     * Gets the current signal strength
     * @returns {Integer}
     */
    getSignalStrength() {
        return this.signalStrength;
    }


    /**
     * Cycle the CPU
     * @returns {Void}
     */
    next() {

        // Start a new cycle
        this.cycle++;

        // Report the signal strength before processing
        // any commands.
        this.signalStrength = this.cycle * this.x;

        // Process the next command in the queue
        this.processNextCmd();

        return;

    }


    /**
     * Process the next command from the command queue
     * @returns {Void}
     */
    processNextCmd() {

        let command = this.cmdQueue[0];

        switch(command.name) {
            case "noop":
                this.noop(command);
                break;

            case "addx":
                this.addx(command);
                break;
        }

        // If the command has had enough time to process
        // shift it off the queue
        if(command.cyclesRequired === 0) {
            this.cmdQueue.shift();
        }

        return;

    }


    /**
     * Wastes time doing nothing
     * @param   {CMD} command  An instance of CMD.
     * @returns {Void}
     */
    noop(command) {
        command.cyclesRequired--;
        return;
    }


    /**
     * Adds to X (after two cycles)
     * @param {CMD} command  An instance of CMD. 
     * @returns 
     */
    addx(command) {
        command.cyclesRequired--;
        if(command.cyclesRequired === 0) {
            this.x += command.value;
        }
        return;
    }

}


/**
 * Models a computer command
 */
class CMD {

    constructor(name, value = null) {
        this.name = name;
        this.value = value;
        this.cyclesRequired = 
            (this.name === "addx") ? 2 : 1;
    }
    
}


module.exports = {
    CPU,
    CMD
}