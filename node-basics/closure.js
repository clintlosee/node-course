// function greetMaker(name) {
//     function greet() {
//         console.log('Hello ' + name);
//     }
//
//     return greet;
// }
//
// var greetName = greetMaker('Johnny');
//
// greetName();



function createAdder(baseNum) {
    return function (numberToAdd) {
        return baseNum + numberToAdd;
    }
}

var addTen = createAdder(10);
console.log(addTen(2));
console.log(addTen(0));

var addTwo = createAdder(2);
console.log(addTwo(1500));
