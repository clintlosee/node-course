var weather = require('./weather');
var location = require('./location');

var argv = require('yargs')
    .option('location', {
        alias: 'l',
        demand: false,
        description: 'Location to fetch weather for.',
        type: 'string'
    })
    .help('help')
    .argv;

if (typeof argv.l === 'string' && argv.l.length > 0) {
    console.log('Location was provided');
    // OLD USES CALLBACKS
    // weather(argv.l, function(currenWeather) {
    //     console.log(currenWeather);
    // });

    weather(argv.l).then(function(currentWeather) {
        console.log(currentWeather);
    }).catch(function(error) {
        console.log(error);
    });nsta
} else {
    console.log('Location was not provided');
    // OLD USES CALLBACKS
    // location(function(location) {
    //     if (location) {
    //         weather(location.city, function(currenWeather) {
    //             console.log(currenWeather);
    //         });
    //     } else {
    //         console.log('Unable to guess location');
    //     }
    // });

    location().then(function(location) {
        return weather(location.city);
    }).then(function(currentWeather) {
        console.log(currentWeather);
    }).catch(function(error) {
        console.log(error);
    });
}
