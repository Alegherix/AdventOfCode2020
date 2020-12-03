const fs = require('fs');

const text = fs.readFileSync('./inputMap.txt', 'utf8');
const textArr = text.split('\n');

function findTrees(inputArray) {
  const charArray = [];
  const rowLength = 30;
  const step = 1;
  let multiplier = 1; // used instead of index since we need to wrap
  let remainder = 0;

  for (i = 2; i < inputArray.length; i += 2) {
    // Gå igenom ny rad för varje iteration
    const row = inputArray[i];
    let indexToLookup = remainder + step * multiplier;

    // Måste wrappa runt och hitta remainder
    // Ta bort 1 eftersom 0 based arrayes
    if (indexToLookup > rowLength) {
      console.log('Should wrap');

      remainder = indexToLookup - rowLength - 1;
      multiplier = 0;
      indexToLookup = remainder + step * multiplier;
    }

    console.log('Index to lookup: ', indexToLookup);
    console.log('Character:', row.charAt(indexToLookup));
    console.log(row);

    // Increment multiplier
    multiplier++;

    charArray.push(row.charAt(indexToLookup));
  }
  return charArray.filter((char) => char === '#').length;
}
console.log(findTrees(textArr));
