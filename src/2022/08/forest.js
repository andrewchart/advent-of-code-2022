class Forest {
    constructor(input) {
        this.rows = input.split("\n");
        this.numRows = this.rows.length;
        this.numCols = this.rows[0].length;
        this.treeGrid = [];

        this.initForest();
    }

    initForest() {
        this.rows.forEach((treeRow, i) => {
            for(let j = 0; j < treeRow.length; j++) {
                this.treeGrid.push(
                    new Tree(
                        this.rows[i].charAt(j), 
                        j, 
                        i, 
                        this.numCols - 1, // Index of the last col of the forest
                        this.numRows - 1, // Index of the last row of the forest
                        this.getTree.bind(this) // Tree can get another tree from
                                                // the same forest.
                    )
                );
            }
        });
    }

    getTree(x, y) {
        x = parseInt(x);
        y = parseInt(y);

        return this.treeGrid
                .filter(tree => tree.x === x)
                .find(tree => tree.y === y);
    }

}

class Tree {
    
    constructor(height, x, y, maxCol, maxRow, getTree) {
        this.height = parseInt(height);
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.maxCol = parseInt(maxCol);
        this.maxRow = parseInt(maxRow);
        this.getTree = getTree;
        
        this.visible = {
            north: undefined,
            south: undefined,
            east:  undefined,
            west:  undefined
        }
    }


    getCurrentVisibility() {

        this.visibleNorth();
        this.visibleSouth();
        this.visibleEast();
        this.visibleWest();

        return (
            this.visible.north ||
            this.visible.south ||
            this.visible.east  ||
            this.visible.west
        );
    }


    visibleNorth() {
        let vn;

        // Grid edge
        if(this.y === 0) {
            vn = true;
        } 
        
        // Otherwise, compare top down
        else {

            vn = true;

            for(let i = 0; i < this.y; i++) {
                if(this.getTree(this.x, i).height >= this.height) {
                    vn = false;
                    break;
                } 
            }

        }

        return this.visible.north = vn;
    }


    visibleSouth() {
        let vs;

        // Grid edge
        if(this.y === this.maxRow) {
            vs = true;
        }

        // Otherwise, compare bottom up
        else {

            vs = true;

            for(let i = this.maxRow; i > this.y; i--) {
                if(this.getTree(this.x, i).height >= this.height) {
                    vs = false;
                    break;
                } 
            }

        }

        return this.visible.south = vs;
    }


    visibleEast() {
        let ve;

        // Grid edge
        if(this.x === this.maxCol) {
            ve = true;
        }

        // Otherwise, compare right to left
        else {

            ve = true;

            for(let i = this.maxCol; i > this.x; i--) {
                if(this.getTree(i, this.y).height >= this.height) {
                    ve = false;
                    break;
                } 
            }

        }

        return this.visible.east = ve;
    }


    visibleWest() {
        let vw;

        // Grid edge
        if(this.x === 0) {
            vw = true;
        }

        // Otherwise, compare left to right
        else {

            vw = true;

            for(let i = 0; i < this.x; i++) {
                if(this.getTree(i, this.y).height >= this.height) {
                    vw = false;
                    break;
                } 
            }

        }

        return this.visible.west = vw;
    }

}

module.exports = {
    Forest,
    Tree
}