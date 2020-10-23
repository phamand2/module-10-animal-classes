const fs = require('fs');
const Animal = require('./Animal');

const contents = fs.readFileSync(process.argv[2], 'utf8');

let data = contents.split('\n');

//! remove first and last lines
// option 1 - shift and pop
data.shift() // remove first value
data.pop() // remove last value

// option 2 - slice
// data = data.slice(1, -1);

// option 3 - loop but skip 0 and last index
// for (let i = 1; i < data.length - 1; i++) {
//   const element = data[i];
// }

//! split into columns via the comma
// option 1 - nested for loops
// for (let i = 0; i < data.length; i++) {
//   const row = data[i];
//   const values = row.split(',');
//   // remove the double-quotes
//   for (let j = 0; j < values.length; j++) {
//     values[j] = values[j].slice(1, -1);
//   }
//   data[i] = values;
// }

// option 2 - map
data = data.map((elem) => {
  // option 1 - remove 1st * last ", and then split on comma
  return elem.slice(1, -1).split('","');

  // option 2 - replace all " and split on comma
  // return elem.replace(/"/g, '').split(',');
})

//! Create Animals from data
// // option 1 - loop and push Animals into an array
// const animals = []
// for (let i = 0; i < data.length; i++) {
//   const row = data[i];
//   animals.push(new Animal(row[0], row[1], row[2]));
// }

// option 2 - map over data
const animals = data.map((row) => {
  return new Animal(row[0], row[1], row[2]);
})

//! Find most frequent group 
// create a new object to store the groups of animals
const groupedAnimals = {};
// for each animal in our list
animals.forEach((animal) => {
  // if there is no group (array with a key) for the species we are currently working with
  if (!groupedAnimals[animal.species]) {
    // create a new empty array
    groupedAnimals[animal.species] = [];
  }
  // then push the animal we are working with into the appropriate group
  groupedAnimals[animal.species].push(animal);
})

// get all the species that are in the data
const species = Object.keys(groupedAnimals);

// sort the species by whichever group has the most items
species.sort((a,b) => {
  return groupedAnimals[a].length < groupedAnimals[b].length ? 1 : -1;
})

// get the most frequent group from the groups object by the first species
const mostFreqGroup = groupedAnimals[species[0]];

//! Find oldest of most frequent group
// sort the animals by comparing their birthdates
mostFreqGroup.sort((a, b) => {
  if (a.birthdate === b.birthdate) {
    return 0;
  } else if (a.birthdate < b.birthdate) {
    return -1;
  } else {
    return 1;
  }
})
// oldest is now at the front of the most frequent group array
const oldest = mostFreqGroup[0];

//! Make oldest speak
oldest.speak();