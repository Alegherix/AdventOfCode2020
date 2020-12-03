const fs = require('fs');

const text = fs.readFileSync('./passwordlist.txt', 'utf8');
const textArr = text.split('\n');
const valid = textArr
  .map((entry) => validPasswordSecond(entry))
  .filter((entry) => entry == true);

function validPassword(password) {
  let re = new RegExp('(\\d+)(-)(\\d+) (\\w)(\\:) (\\w+)');
  const executed = password.match(re);
  const [_, lowerLimit, __, upperLimit, key, ___, searchString] = executed;
  const occurence = searchString.split(key).length - 1;
  return occurence >= lowerLimit && occurence <= upperLimit;
}

function validPasswordSecond(password) {
  let re = new RegExp('(\\d+)(-)(\\d+) (\\w)(\\:) (\\w+)');
  const executed = password.match(re);
  const [_, firstIndex, __, secondIndex, key, ___, searchString] = executed;

  const validFirstIndex = parseInt(firstIndex) - 1;
  const validSecondIndex = parseInt(secondIndex) - 1;

  const validFirstPass = searchString.charAt(validFirstIndex) === key;
  const validSecondPass = searchString.charAt(validSecondIndex) === key;
  return (
    (validFirstPass && !validSecondPass) || (!validFirstPass && validSecondPass)
  );
}

// validPasswordSecond(textArr[0]);

console.log(valid.length);
