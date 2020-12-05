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

// Tar in char[7]-[9] -> Returnerar Column som int
function getColumn(charArray) {
  return getSeat(charArray, 'L', 'R', 7);
  //   let lowerLimit = 0;
  //   let upperLimit = 7;

  //   for (let index = 0; index < charArray.length; index++) {
  //     const character = charArray[index];
  //     const toDivide = upperLimit + lowerLimit;

  //     if (character === 'L') {
  //       upperLimit = Math.floor(toDivide / 2);
  //     } else if (character === 'R') {
  //       lowerLimit = Math.round(toDivide / 2);
  //     }

  //     if (index === charArray.length - 1) {
  //       const returnChar = character == 'R' ? upperLimit : lowerLimit;
  //       return returnChar;
  //       return character === 'L' ? lowerLimit : upperLimit;
  //     }
  //   }
}

splitted.forEach((pass) => console.log(getSeatID(pass)));

// let highest = 0;
// splitted.forEach((element) => {
//   const seatVal = getSeatID(element);
//   if (seatVal >= highest) {
//     highest = seatVal;
//   }
// });
// console.log(highest);
