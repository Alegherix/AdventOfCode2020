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

    character === charOne
      ? (upperLimit = Math.floor(toDivide / 2))
      : (lowerLimit = Math.round(toDivide / 2));

    if (index === charArray.length - 1) {
      return character == charOne ? lowerLimit : upperLimit;
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

function getVal(mathCallback) {
  const seats = splitted.map((seat) => getSeatID(seat));
  return mathCallback(...seats);
}

function getHighestVal() {
  return getVal(Math.max);
}

// Utility to get lowest val
function getLowestVal() {
  return getVal(Math.min);
}

// Utility to create array of all available seats,
// use this to filter out later
function getAllSeats() {
  const allIndexes = [...Array(getHighestVal()).keys()].map((i) => i + 1);
  return allIndexes.splice(getLowestVal() - 1, getHighestVal());
}

function getMySpot() {
  const takenSeats = splitted.map((seat) => getSeatID(seat));
  const mySpot = getAllSeats().filter((seat) => !takenSeats.includes(seat));
  console.log(mySpot);
}

console.log(getHighestVal());
