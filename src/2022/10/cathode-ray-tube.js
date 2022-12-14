const lineReader = require('line-reader');

const CPU = require('./cpu.js').CPU;
const CMD = require('./cpu.js').CMD;

(() => {
   
    const INPUT_DATA_PATH = './src/2022/10/input.txt';

    let cpu = new CPU();
    
    //Iterate through the whole input file, parsing the input
    lineReader.eachLine(INPUT_DATA_PATH, function(line, last) {

        [cmdName, value] = line.split(' ');

        // Queue up all the commands
        cpu.cmdQueue.push( new CMD(cmdName, parseInt(value)) );
        
        // On the last run, deliver the answers
        if(last) {

            // Part 1: Get signal strength during these cycles
            let readDuring = [20, 60, 100, 140, 180, 220];
            let sumReadings = 0;

            // Cycle the CPU until all the commands have been processed
            while(cpu.cmdQueue.length > 0) {

                if(readDuring.includes(cpu.cycle)) {
                    sumReadings += cpu.getSignalStrength();
                }

                cpu.next();
            }
            
            console.log('The answer to Part One is:', sumReadings);
            return;

        }

    });

})();
