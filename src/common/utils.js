/**
 * Sum an array of numbers
 * @param  {Array} arrToSum The array of numbers to sum
 * @return {Number}         The total when all the array elements 
 *                          are added together
 */
function sumArray(arrToSum) {
  return arrToSum.reduce((total, currentValue) => {
      return total + currentValue;
  }, 0);
}


module.exports = {
  sumArray
}