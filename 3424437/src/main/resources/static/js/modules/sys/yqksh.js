

//菜单树
var menu_ztree;
var menu_setting = {
	data: {
		simpleData: {
			enable: true,
			idKey: "menuId",
			pIdKey: "parentId",
			rootPId: -1
		},
		key: {
			url:"nourl"
		}
	},
	check:{
		enable:true,
		nocheckInherit:true
	}
};

//部门结构树
var dept_ztree;
var dept_setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "deptId",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url:"nourl"
        }
    }
};

//数据树
var data_ztree;
var data_setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "deptId",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url:"nourl"
        }
    },
    check:{
        enable:true,
        nocheckInherit:true,
        chkboxType:{ "Y" : "", "N" : "" }
    }
};

var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
			dingdanName: null
		},
		importModle: true,
		showList: true,
		showDelect: true,
		title:null,
		equipmentList:{},
		allFiles:[],
		name:[],
		type:[],
		dbyfList: [
			{id:"day1",one:1,two:1,three:11},
			{id:"day2",one:7,two:40,three:49},
			{id:"day3",one:20,two:63,three:112},
			{id:"day4",one:34,two:84,three:270},
			{id:"day5",one:39,two:96,three:null},
			{id:"day6",one:50,two:118,three:null},
			{id:"day7",one:56,two:155,three:null},
			{id:"day8",one:69,two:174,three:null},
			{id:"day9",one:73,two:182,three:null},
			{id:"day10",one:74,two:189,three:null},
			{id:"day11",one:76,two:196,three:null},
			{id:"day12",one:76,two:202,three:null},
		],
		dingdan:{
			id:'',
			qcmc:'',
			bh:'',
			username:'',
			createdate:'',
			enddate:'',
			equipmentIdList:[],
			equipmentId:'',
			dingdanchild:[],
			deptName:[],
			deptid:'',
			files: [],
		}
	},
	mounted: function () {   //自动触发写入的函数
		// this.getMap();
		// this.getSjMap();
		// this.getBTData();
		// this.getZXTData();
		this.getData();
		this.getData1();
		// this.timer = setInterval(this.getData, 3000);//定时器，每3秒执行一次
	},
	methods: {
		getData1:function(){
			var param = {};
			$.ajax({
				type: "POST",
				url: baseURL + "sysTdx/getData1",
				contentType: "application/json",
				data: JSON.stringify(param),
				success: function(r){
					if(r.code == 0){
						//	alert(JSON.stringify(data));

						var data=r.data;
						var len=data.length;
						var dataZoomEnd = (5 / data.length) * 100
						//	alert(len);
						//循环前，先清空
						vm.name=[];
						vm.type=[];
						for(var i=0;i<len;i++){//循环遍历进行追加
							console.log("dddddddddd"+JSON.stringify(data[i]))
							vm.name.push(data[i].xuexiao);
							vm.type.push(data[i].skx);
							// vm.df.push(data[i].zdfpm);
						}

						// 基于准备好的dom，初始化echarts实例
						//var myChartzxt = echarts.init(document.getElementById('zxt'));
						// 指定图表的配置项和数据



						// 基于准备好的dom，初始化echarts实例
						var myChart = echarts.init(document.getElementById('main'));
						// 指定图表的配置项和数据
						myChart.setOption({
							title: {
								text: 'x:学校-y:省控线-柱状图'
							},
							tooltip: {},
							legend: {
								data: ['学校']
							},
							xAxis: {	//横坐标的值
								data: vm.name,
								axisLabel: {
									interval:0,
									rotate:50//角度顺时针计算的
								}
							},
							yAxis: {},
							series: [{	//纵坐标的值
								itemStyle: {
									normal: {
										//这里是颜色
										color: function(params) {
											//注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
											var colorList = ['#00A3E0','#FFA100', '#ffc0cb', '#CCCCCC', '#BBFFAA','#749f83', '#ca8622',
												'#00A3E0','#FFA100', '#ffc0cb', '#CCCCCC', '#BBFFAA','#749f83', '#ca8622',
												'#00A3E0','#FFA100', '#ffc0cb', '#CCCCCC', '#BBFFAA','#749f83', '#ca8622',
												'#00A3E0','#FFA100', '#ffc0cb', '#CCCCCC', '#BBFFAA','#749f83', '#ca8622',
												'#00A3E0','#FFA100', '#ffc0cb', '#CCCCCC', '#BBFFAA','#749f83', '#ca8622',
												'#00A3E0','#FFA100', '#ffc0cb', '#CCCCCC', '#BBFFAA','#749f83', '#ca8622',
												'#00A3E0','#FFA100', '#ffc0cb', '#CCCCCC', '#BBFFAA','#749f83', '#ca8622'];
											return colorList[params.dataIndex]
										}
									}
								},
								name: '省控线',
								type: 'bar',
								barWidth:'25',
								data: vm.type
							}],
							// 数据区域缩放组件配置
							dataZoom: [{
								type: 'inside',
								// 数据窗口范围的起始百分比
								start: 0,
								// 数据窗口范围的结束百分比
								end: dataZoomEnd,
								// 是否锁定选择区域（或叫做数据窗口）的大小，如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放
								zoomLock: true
							},
								// 手柄的icon相关配置
								{
									handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
									handleSize: '80%',
									handleStyle: {
										color: '#fff',
										shadowBlur: 3,
										shadowColor: 'rgba(0, 0, 0, 0.6)',
										shadowOffsetX: 2,
										shadowOffsetY: 2
									}
								}]
						});





						//循环前，先清空
						vm.name=[];
						vm.type=[];
						vm.datainfo = [];
						for(var i=0;i<len;i++){//循环遍历进行追加
							var param = {value: data[i].skx, name: data[i].xuexiao};
							vm.datainfo.push(param);
							// vm.name.push(data[i].name);
							// vm.type.push(data[i].qxxx);
						}

						// 基于准备好的dom，初始化echarts实例
						var weatherIcons = {
							'Sunny':  'https://echarts.apache.org/v4/examples/data/asset/img/weather/sunny_128.png',
							'Cloudy': 'https://echarts.apache.org/v4/examples/data/asset/img/weather/cloudy_128.png',
							'Showers': 'https://echarts.apache.org/v4/examples/data/asset/img/weather/showers_128.png'
						};


						var myChartbt = echarts.init(document.getElementById('bt'));
						// 指定图表的配置项和数据
						myChartbt.setOption({
							title: {
								text: '饼形图',
								subtext: '',
								left: 'center'
							},
							tooltip: {
								trigger: 'item',
								formatter: '{a} <br/>{b} : {c} ({d}%)'
							},
							legend: {
								// orient: 'vertical',
								// top: 'middle',
								bottom: 10,
								left: 'center',
								data: vm.name
							},
							series: [
								{
									type: 'pie',
									radius: '65%',
									center: ['50%', '50%'],
									selectedMode: 'single',
									// data: [
									// 	{value: 535, name: '测试'},
									// 	{value: 535, name: '荆州'},
									// 	{value: 510, name: '兖州'},
									// 	{value: 634, name: '益州'},
									// 	{value: 735, name: '西凉'}
									// ],
									data: vm.datainfo,
									emphasis: {
										itemStyle: {
											shadowBlur: 10,
											shadowOffsetX: 0,
											shadowColor: 'rgba(0, 0, 0, 0.5)'
										}
									}
								}
							]
						});
					}else{
						alert(r.msg);
					}
				}
			});

		},
		getData:function(){
			var param = {};
			$.ajax({
				type: "POST",
				url: baseURL + "sysYfyd/getData",
				contentType: "application/json",
				data: JSON.stringify(param),
				success: function(r){
					if(r.code == 0){
						//	alert(JSON.stringify(data));

						var data=r.data;
						var len=data.length;
						var dataZoomEnd = (5 / data.length) * 100
						//	alert(len);
						//循环前，先清空
						vm.name=[];
						vm.type=[];
						for(var i=0;i<len;i++){//循环遍历进行追加
							console.log("dddddddddd"+JSON.stringify(data[i]))
							vm.name.push(data[i].fs);
							vm.type.push(data[i].bdrs);
							// vm.df.push(data[i].zdfpm);
						}

						// 基于准备好的dom，初始化echarts实例
						var myChartzxt = echarts.init(document.getElementById('zxt'));
						// 指定图表的配置项和数据
						myChartzxt.setOption({
							title: {
								text: 'x:分数-y:本段人数-折线图'
							},
							tooltip: {},
							legend: {
								data: ['分数']
							},
							xAxis: {
								type: 'category',
								data: vm.name,
								axisLabel: {
									interval:0,
									rotate:50//角度顺时针计算的
								}
								// data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
							},
							yAxis: {
								type: 'value'
							},
							series: [{
								lineStyle: { // 设置线条的style等
									normal: {
										color: 'blue', // 折线线条颜色:红色
									},
								},
								name: '本段人数',
								data: vm.type,
								type: 'line'
							}],
							// 数据区域缩放组件配置
							dataZoom: [{
								type: 'inside',
								// 数据窗口范围的起始百分比
								start: 0,
								// 数据窗口范围的结束百分比
								end: dataZoomEnd,
								// 是否锁定选择区域（或叫做数据窗口）的大小，如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放
								zoomLock: true
							},
								// 手柄的icon相关配置
								{
									handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
									handleSize: '80%',
									handleStyle: {
										color: '#fff',
										shadowBlur: 3,
										shadowColor: 'rgba(0, 0, 0, 0.6)',
										shadowOffsetX: 2,
										shadowOffsetY: 2
									}
								}]
						});


						// 基于准备好的dom，初始化echarts实例
						var myChart = echarts.init(document.getElementById('main'));
						// 指定图表的配置项和数据






						//循环前，先清空
						vm.name=[];
						vm.type=[];
						vm.datainfo = [];
						for(var i=0;i<len;i++){//循环遍历进行追加
							var param = {value: data[i].skx, name: data[i].xuexiao};
							vm.datainfo.push(param);
							// vm.name.push(data[i].name);
							// vm.type.push(data[i].qxxx);
						}

						// 基于准备好的dom，初始化echarts实例
						var weatherIcons = {
							'Sunny':  'https://echarts.apache.org/v4/examples/data/asset/img/weather/sunny_128.png',
							'Cloudy': 'https://echarts.apache.org/v4/examples/data/asset/img/weather/cloudy_128.png',
							'Showers': 'https://echarts.apache.org/v4/examples/data/asset/img/weather/showers_128.png'
						};


						var myChartbt = echarts.init(document.getElementById('bt'));
						// 指定图表的配置项和数据
						myChartbt.setOption({
							title: {
								text: '饼形图',
								subtext: '',
								left: 'center'
							},
							tooltip: {
								trigger: 'item',
								formatter: '{a} <br/>{b} : {c} ({d}%)'
							},
							legend: {
								// orient: 'vertical',
								// top: 'middle',
								bottom: 10,
								left: 'center',
								data: vm.name
							},
							series: [
								{
									type: 'pie',
									radius: '65%',
									center: ['50%', '50%'],
									selectedMode: 'single',
									// data: [
									// 	{value: 535, name: '测试'},
									// 	{value: 535, name: '荆州'},
									// 	{value: 510, name: '兖州'},
									// 	{value: 634, name: '益州'},
									// 	{value: 735, name: '西凉'}
									// ],
									data: vm.datainfo,
									emphasis: {
										itemStyle: {
											shadowBlur: 10,
											shadowOffsetX: 0,
											shadowColor: 'rgba(0, 0, 0, 0.5)'
										}
									}
								}
							]
						});
					}else{
						alert(r.msg);
					}
				}
			});

		},

		// getData:function(){
		// 	var param = {};
		// 	$.ajax({
		// 		type: "POST",
		// 		url: baseURL + "sysTdx/getData",
		// 		contentType: "application/json",
		// 		data: JSON.stringify(param),
		// 		success: function(r){
		// 			if(r.code == 0){
		// 			//	alert(JSON.stringify(data));
		//
		// 				var data=r.data;
		// 				var len=data.length;
		// 				var dataZoomEnd = (5 / data.length) * 100
		// 				//	alert(len);
		// 				//循环前，先清空
		// 				vm.name=[];
		// 				vm.type=[];
		//
		// 				for(var i=0;i<len;i++){//循环遍历进行追加
		// 					console.log("dddddddddd"+JSON.stringify(data[i]))
		// 					vm.name.push(data[i].xuexiao);
		// 					vm.type.push(data[i].skx);
		// 				}
		//
		// 				// 基于准备好的dom，初始化echarts实例
		// 				var myChartzxt = echarts.init(document.getElementById('zxt'));
		// 				// 指定图表的配置项和数据
		// 				myChartzxt.setOption({
		// 					title: {
		// 						text: '学校与省控线折线图可视化'
		// 					},
		// 					tooltip: {},
		// 					legend: {
		// 						data: ['学校']
		// 					},
		// 					xAxis: {
		// 						type: 'category',
		// 						data: vm.name,
		// 						axisLabel: {
		// 							interval:0,
		// 							rotate:50//角度顺时针计算的
		// 						}
		// 						// data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		// 					},
		// 					yAxis: {
		// 						type: 'value'
		// 					},
		// 					series: [{
		// 						lineStyle: { // 设置线条的style等
		// 							normal: {
		// 								color: 'blue', // 折线线条颜色:红色
		// 							},
		// 						},
		// 						name: '省控线',
		// 						data: vm.type,
		// 						type: 'line'
		// 					}],
		// 					// 数据区域缩放组件配置
		// 					dataZoom: [{
		// 						type: 'inside',
		// 						// 数据窗口范围的起始百分比
		// 						start: 0,
		// 						// 数据窗口范围的结束百分比
		// 						end: dataZoomEnd,
		// 						// 是否锁定选择区域（或叫做数据窗口）的大小，如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放
		// 						zoomLock: true
		// 					},
		// 						// 手柄的icon相关配置
		// 						{
		// 							handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
		// 							handleSize: '80%',
		// 							handleStyle: {
		// 								color: '#fff',
		// 								shadowBlur: 3,
		// 								shadowColor: 'rgba(0, 0, 0, 0.6)',
		// 								shadowOffsetX: 2,
		// 								shadowOffsetY: 2
		// 							}
		// 						}]
		// 				});
		//
		//
		//
		//
		//
		// 				// 基于准备好的dom，初始化echarts实例
		// 				var myChart = echarts.init(document.getElementById('main'));
		// 				// 指定图表的配置项和数据
		// 				myChart.setOption({
		// 					title: {
		// 						text: '学校与省控线柱状图可视化'
		// 					},
		//
		// 					tooltip: {},
		// 					legend: {
		// 						data: ['学校']
		// 					},
		// 					xAxis: {	//横坐标的值
		// 						data: vm.name,
		// 						axisLabel: {
		// 							interval:0,
		// 							rotate:50//角度顺时针计算的
		// 						}
		// 					},
		// 					yAxis: {},
		// 					series: [{	//纵坐标的值
		// 						itemStyle: {
		// 							normal: {
		// 								//这里是颜色
		// 								color: function(params) {
		// 									//注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
		// 									var colorList = ['#00A3E0','#FFA100', '#ffc0cb', '#CCCCCC', '#BBFFAA','#749f83', '#ca8622',
		// 										'#00A3E0','#FFA100', '#ffc0cb', '#CCCCCC', '#BBFFAA','#749f83', '#ca8622',
		// 										'#00A3E0','#FFA100', '#ffc0cb', '#CCCCCC', '#BBFFAA','#749f83', '#ca8622',
		// 										'#00A3E0','#FFA100', '#ffc0cb', '#CCCCCC', '#BBFFAA','#749f83', '#ca8622',
		// 										'#00A3E0','#FFA100', '#ffc0cb', '#CCCCCC', '#BBFFAA','#749f83', '#ca8622',
		// 										'#00A3E0','#FFA100', '#ffc0cb', '#CCCCCC', '#BBFFAA','#749f83', '#ca8622',
		// 										'#00A3E0','#FFA100', '#ffc0cb', '#CCCCCC', '#BBFFAA','#749f83', '#ca8622'];
		// 									return colorList[params.dataIndex]
		// 								}
		// 							}
		// 						},
		// 						name: '省控线',
		// 						type: 'bar',
		// 						barWidth:'25',
		// 						data: vm.type
		// 					}],
		// 					// 数据区域缩放组件配置
		// 					dataZoom: [{
		// 						type: 'inside',
		// 						// 数据窗口范围的起始百分比
		// 						start: 0,
		// 						// 数据窗口范围的结束百分比
		// 						end: dataZoomEnd,
		// 						// 是否锁定选择区域（或叫做数据窗口）的大小，如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放
		// 						zoomLock: true
		// 					},
		// 						// 手柄的icon相关配置
		// 						{
		// 							handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
		// 							handleSize: '80%',
		// 							handleStyle: {
		// 								color: '#fff',
		// 								shadowBlur: 3,
		// 								shadowColor: 'rgba(0, 0, 0, 0.6)',
		// 								shadowOffsetX: 2,
		// 								shadowOffsetY: 2
		// 							}
		// 						}]
		// 				});
		//
		//
		//
		//
		//
		// 				//循环前，先清空
		// 				vm.name=[];
		// 				vm.type=[];
		// 				vm.datainfo = [];
		// 				for(var i=0;i<len;i++){//循环遍历进行追加
		// 					var param = {value: data[i].skx, name: data[i].xuexiao};
		// 					vm.datainfo.push(param);
		// 					// vm.name.push(data[i].name);
		// 					// vm.type.push(data[i].qxxx);
		// 				}
		//
		// 				// 基于准备好的dom，初始化echarts实例
		// 				var weatherIcons = {
		// 					'Sunny':  'https://echarts.apache.org/v4/examples/data/asset/img/weather/sunny_128.png',
		// 					'Cloudy': 'https://echarts.apache.org/v4/examples/data/asset/img/weather/cloudy_128.png',
		// 					'Showers': 'https://echarts.apache.org/v4/examples/data/asset/img/weather/showers_128.png'
		// 				};
		//
		//
		// 				var myChartbt = echarts.init(document.getElementById('bt'));
		// 				// 指定图表的配置项和数据
		// 				myChartbt.setOption({
		// 					title: {
		// 						text: '饼形图',
		// 						subtext: '',
		// 						left: 'center'
		// 					},
		// 					tooltip: {
		// 						trigger: 'item',
		// 						formatter: '{a} <br/>{b} : {c} ({d}%)'
		// 					},
		// 					legend: {
		// 						// orient: 'vertical',
		// 						// top: 'middle',
		// 						bottom: 10,
		// 						left: 'center',
		// 						data: vm.name
		// 					},
		// 					series: [
		// 						{
		// 							type: 'pie',
		// 							radius: '65%',
		// 							center: ['50%', '50%'],
		// 							selectedMode: 'single',
		//
		// 							data: vm.datainfo,
		// 							emphasis: {
		// 								itemStyle: {
		// 									shadowBlur: 10,
		// 									shadowOffsetX: 0,
		// 									shadowColor: 'rgba(0, 0, 0, 0.5)'
		// 								}
		// 							}
		// 						}
		// 					]
		// 				});
		// 			}else{
		// 				alert(r.msg);
		// 			}
		// 		}
		// 	});
		//
		// },

		deleteFile: function(id) {
			if(id == null) {
				alert("请选择要删除的文件!");
				return;
			}
			vm.deleteFles = {"id":id};
			confirm('确定要删除该记录？', function(){
				$.ajax({
					type: "POST",
					url: baseURL + "tMaterialFile/deleteByFileId",
					contentType: "application/json",
					data: JSON.stringify(vm.deleteFles),
					success: function(r){
						if(r.code == 0){
							alert('文件删除成功', function(){
								vm.reload();
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		download: function (id) {
			console.log("id)id)id)id)" + id)
			$.get(baseURL + "tMaterialFile/ishSingleFile/" + id, function (r) {
				if (r.code == 0) {
					if (r.fileName != '无下载文件' && r.fileName != '文件不存在') {
						var url = baseURL + "tMaterialFile/downFile?id=" + id + "&token=" + token;
						window.location.href = url;
					} else {
						alert(r.fileName)
					}
				}
			});
		},
		saveFile: function () {
			var value = document.querySelectorAll('*[name="abc"]')
			$("#box").val(value);
			$("#myModalPreachData").modal('hide');
		},
		openPreachData: function () {
			$("#myModalPreachData").modal('show');
		},
		shutdowPreach: function () {
			$("#myModalPreachData").modal('hide');
		},
		importFile: function () {
			if ($("#fileList").val() == null || $("#fileList").val() == "") {
				alert("请选择具体附件再上传!");
				return;
			}
			var form = document.getElementById('upload');
			$.ajax({
				url: baseURL + "tMaterialFile/importPsot",
				type: 'post',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (r) {
					console.log(JSON.stringify(r))
					if (r.msg == 'false') {
						alert('您不具备上传该密级条件');
						return;
					}
					if (r.msg == 'false1') {
						alert('密标程序未启动');
						return;
					}
					var obj = new Object();
					$("#fileList").val("");
					obj['id'] = r.id;
					obj['filePath'] = r.path;
					obj['fileName'] = r.fileName;
					obj['mbfklj'] = r.mbfklj;
					vm.allFiles.push(obj);
					vm.dingdan.files = vm.allFiles;
					alert("导入成功！");
				},
				error: function () {
					alert("导入失败！");
				}
			})
		},
		query: function () {
			vm.reload();
		},
		pq: function () {
			var param ={}
			$.ajax({
				type: "POST",
				url: baseURL + "sysTdx/pq",
				contentType: "application/json",
				data: JSON.stringify(param),
				success: function(r){
					if(r.code == 0){
						alert('操作成功', function(){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},

		add: function(){
			vm.showList = false;
			vm.equipmentList = {};
			vm.title = "新增";
			vm.dingdan = {deptName:null, deptId:null};
			vm.getDept();
		},
		update: function () {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			
			vm.showList = false;
            vm.title = "修改";
			vm.getDingdan(id)
		},
		del: function () {
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sysTdx/delete",
                    contentType: "application/json",
				    data: JSON.stringify(ids),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(){
								vm.reload();
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getDingdan: function(dingdanId){
            $.get(baseURL + "sysTdx/info/"+dingdanId, function(r){
            	vm.dingdan = r.dingdan;
				vm.getDept();
    		});
		},
		saveOrUpdate: function () {
			var url = vm.dingdan.id == null ? "sysTdx/save" : "sysTdx/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.dingdan),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		getMenuTree: function(id) {
			//加载菜单树
			$.get(baseURL + "sys/menu/list", function(r){
				menu_ztree = $.fn.zTree.init($("#menuTree"), menu_setting, r);
				//展开所有节点
				menu_ztree.expandAll(true);
				
				if(id != null){
					vm.getDingdan(id);
				}
			});
	    },
        getDataTree: function(id) {
            //加载菜单树
            $.get(baseURL + "sys/dept/list", function(r){
                data_ztree = $.fn.zTree.init($("#dataTree"), data_setting, r);
                //展开所有节点
                data_ztree.expandAll(true);
            });
        },

        getDept: function(){
            //加载部门树
            $.get(baseURL + "sys/dept/list", function(r){
                dept_ztree = $.fn.zTree.init($("#deptTree"), dept_setting, r);
                var node = dept_ztree.getNodeByParam("deptId", vm.dingdan.deptid);
                if(node != null){
                    dept_ztree.selectNode(node);

                    vm.dingdan.deptName = node.name;
                }
            })
        },
        deptTree: function(){
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择部门",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#deptLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = dept_ztree.getSelectedNodes();
                    //选择上级部门
                    vm.dingdan.deptid = node[0].deptId;
                    vm.dingdan.deptName = node[0].name;

                    layer.close(index);
                }
            });
        },
	    reload: function () {
	    	vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'name': vm.q.dingdanName},
                page:page
            }).trigger("reloadGrid");
		},

	}
});

laydate.render({
	elem: '#pqrq', //指定元素
	format:'yyyy-MM-dd HH:mm:ss',
	//日期时间选择器
	type: 'datetime',
	done: function(value, date, endDate){
		vm.dingdan.pqrq= value;
	}
});

laydate.render({
	elem: '#enddateTime', //指定元素
	format:'yyyy-MM-dd HH:mm:ss',
	//日期时间选择器
	type: 'datetime',
	done: function(value, date, endDate){
		vm.dingdan.enddate= value;
	}
});