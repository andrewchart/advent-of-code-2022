/**
 * Models a Rope consisting of n Knots.
 */
class Rope {


    constructor(knots) {
        this.knots = [];
        this.sectionLength = 1; // Distance between two knots is always
                                // one grid hop, in this puzzle

        for(let i = 0; i < knots; i++) {
            this.knots.push(new Knot(0, 0));
        }
    }


    /**
     * Move the head one step in the given direction
     * then the reposition of the following knots.
     * @param   {String} direction L|R|U|D
     * @returns {Object}           New position for the head
     */
    moveHead(direction) {

        let head = this.knots[0];

        switch(direction) {
            case 'L':
                head.pos.x--;
                break;

            case 'R':
                head.pos.x++;
                break;

            case 'U':
                head.pos.y++;
                break;

            case 'D':
                head.pos.y--;
                break;
        }

        this.followHead();

        return head.pos;

    }

    /**
     * After the head has been moved L/R/U/D, reposition all other
     * knots accordingly, one by one.
     * 
     * @returns {Object} Position of the final knot in the rope
     */
    followHead() {

        for(let i = 0; i < this.knots.length; i++) {

            let leadKnot  = this.knots[i]; 
            let chaseKnot = this.knots[i+1];

            // We've reached the last knot
            if(typeof chaseKnot === "undefined") return leadKnot.pos;

            // The two knots are touching so the chaser doesn't move (so 
            // none of the other knots do either).
            if(this.isTouching(leadKnot, chaseKnot)) return chaseKnot.pos;

            // Otherwise calculate and set the new position of the chaser
            let xDiff = leadKnot.pos.x - chaseKnot.pos.x;
            let yDiff = leadKnot.pos.y - chaseKnot.pos.y;

            // The combined effect of running these 4 adjustments (including 
            // doing nothing to the x/y pos if the diff is already 0) will
            // result in the correct movement of the chase knot.
            if(yDiff <= -1) chaseKnot.pos.y--;
            if(yDiff >=  1) chaseKnot.pos.y++;
            if(xDiff <= -1) chaseKnot.pos.x--;
            if(xDiff >=  1) chaseKnot.pos.x++;

        }

        return chaseKnot.pos;

    }


    /**
     * Determines whether two knots are "touching" or "overlapping 
     * per the puzzle definition
     * 
     * @param   {Knot}     knot1  An instance of Knot
     * @param   {Knot}     knot2 
     * @returns {Boolean}         `true` if the two knots are 0 or 
     *                            1 hops apart
     */
    isTouching(knot1, knot2) {

        let xDiff = Math.abs(knot1.pos.x - knot2.pos.x);
        let yDiff = Math.abs(knot1.pos.y - knot2.pos.y);

        if( 
            (xDiff === 0 && yDiff <=  1) || 
            (yDiff === 0 && xDiff <=  1) || 
            (xDiff === 1 && yDiff === 1) 
        ) {
            return true;
        } else {
            return false;
        }

    }

}


/**
 * Models a Knot. 
 * 🪢 really needed in the end...
 */
class Knot {
    constructor(x, y) {
        this.pos = { x: x, y: y };
    }
}


module.exports = {
    Rope
}