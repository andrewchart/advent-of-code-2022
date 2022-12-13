class Rope {

    constructor(length) {
        this.headPos = { x: 0, y: 0 };
        this.tailPos = { x: 0, y: 0 };
        this.length = parseInt(length);
    }

    /**
     * Move the head one step in the given direction
     * and reposition the tail accordingly.
     * @param   {String} direction L|R|U|D
     * @returns {Object}           New head position
     */
    moveHead(direction) {

        switch(direction) {
            case 'L':
                this.headPos.x--;
                break;

            case 'R':
                this.headPos.x++;
                break;

            case 'U':
                this.headPos.y++;
                break;

            case 'D':
                this.headPos.y--;
                break;
        }

        this.moveTail(direction);

        return this.headPos;

    }

    /**
     * Moves the tail relationally to the head
     * @param   {String} directionOfTravel L|R|U|D
     * @returns {Object}                   New tail position
     */
    moveTail(directionOfTravel) {

        // If the rope isn't taut yet, the tail stays where it is
        // This also covers the scenario where the head and tail
        // overlap.
        if(!this.isTaut()) return this.tailPos;

        // Otherwise the tail moves in relation to the head
        switch(direction) {

            // If the head has gone right, the tail will be to the left of it 
            // (tx < hx). We determined the rope was taut, so the tail will be
            // (len) steps away from the head. 

            // Because diagonal differences (hx <> tx && hy <> ty) result in 
            // the tail following into the same row (for left/right movements)
            // or the same column (for up/down movements), we update the tail
            // to be in the same row as the head, in the case of an L or an R.
            case 'L':
                this.tailPos.x = this.headPos.x + this.length;
                this.tailPos.y = this.headPos.y;
                break;

            case 'R':
                this.tailPos.x = this.headPos.x - this.length;
                this.tailPos.y = this.headPos.y;
                break;

            case 'U':
                this.tailPos.x = this.headPos.x;
                this.tailPos.y = this.headPos.y - this.length;
                break;

            case 'D':
                this.tailPos.x = this.headPos.x;
                this.tailPos.y = this.headPos.y + this.length;
                break;
        }

        return this.tailPos;

    }

    /**
     * I anticipate that part 2 might involve lengthening the rope! 😂
     * This function returns true if the latest head position infers
     * that the tail has to move. 
     * 
     * Examples below.
     * 
     *   len=1       len=1       len=2       len=2       len=2
     * .........   .........   .........   .....T...   .........
     * .........   .........   ......T..   .........   .........
     * ...T.....   ......T..   .........   .........   .........
     * ...H.....   ....H....   ....H....   ....H....   ....HT...
     * .........   .........   .........   .........   .........
     *  (false)      (true)     (false)     (true)      (false)
     * 
     * @returns {Boolean}
     */
    isTaut() {

        // If the x or y co-ordinate or both of the tail is a 
        // distance from the head of > length of the rope, the
        // rope is taut and the tail must move to follow the head.
        if(
            Math.abs(this.headPos.x - this.tailPos.x) > this.length ||
            Math.abs(this.headPos.y - this.tailPos.y) > this.length
        ) {
            return true;
        } else {
            return false;
        }

    }

}

module.exports = {
    Rope
}