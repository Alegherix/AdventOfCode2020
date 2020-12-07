class Bag {
  bagName = ''; // Current bag name, may be unnecessary
  searchArray = []; // List of every Bag taken from reading bags.txt
  nodes = []; // Array of object containing all nodes to search
  searchRow = '';

  constructor(bagName = '', searchArray) {
    this.searchArray = searchArray;
    this.searchRow = searchArray.filter((row) => row.startsWith(bagName))[0];

    const regExp = new RegExp('(\\d\\s)?(\\w+\\s\\w+ bag)');
    const elementsToRemove = ['s contain ', ', ', 's, ', 's.', '.'];

    const bagsInside = this.searchRow
      .split(regExp)
      .filter(Boolean)
      .filter((elem) => !elementsToRemove.includes(elem))
      .map((elem) => elem.trim());

    // Sätter bagnamnet till första elementet
    this.bagName = bagsInside.shift();

    // Skapar en Array över objekt över quantity : Bag, likt en hashmap
    let bagObject = {};
    for (let index = 0; index < bagsInside.length; index++) {
      const element = bagsInside[index];
      if (index % 2 === 0) {
        bagObject.quantity = element;
      } else {
        bagObject.name = element;
        this.nodes.push(bagObject);
        bagObject = new Object();
      }
    }
  }

  // För varje node, calla getValue På alla noder
  // Om vi är ett leaf och den inte innehåller några bags returnera 1, annars
  // Multiplicera antalet väskor med bladet och returnera
  getValue() {
    if (this.nodes.length === 0) return 1;
    let count = 1;
    this.nodes.forEach((node) => {
      const { quantity, name } = node;
      count += parseInt(quantity) * new Bag(name, this.searchArray).getValue();
      console.log('Current count', count);
    });
    return count;
  }
}

module.exports = Bag;
