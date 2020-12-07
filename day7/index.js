const fs = require('fs');
const Bag = require('./Bags');

const text = fs.readFileSync('./bags.txt', 'utf8');
const splitted = text.split('\n');

// Splittar upp innehållet
// Returnerar varje bag som ett enskilt element i en array
function getBagAndContents(bagText) {
  const regExp = new RegExp('(\\w+\\s\\w+ bag)');
  const bagsInside = bagText.split(regExp);
  const returnArray = [];
  console.log(bagsInside);
  for (let index = 0; index < bagsInside.length; index++) {
    if (index % 2 === 1) {
      const foundBag = bagsInside[index];
      returnArray.push(foundBag);
    }
  }
  return returnArray;
}

// Used for bags that contain a shiny or a container of shiny
// Recursivly searches itself and adds itself to array, in the end
// Only pickout uniques.
const arrayOfContainerBags = [];
function getContainers(toSearchFor) {
  for (let index = 0; index < splitted.length; index++) {
    const element = splitted[index];
    if (element.includes(toSearchFor)) {
      const allBagsOfElement = getBagAndContents(element);
      const containerBag = allBagsOfElement[0];
      arrayOfContainerBags.push(containerBag);
      if (containerBag !== toSearchFor) {
        getContainers(containerBag);
      }
    }
  }
  const allBags = [...new Set(arrayOfContainerBags)];
  return allBags;
}

// Part 2

const testBag = new Bag('shiny gold', splitted);
console.log(testBag.getValue() - 1);
