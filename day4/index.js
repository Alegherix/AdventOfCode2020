const fs = require('fs');

const text = fs.readFileSync('./passports.txt', 'utf8');
const splitted = text.split('\n');

// Used for creating an array of passports
// if empty string or at last element, push to passport array to return
// otherwise concat to tempString
function getPassports() {
  const passports = [];
  let passport = '';
  splitted.forEach((elem) => {
    if (elem) {
      // Removes # attribute since it causes errors
      elem = elem.replace('#', '');
      passport += elem + ' ';
    } else {
      passports.push(passport);
      passport = '';
    }
  });
  return passports;
}

function isValidPassport(passport) {
  const byrExist = hasMatch('byr', passport);
  const iyrExist = hasMatch('iyr', passport);
  const eyrExist = hasMatch('eyr', passport);
  const hgtExist = hasMatch('hgt', passport);
  const hclExist = hasMatch('hcl', passport);
  const eclExist = hasMatch('ecl', passport);
  const pidExist = hasMatch('pid', passport);
  const cidExist = hasMatch('cid', passport);

  const validCase =
    byrExist &&
    iyrExist &&
    eyrExist &&
    hgtExist &&
    hclExist &&
    eclExist &&
    pidExist;

  console.log(passport);
  console.log('Byr: ', byrExist);
  console.log('iyr: ', iyrExist);
  console.log('eyr: ', eyrExist);
  console.log('hgt: ', hgtExist);
  console.log('hcl: ', hclExist);
  console.log('ecl: ', eclExist);
  console.log('Pid: ', pidExist);
  console.log('Cid:', cidExist);
  console.log('Verdict: ', validCase);
  console.log('\n\n\n');

  return validCase;
}

function hasMatch(regExpString, passport) {
  const exp = new RegExp(regExpString);
  return exp.test(passport);
}

const validPassports = getPassports().filter((p) => isValidPassport(p) === true)
  .length;
console.log(validPassports);

// const getInvalidPassports = getPassports().filter(
//   (p) => isValidPassport(p) === false
// );

// getInvalidPassports.forEach((p) => isValidPassport(p));
