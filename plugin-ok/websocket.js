(function(window, undefined) {
	$(function() {
		var socket, $win = $('body');
		showmessage = function(msg, type) {
			var datetime = new Date();
			var tiemstr = datetime.getHours() + ':' + datetime.getMinutes() + ':' + datetime.getSeconds() + '.' + datetime.getMilliseconds();
			if (type) {
				var $p = $('<div>').appendTo($win.find('#div_msg'));
				var $type = $('<span>').text('[' + tiemstr + ']' + type + '：').appendTo($p);
				var $msg = $('<span>').addClass('thumbnail').css({
					'margin-bottom': '5px'
				}).text(msg).appendTo($p);
			} else {
				var $center = $('<center>').text(msg + '(' + tiemstr + ')').css({
					'font-size': '12px'
				}).appendTo($win.find('#div_msg'));
			}
		};

		$win.find('#refresh_clearcache').click(function() {
			$.yszrefresh();
		});

		$win.find('#btn_conn').attr('disabled', false);
		$win.find('#btn_close').attr('disabled', true);

		function getNow(s) {
			return s < 10 ? '0' + s : s;
		}
		
		function shijian() {


			var myDate = new Date();

			var year = myDate.getFullYear(); //获取当前年
			var month = myDate.getMonth() + 1; //获取当前月
			var date = myDate.getDate(); //获取当前日


			var h = myDate.getHours(); //获取当前小时数(0-23)
			var m = myDate.getMinutes(); //获取当前分钟数(0-59)
			var s = myDate.getSeconds();

			var now = year + '-' + getNow(month) + "-" + getNow(date) + "-" + getNow(h) + '-' + getNow(m) + "-" + getNow(s);
			console.log(now)
			return now
		}
		$win.find('#btn_conn').click(function() {
			var url = 'ws://localhost?sid=' + parseInt((1.1 + Math.random()) * 1000) +
				'&pid=84529FA7-7195-4541-AA38-B22003CCFF4D&flag=1'; //$win.find('#inp_url').val();
			// 创建一个Socket实例
			socket = new WebSocket(url);
			// 打开Socket 
			socket.onopen = function(event) {
				// 发送一个初始化消息
				var msg = '{"req":"HP_Init","rid":1,"para":{"Para":"0"}}';
				if (socket && msg) {
					socket.send(msg);
					$win.find('.phoneNow').css('display', 'block')
					var phoneNum = $('#inp_send').val()
					console.log(phoneNum, phoneNum.substring(0, 1))
					if (phoneNum && phoneNum.substring(0, 1) == 1) {
						phoneNum = '0' + phoneNum
					}
					var msg = '{"req":"HP_StartDial","rid":5,"para":{"Para":"' + phoneNum + '"}}';
					console.log(3 + msg)
					if (socket && msg) {
						socket.send(msg);
						socket.send('{"req":"HP_SetLocalRecord","rid":9,"para":{"Para":"1"}}')
						var int=window.setInterval(setTimeOut,500);
						function setTimeOut(){					
							if(socket&&$win.find('.record1').attr('sendType')==9){
								window.clearInterval(int)
								$win.find('.record1').attr('sendType','')
									 var musicName=$('#userName').val()+shijian()
									 console.log('{"req":"HP_StartRecordFile","rid":16,"para":{"Para":"D:\\\\record\\\\'+musicName+'.wav"}}')
									socket.send('{"req":"HP_StartRecordFile","rid":16,"para":{"Para":"D:\\\\record\\\\'+musicName+'.wav"}}')
							}
						}
					}
				}
			};
			// 监听消息
			socket.onmessage = function(eve) {
				console.log(eve.data)
				if(eve.data){
					var data = JSON.parse(eve.data)
					console.log(data)
					if(data.rid==9){
					$(".record1").attr('sendType',data.rid)
				}
				if(data.rid==16){
					$(".record2").attr('sendType',data.rid)
				}
				if(data.rid==17){
					$(".record3").attr('sendType',data.rid)
				}
				//if(data.rid==9){
					//$(".record4").attr('sendType',eve.data)
				//}
				if (data.type == 704) {
					$('.phoneNow').css('display', 'none').attr('sendType',data.type)
					socket.send('{"req":"HP_HangUpCtrl","rid":4,"para":{}}');
					socket.close();
				}
				}
				
			};
			// 监听Socket的关闭
			socket.onclose = function(event) {
				console.log('断开连接')
				//socket.send('{"req":"HP_HangUpCtrl","rid":4,"para":{}}');
				$('.phoneNow').css('display', 'none')
			};
			socket.onerror = function(event) {
				console.log('error')
			}

		});
		$(window).bind('beforeunload', function() {
			if (socket) {
				socket.send('{"req":"HP_HangUpCtrl","rid":4,"para":{}}');
				socket.close();
			}
		});


		// $win.find('#luyin1').click(function() {
		// 	var msg = '{"req":"HP_SetLocalRecord","rid":9,"para":{"Para":"1"}}';
		// 	socket.send(msg);
		// 	console.log(msg)
		// });
		// $win.find('#luyin2').click(function() {
		// 	var musicName = $('#userName').val() + shijian()
		// 	var msg = '{"req":"HP_StartRecordFile","rid":16,"para":{"Para":"F:\\\\record\\\\' + musicName + '.wav"}}';
		// 	socket.send(msg);
		// 	console.log(msg)
		// });
		// $win.find('#luyin3').click(function() {
		// 	var msg = '{"req":"HP_StopRecordFile","rid":17,"para":{}}';
		// 	socket.send(msg);
		// 	console.log(msg)
		// });
		// $win.find('#luyin4').click(function() {
		// 	var msg = '{"req":"HP_SetLocalRecord","rid":9,"para":{"Para":"0"}}';
		// 	socket.send(msg);
		// 	console.log(msg)
		// });
		
		$win.find('#btn_close').click(function() {
			$('.phoneNow').css('display', 'none')
			
			var initMsg = '{"req":"HP_HangUpCtrl","rid":4,"para":{}}'
			if(socket&&initMsg){
				socket.send(initMsg);
				socket.send('{"req":"HP_StopRecordFile","rid":17,"para":{}}')
				$(".record1").attr('sendType','')
				var int=window.setInterval(setTimeOut,500);
				function setTimeOut(){					
					if(socket&&$win.find('.record3').attr('sendType')==17){
						
						window.clearInterval(int)
						// 上传视频接口
						// $.ajax({
						//  url:'/my-dialog/create-dialog',
						//  type:'post',
						// })
						// }
						socket.send(' {"req":"HP_SetLocalRecord","rid":9,"para":{"Para":"0"}}')
						$win.find('.phoneNow').attr('sendType','')
						$win.find('.recore1').attr('sendType','')
						$win.find('.recore2').attr('sendType','')
						$win.find('.recore3').attr('sendType','')
						socket.close();
					
					}
				}
			}
		});
		$win.find('#btn_send').click(function() {
			var msg = $win.find('#inp_send').val();
			if (socket && msg) {
				socket.send(msg);
				showmessage(msg, 'send');
				$win.find('#inp_send').val('');
			}
		});
		$win.find('#inp_send').keyup(function() {
			if (event.ctrlKey && event.keyCode == 13) {
				$win.find('#btn_send').trigger('click');
			}
		});

		$win.find('#btn_clear').click(function() {
			$win.find('#div_msg').empty();
		});
	});
})(window);
