var person = {
    name: 'Clint',
    age: 35
}
var personJSON = JSON.stringify(person);
console.log(personJSON);
console.log(typeof personJSON);

var personObject = JSON.parse(personJSON);
console.log(personObject.name);

var animal = '{"name": "Dexter"}';

var animalObject = JSON.parse(animal);

animalObject.age = 3

animal = JSON.stringify(animalObject);

console.log(animal);
