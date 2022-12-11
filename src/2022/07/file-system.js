/**
 * Builds a model of the filesystem based on the output of 
 * the fictional terminal (the puzzle input)
 */
class FileSystem {

    constructor(terminalOutput) {
        this.cwd = null;
        this.tree = null;
        this.sep = '/'; /* Root and directory separator */
        this.initTree(terminalOutput);
    }

    /**
     * Creates a directory/file tree within the filesystem model
     * by iterating the lines from a computer terminal output.
     * 
     * @param {String} terminalOutput Full puzzle input as string
     * @returns {Void}
     */
    initTree(terminalOutput) {

        let outputLines = terminalOutput.split("\n");

        outputLines.forEach((line) => {
            if(line.substring(0,1) === '$') {
                this.processCmd(line);
            } else {
                this.initFsObj(line);
            }
        });

        return;
    }

    /**
     * Creates a directory or file object within the tree.
     * 
     * @param {String} fsObj String representing a directory or file 
     *                       to create.
     */
    initFsObj(fsObj) {

        // Array of arguments
        fsObj = fsObj.split(' ');

        switch(fsObj[0]) {
            case 'dir':
                this.cwd.addChild( new Dir(fsObj[1], this.cwd, this.sep) );
                break;

            default:
                this.cwd.addChild( new File(fsObj[1], this.cwd, fsObj[0]) );
                break;
        }

    }

    /**
     * Interprets a command from the terminal output
     * 
     * @param {String} cmd A command to interpret starting with $
     */
    processCmd(cmd) {

        // Break the command string into an array
        cmd = cmd.split(' ');
    
        // Interpret the command      
        switch(cmd[1]) {
            case 'cd':

                // Special case creation of a root node
                if(cmd[2] === this.sep && this.tree === null) {
                    this.tree = new Dir('', this.cwd, this.sep);
                }

                this.changeDir(cmd[2]);
                break;
    
            case 'ls':
                /* Do nothing */
                break;
        }
    
    }

    /**
     * Executes the 'cd' change directory command. This expects
     * a relative path i.e. we will navigate to the given path
     * using the current working directory
     * 
     * @param {String} relativePath Represents the folder to navigate to.
     * @returns {Dir}               The new current working directory 
     *                              (target directory) or void on failure.
     */
    changeDir(relativePath) {

        // Return to root 
        if(relativePath === this.sep) {
            this.cwd = this.tree;
            return;
        }

        let fullPath, targetDir;

        // Traverse upwards
        if(relativePath === '..') {

            // Split the path into breadcrumbs
            let breadcrumbs = this.cwd.path
                .split(this.sep)
                .filter(item => item !== '');

            // Remove the last one. Pop turns a 1 element 
            // array into a string :(
            delete breadcrumbs[breadcrumbs.length - 1];

            // Fetch the parent directory node using its
            // full path
            fullPath = this.sep + breadcrumbs.join(this.sep);
            targetDir = this.getFsObj(fullPath, false, false);
        }

        // Otherwise, navigate downwards (relative to cwd)
        else {

            fullPath = this.cwd.path + relativePath + this.sep;
            targetDir = this.getFsObj(fullPath, true, false);

        }

        // If no object is returned, don't change the cwd
        if(typeof targetDir === 'undefined') {
            console.log('Directory does not exist: ' + fullPath);
            return;
        }

        return this.cwd = targetDir;

    }


    /**
     * Fetches a filesystem directory or file, based on an input path string.
     * 
     * @param {String}      path     The path to the object we want to retrieve
     * @param {Boolean}     relative True if the object should be relative to
     *                               the current working directory. False if 
     *                               we're searching relative to the root.
     * @returns {Dir|File}           A directory or file object, or undefined
     *                               if the path is not matched.
     */
    getFsObj(path, relative = false) {

        // If the path is relative to the cwd, we don't need
        // to traverse the tree
        if(relative) {
            return this.cwd.children.find(child => {
                return child.path === path;
            });
        } 

        // Handle the root case by returning the whole tree
        if(path === this.sep) {
            return this.tree;
        }

        // Otherwise we can traverse the tree from the top
        let currentSearchDir = this.tree; // The dir to search
        let result;                       // Var to hold the found object 
        let breadcrumbs = path            // Split the breadcrumbs into an array
            .split(this.sep)
            .filter(item => item !== '');

        let pathToMatch = currentSearchDir.path;

        // If the original path had a trailing separator, we'll add it to the
        // path on the final search loop.
        const finalTrailingSeparator = path.endsWith(this.sep) ? this.sep : '';

        //loop breadcrumbs
        for(let depth = 0; depth < breadcrumbs.length; depth++) {
            
            // On the final loop we may or may not need to append the final
            // trailing separator to the path (this.sep if final breadcrumb
            // is a directory, empty string if it's a file). On all other 
            // loops we put a sep in the path.
            if(depth === breadcrumbs.length - 1) {
                pathToMatch += breadcrumbs[depth] + finalTrailingSeparator;
            } else {
                pathToMatch += breadcrumbs[depth] + this.sep;
            }

            // Search for an object in the current search directory, matching
            // the path
            result = currentSearchDir.children.find(child => child.path === pathToMatch);

            // If no result, return from the function, resulting in a "not found"
            if(typeof result === 'undefined') return result;

            // Otherwise, crack on with the loop
            currentSearchDir = result;
        }
    
        return result;
        
    }

    /**
     * Get the filesystem tree from the root directory.
     * @returns {Dir} Full filesystem tree
     */
    getTree() { 
        return this.tree; 
    }

}

/**
 * Models a directory containing files and other directories
 */
class Dir {

    constructor(relativePath, cwd, sep) {

        let parentPath = (cwd) ? cwd.path : '';

        this.path = parentPath + relativePath + sep;
        this.children = [];
        this.size = 0;
    }

    getPath() {
        return this.path;
    }

    addChild(node) {
        return this.children.push(node);
    }
    
    calculateSize = () => {
        console.log('calcsize');
    }

} 

/**
 * Models a file with a size property.
 */
class File {

    constructor(relativePath, cwd, size) {
        let parentPath = (cwd) ? cwd.path : '';
        this.path = parentPath + relativePath;
        this.size = parseInt(size);
    }

    getPath() {
        return this.path;
    }
    
} 

module.exports = {
    FileSystem
}