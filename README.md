# Ruff Application

## LCD 模块的坑

官方的FAQ以及开箱单里给出的model是 LCD1602-PCF8574-HD44780 。
但是我收到的货，lcd模块的型号是8574A，所以，需要在添加设备的时候用 LCD1602-PCF8574A-HD44780 这个model。

## LED 模块的坑

生成的layout图纸有错误。 模块上的GND应该连接板子上的GND。