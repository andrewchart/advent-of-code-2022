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


/**
 * Works out if a number is divisible by a given prime.
 * 
 * @param {Integer} number Int < MAX_SAFE_INTEGER
 * @param {Integer} prime  Int expected to be a prime
 * @returns 
 */
function divisibleByPrime(number, prime) {

  if(number > Number.MAX_SAFE_INTEGER) {
    throw new Error(`Function can't be used on numbers bigger than the max safe int`);
  }

  // Source: https://www.johndcook.com/blog/2021/02/17/divisibility-by-any-prime/

  // Break the number into units and a multiple of 10, divided by 10
  // e.g. 1234 => a:123 and b:4
  let a = Math.floor(number / 10);
  let b = number - (a * 10);

  // Quick returns for 2 and 5
  if(prime === 2) return (b % 2 === 0);
  if(prime === 5) return (b === 5 || b === 0);

  // Break down the prime in a similar way
  let pTens = Math.floor(prime / 10);
  let pUnit = prime - (pTens * 10);

  let k;

  switch(pUnit) {
    case 1: 
      k = Math.floor(prime / 10);
      break;

    case 3: 
      k = Math.floor(7 * prime / 10);
      break;

    case 7:
      k = Math.floor(3 * prime / 10);
      break;

    case 9:
      k = Math.floor(9 * prime / 10);
      break;
  }

  // Recurse until we have a much smaller number
  if(a - k * b > prime) divisibleByPrime(a - k * b, prime);

  // If the modulus of this new number divided by the prime is 0, 
  // the input number was divisible by the prime
  return ((a - k * b) % prime === 0);

}


module.exports = {
  sumArray, 
  divisibleByPrime
}
