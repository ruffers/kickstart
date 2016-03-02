'use strict';

var intv;

$.ready(function(error) {
    if (error) {
        console.log(error);
        return;
    }
    var flag = false;
    // console.log($('button'), $('lcd'));
    $('button')
        .on('push', function() {
            intv = setInterval(function() {
                if (flag) {
                    $('led-r').turnOff();
                    $('led-b').turnOn();
                    console.log('blue on');
                } else {
                    $('led-r').turnOn();
                    $('led-b').turnOff();
                    console.log('red on')
                }
                flag = !flag;
            }, 500)

        })
        .on('release', function() {
            clearInterval(intv);
            $('led-r').turnOff();
            // $('led-g').turnOff();
            $('led-b').turnOff();

        });
    $('lcd').turnOn();
    $('lcd').print('hello world');
});

$.end(function() {
    $('lcd').turnOff();
    clearInterval(intv);
    $('led-r').turnOff();
    // $('led-g').turnOff();
    $('led-b').turnOff();
});
