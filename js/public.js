      /**
 * Created by xuxk on 2017/5/24.
 */
//转换时间
function getLocalTime(nS) {
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ');
}
//获取回答时间
function getDateDiff(dateTimeStamp) {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var now = new Date().getTime();


    var diffValue = dateTimeStamp - now;

    if (diffValue < 0) {
        result = '' + 0;
        return result;
    } else {
        var dayC = diffValue / day;
        if (dayC >= 1) {
            result = "" + parseInt(dayC);
        } else if (dayC < 1) {
            result = '' + parseInt(1);
        }
    }
    return result;
}
//将0123456789转换成一二三四五六七八九
function atoc(numberValue) {
    var numberValue = new String(Math.round(numberValue * 100)); // 数字金额
    var chineseValue = ""; // 转换后的汉字金额
    var String1 = "零一二三四五六七八九十"; // 汉字数字
    var len = numberValue.length; // numberValue 的字符串长度
    var Ch1; // 数字的汉语读法
    var Ch2; // 数字位的汉字读法
    var nZero = 0; // 用来计算连续的零值的个数
    var String3; // 指定位置的数值
    if (len > 15) {
        return "";
    }
    if (numberValue == 0) {
        chineseValue = "零";
        return chineseValue;
    }
    for (var i = 0; i < len; i++) {
        String3 = parseInt(numberValue.substr(i, 1), 10); // 取出需转换的某一位的值
        if (i != (len - 3) && i != (len - 7) && i != (len - 11) && i != (len - 15)) {
            if (String3 == 0) {
                Ch1 = "";
                Ch2 = "";
                nZero = nZero + 1;
            }
            else if (String3 != 0 && nZero != 0) {
                Ch1 = "零" + String1.substr(String3, 1);
                nZero = 0;
            }
            else {
                Ch1 = String1.substr(String3, 1);
                nZero = 0;
            }
        }

        else { // 该位是万亿，亿，万，元位等关键位
            if (String3 != 0 && nZero != 0) {
                Ch1 = "零" + String1.substr(String3, 1);
                nZero = 0;
            }
            else if (String3 != 0 && nZero == 0) {
                Ch1 = String1.substr(String3, 1);
                nZero = 0;
            }
            else if (String3 == 0 && nZero >= 3) {
                Ch1 = "";
                Ch2 = "";
                nZero = nZero + 1;
            }
            else {
                Ch1 = "";
                nZero = nZero + 1;
            }
            if (i == (len - 11) || i == (len - 3)) { // 如果该位是亿位或元位，则必须写上
            }
        }
        chineseValue = chineseValue + Ch1;
    }
    if (String3 == 0) { // 最后一位（分）为0时，加上“整”
        chineseValue = chineseValue;
    }
    console.log(chineseValue)
    return chineseValue;
}

//时间转换
function getLocalTime(nS) {
    var datas = new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ');
    var m = "上"
    var n = "下"
    if (datas.split(m)[0].length < 12) {
        return datas.split(m)[0]
    } else {
        return datas.split(n)[0]
    }

}
function _getLocalTime(nS) {
    //alert( new Date(parseInt(nS)).toLocaleString());
    var datas = new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ');
    //alert(datas)
    var data_ = datas.replace('/', '-').replace('/', '-');
    var m = "上"
    var n = "下"
    if (data_.split(m)[0].length < 12) {
        return data_.split(m)[0]
    } else {
        return data_.split(n)[0]
    }

}

//(function($) {
//    $.extend({
//        myTime: {
//            /**
//             * 当前时间戳
//             * @return <int>    unix时间戳(秒)
//             */
//            CurTime: function(){
//                return Date.parse(new Date())/1000;
//            },
//            /**
//             * 日期 转换为 Unix时间戳
//             * @param <string> 2014-01-01 20:20:20 日期格式
//             * @return <int>    unix时间戳(秒)
//             */
//            DateToUnix: function(string) {
//                var f = string.split(' ', 2);
//                var d = (f[0] ? f[0] : '').split('-', 3);
//                var t = (f[1] ? f[1] : '').split(':', 3);
//                return (new Date(
//                        parseInt(d[0], 10) || null,
//                        (parseInt(d[1], 10) || 1) - 1,
//                        parseInt(d[2], 10) || null,
//                        parseInt(t[0], 10) || null,
//                        parseInt(t[1], 10) || null,
//                        parseInt(t[2], 10) || null
//                    )).getTime() / 1000;
//            },
//            /**
//             * 时间戳转换日期
//             * @param <int> unixTime  待时间戳(秒)
//             * @param <bool> isFull  返回完整时间(Y-m-d 或者 Y-m-d H:i:s)
//             * @param <int> timeZone  时区
//             */
//            UnixToDate: function(unixTime, isFull, timeZone) {
//                if (typeof (timeZone) == 'number')
//                {
//                    unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
//                }
//                var time = new Date(unixTime * 1000);
//                var ymdhis = "";
//                ymdhis += time.getUTCFullYear() + "-";
//                ymdhis += (time.getUTCMonth()+1) + "-";
//                ymdhis += time.getUTCDate();
//                if (isFull === true)
//                {
//                    ymdhis += " " + time.getUTCHours() + ":";
//                    ymdhis += time.getUTCMinutes() + ":";
//                    ymdhis += time.getUTCSeconds();
//                }
//                //alert(ymdhis)
//                return ymdhis;
//            }
//        }
//    });
//})(jQuery);


//时间转换,适应度比较好
function formatDate(now) {
    var now = new Date(now * 1000);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "年" + fixZero(month, 2) + "月" + fixZero(date, 2) + "日   " + fixZero(hour, 2) + ":" + fixZero(minute, 2) + ":" + fixZero(second, 2);
}
function _formatDates(now) {
    var now = new Date(now * 1000);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" + fixZero(month, 2) + "-" + fixZero(date, 2) + " " + fixZero(hour, 2) + ":" + fixZero(minute, 2) + ":" + fixZero(second, 2);
}
function _formatDate(now) {
    var now = new Date(now);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "/" + fixZero(month, 2) + "/" + fixZero(date, 2)
}
function _dataTime(now) {
    var now = new Date(now);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return fixZero(date, 2) + "/" + fixZero(month, 2) + "/" + year
}
function formatDates(now) {
    var now = new Date(now);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" + fixZero(month, 2) + "-" + fixZero(date, 2)
}
function _formatDatesNoS(now) {
    if (now == 0 || now == null || now == undefined || now == 'null' || now == 'undefined') {
        return ' '
    }
    var now = new Date(now * 1000);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" + fixZero(month, 2) + "-" + fixZero(date, 2) + "   " + fixZero(hour, 2) + ":" + fixZero(minute, 2);
}
function _formatDatesNoSXie(now) {
    if (now == 0 || now == null || now == undefined || now == 'null' || now == 'undefined') {
        return ' '
    }
    var now = new Date(now * 1000);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "/" + fixZero(month, 2) + "/" + fixZero(date, 2) + "   " + fixZero(hour, 2) + ":" + fixZero(minute, 2);
}
function _formatDateMonth(now) {
    var now = new Date(now);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month == 1) {
        month = 'January'
    } else if (month == 2) {
        month = 'February'
    } else if (month == 3) {
        month = 'March'
    } else if (month == 4) {
        month = 'April'
    } else if (month == 5) {
        month = 'May'
    } else if (month == 6) {
        month = 'June'
    } else if (month == 7) {
        month = 'July'
    } else if (month == 8) {
        month = 'August'
    } else if (month == 9) {
        month = 'September'
    } else if (month == 10) {
        month = 'October'
    } else if (month == 11) {
        month = 'November'
    } else if (month == 12) {
        month = 'December'
    }
    //return year + "/" + fixZero(month, 2) + "/" + fixZero(date, 2)
    return fixZero(date, 2) + month + year
}
//时间如果为单位数补0
function fixZero(num, length) {
    var str = "" + num;
    var len = str.length;
    var s = "";
    for (var i = length; i-- > len;) {
        s += "0";
    }
    return s + str;
}


//日期转换时间戳
function dataString(string) {
    var f = string.split(' ', 2);
    var d = (f[0] ? f[0] : '').split('-', 3);
    var t = (f[1] ? f[1] : '').split(':', 3);
    return (new Date(
            parseInt(d[0], 10) || null,
            (parseInt(d[1], 10) || 1) - 1,
            parseInt(d[2], 10) || null,
            parseInt(t[0], 10) || null,
            parseInt(t[1], 10) || null,
            parseInt(t[2], 10) || null
        )).getTime() / 1000;
}

//倒计时 TODO 倒计时
function countDown(starttimes) {
//        var starttime = new Date("2018/11/20");
    var starttime = new Date(starttimes)
    console.log(starttime)
    setInterval(function () {
        var nowtime = new Date();
        var time = starttime - nowtime;
        var day = parseInt(time / 1000 / 60 / 60 / 24);
        var hour = parseInt(time / 1000 / 60 / 60 % 24);
        var minute = parseInt(time / 1000 / 60 % 60);
        var seconds = parseInt(time / 1000 % 60);
        var timeend = day + "天" + hour + "小时" + minute + "分钟" + seconds + "秒"
        //console.log(timeend)
        return (timeend)

        //$('.timespan').html(day + "天" + hour + "小时" + minute + "分钟" + seconds + "秒");
    }, 1000);
}


//倒计时 TODO 倒计时
function countDownDetail(starttimes) {
//        var starttime = new Date("2018/11/20");
    var starttime = new Date(starttimes)
    setInterval(function () {
        var nowtime = new Date();
        var time = starttime - nowtime;
        var day = parseInt(time / 1000 / 60 / 60 / 24);
        var hour = parseInt(time / 1000 / 60 / 60 % 24);
        var minute = parseInt(time / 1000 / 60 % 60);
        var seconds = parseInt(time / 1000 % 60);
        var timeend = day + "天" + hour + "小时" + minute + "分钟" + seconds + "秒"
        ////console.log(timeend)
        //return (timeend)
        day != 0 ? day = '<i>' + day + '</i><em>:</em>' : day = '<i>00</i><em>:</em>';
        hour != 0 ? hour = '<i>' + hour + '</i><em>:</em>' : hour = '<i>00</i><em>:</em>';
        minute != 0 ? minute = '<i>' + minute + '</i><em>:</em>' : minute = '<i>00</i><em>:</em>';
        seconds != 0 ? seconds = '<i>' + seconds + '</i>' : seconds = '<i>00</i>';

//console.log(day + hour + minute + seconds)
        console.log(time)
        if (parseInt(time) > 0) {
            //console.log(times)
            return day + hour + minute + seconds
        } else {
            return ("已经下架！");
        }
        //$('.timespan').html(day + "天" + hour + "小时" + minute + "分钟" + seconds + "秒");
    }, 1000);
}

function countDownSec(starttimes) {
//        var starttime = new Date("2018/11/20");
    var starttime = new Date(starttimes);
    console.log(starttime)
    setInterval(function () {
        var time = starttimes;
        var day = parseInt(time / 1000 / 60 / 60 / 24);
        var hour = parseInt(time / 1000 / 60 / 60 % 24);
        var minute = parseInt(time / 1000 / 60 % 60);
        var seconds = parseInt(time / 1000 % 60);
        var timeend = day + "天" + hour + "小时" + minute + "分钟" + seconds + "秒"
        console.log(timeend)
        return (timeend)

        //$('.timespan').html(day + "天" + hour + "小时" + minute + "分钟" + seconds + "秒");
    }, 1000);
}



function changeDateFormat(cellval) {
				var dateVal = cellval + "";
				if (cellval != null) {
					var date = new Date(parseInt(dateVal.replace("/Date(", "").replace(")/", ""), 10));
					var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
					var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
					var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
					var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
					var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
					return date.getFullYear() + "-" + month + "-" + currentDate + " " + hours + ":" + minutes + ":" + seconds;
				}
			}
//rem自适应
//var dpr, rem, scale;
//var docEl = document.documentElement;
//var fontEl = document.createElement('style');
//var metaEl = document.querySelector('meta[name="viewport"]');
//dpr = window.devicePixelRatio || 1;
//
//rem = docEl.clientWidth * dpr / 10;//跟换宽度设置offsetWidth 代替clientWidth
//console.log("rem="+ docEl.clientWidth)
//scale = 1 / dpr;
//// 设置viewport，进行缩放，达到高清效果
//metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
//// 设置data-dpr属性，留作的css hack之用
//docEl.setAttribute('data-dpr', dpr);
//// 动态写入样式
//docEl.firstElementChild.appendChild(fontEl);
//fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';
//// 给js调用的，某一dpr下rem和px之间的转换函数
//window.rem2px = function(v) {
//    v = parseFloat(v);
//    return v * rem;
//};
//window.px2rem = function(v) {
//    v = parseFloat(v);
//    return v / rem;
//};
//window.dpr = dpr;
//window.rem = rem;
//获取url参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}

//弹出框
function error(str) {

    if ($("#errormsg").length <= 0) {

        $("body").append('<div  style="display: none" id="errormsg"><p>' + str + '</p><div class="opa70"></div></div>');

    }

    else {

        $("#errormsg p").html(str);

    }

    $("#errormsg").fadeIn("slow");

    setTimeout(function () {

        $("#errormsg").fadeOut("slow");

    }, 2000);

}

//限制文件大小

var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
function fileChange(target) {
    var fileSize = 0;
    if (isIE && !target.files) {
        var filePath = target.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        var file = fileSystem.GetFile(filePath);
        fileSize = file.Size;
        alert(fileSize);
    } else {
        fileSize = target.files[0].size;
        console.log(fileSize);
    }
    var size = fileSize / 1024;
    if (size > 10000) {
        document.getElementById("upfileSubmit").disabled = true;
        alert("附件不能大于10M,请重新选择！");
    }
    else {
        document.getElementById("upfileSubmit").disabled = false;
    }
}


//退出清除缓存
function loginout(){

	$(window).bind('beforeunload', function () {
					 // debugger
					$.ajax({
						type:"post",
						url:"/logout",
						data:"",
						success:function (data){
									// debugger
						}
					})
	           return '提示：未保存的内容将会丢失。';  //好像这个提示并没什么用
	       });
				
	       // $('#id_submit_button').click(function () {
	       //     $(window).unbind('beforeunload');//这个是取消提醒
	       // });
	
}


// 新增拍板人为电话的时候
function addpaibanPhone(customerId,phone1,phone2,phone3){
	$.ajax({
		url: '/my-customer-worker/create-customer-worker',
		type: 'post',
		data: 'customerId=' + customerId+'&phone1='+phone1+'&phone2='+phone2+'&phone3='+phone3,
		async: true,
		success: function(res) {
			if (res.code == 0) {
				var id=res.data.customerWorkerId
				$('.paibanren').attr('relId',res.data.customerWorkerId)
				// _this.parent().parent().attr('relId',paiBanCustomerWorkerId)
				$.ajax({
					url: '/my-customer/update-customer',
					type: 'post',
					data: 'customerId=' + customerId+'&paiBanCustomerWorkerId='+id,
					async: true,
					success: function(res) {
						if(res.code==0){
							
						}else{
							layer.msg(res.codeMsg)
						}
					}
				})
			}else{
							layer.msg(res.codeMsg)
			}
		}
	})
	}
	function addpaibanTel(customerId,tel1,tel2,tel3){
		$.ajax({
			url: '/my-customer-worker/create-customer-worker',
			type: 'post',
			data: 'customerId=' + customerId+'&tel1='+tel1+'&tel2='+tel2+'&tel3='+tel3,
			async: true,
			success: function(res) {
				if (res.code == 0) {
					var id=res.data.customerWorkerId
					$('.paibanren').attr('relId',res.data.customerWorkerId)
					// _this.parent().parent().attr('relId',paiBanCustomerWorkerId)
					$.ajax({
						url: '/my-customer/update-customer',
						type: 'post',
						data: 'customerId=' + customerId+'&paiBanCustomerWorkerId='+id,
						async: true,
						success: function(res) {
							if(res.code==0){
								
							}else{
								layer.msg(res.codeMsg)
							}
						}
					})
				}else{
								layer.msg(res.codeMsg)
				}
			}
		})
	}
	
	function addRelPhone(customerId,phone1,phone2,phone3){
		$.ajax({
			url: '/my-customer-worker/create-customer-worker',
			type: 'post',
			data: 'customerId=' + customerId+'&phone1='+phone1+'&phone2='+phone2+'&phone3='+phone3,
			async: true,
			success: function(res) {
				if (res.code == 0) {
					var id=res.data.customerWorkerId
					$('.paibanren').attr('relId',res.data.customerWorkerId)
					// _this.parent().parent().attr('relId',paiBanCustomerWorkerId)
					
				}else{
								layer.msg(res.codeMsg)
				}
			}
		})
		}
		function addRelTel(customerId,tel1,tel2,tel3){
			$.ajax({
				url: '/my-customer-worker/create-customer-worker',
				type: 'post',
				data: 'customerId=' + customerId+'&tel1='+tel1+'&tel2='+tel2+'&tel3='+tel3,
				async: true,
				success: function(res) {
					if (res.code == 0) {
						var id=res.data.customerWorkerId
						$('.paibanren').attr('relId',res.data.customerWorkerId)
						// _this.parent().parent().attr('relId',paiBanCustomerWorkerId)
						
					}else{
									layer.msg(res.codeMsg)
					}
				}
			})
			}