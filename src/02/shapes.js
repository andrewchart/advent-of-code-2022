/**
 * Create a generic shape object
 * @param  {String} id  Identifier to determine what type of shape
 *                      to create.
 */
function Shape(id) {

    this.name = '';
    this.score = 0;
    this.beatsShapes = [];
    this.beatenByShapes = [];

    this.isBeatenBy = (oppositionShape) => {
        if(this.beatenByShapes.includes(oppositionShape.name)) return true;
        return false;
    }

    switch(id) {
        case 'A':
        case 'X': 
        case 'rock':
            this.name = 'rock';
            this.score = 1;
            this.beatsShapes = ['scissors'];
            this.beatenByShapes = ['paper'];
            break;

        case 'B':
        case 'Y': 
        case 'paper':
            this.name = 'paper';
            this.score = 2;
            this.beatsShapes = ['rock'];
            this.beatenByShapes = ['scissors'];
            break;

        case 'C':
        case 'Z': 
        case 'scissors':
            this.name = 'scissors';
            this.score = 3;
            this.beatsShapes = ['paper'];
            this.beatenByShapes = ['rock'];
            break;
    }
}

module.exports = {
    Shape
}
