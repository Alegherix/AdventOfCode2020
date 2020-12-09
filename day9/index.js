const fs = require('fs');

const text = fs.readFileSync('./xmas.txt', 'utf8');
const splitted = text.split('\n').map((elem) => parseInt(elem));

function findWrongNumber() {
  const preambleLength = 25;
  const entireArray = splitted;

  for (let index = 0; index < entireArray.length - preambleLength; index++) {
    const currentPossibleFaultyValue = entireArray[preambleLength + index];
    const searchArray = entireArray.slice(index, index + preambleLength);

    const match = findPossibleMatch(searchArray, currentPossibleFaultyValue);
    if (!match) {
      console.log({ currentPossibleFaultyValue });
      break;
    }
  }
}

// Loops over array and looks for 2 numbers that make up valueToFind
function findPossibleMatch(searchArray, valueToFind) {
  let foundMatch = false;
  for (let i = 0; i < searchArray.length; i++) {
    if (foundMatch) {
      break;
    }
    const firstValue = searchArray[i];
    for (let j = 1; j < searchArray.length; j++) {
      const secondValue = searchArray[j];
      if (firstValue + secondValue === valueToFind) {
        foundMatch = true;
        break;
      }
    }
  }
  return foundMatch;
}

// Solution to first question
// findWrongNumber();

// Wrong Number = 1504371145

// PART 2

function loopThroughNumbers() {
  const valueToFind = 1504371145;
  const allNumbers = splitted;
  for (let index = 0; index < allNumbers.length; index++) {
    const { foundSet, foundSetObject } = lookForSerie(
      allNumbers.slice(index),
      valueToFind
    );
    if (foundSet) {
      console.log(foundSetObject);
      const { smallestValue, highestValue } = foundSetObject;
      console.log('Answer: ', smallestValue + highestValue);
      break;
    }
  }
}

function lookForSerie(arrayToSearch, valueToFind) {
  let foundSet = false;
  const initialValue = arrayToSearch[0];
  let seriesValue = initialValue;
  let foundSetObject;

  for (let i = 1; i < arrayToSearch.length; i++) {
    seriesValue += arrayToSearch[i];

    if (seriesValue === valueToFind) {
      const arrayAtIteration = [...arrayToSearch.slice(0, i)];
      foundSet = true;
      foundSetObject = {
        smallestValue: Math.min(...arrayAtIteration),
        highestValue: Math.max(...arrayAtIteration),
      };
      break;
    }
  }
  return { foundSet, foundSetObject };
}

// Answer to second question
loopThroughNumbers();
