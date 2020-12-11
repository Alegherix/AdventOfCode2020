const fs = require('fs');

const text = fs.readFileSync('./input.txt', 'utf8');
const splitted = text.split('\n');

let currentChairState = [...splitted];
let x = 0;
while (true) {
  let newSeatArray = [];
  for (let index = 0; index < currentChairState.length; index++) {
    const newRow = getNewRow(currentChairState, index);
    newSeatArray.push(newRow);
  }
  // No changes have been made to seats, so break,
  if (JSON.stringify(currentChairState) === JSON.stringify(newSeatArray)) {
    break;
  }

  // Updates the array at the end of loop
  currentChairState = newSeatArray;
}

function getNewRow(array, currentRowIndex) {
  let newRow = '';
  const rowCharacters = array[currentRowIndex].split('');
  rowCharacters.forEach((elem, elemIndex) => {
    const takenAdjacent = inspectSeats(array, currentRowIndex, elemIndex);

    switch (elem) {
      case '.':
        newRow += '.';
        break;
      case '#':
        takenAdjacent >= 4 ? (newRow += 'L') : (newRow += '#');
        break;
      case 'L':
        takenAdjacent === 0 ? (newRow += '#') : (newRow += 'L');
        break;
    }
  });
  return newRow;
}

function inspectSeats(array, currentRowIndex, currentElemIndex) {
  let prevLeft, prev, prevRight, nextLeft, next, nextRight;
  // Check Horisontal seats
  const left = array[currentRowIndex][currentElemIndex - 1];
  const right = array[currentRowIndex][currentElemIndex + 1];

  // Check previous row seats
  if (currentRowIndex > 0) {
    prevLeft = array[currentRowIndex - 1][currentElemIndex - 1];
    prev = array[currentRowIndex - 1][currentElemIndex];
    prevRight = array[currentRowIndex - 1][currentElemIndex + 1];
  }

  // Check next row seats
  if (currentRowIndex + 1 < array.length) {
    nextLeft = array[currentRowIndex + 1][currentElemIndex - 1];
    next = array[currentRowIndex + 1][currentElemIndex];
    nextRight = array[currentRowIndex + 1][currentElemIndex + 1];
  }

  //   console.log('Same row: ', left, right);
  //   console.log('PrevRow', prevLeft, prev, prevRight);
  //   console.log('NextRow', nextLeft, next, nextRight);
  // Returns amount of taken seats
  return [
    left,
    right,
    prevLeft,
    prev,
    prevRight,
    nextLeft,
    next,
    nextRight,
  ].filter((elem) => elem === '#').length;
}

//Answer to first Question
const answer = currentChairState
  .flatMap((elem) => elem.split(''))
  .filter((elem) => elem === '#').length;
console.log(answer);
