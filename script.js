const fs = require('fs')
const { strict } = require('assert')
fs.readFile('animals.csv', "UTF8", function 
(err, content) {
    let data = content.split("\n")
    data = data.map((row)=> {
        let values = row.split(",")
        values = values.map((value)=> {
            return value.slice(1, -1)
        })
        return values;
    })
    // console.log(data)
    const animals = [];
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        animals.push(new Animal(row[0], row[1], row[2]))
    }
    console.log(animals);
})
function Animal(name, dob, species) {
    this.name = name;
    this.dob = dob;
    this.species = species;
}
const theAnimal = [
    new Animal("sadie", new Date("2017, 03, 01"), "dog"),
    new Animal("birdy", new Date ("2010, 01, 01"), "cat"),
    new Animal("ted", new Date ("2017, 03, 01"), "bird"),
    new Animal("roger", new Date ("2010, 01, 01"), "cat"),
    new Animal("sauce", new Date ("2016, 09, 22"), "dog")
]
Animal.prototype.getAge = function() {
    const day = new Date()
    const birthdate = this.dob
    const actualAge = Math.abs(birthdate.getFullYear() - day.getFullYear())
        return actualAge;
}
// > Nelson, the 3 year old dog, says "Woof!"
Animal.prototype.speak  = function() {
    if (this.species ===  "dog") {
        console.log(`${this.name}, the ${this.getAge()} year old ${this.species} says "woof"`)
    } else if (this.species === "cat") {
        console.log(`${this.name}, the ${this.getAge()} year old ${this.species} says "meow"`)
    } else if (this.species === "bird") {
        console.log(`${this.name}, the ${this.getAge()} year old ${this.species} says "tweet"`)
    }
}
theAnimal.forEach((animal) => {
    animal.speak();
})
theAnimal.forEach((animal) => {
    animal.speak();
})