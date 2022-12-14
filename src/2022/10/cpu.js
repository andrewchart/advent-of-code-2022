/**
 * Model a ticking CPU
 */
class CPU {

    constructor() {
        this.cycle = 0; // Current cycle
        this.x = 1;     // Output register
        this.signalStrength = 0;
        this.cmdQueue = [];
        this.crt = new CRT(); // Screen
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

        // Draw a pixel on the screen
        this.crt.draw(this.cycle, this.x);

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

/**
 * Models a computer screen with pixels
 */
class CRT {

    constructor() {
        this.DARK = "⬛️";
        this.LITE = "🟨";
        this.WIDTH = 40; // Screen: number of columns
        this.pixels = new Array(6).fill(""); // Number of rows
    }

    /**
     * Draw a light or a dark pixel onto the CRT
     * @param {Integer} currentCycle Number of the current CPU cycle
     * @param {Integer} spriteCenter Position of the center of the 3
     *                               pixel width sprite.
     */
    draw(currentCycle, spriteCenter) {

        // Determine which row we're drawing on
        // using a temporary var (rowCalc)
        let rowNum = -1;
        let rowCalc = currentCycle;

        // Keep incrementing the row number for
        // every 40 cycles that has passed.
        while(rowCalc > 0) {
            rowCalc -= this.WIDTH;
            rowNum++;
        }

        // The position of the pixel on the row
        let rowPos = (currentCycle % this.WIDTH !== 0) ? 
            currentCycle % this.WIDTH - 1:
            this.WIDTH - 1;

        // If the row and the 3 pixel sprite intersect
        // draw an 'on' pixel.
        if([
            spriteCenter, 
            spriteCenter - 1, 
            spriteCenter + 1].includes(rowPos)
        ) {
            this.pixels[rowNum] += this.LITE;
        } else {
            this.pixels[rowNum] += this.DARK;
        }
    }

    /**
     * Turns the array of pixels into a 
     * line-separated string.
     * @returns {String}
     */
    render() {
        return this.pixels.join("\n");
    }
    
}


module.exports = {
    CPU,
    CMD
}