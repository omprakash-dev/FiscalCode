const months = {
  1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H",
  7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T"
}

function getVowelsAndConsonants(string) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  return string.split('').reduce((acc, current) => {
    if (vowels.indexOf(current.toLowerCase()) === -1)
      acc.consonants += current;
    else
      acc.vowels += current;

    return acc;

  }, { vowels: '', consonants: '' })
}
function getSurnameCode(surname) {
  const seperatedString = getVowelsAndConsonants(surname);
  const surnameCode = seperatedString.consonants.substr(0, 3) + seperatedString.vowels.substr(0, 3);

  return surnameCode.length === 3 ? surnameCode : (surnameCode.substr(0, 3).padEnd(3, 'X'));
}
function getNameCode(name) {
  const seperatedString = getVowelsAndConsonants(name);
  if (seperatedString.consonants.length === 3)
    return seperatedString.consonants;
  if (seperatedString.consonants.length > 3)
    return seperatedString.consonants.charAt(0) + seperatedString.consonants.substr(2, 2);

  const nameCode = seperatedString.consonants.substr(0, 3) + seperatedString.vowels.substr(0, 3);

  return nameCode.length === 3 ? nameCode : (nameCode.substr(0, 3).padEnd(3, 'X'));
}
function getDateCode(date, gender) {
  const dateArray = date.split('/');

  return dateArray[2].substr(2, 2) + months[`${dateArray[1]}`] + (gender === 'M' ? (dateArray[0]).padStart(2, 0) : Number(dateArray[0]) + 40);
}
function fiscalCode(person) {
  const surnameCode = getSurnameCode(person.surname);
  const nameCode = getNameCode(person.name);
  const dateCode = getDateCode(person.dob, person.gender);
  const code = (surnameCode + nameCode + dateCode).toUpperCase();

  return code;
}