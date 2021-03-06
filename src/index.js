'use strict';
// var os = require('os');
// console.log(os);
var intv;
var server = require('./server');
var config = require('./config');

$.ready(function(error) {
    if (error) {
        console.log(error);
        return;
    }

    // start server
    server.listen(config.port);

    $('lcd').turnOn();
    $('lcd').cursorOff();
    $('lcd').print(getIPAdress());
    // 大按钮
    // 效果：按下时，板载的LED交替发光。抬起时，板载LED熄灭。
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

            $("lcd").print('I love u')
                // $('led').turnOn();
                // console.log($('led').isOn());
        })
        .on('release', function() {
            clearInterval(intv);
            $('led-r').turnOff();
            // $('led-g').turnOff();
            $('led-b').turnOff();
            // $('led').turnOff();
            // console.log($('led').isOn());
            $('lcd').clear();
        });
    // 测试LED和LCD
    // 取消下面注释。效果：每秒随机更换颜色，并且在LCD屏幕上显示出当前的RGB数值。
    // 
    // var r = 0,
    //     g = 0,
    //     b = 0,
    //     max = 255;
    // $('led').turnOn();
    // setInterval(function() {
    //     r = parseInt(Math.random() * max);
    //     g = parseInt(Math.random() * max);
    //     b = parseInt(Math.random() * max);
    //     $('led').setRGB(r, g, b);
    //     $('lcd').clear();
    //     $('lcd').print('R' + r + ' G' + g + ' B' + b);
    // }, 1000);

    // 火焰传感器
    $('flame').on('fire', function() {
        console.log('in flame fire');
    });
    $('flame').on('flameout', function() {
        console.log('in flame flameout');
    });
    $('flame').on('none', function() {
        console.log('火灭了');
    });
    // setInterval(function() {
    //     if ($('flame').isBurning()) {
    //         console.log('fire burning')
    //     }
    // }, 100);
    // 
    // 人体传感器
    // 效果：有人走进时，LED亮红色的灯。人离开时，LED灯灭。
    $('infrared').on('presence', function() {
        console.log('来人了');
        $('led').setRGB(250, 0, 0);
        $('led').turnOn();
    });
    $('infrared').on('absence', function() {
        console.log('人走了');
        $('led').turnOff();
    });
});

$.end(function() {
    $('lcd').turnOff();
    $('led').turnOff();
    clearInterval(intv);
    $('led-r').turnOff();
    // $('led-g').turnOff();
    $('led-b').turnOff();
});

function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    // console.log(interfaces);
    // return 'ip'
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'INET' && alias.ip !== '127.0.0.1' && !alias.internal) {
                return alias.ip;
            }
        }
    }
}
