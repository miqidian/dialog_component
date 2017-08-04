# dialog_component
弹窗组件的写法、弹窗组件
js 步骤
【1】构造函数
var Dialog = function(config){}
【2】在原型链上添加方法
Dialog.prototype = {}
【3】将方法赋值给window,全局
window.Dialog = Dialog;
