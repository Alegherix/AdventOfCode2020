const fs = require('fs');

const text = fs.readFileSync('./questions.txt', 'utf8');
const splitted = text.split('\n');

//  FIRST QUESTION
function getAllGroups(inputArray) {
  const groups = [];
  let currentAnswer = '';
  inputArray.forEach((elem) => {
    if (elem === '') {
      groups.push(currentAnswer);
      currentAnswer = '';
    } else {
      currentAnswer += elem;
    }
  });
  return groups;
}

function getAnswersForGroup(group) {
  return [...new Set(group.split(''))].length;
}

function getTotalYesCount() {
  const groups = getAllGroups(splitted);
  const answers = groups
    .map((group) => getAnswersForGroup(group))
    .reduce((acc, curr) => acc + curr);
  return answers;
}

//  SECOND QUESTION

function getIntersectionGroups(inputArray) {
  const groups = [];
  let innerArray = [];
  inputArray.forEach((elem) => {
    if (elem === '') {
      groups.push(innerArray);
      innerArray = [];
    } else {
      const elemToAdd = elem.split('');
      innerArray.push(elemToAdd);
    }
  });
  return groups;
}

function getIntersectionLength(group) {
  return group.reduce((a, b) => a.filter((c) => b.includes(c))).length;
}

function getIntersectionYes() {
  const groups = getIntersectionGroups(splitted);
  const answers = groups
    .map((group) => getIntersectionLength(group))
    .reduce((acc, curr) => acc + curr);
  return answers;
}
