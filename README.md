# Ruff Application

## LCD 模块的坑

官方的FAQ以及开箱单里给出的model是 LCD1602-PCF8574-HD44780 。
但是我收到的货，lcd模块的型号是8574A，所以，需要在添加设备的时候用 LCD1602-PCF8574A-HD44780 这个model。

## LED 模块的坑

生成的layout图纸有错误。 模块上的GND应该连接板子上的GND。

## 火焰传感器模块的坑

火灭的事件是`none`。

# server的用法
## 端口的配置
在src/config.js中，配置port值。
程序启动后，LCD屏幕上会显示当前ruff的ip地址，方便后续的连接。
## 命令的测试
nc <ruff ip> port
$cmd:hi  -- LCD上会打印出`hi`
close    -- 关闭连接