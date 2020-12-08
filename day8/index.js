const fs = require('fs');

const text = fs.readFileSync('./startup.txt', 'utf8');
const splitted = text.split('\n');
const ACC = 'acc';
const NOP = 'nop';
const JMP = 'jmp';

function getAction(searchText) {
  const regExp = new RegExp('(\\w+)\\s(\\+|\\-)(\\w+)');
  const split = searchText.split(regExp);
  return {
    action: split[1],
    direction: split[2],
    amount: parseInt(split[3]),
  };
}

function findNewIndex(action, direction, amount, currentIndex, arrayLength) {
  if (action === ACC || action === NOP) {
    // If at last element, wrap and return 0 index, else return incremented index
    return currentIndex === arrayLength - 1 ? 0 : currentIndex + 1;
  } else {
    if (direction === '+') {
      // Wrappa runt om hoppet > arrayen tillåter
      if (amount + currentIndex > arrayLength - 1) {
        const newIndex = amount + currentIndex - (arrayLength - 1);
        return newIndex;
      }
      return amount + currentIndex;
    } else {
      if (currentIndex - amount < 0) {
        const negativeJump = currentIndex - amount;
        const newIndex = arrayLength - negativeJump;
        return newIndex;
      }
      return currentIndex - amount;
    }
  }
}

function searchActions(inputArray) {
  const actionArray = splitted.map((elem) => getAction(elem));
  const indexArray = [];
  let currentIndex = 0;
  let accumulator = 0;

  for (let index = 0; index < actionArray.length; index++) {
    const elem = actionArray[currentIndex];
    if (indexArray.includes(currentIndex)) break;
    indexArray.push(currentIndex);
    const { action, direction, amount } = elem;

    if (action === ACC) {
      direction === '+' ? (accumulator += amount) : (accumulator -= amount);
    }
    // Updates currentIndex for next iteration
    currentIndex = findNewIndex(
      action,
      direction,
      amount,
      currentIndex,
      actionArray.length
    );
  }
  console.log(accumulator);
}

// PART 2
function searchActionsAndGetObject(actionArray) {
  const indexArray = [];
  let currentIndex = 0;
  let accumulator = 0;
  let infinite = false;

  for (let index = 0; index < actionArray.length; index++) {
    const elem = actionArray[currentIndex];

    if (indexArray.includes(currentIndex)) {
      infinite = true;
      break;
    }
    indexArray.push(currentIndex);
    const { action, direction, amount } = elem;

    if (action === ACC) {
      direction === '+' ? (accumulator += amount) : (accumulator -= amount);
    }
    // Updates currentIndex for next iteration
    currentIndex = findIndexWithoutWrap(
      action,
      direction,
      amount,
      currentIndex,
      actionArray.length
    );

    if (currentIndex === 5000) {
      console.log('Index of 5000');
      infinite = false;
      break;
    }
  }
  return {
    infinite,
    accumulator,
  };
}

function findIndexWithoutWrap(
  action,
  direction,
  amount,
  currentIndex,
  arrayLength
) {
  if (action === ACC || action === NOP) {
    return currentIndex === arrayLength - 1 ? 5000 : currentIndex + 1;
  } else {
    if (direction === '+') {
      if (amount + currentIndex > arrayLength - 1) {
        return 5000;
      }
      return amount + currentIndex;
    } else {
      if (currentIndex - amount < 0) {
        const negativeJump = currentIndex - amount;
        const newIndex = arrayLength - negativeJump;
        return newIndex;
      }
      return currentIndex - amount;
    }
  }
}

// This works, don't touch
function searchAndChangeInput() {
  const actionArray = splitted.map((elem) => getAction(elem));

  for (let index = 0; index < actionArray.length; index++) {
    let newSearchArr = getNewSearchArray([...actionArray], index);
    const searched = searchActionsAndGetObject(newSearchArr);
    const { infinite, accumulator } = searched;
    if (!infinite) {
      console.log('Answer: ', accumulator);
    }
  }
  console.log('Done Looping');
}

// Returns new Array to search with inserted value
function getNewSearchArray(searchArray, indexToChange) {
  const newArray = [...searchArray];
  let { action, direction, amount } = newArray[indexToChange];

  if (action === NOP) {
    action = JMP;
  } else if (action === JMP) {
    action = NOP;
  }
  newArray[indexToChange] = { action, direction, amount };
  return newArray;
}

searchAndChangeInput();
