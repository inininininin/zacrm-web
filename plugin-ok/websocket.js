(function (window, undefined) {
    $(function () {
        var socket, $win = $('body');
        showmessage = function (msg, type) {
            var datetime = new Date();
            var tiemstr = datetime.getHours() + ':' + datetime.getMinutes() + ':' + datetime.getSeconds() + '.' + datetime.getMilliseconds();
            if (type) {
                var $p = $('<div>').appendTo($win.find('#div_msg'));
                var $type = $('<span>').text('[' + tiemstr + ']' + type + '：').appendTo($p);
                var $msg = $('<span>').addClass('thumbnail').css({ 'margin-bottom': '5px' }).text(msg).appendTo($p);
            } else {
                var $center = $('<center>').text(msg + '(' + tiemstr + ')').css({ 'font-size': '12px' }).appendTo($win.find('#div_msg'));
            }
        };

        $win.find('#refresh_clearcache').click(function () {
            $.yszrefresh();
        });

        $win.find('#btn_conn').attr('disabled', false);
        $win.find('#btn_close').attr('disabled', true);

        $win.find('#btn_conn').click(function () {
//          $win.find('#btn_conn').attr('disabled', true);
//          $win.find('#btn_close').attr('disabled', false);
            var url = 'ws://localhost?sid='+parseInt((1.1+Math.random())*1000)+'&pid=84529FA7-7195-4541-AA38-B22003CCFF4D&flag=1';//$win.find('#inp_url').val();
            // 创建一个Socket实例
            socket = new WebSocket(url);
            console.log(1)
            
//          showmessage('开始连接');
            // 打开Socket 
            socket.onopen = function (event) {
                // 发送一个初始化消息
//              showmessage('连接成功');
                socket.send('{"req":"HP_HangUpCtrl","rid":4,"para":{}}')
                var msg = '{"req":"HP_Init","rid":1,"para":{"Para":"0"}}';
                 console.log(msg)
            if (socket && msg) {
                socket.send(msg);
                  $('.phoneNow').css('display','block')
//              showmessage(msg, 'send');
              
//              $win.find('#inp_send').val('');
				var phoneNum=$('#inp_send').val()
				
				var msg = '{"req":"HP_StartDial","rid":5,"para":{"Para":"'+phoneNum+'"}}';
				console.log(3+msg)
            if (socket && msg) {
                socket.send(msg);
                
//              showmessage(msg, 'send');
                console.log(4+msg)
//              $win.find('#inp_send').val('');
            }
            }
            };
            // 监听消息
            socket.onmessage = function (eve) {
//              showmessage(eve.data, 'receive');
                var data=JSON.parse(eve.data)
			console.log(data)
//			if(data.type==707){
//				  $('.phoneNow').css('display','block')
//			}
			 if(data.type==704){	
				 socket.send('{"req":"HP_HangUpCtrl","rid":4,"para":{}}');
            	$('.phoneNow').css('display','none')
                socket.close();
				
			}
            };
            // 监听Socket的关闭
            socket.onclose = function (event) {
            	
//              showmessage('断开连接');
                console.log('断开连接')
                //socket.send('{"req":"HP_HangUpCtrl","rid":4,"para":{}}');
            	$('.phoneNow').css('display','none')

                $win.find('#btn_conn').attr('disabled', false);
                $win.find('#btn_close').attr('disabled', true);
                
//              $('body').on('click','.mainbox .aClose',function(){
//              	alert('12121')
//              })
            };
            
            socket.onerror = function(event){
            	console.log('error')
            }
            
        });
        	$(window).bind('beforeunload', function (){
        		$win.find('.mainbox').append('<a class="aClose" href="Webshell://hello" ></a>')
                $('.aClose')[0].click()
//				return '2131312';
				$('.phoneNow').css('display','none')
				if(socket){
					socket.send('{"req":"HP_HangUpCtrl","rid":4,"para":{}}');
		        setTimeout(function(){
		        	socket.close();	
		        },500)
				}
	});
        $win.find('#btn_close').click(function () {
        	
			$('.phoneNow').css('display','none')
			var  initMsg='{"req":"HP_HangUpCtrl","rid":4,"para":{}}'
		    //if (socket) {
		    	console.log(initMsg)
				socket.send( initMsg);
		       setTimeout(function(){
		       	 socket.close();
		       },500)
		    //}
		});
//      $win.find('#btn_close').click(function () {
//      	console.log('123456')
//          if (socket) {
//          	console.log('123456789')
//          	debugger
//          	var msg='{"req":"HP_HangUpCtrl","rid":4,"para":{}}'
//          	socket.send(msg);
//          	
//              socket.close();
//              $('.phoneNow').css('display','none')
//          }
//      });
        $win.find('#btn_send').click(function () {
            var msg = $win.find('#inp_send').val();
            if (socket && msg) {
                socket.send(msg);
                showmessage(msg, 'send');
                $win.find('#inp_send').val('');
            }
        });
        $win.find('#inp_send').keyup(function () {
            if (event.ctrlKey && event.keyCode == 13) {
                $win.find('#btn_send').trigger('click');
            }
        });

        $win.find('#btn_clear').click(function () {
            $win.find('#div_msg').empty();
        }); 
    });
})(window);