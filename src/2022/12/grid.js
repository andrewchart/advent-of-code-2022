class Grid {

    constructor(input) {

        let rows = input.split("\n");

        this.maxCol = rows[0].length - 1;
        this.maxRow = rows.length - 1;
        this.positions = [];
        this.paths = [];
        this.start = null;
        this.end = null;

        // Construct the grid in memory
        rows.forEach((row, index) => {
            for(let x = 0; x < row.length; x++) {
                
                let y = index;
                let letter = row.charAt(x);

                if(letter === 'S') {
                    this.start = { x, y };
                    letter = 'a';
                } else if(letter === 'E') {
                    this.end = { x, y };
                    letter = 'z';
                }

                let height = this.getValue(letter);

                this.positions.push({ x, y, height });
            }
        });

        this.current = this.start;

    }

    getValue(letter) {
        const ALPHABET = [..."abcdefghijklmnopqrstuvwxyz"];
        return ALPHABET.indexOf(letter) + 1;
    }
    
    getHeightAtPosition(position) {

        //console.log('ghap', position);

        let h = this.positions.find(element => {
            return (
                element.x === position.x && 
                element.y === position.y
            );
        }).height;
    
        return h;
    }

    getPossibleMoves(path) {
        
        let point;
        
        // If we're just starting, work out the possible moves from the start point
        if(!path) { 
            point = this.start;
        } else {
            point = path.points[path.points.length - 1];
        }

        let possibleMoves = [
            { x: point.x, y: point.y + 1 }, // North
            { x: point.x, y: point.y - 1 }, // South
            { x: point.x + 1, y: point.y }, // East
            { x: point.x - 1, y: point.y }  // West
        ];

        // Eliminate moves
        for(let i = 0; i < possibleMoves.length; i++) {

            let move = possibleMoves[i];

            // Move would be out of bouncd
            if(move.x < 0 || move.x > this.maxCol) {
                delete possibleMoves[i];
                continue;
            }

            if(move.y < 0 || move.y > this.maxRow) {
                delete possibleMoves[i];
                continue;
            }

            // We can only go up one step at a time
            if(
                this.getHeightAtPosition(move) - 
                this.getHeightAtPosition(point) > 1
            ) {
                delete possibleMoves[i];
                continue;
            }

            // We don't want to retread any previous points on the path
            if(path) {

                let matchingPointsAlreadyInPath = path.points
                    .find(element => {
                        return (
                            element.x === move.x && 
                            element.y === move.y
                        );
                    });

                if(typeof matchingPointsAlreadyInPath !== "undefined") {
                    delete possibleMoves[i];
                    continue;
                }

            }

        };

        // Condense the array to truthy values only
        // to get rid of the empties.
        return possibleMoves.filter(el => el);

    }
    
    getAllPaths() {
        // Create initial paths from the start point
        if(this.paths.length === 0) {
            this.paths.push(new Path(this.start));
        }

        this.paths.forEach((path) => {

            let possibleMoves = this.getPossibleMoves(path);

            // When there are no more possible moves, finish the path
            if(possibleMoves.length === 0) {
                path.finished = true;
                return;
            }

            // Otherwise, when there are >= 1 possible moves...

            // When we have more than one path: branch.
            // We copy the original path to as many new ones
            // as needed to cover all possible moves.
            // N.B. the iterator starts on 1 because we want
            // to create new paths for the 2nd, 3rd etc... 
            // move options.
            for(let i = 1; i < possibleMoves.length; i++) {
                let newPath = new Path();
                newPath.points = Object.assign([], path.points);
                newPath.points.push(possibleMoves[i]);
                this.paths.push(newPath);

                if( 
                    possibleMoves[i].x === this.end.x &&
                    possibleMoves[i].y === this.end.y 
                ) {
                    newPath.goal = true;
                    newPath.finished = true;
                }
            }

            // ... But we're always appending the first 
            // possible move to the original (1st) path.
            path.points.push(possibleMoves[0]);

            if( 
                possibleMoves[0].x === this.end.x &&
                possibleMoves[0].y === this.end.y 
            ) {
                path.goal = true;
                path.finished = true;
            }

        });

        if(this.allPathsFinished()) {
            return; 
        } else {
            // Recurse
            this.getAllPaths();
        }
    }

    allPathsFinished() {
        let firstUnfinishedPath = this.paths.find((path) => { 
            return path.finished === false;
        });

        if(typeof firstUnfinishedPath === "undefined") {
            return true;
        }

        return false;
    }

}

class Path {
    
    constructor(start = null) {
        this.points = [];
        this.finished = false;
        this.goal = false;

        if(start) {
            this.points.push(start);
        }
    }

    getNumberOfSteps() {
        // Minus 1 because the first point is not a step
        return this.points.length - 1;
    }

}

module.exports = {
    Grid
}