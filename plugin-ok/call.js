
// debugger
(function (window, undefined) {
	
	var data = true
	var socket, $win = $('body');
	showmessage = function (msg, type) {
	    var datetime = new Date();
	    var tiemstr = datetime.getHours() + ':' + datetime.getMinutes() + ':' + datetime.getSeconds() + '.' + datetime.getMilliseconds();
		console.log(msg,type)
		
		
		if (type) {
			
	        var $p = $('<div>').appendTo($win.find('#div_msg'));
	        var $type = $('<span>').text('[' + tiemstr + ']' + type + '：').appendTo($p);
	        var $msg = $('<span>').addClass('thumbnail').css({ 'margin-bottom': '5px' }).text(msg).appendTo($p);
	    $('.phoneNow').css('display','none')
		} else {
	        var $center = $('<center>').text(msg + '(' + tiemstr + ')').css({ 'font-size': '12px' }).appendTo($win.find('#div_msg'));
	    }
	}
	lianjie()
	function lianjie(){
			
		var url = 'ws://localhost?sid=789&pid=84529FA7-7195-4541-AA38-B22003CCFF4D&flag=1'
		// 创建一个Socket实例
		socket = new WebSocket(url);
		
		console.dir(socket)
		showmessage('开始连接');
		// 打开Socket 
		
		socket.onopen = function (event) {
		    // 发送一个初始化消息
		    showmessage('连接成功');
		};
		// 监听消息
		socket.onmessage = function (eve) {
			console.log(1213213213213)
		    showmessage(eve.data, 'receive');
			var data=JSON.parse(eve.data)
			console.log(data)
			if(data.type==707){
				
				$('.phoneNow').css('display','block') 
			}
		};
		// 监听Socket的关闭
		socket.onclose = function (event) {
		    showmessage('断开连接');
			//debugger
		    $win.find('#btn_conn').attr('disabled', false);
		    $win.find('#btn_close').attr('disabled', true);
		};
		let initMsg = '{"req":"HP_Init","rid":1,"para":{"Para":"0"}}'
		 $(function () {
			 if (socket &&  initMsg) {
				let a = setInterval(()=>{
					if(socket.readyState == 1 ){
						data = true
						socket.send( initMsg);
						clearInterval(a)
					}
				},2000)
			     
			     showmessage( initMsg, 'send');
			     $win.find('#inp_send').val('');
			 }
		 });
		
	}
	$(window).bind('beforeunload', function (){
//debugger
		
//alert(123)
//return false;
//var  initMsg='{"req":"HP_HangUpCtrl","rid":4,"para":{}}'
//if(socket) {
		//debugger
				$('.phoneNow').css('display','none')
		socket.send('{"req":"HP_HangUpCtrl","rid":4,"para":{}}');
		        socket.close();
		//return false;
//}
		
	});
    $(function () {
		
		
         $win.find('#btn_send').click(function () {
			  //lianjie()
			 // console.log('msg')
			let initMsg = '{"req":"HP_Init","rid":1,"para":{"Para":"0"}}'
			 data = false
			if (socket &&  initMsg) {
			
			    socket.send( initMsg);
			    showmessage( initMsg, 'send');
			    // $win.find('#inp_send').val('');
			}
			 // alert('电话正在拨通中')
			 //layer.msg('电话正在拨通中')
			 //setTimeout(function(){
				//$('.phoneNow').css('display','block') 
			 //},3000)
			 var  msg = $win.find('#inp_send').val();
             msg = '{"req":"HP_StartDial","rid":5,"para":{"Para":"'+msg+'"}}'
			
			 if (socket &&  msg) {
				 
				 
			     socket.send( msg);
			     showmessage( msg, 'send');
			     $win.find('#inp_send').val('');
			 }
            // var msg = $win.find('#inp_send').val();
            if (socket &&  msg) {
                socket.send( msg);
                showmessage( msg, 'send');
                $win.find('#inp_send').val('');
                console.log('发送成功')
            }
        });
        $win.find('#inp_send').keyup(function () {
            if (event.ctrlKey && event.keyCode == 13) {
                $win.find('#btn_send').trigger('click');
                console.log('发送成功')
            }
        });
		
		$win.find('#btn_close').click(function () {
			$('.phoneNow').css('display','none')
			var  initMsg='{"req":"HP_HangUpCtrl","rid":4,"para":{}}'
		    if (socket) {
				socket.send( initMsg);
		        //socket.close();
		    }
		});
    });
})(window);


// (function (window, undefined) {
//     $(function () {
//         var socket, $win = $('body');
//         showmessage = function (msg, type) {
//             var datetime = new Date();
//             var tiemstr = datetime.getHours() + ':' + datetime.getMinutes() + ':' + datetime.getSeconds() + '.' + datetime.getMilliseconds();
// 			console.log(msg)
//             if (type) {
//                 var $p = $('<div>').appendTo($win.find('#div_msg'));
//                 var $type = $('<span>').text('[' + tiemstr + ']' + type + '：').appendTo($p);
//                 var $msg = $('<span>').addClass('thumbnail').css({ 'margin-bottom': '5px' }).text(msg).appendTo($p);
//             } else {
//                 var $center = $('<center>').text(msg + '(' + tiemstr + ')').css({ 'font-size': '12px' }).appendTo($win.find('#div_msg'));
//             }
//         };

//         $win.find('#refresh_clearcache').click(function () {
//             $.yszrefresh();
//         });

//         $win.find('#btn_conn').attr('disabled', false);
//         $win.find('#btn_close').attr('disabled', true);

//         $win.find('#btn_conn').click(function () {
//             $win.find('#btn_conn').attr('disabled', true);
//             $win.find('#btn_close').attr('disabled', false);
//             var url = $win.find('#inp_url').val();
//             // 创建一个Socket实例
//             socket = new WebSocket(url);
			
//             showmessage('开始连接');
//             // 打开Socket 
//             socket.onopen = function (event) {
//                 // 发送一个初始化消息
//                 showmessage('连接成功');
				
//             };
//             // 监听消息
//             socket.onmessage = function (eve) {
//                 showmessage(eve.data, 'receive');
// 				console.log(eve.data, 'receive')
//             };
//             // 监听Socket的关闭
//             socket.onclose = function (event) {
//                 showmessage('断开连接');
//                 $win.find('#btn_conn').attr('disabled', false);
//                 $win.find('#btn_close').attr('disabled', true);
//             };
//         });
//         $win.find('#btn_close').click(function () {
//             if (socket) {
//                 socket.close();
//             }
//         });
//         $win.find('#btn_send').click(function () {
//             var msg = $win.find('#inp_send').val();
//             if (socket && msg) {
				
//                 socket.send(msg);
//                 showmessage(msg, 'send');
//                 $win.find('#inp_send').val('');
//             }
			
//         });
//         $win.find('#inp_send').keyup(function () {
//             if (event.ctrlKey && event.keyCode == 13) {
//                 $win.find('#btn_send').trigger('click');
//             }
//         });

//         $win.find('#btn_clear').click(function () {
//             $win.find('#div_msg').empty();
//         }); 
//     });
// })(window);

// function lineFriends(phonenumber){
// 	$('#inp_url').val('ws://localhost?sid=789&pid=84529FA7-7195-4541-AA38-B22003CCFF4D&flag=1')
	
// 	setTimeout(function(){
// 		$('#btn_conn').click()
// 	},100)
// 	$('#inp_send').val('{"req":"HP_Init","rid":1,"para":{"Para":"0"}}')
// 	setTimeout(function(){
// 		$('#btn_send').click()
// 		$('#inp_send').val('{"req":"HP_StartDial","rid":5,"para":{"Para":"'+phonenumber+'"}}')
// 		setTimeout(function(){
// 			$('#btn_send').click()
// 		},1000)
// 	},500)
	
// }