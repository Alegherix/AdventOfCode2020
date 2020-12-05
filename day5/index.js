const fs = require('fs');

const text = fs.readFileSync('./boardingpasses.txt', 'utf8');
const splitted = text.split('\n');

function getSeatID(boardingPass) {
  const chars = boardingPass.split('');
  const row = getRow(chars.slice(0, 7));
  const column = getColumn(chars.slice(7, 10));

  return row * 8 + column;
}

function getSeat(charArray, charOne, charTwo, upperLimitVal) {
  let lowerLimit = 0;
  let upperLimit = upperLimitVal;

  for (let index = 0; index < charArray.length; index++) {
    const character = charArray[index];
    const toDivide = upperLimit + lowerLimit;

    if (character === charOne) {
      upperLimit = Math.floor(toDivide / 2);
    } else if (character === charTwo) {
      lowerLimit = Math.round(toDivide / 2);
    }
    if (index === charArray.length - 1) {
      const returnChar = character == charOne ? lowerLimit : upperLimit;
      return returnChar;
    }
  }
}

function getRow(charArray) {
  return getSeat(charArray, 'F', 'B', 127);
}

// Tar in char[7]-[10] -> Returnerar Column som int
function getColumn(charArray) {
  return getSeat(charArray, 'L', 'R', 7);
}

// Call for solution to first
function getHighestVal() {
  let highest = 0;
  splitted.forEach((element) => {
    const seatVal = getSeatID(element);
    if (seatVal >= highest) {
      highest = seatVal;
    }
  });
  console.log(highest);
}
// Utility to get lowest val
function getLowestVal() {
  let lowest = 1000;
  splitted.forEach((elem) => {
    const seatVal = getSeatID(elem);
    if (lowest >= seatVal) {
      lowest = seatVal;
    }
  });
  console.log(lowest);
}

// Utility to create array of all available seats,
// use this to filter out later
function getAllSeats() {
  // HighestVal => 953
  // LowestVal => 45
  const arrayToFilter = [];
  for (let index = 45; index <= 953; index++) {
    arrayToFilter.push(index);
  }
  return arrayToFilter;
}

function getMySpot() {
  const takenSeats = splitted.map((seat) => getSeatID(seat));
  const mySpot = getAllSeats().filter((seat) => !takenSeats.includes(seat));
  console.log(mySpot);
}
