var isValid = false;

function toggleBoolean(booleanVar) {
    if (typeof booleanVar === 'boolean') {
        return !booleanVar;
    } else {
        console.log('Warning! This is not a boolean.');
    }
}

var newBool = toggleBoolean('isValid');
console.log(newBool);
