;(function($){
    var Dialog = function(config){
        this.config = {
            type:'success',
            content:'提示内容',
            delay:2000,
            buttons:[],
            mask:.5,
            width:'auto',
            height:'auto'
        };

        if( $.isPlainObject(config) && config){
            $.extend(true, this.config, config);
        }else{
            this.isconfig = true
        };

        this.body = $('body');
        this.mask_bg = $('<div class="mask_bg">');
        this.win_popbox = $('<div class="win_popbox">');
        this.header = $('<div class="header"></div>');
        this.content = $('<div class="content">提示信息！</div>');
        this.footer = $('<div class="footer">');

        this.createHtml();       
    };

    Dialog.prototype = {
        createHtml:function(){
            var _this_ = this,
                config = this.config,
                body = this.body,
                mask_bg = this.mask_bg,
                win_popbox = this.win_popbox,
                header = this.header,
                content = this.content,
                footer = this.footer;

            if(this.isconfig){
                var header = $('<div class="header loading"></div>');   
                win_popbox.append(header);            
                mask_bg.append(win_popbox);
                body.append(mask_bg);
            }else{
                if( config.type ){
                    header.addClass(config.type);
                    win_popbox.append(header);
                }
                if( config.content ){
                    content.html(config.content);
                    win_popbox.append(content);
                }
                if( config.buttons ){
                    _this_.createButtons(footer,config.buttons);
                    win_popbox.append(footer);
                }
                if( config.width != 'auto'){
                    mask_bg.css({'width':config.width});
                }
                if( config.height != 'auto'){
                    mask_bg.css({'width':config.height});
                }
                if( config.mask_bg ){
                    mask_bg.css({'background':'rgba(0,0,0,'+config.mask_bg+')'});
                }
                if( config.delay && config.delay != 0){
                    window.setTimeout(function(){
                        _this_.closePopBox();
                    },config.delay);
                } 

                mask_bg.append(win_popbox);
                body.append(mask_bg);
            }
        },
        closePopBox:function(){
            $('.mask_bg').remove();
        },
        createButtons:function(footer,buttons){
            var _this_ = this;
            $(buttons).each(function(i){
                var type = this.type ? 'class='+this.type+'' :'';
                var text = this.text ? this.text :'按钮'+i+'';
                var callback = this.callback ? this.callback : null;
                var button = $('<a '+ type +' href="javascript:;" class="remove">'+ text +'</a>'); 
                
                if( callback ){
                    var flag = callback();
                    button.bind('click', function() {
                        if( flag != false){
                            _this_.closePopBox();
                        }
                    });
                }else{
                    button.bind('click', function() {
                        _this_.closePopBox();
                    });
                }

                footer.append(button);
            });
        }
    };

    window.Dialog = Dialog;

    $.dialog = function(config){
        return new Dialog(config);
    };
})(jQuery);