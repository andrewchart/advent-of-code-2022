/**
 * Model a forest full of trees
 */
class Forest {
    constructor(input) {
        this.rows = input.split("\n");
        this.numRows = this.rows.length;
        this.numCols = this.rows[0].length;
        this.treeGrid = [];

        this.initForest();
    }

    /**
     * Populates the tree grid array with Tree objects
     * exhibiting a height, an X-Y co-ordinate within 
     * the grid.
     * 
     * When we create a tree, that tree knows the size 
     * of the grid, and gets amethod which can take to 
     * other trees in the grid which, if I was doing 
     * this again, I would perhaps try to achieve 
     * differently, rather than binding the forest 
     * to every tree!!
     */
    initForest() {
        this.rows.forEach((treeRow, i) => {
            for(let j = 0; j < treeRow.length; j++) {
                this.treeGrid.push(
                    new Tree(
                        this.rows[i].charAt(j), // Height
                        j,                      // X co-ord
                        i,                      // Y co-ord
                        this.numCols - 1,       // Index of the last col of the forest
                        this.numRows - 1,       // Index of the last row of the forest
                        this.getTree.bind(this) // Tree can get another tree from
                                                // the same forest.
                    )
                );
            }
        });
    }

    /**
     * Gets a Tree based on its grid position
     * @param   {Integer} x Zero-indexed x co-ordinate (left to right)
     * @param   {Integer} y Zero-indexed y co-ordinate (top to bottom)
     * @returns {Tree}      Instance of a Tree at the grid position or
     *                      undefined on failure.
     */
    getTree(x, y) {
        x = parseInt(x);
        y = parseInt(y);

        return this.treeGrid
                .filter(tree => tree.x === x)
                .find(tree => tree.y === y);
    }

}

/**
 * Model an individual tree within the forest
 */
class Tree {

    constructor(height, x, y, maxCol, maxRow, getTree) {
        this.height = parseInt(height);
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.maxCol = parseInt(maxCol);
        this.maxRow = parseInt(maxRow);
        this.getTree = getTree;
        
        // Determines direction/s the tree is visible from when
        // standing outside the forest.
        this.visible = {
            north: undefined,
            south: undefined,
            east:  undefined,
            west:  undefined
        }
    }


    /**
     * Calculate whether this tree is visible within the current grid. 
     * @returns {Boolean} `true` => the tree is visible from one or 
     *                    more directions.
     */
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

    // Tree is visible from the north...
    visibleNorth() {
        let vn;

        // If it's on the grid edge
        if(this.y === 0) {
            vn = true;
        } 
        
        // Or there are no equal or taller trees in front. Compare top down.
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

        if(this.y === this.maxRow) {
            vs = true;
        }

        // Compare bottom up
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

        if(this.x === this.maxCol) {
            ve = true;
        }

        // Compare right to left
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

        if(this.x === 0) {
            vw = true;
        }

        // Compare left to right
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