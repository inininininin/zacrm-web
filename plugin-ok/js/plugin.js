(function (window, undefined) {
    $(function () {
        var $win = $('body');
        
        var pluginSelectId="pluginSelect";
        var funcSelectId="funcSelect";
        
        //调试函数方法名showWrlMessage固定，不得修改
        showWrlMessage=function(msg,type){
        	showmessage(msg,type);
        }
        
        showmessage=function (msg,type){
            var datetime = new Date();
            var tiemstr = datetime.getHours() + ':' + datetime.getMinutes() + ':' + datetime.getSeconds() + '.' + datetime.getMilliseconds();
            if (type) {
                var $p = $('<div>').appendTo($win.find('#div_msg'));
                var $type = $('<span>').html('[' + tiemstr + ']' + type + '：').appendTo($p);
                var $msg = $('<span>').addClass('thumbnail').css({ 'margin-bottom': '5px' }).html(msg).appendTo($p);
            } else {
                var $center = $('<center>').text(msg + '(' + tiemstr + ')').css({ 'font-size': '12px' }).appendTo($win.find('#div_msg'));
            }
        };

        gotoTop=function(min_height){
            //定义返回顶部点击向上滚动的动画
            $("#gotoTop").click(function(){
                $('html,body').animate({scrollTop:0},300);
            });
            //获取页面的最小高度，无传入值则默认为600像素
            min_height ? min_height = min_height : min_height = 500;
            //为窗口的scroll事件绑定处理函数
            $(window).scroll(function(){
                //获取窗口的滚动条的垂直位置
                var s = $(window).scrollTop();
                //当窗口的滚动条的垂直位置大于页面的最小高度时，让返回顶部元素渐现，否则渐隐
                if( s > min_height){
                    $("#gotoTop").fadeIn(100);
                }else{
                    $("#gotoTop").fadeOut(200);
                };
            });
        };
        
        init=function(){
        	$("#connArea").css({"display":""});
        	$("#funcArea").css({"display":"none"});
        	$("#input_protocol").removeAttr("readOnly");
        	$("#input_hostname").removeAttr("readOnly");
        	$("#input_port").removeAttr("readOnly");
        	$("#input_flag").removeAttr("readOnly");
        	initConnInfo();
        }
        
        //初始化连接信息
        initConnInfo=function(){
        	$('#input_protocol').val("ws");
            $('#input_hostname').val("wrl.zorrosoft.com");
            $('#input_port').val("80");
            $('#input_flag').val("1");
        }
        
        //重置连接信息
        restConnInfo=function(){
        	$('#input_protocol').val("");
            $('#input_hostname').val("");
            $('#input_port').val("");
            $('#input_flag').val("");
        }
        
        testConn=function(){
        	var protocol=$('#input_protocol').val();
        	var hostname=$('#input_hostname').val();
        	var port=$('#input_port').val();
        	var flag=$('#input_flag').val();
        	
        	if(protocol.trim().length==0){
        		alert("请输入连接协议！");
        		$('#input_protocol').focus();
        		return;
        	}
        	if(hostname.trim().length==0){
        		alert("请输入连接的主机IP");
        		$('#input_hostname').focus();
        		return;
        	}
        	if(port.trim().length==0){
        		alert("请输入连接的主机端口");
        		$('#input_port').focus();
        		return;
        	}
        	if(flag.trim().length==0){
        		alert("请输入控制掩码");
        		$('#input_flag').focus();
        		return;
        	}
        	
            //本地PluginOK信息
            var localPluginOKJson={};

            //连接成功
            var wrlConnFlag=false;
            var wrlCheckFlag=false;

            //通过查询框架版本信息判断是否安装PluginOK框架
            commonDllFun(
            	protocol,hostname,port,flag,
            	getSid(),"","","",
            	{"Mac":1,"More":1},"Wrl_Version",true,
            	function(resultJson){
                    if(resultJson.ret==0){
                        localPluginOKJson=resultJson.data;
                    }
                    //showmessage('ret='+resultJson.ret,'wrl ret');
                    //showmessage("AuthName:"+resultJson.data.AuthName+",Version:"+resultJson.data.Version+",ValidDay:"+resultJson.data.ValidDay,'wrl info');
            	},
            	function(){//连接打开时回调
            		wrlConnFlag=true;
            	},
            	function(){//连接关闭时回调
                    wrlCheckFlag=true;
            	}
            );

            var checkWrlInstallInterval=setInterval(function(){
            	if(wrlCheckFlag){
            		//检测过了就清除检测定时器并判断是否连接成功
            		clearInterval(checkWrlInstallInterval);
            		if(!wrlConnFlag){
            			showmessage('请先安装PluginOK客户端应用程序','驱动安装提示');
                        $("#btn_DownlodWrl").trigger("click");
                        return;
                    }
            		
            		//服务端未设置框架版本信息或者本地框架的版本号==服务端设置的框架版本号，则无需升级。
            		var notNeedUpgrade=(wrl.clientWrl==undefined)||(wrl.clientWrl!=undefined&&localPluginOKJson.Version==wrl.clientWrl.Version);
            		if(!notNeedUpgrade){
            			
            			if(!confirm("框架版本:"+localPluginOKJson.Version+",新版本"+wrl.clientWrl.Version+".确认升级吗?")){
            				initPlugins(protocol,hostname,port,flag);
            				return;
            			}
            			
            			showmessage("框架版本:"+localPluginOKJson.Version+",新版本"+wrl.clientWrl.Version+".正在升级,请稍后......",'PluginOK Version');
            			//升级PluginOK框架
            			commonDllFun(
                            protocol,hostname,port,flag,
                            getSid(),"","","",
                            wrl.clientWrl,"Wrl_Update",true,
                            function(resultJson){
                                if(resultJson.ret!=undefined){
                                    showmessage('ret='+resultJson.ret+",ExistVer="+resultJson.data.ExistVer,'wrlupdate');
                                }else if(resultJson.event!=undefined&&resultJson.event=="Wrl_Close"){
                                    showmessage('event='+resultJson.event+",Desc="+resultJson.data.Desc,'wrlupdate');
                                    //测试可以定时检测框架是否升级完成
                                    var checkWsReadyFun=setInterval(function(){
                                        commonDllFun(
                                            protocol,hostname,port,flag,
                                            getRid(10),"","","",{"Mac":1,"More":1},"Wrl_Version",true,
                                            function(resultDataJson){
                                                clearInterval(checkWsReadyFun);
                                                showmessage("升级完成,请检测升级过程中是否出现错误。",'Wrl done');
                                                initPlugins(protocol,hostname,port,flag);
                                            }
                                        );
                                    },5000);
                                }
                            }
                        );
            			return;
            		}
            		initPlugins(protocol,hostname,port,flag);
            	}
            },100);
        }
        
        initPlugins=function(protocol,hostname,port,flag){
        	$("#connArea").css({"display":"none"});
        	$("#funcArea").css({"display":""});
        	$("#input_protocol").attr("readOnly",true);
        	$("#input_hostname").attr("readOnly",true);
        	$("#input_port").attr("readOnly",true);
        	$("#input_flag").attr("readOnly",true);
        	
        	var installPluginArray=[];
            //通过查询插件列表
            commonDllFun(
                protocol,hostname,port,flag,
                getSid(),"","","",
                {"Detail":0},"Plugin_List",true,
                function(resultJson){
                    installPluginArray=resultJson.data;
                    //根据PID是否为空禁用自定义开发的插件列表
                    for(var i=0;i<pluginList.length;i++){
                        pluginList[i].enable=isEmpty(pluginList[i].pid);
                        if(pluginList[i].id=="wrl"){
                            for(var j=0;j<pluginList[i].functions.length;j++){
                                if(pluginList[i].functions[j].id=="WrlUpdate"){
                                	if(wrl.clientWrl!=undefined){
                                		pluginList[i].functions[j].param=wrl.clientWrl;
                                	}
                                }else if(pluginList[i].functions[j].id=="WrlUpdateAuth"){
                                	if(wrl.clientWrlAuth!=undefined){
                                		pluginList[i].functions[j].param=wrl.clientWrlAuth;
                                	}
                                }
                            }
                        }
                    }
                    //根据插件查询列表接口返回值激活相应插件
                    for(var i=0;i<pluginList.length;i++){
                        for(var j=0;j<installPluginArray.length;j++){
                            if(pluginList[i].pid==installPluginArray[j].PID){
                                pluginList[i].enable=true;
                                break;
                            }
                        }
                    }
                    //移除不启用的插件，并判断是否有选中的插件，如果没有选中则设置第一个为选中
                    var selected=false;
                    for(var i=pluginList.length-1;i>=0;i--){
                        if(!pluginList[i].enable){
                            pluginList.splice(i,1);
                            continue;
                        }
                        if(pluginList[i].selected!=undefined&&pluginList[i].selected){
                            selected=true;
                        }
                    }
                    if(!selected&&pluginList.length>0){
                        pluginList[0].selected=true;
                    }
                    
                    var $pluginSelect=$("select#"+pluginSelectId);
                    //清空功能选择下拉框选项
                    for(var i=0;i<pluginList.length;i++){
                        var pluginEnable=pluginList[i].enable==undefined||pluginList[i].enable;
                        if(!pluginEnable){
                            continue;
                        }
                        var selected=pluginList[i].selected!=undefined&&pluginList[i].selected;
                        if(selected){
                            $pluginSelect.append("<option value=\""+pluginList[i].id+"\" selected=\"selected\">"+pluginList[i].name+"</option>");
                            //加载插件对应的功能
                            if(pluginList[i].functions!=undefined){
                                reloadFunc(pluginList[i].type,pluginList[i].functions);
                            }
                        }else{
                            $pluginSelect.append("<option value='"+pluginList[i].id+"'>"+pluginList[i].name+"</option>");
                        }
                    }
                }
            );
        }
        
        //加载插件功能列表
        reloadFunc=function(pluginType,functionArray){
        	//加载插件对应的功能
    		var $functionSelect=$("select#"+funcSelectId);
    		$functionSelect.html("");
    		var length=functionArray.length;
    		var idx=0;
    		for(var k=0;k<length;k++){
    			var functionEnable=functionArray[k].enable==undefined||functionArray[k].enable;
    			if(!functionEnable){
    				continue;
    			}
    			$functionSelect.append("<option value='"+functionArray[k].id+"'>"+functionArray[k].name+"</option>");
    			if(idx==0){
    				$('#input_pluginType').val(!isEmpty(pluginType)?pluginType:"1");
		        	$('#input_pid').val(!isEmpty(functionArray[k].pid)?functionArray[k].pid:"");
		        	$('#input_req').val(functionArray[k].req);
		        	if(functionArray[k].isRequiredConfirm==undefined){
		        		$('#input_isRequiredConfirm').val("false");
		        	}else{
		        		$('#input_isRequiredConfirm').val(""+functionArray[k].isRequiredConfirm);
		        	}
		        	if(functionArray[k].isRequiredTk==undefined){
		        		$('#input_isRequiredTK').val("true");
		        	}else{
		        		$('#input_isRequiredTK').val(""+functionArray[k].isRequiredTk);
		        	}
		        	if(functionArray[k].needCloseSocket==undefined){
		        		$('#input_needCloseSocket').val("true");
		        	}else{
		        		$('#input_needCloseSocket').val(""+functionArray[k].needCloseSocket);
		        	}
		        	$('#input_callback').val(!isEmpty(functionArray[k].callFun)?functionArray[k].callFun:"");
		        	$('#input_param').val(!isEmpty(functionArray[k].param)?JSON.stringify(functionArray[k].param):"");
		        	$("#btn_call").text(functionArray[k].name);
    			}
    			idx++;
        	}
        }
        
        //插件下拉框选择事件
        $win.find('#'+pluginSelectId).change(function(){
        	var id=$(this).children('option:selected').val();
        	for(var i=0;i<pluginList.length;i++){
        		if(pluginList[i].id==id){
        			if(pluginList[i].functions!=undefined){
        				reloadFunc(pluginList[i].type,pluginList[i].functions);
        			}
        		}
        	}
        });
        
        //插件功能下拉框选择事件
        $win.find('#'+funcSelectId).change(function(){
        	setReqParam();
        });
        
        //清除参数
        clearReqParam=function(){
        	$('#input_pid').val("");
        	$('#input_pluginType').val("");
        	$('#input_needCloseSocket').val("");
        	$('#input_req').val("");
        	$('#input_callback').val("");
        	$('#input_isRequiredConfirm').val("false");
        	$('#input_isRequiredTK').val("true");
        	$('#input_param').val("");
        }
        
        //参数说明
        descParam=function(){
        	var $pluginSelect=$("#"+pluginSelectId).children('option:selected');
        	var $funcSelect=$("#"+funcSelectId).children('option:selected');
        	var pluginId=$pluginSelect.val();
        	var funcId=$funcSelect.val();
        	var exists=false;
        	for(var i=0;i<pluginList.length;i++){
        		if(pluginList[i].id==pluginId){
        			for(var j=0;j<pluginList[i].functions.length;j++){
        				if(pluginList[i].functions[j].id==funcId){
                            var paramRemark=pluginList[i].functions[j].paramRemark;
                            if(paramRemark==undefined){
                                alert("请设置插件["+pluginList[i].name+"]中函数["+pluginList[i].functions[j].name+"]的参数[paramRemark]!");
                            }else{
                                var resultStr="";
                                if(!isEmpty(paramRemark)){
                                    if(typeof paramRemark == "String"){
                                        resultStr=paramRemark;
                                    }else if(typeof paramRemark == "object"){
                                        for(var key in paramRemark){
                                            resultStr+=(key+":"+paramRemark[key]+"<br/>");
                                        }
                                    }
                                }
                                var msgType="插件[<span style='color:red;font-weight:bold;'>"+pluginList[i].name+"</span>]的函数[<span style='color:red;font-weight:bold;'>"+pluginList[i].functions[j].name+"</span>]参数说明";
                                showmessage(resultStr,msgType);
                            }       					
        		        	exists=true;
        					break;
        				}
        			}
        			if(exists){
        				break;
        			}
        		}
        	}
        }
        
        //设置参数
        setReqParam=function(){
        	var $pluginSelect=$("#"+pluginSelectId).children('option:selected');
        	var $funcSelect=$("#"+funcSelectId).children('option:selected');
        	var pluginId=$pluginSelect.val();
        	var funcId=$funcSelect.val();
        	var exists=false;
        	for(var i=0;i<pluginList.length;i++){
        		if(pluginList[i].id==pluginId){
        			for(var j=0;j<pluginList[i].functions.length;j++){
        				if(pluginList[i].functions[j].id==funcId){
        		        	$('#input_pluginType').val(!isEmpty(pluginList[i].type)?pluginList[i].type:"1");
        		        	$('#input_pid').val(!isEmpty(pluginList[i].functions[j].pid)?pluginList[i].functions[j].pid:"");
        		        	$('#input_req').val(pluginList[i].functions[j].req);
        		        	if(pluginList[i].functions[j].isRequiredConfirm==undefined){
        		        		$('#input_isRequiredConfirm').val("false");
        		        	}else{
        		        		$('#input_isRequiredConfirm').val(""+pluginList[i].functions[j].isRequiredConfirm);
        		        	}
        		        	if(pluginList[i].functions[j].isRequiredTk==undefined){
        		        		$('#input_isRequiredTK').val("true");
        		        	}else{
        		        		$('#input_isRequiredTK').val(""+pluginList[i].functions[j].isRequiredTk);
        		        	}
        		        	if(pluginList[i].functions[j].needCloseSocket==undefined){
        		        		$('#input_needCloseSocket').val("true");
        		        	}else{
        		        		$('#input_needCloseSocket').val(""+pluginList[i].functions[j].needCloseSocket);
        		        	}
        		        	$('#input_callback').val(!isEmpty(pluginList[i].functions[j].callFun)?pluginList[i].functions[j].callFun:"");
        		        	$('#input_param').val(!isEmpty(pluginList[i].functions[j].param)?JSON.stringify(pluginList[i].functions[j].param):"");
        		        	$("#btn_call").text(pluginList[i].functions[j].name);
        		        	exists=true;
        					break;
        				}
        			}
        			if(exists){
        				break;
        			}
        		}
        	}
        }
        
        //清空记录按钮点击事件
        $win.find('#btn_clear').click(function () {
            $win.find('#div_msg').empty();
        });
        
        //动态调用函数
        callFunction=function(){        	
        	var inputParam=$('#input_param').val();
        	if($.trim(inputParam).length==0){
        		alert("请先点击[设置参数]按钮");
        		$('#input_param').focus();
        		return;
        	}
        	
        	var protocol=$('#input_protocol').val();
        	var hostname=$('#input_hostname').val();
        	var port=$('#input_port').val();
        	var flag=$('#input_flag').val();
        	var env=$("#env").children('option:selected').val();
            var localValidate=$("#localValidate").children('option:selected').val();
            var isLocal=(localValidate=="1");
        	
        	var pid=$('#input_pid').val();
        	var pluginType=$('#input_pluginType').val();
        	var needCloseSocket=($('#input_needCloseSocket').val()=='true');
        	var requestMethod=$('#input_req').val();
        	var callBack=$('#input_callback').val();
        	var callFunName="commonDllFun";
        	if(pluginType==2){
        		callFunName="commonExeFun";
        	}
        	var param=str2Json(inputParam);
        	
        	var isRequiredTKStr=$('#input_isRequiredTK').val();
        	var isRequiredTK=(isRequiredTKStr=="true");
        	
        	 //根据参数获取认证信息
            var tkJson=generateWsTk(env,isLocal,isRequiredTK,true);
            var cid=tkJson.cid;
            var tk=tkJson.tk;
            var sid=tkJson.sid;
            
            //生产环境必须检验cid、tk等值
            if(env=="pro"){
            	if(!isEmpty(cid)&&$.trim(cid).length==0){
            		showmessage("授权的公司代码cid为空",'error');
            		return;
            	}
            	if(!isEmpty(tk)&&$.trim(tk).length==0){
            		showmessage("加密的认证码tk为空",'error');
            		return;
            	}
            	if(!isEmpty(sid)&&$.trim(sid).length==0){
            		showmessage("请求的参数sid为空",'error');
            		return;
            	}
            }

            var isRequiredConfirmStr=$('#input_isRequiredConfirm').val();
        	var isRequiredConfirm=(isRequiredConfirmStr=="true");
            var isOpt=false;
        	if(isRequiredConfirm){
            	var $pluginSelect=$("#"+pluginSelectId).children('option:selected');
            	var $funcSelect=$("#"+funcSelectId).children('option:selected');
        		isOpt=confirm("确认进行["+$pluginSelect.text()+"—"+$funcSelect.text()+"]操作吗？");
        	}else{
        		isOpt=true;
        	}
        	
        	if(isOpt){
        		//回调函数传入，内部直接调用回调函数
        		var callFunStr=callFunName+"(protocol,hostname,port,flag,sid,pid,cid,tk,param,requestMethod,needCloseSocket,"+eval(callBack)+")";
        		//函数名称传入，内部使用eval转成函数后回调
        		//var callFunStr=callFunName+"(protocol,hostname,port,flag,sid,pid,cid,tk,param,requestMethod,needCloseSocket,callBack)";
            	showmessage("请求函数:"+callFunName+",方法:"+requestMethod,'Request');
        		eval(callFunStr);
        	}
        }
        
        generateWsTk=function(env,isLocal,isRequiredTk,isNew){
        	var sid=getSid();
        	var licenseJson={"cid":"","sid":sid,"tk":""};
        	if(isRequiredTk){
        		if(isLocal){
                    //随机获取认证信息
                    var licenseJsonArray=eval("license."+env);
                    if(licenseJsonArray.length>0){
                        var idx=Math.floor(Math.random()*licenseJsonArray.length);
                        licenseJson=licenseJsonArray[idx];
                    }
            	}
        	}
        	return licenseJson;
        }
        
        gotoTop();
        init();
        
    });
})(window);