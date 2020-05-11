(function (window, undefined) {
    $(function () {
        
        /*************************************************************/
        /*                     以下为插件中的功能回调函数                                                */
        /************************************************************/
        
    	
    	
        
        /************************************/
        /***         插件管理相关            ***/
        /************************************/

        PluginInstallCallBack=function(resultJson){
        	if(resultJson.event!=undefined&&resultJson.event=="Plugin_Install"){
    			showmessage("event="+resultJson.event,'Plugin_Install event');
    			if(resultJson.data.Status==4||resultJson.data.Status==8||resultJson.data.Status==16){
    				showmessage("PID:"+resultJson.data.PID+",Status:"+resultJson.data.Status+",Info:"+resultJson.data.Info,'Plugin_Install result');
    			}
    		}
        }
        
        PluginUpdateCallBack=function(resultJson){
        	if(resultJson.event!=undefined&&resultJson.event=="Plugin_Install"){
    			showmessage("event="+resultJson.event,'Plugin_Install event');
    			if(resultJson.data.Status==4||resultJson.data.Status==8||resultJson.data.Status==16){
    				showmessage("PID:"+resultJson.data.PID+",Status:"+resultJson.data.Status+",Info:"+resultJson.data.Info,'Plugin_Update result');
    			}
    		}
        }
        
        PluginRemoveCallBack=function(resultJson){
        	showmessage('ret='+resultJson.ret,'PluginRemove');
        	showmessage('Ver='+resultJson.data.Ver,'Plugin Info');
        }
        
        PluginExistCallBack=function(resultJson){
        	showmessage('ret='+resultJson.ret,'PluginExist');
        	showmessage("Exist:"+resultJson.data.Exist+",Name:"+resultJson.data.Name+",Version:"+resultJson.data.Version+",ValidDay:"+resultJson.data.ValidDay,'Plugin Info');
        }
        
        PluginListCallBack=function(resultJson){
        	showmessage('ret='+resultJson.ret,'PluginList');
    		for(var i=0;i<resultJson.data.length;i++){
    			showmessage("PID:"+resultJson.data[i].PID+",Name:"+resultJson.data[i].Name+",Version:"+resultJson.data[i].Version+",ValidDay:"+resultJson.data[i].ValidDay+",Type:"+resultJson.data[i].Type,'Plugin Info');
    		}
        }
        
        PluginRefreshCallBack=function(resultJson){
        	showmessage('ret='+resultJson.ret,'PluginRefresh');
        	showmessage('Name:'+resultJson.data.Name+",Ver:"+resultJson.data.Ver,'PluginRefresh Info');
        }
        
        /************************************/
        /***         框架管理相关            ***/
        /************************************/
        
        WrlVersionCallBack=function(resultJson){
    		showmessage('ret='+resultJson.ret,'wrl ret');
    		showmessage("AuthName:"+resultJson.data.AuthName+",Version:"+resultJson.data.Version+",ValidDay:"+resultJson.data.ValidDay,'wrl info');
        }
        
        //使用IE浏览器打开网址
        WrlOpenByIECallBack=function(fileResultJson){
        	if(fileResultJson.err!=undefined){
        		showmessage(fileResultJson.err+",请检查参数cid与tk是否正确",'request error');
        		return;
        	}
        	showmessage('ret='+fileResultJson.ret,'openFile ret');
    		showmessage("PID:"+fileResultJson.data.PID+",Wnd:"+fileResultJson.data.Wnd,'openUrl info');
        }
        
        //使用chrome浏览器打开网址
        WrlOpenByChromeCallBack=function(fileResultJson){
        	if(fileResultJson.err!=undefined){
        		showmessage(fileResultJson.err+",请检查参数cid与tk是否正确",'request error');
        		return;
        	}
        	showmessage('ret='+fileResultJson.ret,'openFile ret');
        	showmessage("PID:"+fileResultJson.data.PID+",Wnd:"+fileResultJson.data.Wnd,'openUrl info');
        }
        
        //打开本地文件
        WrlOpenLocalFileCallBack=function(fileResultJson){
        	if(fileResultJson.err!=undefined){
        		showmessage(fileResultJson.err+",请检查参数cid与tk是否正确",'request error');
        		return;
        	}
        	showmessage('ret='+fileResultJson.ret,'openFile ret');
        	showmessage("Ret:"+fileResultJson.data.Ret,'openLocalFile info');
        }
        
        WrlUpdateCallBack=function(resultJson){
        	if(resultJson.ret!=undefined){
    			showmessage('ret='+resultJson.ret+",ExistVer="+resultJson.data.ExistVer,'wrlupdate');
    		}else if(resultJson.event!=undefined&&resultJson.event=="Wrl_Close"){
    			showmessage('event='+resultJson.event+",Desc="+resultJson.data.Desc,'wrlupdate');
    			//测试可以定时检测框架是否升级完成
    			var checkWsReadyFun=setInterval(function(){
    		        commonDllFun(
    		        	$('#input_protocol').val(),$('#input_hostname').val(),$('#input_port').val(),
    		        	$('#input_flag').val(),getRid(10),"","","",{"Mac":1},"Wrl_Version",true,
    		        	function(resultDataJson){
    						clearInterval(checkWsReadyFun);
    						showmessage("升级完成,请检测升级过程中是否出现错误。",'Wrl done');
                        }
    		        );
    			},10000);
    		}
        }
        
        WrlAuthUpdateCallBack=function(resultJson){
        	if(resultJson.ret!=undefined){
    			showmessage('ret='+resultJson.ret+",Desc="+resultJson.data.Desc,'wrlAuthUpdate');
    		}else if(resultJson.event!=undefined&&resultJson.event=="Wrl_Status"){
    			if(resultJson.event=="Wrl_Status"){
        			//showmessage("event="+resultJson.event,'wrlAuthUpdate event');
        			if(resultJson.data.Status==4){
        				showmessage("更新完成,Status:"+resultJson.data.Status+",Desc:"+resultJson.data.Desc,'wrlAuthUpdate result');
        				//测试可以定时检测框架是否升级完成
            			var checkWsReadyFun=setInterval(function(){
            		        commonDllFun(
            		        	$('#input_protocol').val(),$('#input_hostname').val(),$('#input_port').val(),
            		        	$('#input_flag').val(),getRid(10),"","","",{"Mac":1},"Wrl_Version",true,
            		        	function(resultDataJson){
            						clearInterval(checkWsReadyFun);
            						showmessage("升级完成,请检测升级过程中是否出现错误。",'Wrl done');
                                }
            		        );
            			},3000);
        			}
        		}
    		}        	
        }
        
        gotoTop();
        init();
        
    });
})(window);