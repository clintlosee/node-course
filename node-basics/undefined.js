function greetUser(name) {
    if (typeof name === 'undefined') {
        console.log('hello world');
    } else {
        console.log('Hello ' + name + '!');
    }
}

greetUser('John');
greetUser();
