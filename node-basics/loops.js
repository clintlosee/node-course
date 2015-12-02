var i = 0;
var countLimit = 8;

// while (i < countLimit) {
//     console.log('While: ' + i);
//     i++;
// }
//
// for (i = 0; i < countLimit; i++) {
//     console.log('For: ' + i);
// }


function countDownFor(start, stop) {
    if (start >= stop) {
        for (start; start >= stop; start--) {
            console.log('For Countdown: ' + start);
        }
    } else {
        console.log('Please check your numbers.');
    }
}

function countDownWhile(start, stop) {
    if (start >= stop) {
        while (start >= stop) {
            console.log('While Countdown: ' + start);
            start--;
        }
    } else {
        console.log('Please check your numbers.');
    }
}

countDownFor(13, 2);
countDownWhile(10, 2);
