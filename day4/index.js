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
      passport += elem + ' ';
    } else {
      passports.push(passport);
      passport = '';
    }
  });
  return passports;
}

function isValidPassport(passport) {
  //   const byrExist = hasMatch('byr', passport);
  //   const iyrExist = hasMatch('iyr', passport);
  //   const eyrExist = hasMatch('eyr', passport);
  //   const hgtExist = hasMatch('hgt', passport);
  //   const hclExist = hasMatch('hcl', passport);
  //   const eclExist = hasMatch('ecl', passport);
  //   const pidExist = hasMatch('pid', passport);
  const cidExist = hasMatch('cid', passport);

  const validBirth = validBirthYear(passport, '(byr:)(\\d+)');
  const validIssue = validIssueYear(passport, '(iyr:)(\\d+)');
  const validExp = validExpiration(passport, '(eyr:)(\\d+)');
  const validHgt = validHeight(passport, '(hgt:)(\\d+)(cm|in)');
  const validHcl = validHair(passport, '(hcl:#)([a-f0-9]{6})');
  const validEcl = validEye(
    passport,
    '(ecl:)(amb|blu|brn|gry|grn|hzl|oth)(\\S)?'
  );
  const validPid = validPersonalID(passport, '(pid:)(\\d{9}(\\S)?)');

  const validCase =
    validBirth &&
    validIssue &&
    validExp &&
    validHgt &&
    validHcl &&
    validEcl &&
    validPid;

  console.log(passport);
  console.log('Byr: ', validBirth);
  console.log('iyr: ', validIssue);
  console.log('eyr: ', validExp);
  console.log('hgt: ', validHgt);
  console.log('hcl: ', validHcl);
  console.log('ecl: ', validEcl);
  console.log('Pid: ', validPid);
  console.log('Cid:', cidExist);
  console.log('Verdict: ', validCase);
  console.log('\n\n\n');

  return validCase;
}

function hasMatch(regExpString, passport) {
  const exp = new RegExp(regExpString);
  return exp.test(passport);
}

// Utility for confirming higher and lower
function validYear(passport, regExp, lowerLimit, upperLimit) {
  const exp = new RegExp(regExp);
  const match = passport.match(exp);
  if (!match) return false;
  const yearValue = match !== null ? parseInt(match[2]) : 0;
  return yearValue >= lowerLimit && yearValue <= upperLimit;
}

function validBirthYear(passport, regExp) {
  return validYear(passport, regExp, 1920, 2002);
}

function validIssueYear(passport, regExp) {
  return validYear(passport, regExp, 2010, 2020);
}

function validExpiration(passport, regExp) {
  return validYear(passport, regExp, 2020, 2030);
}

function validHeight(passport, regExp) {
  const exp = new RegExp(regExp);
  const match = passport.match(exp);
  if (!match) return false;
  const heightVal = match[2] !== null ? parseInt(match[2]) : 0;
  const unit = match[3] !== null ? match[3] : 'nada';

  if (heightVal && unit) {
    if (unit === 'cm') {
      return heightVal >= 150 && heightVal <= 193;
    } else if (unit === 'in') {
      return heightVal >= 59 && heightVal <= 76;
    } else {
      return false;
    }
  }
  return false;
}

function validHair(passport, regExp) {
  const exp = new RegExp(regExp);
  const match = passport.match(exp);
  if (!match) return false;
  const color = match[2];
  return !!color;
}

function validEye(passport, regExp) {
  const exp = new RegExp(regExp);
  const match = passport.match(exp);
  if (!match) return false;
  if (match[3] !== null && match[3] === undefined) {
    return true;
  }
  return false;
}

function validPersonalID(passport, regExp) {
  const exp = new RegExp(regExp);
  const match = passport.match(exp);
  if (!match) return false;
  if (match[3] !== null && match[3] === undefined) {
    return true;
  }
  return false;
}

const validPasswordSecond = getPassports().filter(
  (p) => isValidPassport(p) === true
).length;
console.log(validPasswordSecond);
