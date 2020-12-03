const fs = require('fs');

const text = fs.readFileSync('./numberList.txt', 'utf8');
const textArr = text.split('\n');
const numberArray = textArr.map((n) => parseInt(n));

for (let index = 0; index < numberArray.length; index++) {
  const element = numberArray[index];
  for (let j = index + 1; j < numberArray.length; j++) {
    const secondComparator = numberArray[j];
    for (let k = j + 1; k < numberArray.length; k++) {
      const lastComparator = numberArray[k];

      if (element + secondComparator + lastComparator === 2020) {
        console.log('Element', element);
        console.log('comparator', secondComparator);
        console.log('Second comparator', lastComparator);
        console.log(element * secondComparator * lastComparator);
      }
    }
  }
}
