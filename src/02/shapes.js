/**
 * Create a generic shape object
 * @param  {String} id  Identifier to determine what type of shape
 *                      to create.
 */
function Shape(id) {

    this.name = '';
    this.score = 0;
    this.beatsShapes = [];

    this.beats = (oppositionShape) => {
        if(this.beatsShapes.includes(oppositionShape.name)) return true;
        return false;
    }

    switch(id) {
        case 'A':
        case 'X': 
            this.name = 'rock';
            this.score = 1;
            this.beatsShapes = ['scissors']
            break;

        case 'B':
        case 'Y': 
            this.name = 'paper';
            this.score = 2;
            this.beatsShapes = ['rock'];
            break;

        case 'C':
        case 'Z': 
            this.name = 'scissors';
            this.score = 3;
            this.beatsShapes = ['paper'];
            break;
    }
}

module.exports = {
    Shape
}
