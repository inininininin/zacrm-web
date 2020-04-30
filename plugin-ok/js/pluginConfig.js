var pluginList=[
	{
		"id":"wrl",
		"name":"框架",
		"enable":true,
		"type":1,
		"pid":"",
		"functions":[
			{
				"id":"WrlVersion",
				"name":"版本",
				"enable":true,
				"pid":"",
				"isRequiredConfirm":false,
				"isRequiredTk":false,
				"needCloseSocket":true,
				"req":"Wrl_Version",
				"param":{"Mac":1,"More":1},
				"paramRemark":{
                    "Mac":"是否取Mac,0:否;1:是"
                },
				"callFun":"WrlVersionCallBack"
			},
			{
				"id":"WrlOpenUrlByIE",
				"name":"IE打开",
				"enable":true,
				"pid":"",
				"isRequiredConfirm":false,
				"isRequiredTk":false,
				"needCloseSocket":true,
				"req":"Wrl_OpenUrl",
				"param":{
					"Type":"1",
					"Url":"http://www.zorrosoft.com",
					"Flag":"9000"
				},
				"paramRemark":{
                    "Type":"固定为1,指定使用IE浏览器打开",
                    "Url":"需要打开的网址",
                    "Flag":"9000:强制用IE9兼容模式,9999:IE9标准模式",
                    "备注说明":"此功能仅支持PluginOK1.1.1.5版本及以上"
                },
				"callFun":"WrlOpenByIECallBack"
			},
			{
				"id":"WrlOpenUrlByChrome",
				"name":"Chrome打开",
				"enable":true,
				"pid":"",
				"isRequiredConfirm":false,
				"isRequiredTk":false,
				"needCloseSocket":true,
				"req":"Wrl_OpenUrl",
				"param":{
					"Type":"2",
					"Url":"http://www.zorrosoft.com",
					"Flag":"1"
				},
				"paramRemark":{
                    "Type":"固定为2,指定使用chrome浏览器打开",
                    "Url":"需要打开的网址",
                    "Flag":"1:新窗口打开，否则是新标签打开",
                    "备注说明":"此功能仅支持PluginOK1.1.1.5版本及以上"
                },
				"callFun":"WrlOpenByChromeCallBack"
			},
			{
				"id":"WrlOpenLocalFile",
				"name":"打开本地文件",
				"enable":true,
				"pid":"",
				"isRequiredConfirm":false,
				"isRequiredTk":false,
				"needCloseSocket":true,
				"req":"Wrl_OpenFile",
				"param":{
					"File":"C:/temp/1.pptx"
				},
				"paramRemark":{
                    "File":"需要打开的本地文件路径",
                    "备注说明":"此功能仅支持PluginOK1.1.1.5版本及以上"
                },
				"callFun":"WrlOpenLocalFileCallBack"
			},
			{
				"id":"WrlUpdate",
				"name":"更新",
				"enable":true,
				"pid":"",
				"isRequiredConfirm":true,
				"isRequiredTk":false,
				"needCloseSocket":true,
				"req":"Wrl_Update",
                "param":{},
				"paramRemark":{
                    "Name": "框架名称",
                    "Date": "发布日期",
                    "Version": "版本号",
                    "Desc": "框架描述信息",
                    "MD5": "框架下载文件的MD5",
                    "Size": "文件大小",
                    "Cookie":"下载需要登录的Cookie",
                    "Auth":"微服务需要的认证头部信息",
                    "DownAddr": "文件下载的地址",
                    "TK": "更新框架时需要验证的TK"
                },
				"callFun":"WrlUpdateCallBack"
			},
			{
				"id":"WrlUpdateAuth",
				"name":"更新授权",
				"enable":true,
				"pid":"",
				"isRequiredConfirm":true,
				"isRequiredTk":false,
				"needCloseSocket":false,
				"req":"Wrl_UpdateAuth",
                "param":{},
				"paramRemark":{
                    "Url": "授权文件下载地址",
                    "MD5": "框架下载文件的MD5",
                    "Size": "文件大小",
                    "Cookie":"下载需要登录的Cookie",
                    "Auth":"微服务需要的认证头部信息",
                    "备注说明":"此功能仅支持PluginOK1.0.9.15版本及以上"
                },
				"callFun":"WrlAuthUpdateCallBack"
			}
		]
	},
	{
		"id":"plugin",
		"name":"插件",
		"enable":true,
		"type":1,
		"pid":"",
		"functions":[
			{
				"id":"PluginInstall",
				"name":"插件安装",
				"enable":true,
				"pid":"",
				"isRequiredConfirm":true,
				"isRequiredTk":false,
				"needCloseSocket":false,
				"req":"Plugin_Install",
				"param":"",
				"paramRemark":{
                    "Name": "插件名称",
                    "PID":"插件PID",
                    "Date": "发布日期",
                    "Desc": "插件描述信息",
                    "DownAddr": "插件下载的地址",
                    "MD5": "插件安装文件的MD5",
                    "Version": "插件版本号",
                    "Size": "插件安装文件大小",
                    "Type":"插件类型,1:无界面;2:带界面",
                    "Cookie":"下载需要登录的Cookie",
                    "Auth":"微服务需要的认证头部信息",
                    "TK": "安装插件需要验证的TK"
                },
				"callFun":"PluginInstallCallBack"
			},
			{
				"id":"PluginUpdate",
				"name":"插件更新",
				"enable":true,
				"pid":"",
				"isRequiredConfirm":true,
				"isRequiredTk":false,
				"needCloseSocket":false,
				"req":"Plugin_Update",
				"param":"",
				"paramRemark":{
                    "Name": "插件名称",
                    "PID":"插件PID",
                    "Date": "发布日期",
                    "Desc": "插件更新描述信息",
                    "DownAddr": "插件下载的地址",
                    "MD5": "插件更新文件的MD5",
                    "Version": "插件版本号",
                    "Size": "插件更新文件大小",
                    "Type":"插件类型,1:无界面;2:带界面",
                    "Cookie":"下载需要登录的Cookie",
                    "Auth":"微服务需要的认证头部信息",
                    "TK": "更新插件需要验证的TK"
                },
				"callFun":"PluginUpdateCallBack"
			},
			{
				"id":"PluginRemove",
				"name":"插件移除",
				"enable":true,
				"pid":"",
				"isRequiredConfirm":true,
				"isRequiredTk":false,
				"needCloseSocket":true,
				"req":"Plugin_Remove",
				"param":{"PID":"插件PID","Type":1,"TK":""},
				"paramRemark":{
                    "PID":"插件PID",
                    "TK":"卸载插件需要的TK"
                },
				"callFun":"PluginRemoveCallBack"
			},
			{
				"id":"PluginExist",
				"name":"插件存在",
				"enable":true,
				"pid":"",
				"isRequiredConfirm":false,
				"isRequiredTk":false,
				"needCloseSocket":true,
				"req":"Plugin_Exist",
				"param":{"PID":"插件PID"},
				"paramRemark":{
                    "PID":"插件PID"
                },
				"callFun":"PluginExistCallBack"
			},
			{
				"id":"PluginList",
				"name":"插件列表",
				"enable":true,
				"pid":"",
				"isRequiredConfirm":false,
				"isRequiredTk":false,
				"needCloseSocket":true,
				"req":"Plugin_List",
				"param":{"Detail":0},
				"paramRemark":"",
				"callFun":"PluginListCallBack"
			},
			{
				"id":"PluginRefresh",
				"name":"重载插件",
				"enable":true,
				"pid":"",
				"isRequiredConfirm":false,
				"isRequiredTk":false,
				"needCloseSocket":true,
				"req":"Plugin_Refresh",
				"param":{"PID":"插件PID"},
				"paramRemark":{
					"PID":"插件PID",
					"备注说明":"此功能仅支持PluginOK1.1.1.5版本及以上"
				},
				"callFun":"PluginRefreshCallBack"
			}
		]
	}
];