$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sysSfcsgl/list',
        datatype: "json",
        colModel: [
            {label: 'ID', name: 'id', index: "id", width: 45, key: true},
            {label: '名称', name: 'name', index: "name", width: 100},
            { label: '类型', name: 'type', width: 80,
                formatter: function(value, options, row){
                    if(value === "1"){
                        return '<span class="label label-success">省份</span>';
                    }else{
                        return '<span class="label label-success">城市</span>';
                    }
                }
            },
            {label: '父单位id', name: 'parintid', index: "parintid", width: 100},
            {label: '父单位', name: 'parintname', index: "parintid", width: 100},
            {label: '创建时间', name: 'createtime', index: "createtime", width: 100},

        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader: {
            root: "page.records",
            page: "page.current",
            total: "page.pages",
            records: "page.total"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        },
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
        }
    });
});

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
            url: "nourl"
        }
    },
    check: {
        enable: true,
        nocheckInherit: true
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
            url: "nourl"
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
            url: "nourl"
        }
    },
    check: {
        enable: true,
        nocheckInherit: true,
        chkboxType: {"Y": "", "N": ""}
    }
};

var vm = new Vue({
    el: '#rrapp',
    data: {
        q: {
            sfcsglName: null
        },
        importModle: true,
        showList: true,
        showDelect: true,
        title: null,
        sfview: false,
        equipmentList: {},
        allFiles: [],
        sfs: [],
        sfzsyms: [{"id": "1", "name": "是"}, {"id": "2", "name": "否"}, {"id": "3", "name": "未知"}],
        types: [{"id": "1", "name": "省份"}, {"id": "2", "name": "城市"}],
        jkzts: [{"id": "1", "name": "健康"}, {"id": "2", "name": "一般"}, {"id": "3", "name": "病危"}],
        sfcsgl: {
            id: '',
            qcmc: '',
            bh: '',
            username: '',
            createdate: '',
            enddate: '',
            equipmentIdList: [],
            equipmentId: '',
            sfcsglchild: [],
            deptName: [],
            deptid: '',
            files: [],
        }
    },
    methods: {
        deleteFile: function (id) {
            if (id == null) {
                alert("请选择要删除的文件!");
                return;
            }
            vm.deleteFles = {"id": id};
            confirm('确定要删除该记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "tMaterialFile/deleteByFileId",
                    contentType: "application/json",
                    data: JSON.stringify(vm.deleteFles),
                    success: function (r) {
                        if (r.code == 0) {
                            alert('文件删除成功', function () {
                                vm.reload();
                            });
                        } else {
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
                    vm.sfcsgl.files = vm.allFiles;
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
        add: function () {
            vm.showList = false;
            vm.equipmentList = {};
            vm.title = "新增";
            vm.sfcsgl = {deptName: null, deptId: null};
            vm.sfview = false;
            vm.getDept();
        },
        setData: function () {
            var json = [
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "东城区"
                                },
                                {
                                    "area": "西城区"
                                },
                                {
                                    "area": "朝阳区"
                                },
                                {
                                    "area": "丰台区"
                                },
                                {
                                    "area": "石景山区"
                                },
                                {
                                    "area": "海淀区"
                                },
                                {
                                    "area": "门头沟区"
                                },
                                {
                                    "area": "房山区"
                                },
                                {
                                    "area": "通州区"
                                },
                                {
                                    "area": "顺义区"
                                },
                                {
                                    "area": "昌平区"
                                },
                                {
                                    "area": "大兴区"
                                },
                                {
                                    "area": "怀柔区"
                                },
                                {
                                    "area": "平谷区"
                                },
                                {
                                    "area": "密云区"
                                },
                                {
                                    "area": "延庆区"
                                }
                            ],
                            "city": "北京市"
                        }
                    ],
                    "province": "北京市"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "和平区"
                                },
                                {
                                    "area": "河东区"
                                },
                                {
                                    "area": "河西区"
                                },
                                {
                                    "area": "南开区"
                                },
                                {
                                    "area": "河北区"
                                },
                                {
                                    "area": "红桥区"
                                },
                                {
                                    "area": "东丽区"
                                },
                                {
                                    "area": "西青区"
                                },
                                {
                                    "area": "津南区"
                                },
                                {
                                    "area": "北辰区"
                                },
                                {
                                    "area": "武清区"
                                },
                                {
                                    "area": "宝坻区"
                                },
                                {
                                    "area": "滨海新区"
                                },
                                {
                                    "area": "宁河区"
                                },
                                {
                                    "area": "静海区"
                                },
                                {
                                    "area": "蓟州区"
                                }
                            ],
                            "city": "天津市"
                        }
                    ],
                    "province": "天津市"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "长安区"
                                },
                                {
                                    "area": "桥西区"
                                },
                                {
                                    "area": "新华区"
                                },
                                {
                                    "area": "井陉矿区"
                                },
                                {
                                    "area": "裕华区"
                                },
                                {
                                    "area": "藁城区"
                                },
                                {
                                    "area": "鹿泉区"
                                },
                                {
                                    "area": "栾城区"
                                },
                                {
                                    "area": "井陉县"
                                },
                                {
                                    "area": "正定县"
                                },
                                {
                                    "area": "行唐县"
                                },
                                {
                                    "area": "灵寿县"
                                },
                                {
                                    "area": "高邑县"
                                },
                                {
                                    "area": "深泽县"
                                },
                                {
                                    "area": "赞皇县"
                                },
                                {
                                    "area": "无极县"
                                },
                                {
                                    "area": "平山县"
                                },
                                {
                                    "area": "元氏县"
                                },
                                {
                                    "area": "赵县"
                                },
                                {
                                    "area": "辛集市"
                                },
                                {
                                    "area": "晋州市"
                                },
                                {
                                    "area": "新乐市"
                                }
                            ],
                            "city": "石家庄市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "路南区"
                                },
                                {
                                    "area": "路北区"
                                },
                                {
                                    "area": "古冶区"
                                },
                                {
                                    "area": "开平区"
                                },
                                {
                                    "area": "丰南区"
                                },
                                {
                                    "area": "丰润区"
                                },
                                {
                                    "area": "曹妃甸区"
                                },
                                {
                                    "area": "滦南县"
                                },
                                {
                                    "area": "乐亭县"
                                },
                                {
                                    "area": "迁西县"
                                },
                                {
                                    "area": "玉田县"
                                },
                                {
                                    "area": "遵化市"
                                },
                                {
                                    "area": "迁安市"
                                },
                                {
                                    "area": "滦州市"
                                }
                            ],
                            "city": "唐山市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "海港区"
                                },
                                {
                                    "area": "山海关区"
                                },
                                {
                                    "area": "北戴河区"
                                },
                                {
                                    "area": "抚宁区"
                                },
                                {
                                    "area": "青龙满族自治县"
                                },
                                {
                                    "area": "昌黎县"
                                },
                                {
                                    "area": "卢龙县"
                                }
                            ],
                            "city": "秦皇岛市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "邯山区"
                                },
                                {
                                    "area": "丛台区"
                                },
                                {
                                    "area": "复兴区"
                                },
                                {
                                    "area": "峰峰矿区"
                                },
                                {
                                    "area": "肥乡区"
                                },
                                {
                                    "area": "永年区"
                                },
                                {
                                    "area": "临漳县"
                                },
                                {
                                    "area": "成安县"
                                },
                                {
                                    "area": "大名县"
                                },
                                {
                                    "area": "涉县"
                                },
                                {
                                    "area": "磁县"
                                },
                                {
                                    "area": "邱县"
                                },
                                {
                                    "area": "鸡泽县"
                                },
                                {
                                    "area": "广平县"
                                },
                                {
                                    "area": "馆陶县"
                                },
                                {
                                    "area": "魏县"
                                },
                                {
                                    "area": "曲周县"
                                },
                                {
                                    "area": "武安市"
                                }
                            ],
                            "city": "邯郸市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "襄都区"
                                },
                                {
                                    "area": "信都区"
                                },
                                {
                                    "area": "任泽区"
                                },
                                {
                                    "area": "南和区"
                                },
                                {
                                    "area": "临城县"
                                },
                                {
                                    "area": "内丘县"
                                },
                                {
                                    "area": "柏乡县"
                                },
                                {
                                    "area": "隆尧县"
                                },
                                {
                                    "area": "宁晋县"
                                },
                                {
                                    "area": "巨鹿县"
                                },
                                {
                                    "area": "新河县"
                                },
                                {
                                    "area": "广宗县"
                                },
                                {
                                    "area": "平乡县"
                                },
                                {
                                    "area": "威县"
                                },
                                {
                                    "area": "清河县"
                                },
                                {
                                    "area": "临西县"
                                },
                                {
                                    "area": "南宫市"
                                },
                                {
                                    "area": "沙河市"
                                }
                            ],
                            "city": "邢台市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "竞秀区"
                                },
                                {
                                    "area": "莲池区"
                                },
                                {
                                    "area": "满城区"
                                },
                                {
                                    "area": "清苑区"
                                },
                                {
                                    "area": "徐水区"
                                },
                                {
                                    "area": "涞水县"
                                },
                                {
                                    "area": "阜平县"
                                },
                                {
                                    "area": "定兴县"
                                },
                                {
                                    "area": "唐县"
                                },
                                {
                                    "area": "高阳县"
                                },
                                {
                                    "area": "容城县"
                                },
                                {
                                    "area": "涞源县"
                                },
                                {
                                    "area": "望都县"
                                },
                                {
                                    "area": "安新县"
                                },
                                {
                                    "area": "易县"
                                },
                                {
                                    "area": "曲阳县"
                                },
                                {
                                    "area": "蠡县"
                                },
                                {
                                    "area": "顺平县"
                                },
                                {
                                    "area": "博野县"
                                },
                                {
                                    "area": "雄县"
                                },
                                {
                                    "area": "涿州市"
                                },
                                {
                                    "area": "定州市"
                                },
                                {
                                    "area": "安国市"
                                },
                                {
                                    "area": "高碑店市"
                                }
                            ],
                            "city": "保定市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "桥东区"
                                },
                                {
                                    "area": "桥西区"
                                },
                                {
                                    "area": "宣化区"
                                },
                                {
                                    "area": "下花园区"
                                },
                                {
                                    "area": "万全区"
                                },
                                {
                                    "area": "崇礼区"
                                },
                                {
                                    "area": "张北县"
                                },
                                {
                                    "area": "康保县"
                                },
                                {
                                    "area": "沽源县"
                                },
                                {
                                    "area": "尚义县"
                                },
                                {
                                    "area": "蔚县"
                                },
                                {
                                    "area": "阳原县"
                                },
                                {
                                    "area": "怀安县"
                                },
                                {
                                    "area": "怀来县"
                                },
                                {
                                    "area": "涿鹿县"
                                },
                                {
                                    "area": "赤城县"
                                }
                            ],
                            "city": "张家口市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "双桥区"
                                },
                                {
                                    "area": "双滦区"
                                },
                                {
                                    "area": "鹰手营子矿区"
                                },
                                {
                                    "area": "承德县"
                                },
                                {
                                    "area": "兴隆县"
                                },
                                {
                                    "area": "滦平县"
                                },
                                {
                                    "area": "隆化县"
                                },
                                {
                                    "area": "丰宁满族自治县"
                                },
                                {
                                    "area": "宽城满族自治县"
                                },
                                {
                                    "area": "围场满族蒙古族自治县"
                                },
                                {
                                    "area": "平泉市"
                                }
                            ],
                            "city": "承德市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "新华区"
                                },
                                {
                                    "area": "运河区"
                                },
                                {
                                    "area": "沧县"
                                },
                                {
                                    "area": "青县"
                                },
                                {
                                    "area": "东光县"
                                },
                                {
                                    "area": "海兴县"
                                },
                                {
                                    "area": "盐山县"
                                },
                                {
                                    "area": "肃宁县"
                                },
                                {
                                    "area": "南皮县"
                                },
                                {
                                    "area": "吴桥县"
                                },
                                {
                                    "area": "献县"
                                },
                                {
                                    "area": "孟村回族自治县"
                                },
                                {
                                    "area": "泊头市"
                                },
                                {
                                    "area": "任丘市"
                                },
                                {
                                    "area": "黄骅市"
                                },
                                {
                                    "area": "河间市"
                                }
                            ],
                            "city": "沧州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "安次区"
                                },
                                {
                                    "area": "广阳区"
                                },
                                {
                                    "area": "固安县"
                                },
                                {
                                    "area": "永清县"
                                },
                                {
                                    "area": "香河县"
                                },
                                {
                                    "area": "大城县"
                                },
                                {
                                    "area": "文安县"
                                },
                                {
                                    "area": "大厂回族自治县"
                                },
                                {
                                    "area": "霸州市"
                                },
                                {
                                    "area": "三河市"
                                }
                            ],
                            "city": "廊坊市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "桃城区"
                                },
                                {
                                    "area": "冀州区"
                                },
                                {
                                    "area": "枣强县"
                                },
                                {
                                    "area": "武邑县"
                                },
                                {
                                    "area": "武强县"
                                },
                                {
                                    "area": "饶阳县"
                                },
                                {
                                    "area": "安平县"
                                },
                                {
                                    "area": "故城县"
                                },
                                {
                                    "area": "景县"
                                },
                                {
                                    "area": "阜城县"
                                },
                                {
                                    "area": "深州市"
                                }
                            ],
                            "city": "衡水市"
                        }
                    ],
                    "province": "河北省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "小店区"
                                },
                                {
                                    "area": "迎泽区"
                                },
                                {
                                    "area": "杏花岭区"
                                },
                                {
                                    "area": "尖草坪区"
                                },
                                {
                                    "area": "万柏林区"
                                },
                                {
                                    "area": "晋源区"
                                },
                                {
                                    "area": "清徐县"
                                },
                                {
                                    "area": "阳曲县"
                                },
                                {
                                    "area": "娄烦县"
                                },
                                {
                                    "area": "古交市"
                                }
                            ],
                            "city": "太原市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "新荣区"
                                },
                                {
                                    "area": "平城区"
                                },
                                {
                                    "area": "云冈区"
                                },
                                {
                                    "area": "云州区"
                                },
                                {
                                    "area": "阳高县"
                                },
                                {
                                    "area": "天镇县"
                                },
                                {
                                    "area": "广灵县"
                                },
                                {
                                    "area": "灵丘县"
                                },
                                {
                                    "area": "浑源县"
                                },
                                {
                                    "area": "左云县"
                                }
                            ],
                            "city": "大同市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "城区"
                                },
                                {
                                    "area": "矿区"
                                },
                                {
                                    "area": "郊区"
                                },
                                {
                                    "area": "平定县"
                                },
                                {
                                    "area": "盂县"
                                }
                            ],
                            "city": "阳泉市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "潞州区"
                                },
                                {
                                    "area": "上党区"
                                },
                                {
                                    "area": "屯留区"
                                },
                                {
                                    "area": "潞城区"
                                },
                                {
                                    "area": "襄垣县"
                                },
                                {
                                    "area": "平顺县"
                                },
                                {
                                    "area": "黎城县"
                                },
                                {
                                    "area": "壶关县"
                                },
                                {
                                    "area": "长子县"
                                },
                                {
                                    "area": "武乡县"
                                },
                                {
                                    "area": "沁县"
                                },
                                {
                                    "area": "沁源县"
                                }
                            ],
                            "city": "长治市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "城区"
                                },
                                {
                                    "area": "沁水县"
                                },
                                {
                                    "area": "阳城县"
                                },
                                {
                                    "area": "陵川县"
                                },
                                {
                                    "area": "泽州县"
                                },
                                {
                                    "area": "高平市"
                                }
                            ],
                            "city": "晋城市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "朔城区"
                                },
                                {
                                    "area": "平鲁区"
                                },
                                {
                                    "area": "山阴县"
                                },
                                {
                                    "area": "应县"
                                },
                                {
                                    "area": "右玉县"
                                },
                                {
                                    "area": "怀仁市"
                                }
                            ],
                            "city": "朔州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "榆次区"
                                },
                                {
                                    "area": "太谷区"
                                },
                                {
                                    "area": "榆社县"
                                },
                                {
                                    "area": "左权县"
                                },
                                {
                                    "area": "和顺县"
                                },
                                {
                                    "area": "昔阳县"
                                },
                                {
                                    "area": "寿阳县"
                                },
                                {
                                    "area": "祁县"
                                },
                                {
                                    "area": "平遥县"
                                },
                                {
                                    "area": "灵石县"
                                },
                                {
                                    "area": "介休市"
                                }
                            ],
                            "city": "晋中市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "盐湖区"
                                },
                                {
                                    "area": "临猗县"
                                },
                                {
                                    "area": "万荣县"
                                },
                                {
                                    "area": "闻喜县"
                                },
                                {
                                    "area": "稷山县"
                                },
                                {
                                    "area": "新绛县"
                                },
                                {
                                    "area": "绛县"
                                },
                                {
                                    "area": "垣曲县"
                                },
                                {
                                    "area": "夏县"
                                },
                                {
                                    "area": "平陆县"
                                },
                                {
                                    "area": "芮城县"
                                },
                                {
                                    "area": "永济市"
                                },
                                {
                                    "area": "河津市"
                                }
                            ],
                            "city": "运城市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "忻府区"
                                },
                                {
                                    "area": "定襄县"
                                },
                                {
                                    "area": "五台县"
                                },
                                {
                                    "area": "代县"
                                },
                                {
                                    "area": "繁峙县"
                                },
                                {
                                    "area": "宁武县"
                                },
                                {
                                    "area": "静乐县"
                                },
                                {
                                    "area": "神池县"
                                },
                                {
                                    "area": "五寨县"
                                },
                                {
                                    "area": "岢岚县"
                                },
                                {
                                    "area": "河曲县"
                                },
                                {
                                    "area": "保德县"
                                },
                                {
                                    "area": "偏关县"
                                },
                                {
                                    "area": "原平市"
                                }
                            ],
                            "city": "忻州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "尧都区"
                                },
                                {
                                    "area": "曲沃县"
                                },
                                {
                                    "area": "翼城县"
                                },
                                {
                                    "area": "襄汾县"
                                },
                                {
                                    "area": "洪洞县"
                                },
                                {
                                    "area": "古县"
                                },
                                {
                                    "area": "安泽县"
                                },
                                {
                                    "area": "浮山县"
                                },
                                {
                                    "area": "吉县"
                                },
                                {
                                    "area": "乡宁县"
                                },
                                {
                                    "area": "大宁县"
                                },
                                {
                                    "area": "隰县"
                                },
                                {
                                    "area": "永和县"
                                },
                                {
                                    "area": "蒲县"
                                },
                                {
                                    "area": "汾西县"
                                },
                                {
                                    "area": "侯马市"
                                },
                                {
                                    "area": "霍州市"
                                }
                            ],
                            "city": "临汾市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "离石区"
                                },
                                {
                                    "area": "文水县"
                                },
                                {
                                    "area": "交城县"
                                },
                                {
                                    "area": "兴县"
                                },
                                {
                                    "area": "临县"
                                },
                                {
                                    "area": "柳林县"
                                },
                                {
                                    "area": "石楼县"
                                },
                                {
                                    "area": "岚县"
                                },
                                {
                                    "area": "方山县"
                                },
                                {
                                    "area": "中阳县"
                                },
                                {
                                    "area": "交口县"
                                },
                                {
                                    "area": "孝义市"
                                },
                                {
                                    "area": "汾阳市"
                                }
                            ],
                            "city": "吕梁市"
                        }
                    ],
                    "province": "山西省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "新城区"
                                },
                                {
                                    "area": "回民区"
                                },
                                {
                                    "area": "玉泉区"
                                },
                                {
                                    "area": "赛罕区"
                                },
                                {
                                    "area": "土默特左旗"
                                },
                                {
                                    "area": "托克托县"
                                },
                                {
                                    "area": "和林格尔县"
                                },
                                {
                                    "area": "清水河县"
                                },
                                {
                                    "area": "武川县"
                                }
                            ],
                            "city": "呼和浩特市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "东河区"
                                },
                                {
                                    "area": "昆都仑区"
                                },
                                {
                                    "area": "青山区"
                                },
                                {
                                    "area": "石拐区"
                                },
                                {
                                    "area": "白云鄂博矿区"
                                },
                                {
                                    "area": "九原区"
                                },
                                {
                                    "area": "土默特右旗"
                                },
                                {
                                    "area": "固阳县"
                                },
                                {
                                    "area": "达尔罕茂明安联合旗"
                                }
                            ],
                            "city": "包头市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "海勃湾区"
                                },
                                {
                                    "area": "海南区"
                                },
                                {
                                    "area": "乌达区"
                                }
                            ],
                            "city": "乌海市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "红山区"
                                },
                                {
                                    "area": "元宝山区"
                                },
                                {
                                    "area": "松山区"
                                },
                                {
                                    "area": "阿鲁科尔沁旗"
                                },
                                {
                                    "area": "巴林左旗"
                                },
                                {
                                    "area": "巴林右旗"
                                },
                                {
                                    "area": "林西县"
                                },
                                {
                                    "area": "克什克腾旗"
                                },
                                {
                                    "area": "翁牛特旗"
                                },
                                {
                                    "area": "喀喇沁旗"
                                },
                                {
                                    "area": "宁城县"
                                },
                                {
                                    "area": "敖汉旗"
                                }
                            ],
                            "city": "赤峰市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "科尔沁区"
                                },
                                {
                                    "area": "科尔沁左翼中旗"
                                },
                                {
                                    "area": "科尔沁左翼后旗"
                                },
                                {
                                    "area": "开鲁县"
                                },
                                {
                                    "area": "库伦旗"
                                },
                                {
                                    "area": "奈曼旗"
                                },
                                {
                                    "area": "扎鲁特旗"
                                },
                                {
                                    "area": "霍林郭勒市"
                                }
                            ],
                            "city": "通辽市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "东胜区"
                                },
                                {
                                    "area": "康巴什区"
                                },
                                {
                                    "area": "达拉特旗"
                                },
                                {
                                    "area": "准格尔旗"
                                },
                                {
                                    "area": "鄂托克前旗"
                                },
                                {
                                    "area": "鄂托克旗"
                                },
                                {
                                    "area": "杭锦旗"
                                },
                                {
                                    "area": "乌审旗"
                                },
                                {
                                    "area": "伊金霍洛旗"
                                }
                            ],
                            "city": "鄂尔多斯市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "海拉尔区"
                                },
                                {
                                    "area": "扎赉诺尔区"
                                },
                                {
                                    "area": "阿荣旗"
                                },
                                {
                                    "area": "莫力达瓦达斡尔族自治旗"
                                },
                                {
                                    "area": "鄂伦春自治旗"
                                },
                                {
                                    "area": "鄂温克族自治旗"
                                },
                                {
                                    "area": "陈巴尔虎旗"
                                },
                                {
                                    "area": "新巴尔虎左旗"
                                },
                                {
                                    "area": "新巴尔虎右旗"
                                },
                                {
                                    "area": "满洲里市"
                                },
                                {
                                    "area": "牙克石市"
                                },
                                {
                                    "area": "扎兰屯市"
                                },
                                {
                                    "area": "额尔古纳市"
                                },
                                {
                                    "area": "根河市"
                                }
                            ],
                            "city": "呼伦贝尔市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "临河区"
                                },
                                {
                                    "area": "五原县"
                                },
                                {
                                    "area": "磴口县"
                                },
                                {
                                    "area": "乌拉特前旗"
                                },
                                {
                                    "area": "乌拉特中旗"
                                },
                                {
                                    "area": "乌拉特后旗"
                                },
                                {
                                    "area": "杭锦后旗"
                                }
                            ],
                            "city": "巴彦淖尔市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "集宁区"
                                },
                                {
                                    "area": "卓资县"
                                },
                                {
                                    "area": "化德县"
                                },
                                {
                                    "area": "商都县"
                                },
                                {
                                    "area": "兴和县"
                                },
                                {
                                    "area": "凉城县"
                                },
                                {
                                    "area": "察哈尔右翼前旗"
                                },
                                {
                                    "area": "察哈尔右翼中旗"
                                },
                                {
                                    "area": "察哈尔右翼后旗"
                                },
                                {
                                    "area": "四子王旗"
                                },
                                {
                                    "area": "丰镇市"
                                }
                            ],
                            "city": "乌兰察布市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "乌兰浩特市"
                                },
                                {
                                    "area": "阿尔山市"
                                },
                                {
                                    "area": "科尔沁右翼前旗"
                                },
                                {
                                    "area": "科尔沁右翼中旗"
                                },
                                {
                                    "area": "扎赉特旗"
                                },
                                {
                                    "area": "突泉县"
                                }
                            ],
                            "city": "兴安盟"
                        },
                        {
                            "areas": [
                                {
                                    "area": "二连浩特市"
                                },
                                {
                                    "area": "锡林浩特市"
                                },
                                {
                                    "area": "阿巴嘎旗"
                                },
                                {
                                    "area": "苏尼特左旗"
                                },
                                {
                                    "area": "苏尼特右旗"
                                },
                                {
                                    "area": "东乌珠穆沁旗"
                                },
                                {
                                    "area": "西乌珠穆沁旗"
                                },
                                {
                                    "area": "太仆寺旗"
                                },
                                {
                                    "area": "镶黄旗"
                                },
                                {
                                    "area": "正镶白旗"
                                },
                                {
                                    "area": "正蓝旗"
                                },
                                {
                                    "area": "多伦县"
                                }
                            ],
                            "city": "锡林郭勒盟"
                        },
                        {
                            "areas": [
                                {
                                    "area": "阿拉善左旗"
                                },
                                {
                                    "area": "阿拉善右旗"
                                },
                                {
                                    "area": "额济纳旗"
                                }
                            ],
                            "city": "阿拉善盟"
                        }
                    ],
                    "province": "内蒙古自治区"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "和平区"
                                },
                                {
                                    "area": "沈河区"
                                },
                                {
                                    "area": "大东区"
                                },
                                {
                                    "area": "皇姑区"
                                },
                                {
                                    "area": "铁西区"
                                },
                                {
                                    "area": "苏家屯区"
                                },
                                {
                                    "area": "浑南区"
                                },
                                {
                                    "area": "沈北新区"
                                },
                                {
                                    "area": "于洪区"
                                },
                                {
                                    "area": "辽中区"
                                },
                                {
                                    "area": "康平县"
                                },
                                {
                                    "area": "法库县"
                                },
                                {
                                    "area": "新民市"
                                }
                            ],
                            "city": "沈阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "中山区"
                                },
                                {
                                    "area": "西岗区"
                                },
                                {
                                    "area": "沙河口区"
                                },
                                {
                                    "area": "甘井子区"
                                },
                                {
                                    "area": "旅顺口区"
                                },
                                {
                                    "area": "金州区"
                                },
                                {
                                    "area": "普兰店区"
                                },
                                {
                                    "area": "长海县"
                                },
                                {
                                    "area": "瓦房店市"
                                },
                                {
                                    "area": "庄河市"
                                }
                            ],
                            "city": "大连市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "铁东区"
                                },
                                {
                                    "area": "铁西区"
                                },
                                {
                                    "area": "立山区"
                                },
                                {
                                    "area": "千山区"
                                },
                                {
                                    "area": "台安县"
                                },
                                {
                                    "area": "岫岩满族自治县"
                                },
                                {
                                    "area": "海城市"
                                }
                            ],
                            "city": "鞍山市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "新抚区"
                                },
                                {
                                    "area": "东洲区"
                                },
                                {
                                    "area": "望花区"
                                },
                                {
                                    "area": "顺城区"
                                },
                                {
                                    "area": "抚顺县"
                                },
                                {
                                    "area": "新宾满族自治县"
                                },
                                {
                                    "area": "清原满族自治县"
                                }
                            ],
                            "city": "抚顺市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "平山区"
                                },
                                {
                                    "area": "溪湖区"
                                },
                                {
                                    "area": "明山区"
                                },
                                {
                                    "area": "南芬区"
                                },
                                {
                                    "area": "本溪满族自治县"
                                },
                                {
                                    "area": "桓仁满族自治县"
                                }
                            ],
                            "city": "本溪市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "元宝区"
                                },
                                {
                                    "area": "振兴区"
                                },
                                {
                                    "area": "振安区"
                                },
                                {
                                    "area": "宽甸满族自治县"
                                },
                                {
                                    "area": "东港市"
                                },
                                {
                                    "area": "凤城市"
                                }
                            ],
                            "city": "丹东市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "古塔区"
                                },
                                {
                                    "area": "凌河区"
                                },
                                {
                                    "area": "太和区"
                                },
                                {
                                    "area": "黑山县"
                                },
                                {
                                    "area": "义县"
                                },
                                {
                                    "area": "凌海市"
                                },
                                {
                                    "area": "北镇市"
                                }
                            ],
                            "city": "锦州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "站前区"
                                },
                                {
                                    "area": "西市区"
                                },
                                {
                                    "area": "鲅鱼圈区"
                                },
                                {
                                    "area": "老边区"
                                },
                                {
                                    "area": "盖州市"
                                },
                                {
                                    "area": "大石桥市"
                                }
                            ],
                            "city": "营口市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "海州区"
                                },
                                {
                                    "area": "新邱区"
                                },
                                {
                                    "area": "太平区"
                                },
                                {
                                    "area": "清河门区"
                                },
                                {
                                    "area": "细河区"
                                },
                                {
                                    "area": "阜新蒙古族自治县"
                                },
                                {
                                    "area": "彰武县"
                                }
                            ],
                            "city": "阜新市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "白塔区"
                                },
                                {
                                    "area": "文圣区"
                                },
                                {
                                    "area": "宏伟区"
                                },
                                {
                                    "area": "弓长岭区"
                                },
                                {
                                    "area": "太子河区"
                                },
                                {
                                    "area": "辽阳县"
                                },
                                {
                                    "area": "灯塔市"
                                }
                            ],
                            "city": "辽阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "双台子区"
                                },
                                {
                                    "area": "兴隆台区"
                                },
                                {
                                    "area": "大洼区"
                                },
                                {
                                    "area": "盘山县"
                                }
                            ],
                            "city": "盘锦市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "银州区"
                                },
                                {
                                    "area": "清河区"
                                },
                                {
                                    "area": "铁岭县"
                                },
                                {
                                    "area": "西丰县"
                                },
                                {
                                    "area": "昌图县"
                                },
                                {
                                    "area": "调兵山市"
                                },
                                {
                                    "area": "开原市"
                                }
                            ],
                            "city": "铁岭市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "双塔区"
                                },
                                {
                                    "area": "龙城区"
                                },
                                {
                                    "area": "朝阳县"
                                },
                                {
                                    "area": "建平县"
                                },
                                {
                                    "area": "喀喇沁左翼蒙古族自治县"
                                },
                                {
                                    "area": "北票市"
                                },
                                {
                                    "area": "凌源市"
                                }
                            ],
                            "city": "朝阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "连山区"
                                },
                                {
                                    "area": "龙港区"
                                },
                                {
                                    "area": "南票区"
                                },
                                {
                                    "area": "绥中县"
                                },
                                {
                                    "area": "建昌县"
                                },
                                {
                                    "area": "兴城市"
                                }
                            ],
                            "city": "葫芦岛市"
                        }
                    ],
                    "province": "辽宁省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "南关区"
                                },
                                {
                                    "area": "宽城区"
                                },
                                {
                                    "area": "朝阳区"
                                },
                                {
                                    "area": "二道区"
                                },
                                {
                                    "area": "绿园区"
                                },
                                {
                                    "area": "双阳区"
                                },
                                {
                                    "area": "九台区"
                                },
                                {
                                    "area": "农安县"
                                },
                                {
                                    "area": "榆树市"
                                },
                                {
                                    "area": "德惠市"
                                },
                                {
                                    "area": "公主岭市"
                                }
                            ],
                            "city": "长春市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "昌邑区"
                                },
                                {
                                    "area": "龙潭区"
                                },
                                {
                                    "area": "船营区"
                                },
                                {
                                    "area": "丰满区"
                                },
                                {
                                    "area": "永吉县"
                                },
                                {
                                    "area": "蛟河市"
                                },
                                {
                                    "area": "桦甸市"
                                },
                                {
                                    "area": "舒兰市"
                                },
                                {
                                    "area": "磐石市"
                                }
                            ],
                            "city": "吉林市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "铁西区"
                                },
                                {
                                    "area": "铁东区"
                                },
                                {
                                    "area": "梨树县"
                                },
                                {
                                    "area": "伊通满族自治县"
                                },
                                {
                                    "area": "双辽市"
                                }
                            ],
                            "city": "四平市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "龙山区"
                                },
                                {
                                    "area": "西安区"
                                },
                                {
                                    "area": "东丰县"
                                },
                                {
                                    "area": "东辽县"
                                }
                            ],
                            "city": "辽源市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "东昌区"
                                },
                                {
                                    "area": "二道江区"
                                },
                                {
                                    "area": "通化县"
                                },
                                {
                                    "area": "辉南县"
                                },
                                {
                                    "area": "柳河县"
                                },
                                {
                                    "area": "梅河口市"
                                },
                                {
                                    "area": "集安市"
                                }
                            ],
                            "city": "通化市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "浑江区"
                                },
                                {
                                    "area": "江源区"
                                },
                                {
                                    "area": "抚松县"
                                },
                                {
                                    "area": "靖宇县"
                                },
                                {
                                    "area": "长白朝鲜族自治县"
                                },
                                {
                                    "area": "临江市"
                                }
                            ],
                            "city": "白山市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "宁江区"
                                },
                                {
                                    "area": "前郭尔罗斯蒙古族自治县"
                                },
                                {
                                    "area": "长岭县"
                                },
                                {
                                    "area": "乾安县"
                                },
                                {
                                    "area": "扶余市"
                                }
                            ],
                            "city": "松原市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "洮北区"
                                },
                                {
                                    "area": "镇赉县"
                                },
                                {
                                    "area": "通榆县"
                                },
                                {
                                    "area": "洮南市"
                                },
                                {
                                    "area": "大安市"
                                }
                            ],
                            "city": "白城市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "延吉市"
                                },
                                {
                                    "area": "图们市"
                                },
                                {
                                    "area": "敦化市"
                                },
                                {
                                    "area": "珲春市"
                                },
                                {
                                    "area": "龙井市"
                                },
                                {
                                    "area": "和龙市"
                                },
                                {
                                    "area": "汪清县"
                                },
                                {
                                    "area": "安图县"
                                }
                            ],
                            "city": "延边朝鲜族自治州"
                        }
                    ],
                    "province": "吉林省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "道里区"
                                },
                                {
                                    "area": "南岗区"
                                },
                                {
                                    "area": "道外区"
                                },
                                {
                                    "area": "平房区"
                                },
                                {
                                    "area": "松北区"
                                },
                                {
                                    "area": "香坊区"
                                },
                                {
                                    "area": "呼兰区"
                                },
                                {
                                    "area": "阿城区"
                                },
                                {
                                    "area": "双城区"
                                },
                                {
                                    "area": "依兰县"
                                },
                                {
                                    "area": "方正县"
                                },
                                {
                                    "area": "宾县"
                                },
                                {
                                    "area": "巴彦县"
                                },
                                {
                                    "area": "木兰县"
                                },
                                {
                                    "area": "通河县"
                                },
                                {
                                    "area": "延寿县"
                                },
                                {
                                    "area": "尚志市"
                                },
                                {
                                    "area": "五常市"
                                }
                            ],
                            "city": "哈尔滨市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "龙沙区"
                                },
                                {
                                    "area": "建华区"
                                },
                                {
                                    "area": "铁锋区"
                                },
                                {
                                    "area": "昂昂溪区"
                                },
                                {
                                    "area": "富拉尔基区"
                                },
                                {
                                    "area": "碾子山区"
                                },
                                {
                                    "area": "梅里斯达斡尔族区"
                                },
                                {
                                    "area": "龙江县"
                                },
                                {
                                    "area": "依安县"
                                },
                                {
                                    "area": "泰来县"
                                },
                                {
                                    "area": "甘南县"
                                },
                                {
                                    "area": "富裕县"
                                },
                                {
                                    "area": "克山县"
                                },
                                {
                                    "area": "克东县"
                                },
                                {
                                    "area": "拜泉县"
                                },
                                {
                                    "area": "讷河市"
                                }
                            ],
                            "city": "齐齐哈尔市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "鸡冠区"
                                },
                                {
                                    "area": "恒山区"
                                },
                                {
                                    "area": "滴道区"
                                },
                                {
                                    "area": "梨树区"
                                },
                                {
                                    "area": "城子河区"
                                },
                                {
                                    "area": "麻山区"
                                },
                                {
                                    "area": "鸡东县"
                                },
                                {
                                    "area": "虎林市"
                                },
                                {
                                    "area": "密山市"
                                }
                            ],
                            "city": "鸡西市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "向阳区"
                                },
                                {
                                    "area": "工农区"
                                },
                                {
                                    "area": "南山区"
                                },
                                {
                                    "area": "兴安区"
                                },
                                {
                                    "area": "东山区"
                                },
                                {
                                    "area": "兴山区"
                                },
                                {
                                    "area": "萝北县"
                                },
                                {
                                    "area": "绥滨县"
                                }
                            ],
                            "city": "鹤岗市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "尖山区"
                                },
                                {
                                    "area": "岭东区"
                                },
                                {
                                    "area": "四方台区"
                                },
                                {
                                    "area": "宝山区"
                                },
                                {
                                    "area": "集贤县"
                                },
                                {
                                    "area": "友谊县"
                                },
                                {
                                    "area": "宝清县"
                                },
                                {
                                    "area": "饶河县"
                                }
                            ],
                            "city": "双鸭山市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "萨尔图区"
                                },
                                {
                                    "area": "龙凤区"
                                },
                                {
                                    "area": "让胡路区"
                                },
                                {
                                    "area": "红岗区"
                                },
                                {
                                    "area": "大同区"
                                },
                                {
                                    "area": "肇州县"
                                },
                                {
                                    "area": "肇源县"
                                },
                                {
                                    "area": "林甸县"
                                },
                                {
                                    "area": "杜尔伯特蒙古族自治县"
                                }
                            ],
                            "city": "大庆市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "伊美区"
                                },
                                {
                                    "area": "乌翠区"
                                },
                                {
                                    "area": "友好区"
                                },
                                {
                                    "area": "嘉荫县"
                                },
                                {
                                    "area": "汤旺县"
                                },
                                {
                                    "area": "丰林县"
                                },
                                {
                                    "area": "大箐山县"
                                },
                                {
                                    "area": "南岔县"
                                },
                                {
                                    "area": "金林区"
                                },
                                {
                                    "area": "铁力市"
                                }
                            ],
                            "city": "伊春市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "向阳区"
                                },
                                {
                                    "area": "前进区"
                                },
                                {
                                    "area": "东风区"
                                },
                                {
                                    "area": "郊区"
                                },
                                {
                                    "area": "桦南县"
                                },
                                {
                                    "area": "桦川县"
                                },
                                {
                                    "area": "汤原县"
                                },
                                {
                                    "area": "同江市"
                                },
                                {
                                    "area": "富锦市"
                                },
                                {
                                    "area": "抚远市"
                                }
                            ],
                            "city": "佳木斯市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "新兴区"
                                },
                                {
                                    "area": "桃山区"
                                },
                                {
                                    "area": "茄子河区"
                                },
                                {
                                    "area": "勃利县"
                                }
                            ],
                            "city": "七台河市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "东安区"
                                },
                                {
                                    "area": "阳明区"
                                },
                                {
                                    "area": "爱民区"
                                },
                                {
                                    "area": "西安区"
                                },
                                {
                                    "area": "林口县"
                                },
                                {
                                    "area": "绥芬河市"
                                },
                                {
                                    "area": "海林市"
                                },
                                {
                                    "area": "宁安市"
                                },
                                {
                                    "area": "穆棱市"
                                },
                                {
                                    "area": "东宁市"
                                }
                            ],
                            "city": "牡丹江市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "爱辉区"
                                },
                                {
                                    "area": "逊克县"
                                },
                                {
                                    "area": "孙吴县"
                                },
                                {
                                    "area": "北安市"
                                },
                                {
                                    "area": "五大连池市"
                                },
                                {
                                    "area": "嫩江市"
                                }
                            ],
                            "city": "黑河市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "北林区"
                                },
                                {
                                    "area": "望奎县"
                                },
                                {
                                    "area": "兰西县"
                                },
                                {
                                    "area": "青冈县"
                                },
                                {
                                    "area": "庆安县"
                                },
                                {
                                    "area": "明水县"
                                },
                                {
                                    "area": "绥棱县"
                                },
                                {
                                    "area": "安达市"
                                },
                                {
                                    "area": "肇东市"
                                },
                                {
                                    "area": "海伦市"
                                }
                            ],
                            "city": "绥化市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "漠河市"
                                },
                                {
                                    "area": "呼玛县"
                                },
                                {
                                    "area": "塔河县"
                                }
                            ],
                            "city": "大兴安岭地区"
                        }
                    ],
                    "province": "黑龙江省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "黄浦区"
                                },
                                {
                                    "area": "徐汇区"
                                },
                                {
                                    "area": "长宁区"
                                },
                                {
                                    "area": "静安区"
                                },
                                {
                                    "area": "普陀区"
                                },
                                {
                                    "area": "虹口区"
                                },
                                {
                                    "area": "杨浦区"
                                },
                                {
                                    "area": "闵行区"
                                },
                                {
                                    "area": "宝山区"
                                },
                                {
                                    "area": "嘉定区"
                                },
                                {
                                    "area": "浦东新区"
                                },
                                {
                                    "area": "金山区"
                                },
                                {
                                    "area": "松江区"
                                },
                                {
                                    "area": "青浦区"
                                },
                                {
                                    "area": "奉贤区"
                                },
                                {
                                    "area": "崇明区"
                                }
                            ],
                            "city": "上海市"
                        }
                    ],
                    "province": "上海市"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "玄武区"
                                },
                                {
                                    "area": "秦淮区"
                                },
                                {
                                    "area": "建邺区"
                                },
                                {
                                    "area": "鼓楼区"
                                },
                                {
                                    "area": "浦口区"
                                },
                                {
                                    "area": "栖霞区"
                                },
                                {
                                    "area": "雨花台区"
                                },
                                {
                                    "area": "江宁区"
                                },
                                {
                                    "area": "六合区"
                                },
                                {
                                    "area": "溧水区"
                                },
                                {
                                    "area": "高淳区"
                                }
                            ],
                            "city": "南京市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "锡山区"
                                },
                                {
                                    "area": "惠山区"
                                },
                                {
                                    "area": "滨湖区"
                                },
                                {
                                    "area": "梁溪区"
                                },
                                {
                                    "area": "新吴区"
                                },
                                {
                                    "area": "江阴市"
                                },
                                {
                                    "area": "宜兴市"
                                }
                            ],
                            "city": "无锡市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "鼓楼区"
                                },
                                {
                                    "area": "云龙区"
                                },
                                {
                                    "area": "贾汪区"
                                },
                                {
                                    "area": "泉山区"
                                },
                                {
                                    "area": "铜山区"
                                },
                                {
                                    "area": "丰县"
                                },
                                {
                                    "area": "沛县"
                                },
                                {
                                    "area": "睢宁县"
                                },
                                {
                                    "area": "新沂市"
                                },
                                {
                                    "area": "邳州市"
                                }
                            ],
                            "city": "徐州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "天宁区"
                                },
                                {
                                    "area": "钟楼区"
                                },
                                {
                                    "area": "新北区"
                                },
                                {
                                    "area": "武进区"
                                },
                                {
                                    "area": "金坛区"
                                },
                                {
                                    "area": "溧阳市"
                                }
                            ],
                            "city": "常州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "虎丘区"
                                },
                                {
                                    "area": "吴中区"
                                },
                                {
                                    "area": "相城区"
                                },
                                {
                                    "area": "姑苏区"
                                },
                                {
                                    "area": "吴江区"
                                },
                                {
                                    "area": "常熟市"
                                },
                                {
                                    "area": "张家港市"
                                },
                                {
                                    "area": "昆山市"
                                },
                                {
                                    "area": "太仓市"
                                }
                            ],
                            "city": "苏州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "通州区"
                                },
                                {
                                    "area": "崇川区"
                                },
                                {
                                    "area": "海门区"
                                },
                                {
                                    "area": "如东县"
                                },
                                {
                                    "area": "启东市"
                                },
                                {
                                    "area": "如皋市"
                                },
                                {
                                    "area": "海安市"
                                }
                            ],
                            "city": "南通市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "连云区"
                                },
                                {
                                    "area": "海州区"
                                },
                                {
                                    "area": "赣榆区"
                                },
                                {
                                    "area": "东海县"
                                },
                                {
                                    "area": "灌云县"
                                },
                                {
                                    "area": "灌南县"
                                }
                            ],
                            "city": "连云港市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "淮安区"
                                },
                                {
                                    "area": "淮阴区"
                                },
                                {
                                    "area": "清江浦区"
                                },
                                {
                                    "area": "洪泽区"
                                },
                                {
                                    "area": "涟水县"
                                },
                                {
                                    "area": "盱眙县"
                                },
                                {
                                    "area": "金湖县"
                                }
                            ],
                            "city": "淮安市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "亭湖区"
                                },
                                {
                                    "area": "盐都区"
                                },
                                {
                                    "area": "大丰区"
                                },
                                {
                                    "area": "响水县"
                                },
                                {
                                    "area": "滨海县"
                                },
                                {
                                    "area": "阜宁县"
                                },
                                {
                                    "area": "射阳县"
                                },
                                {
                                    "area": "建湖县"
                                },
                                {
                                    "area": "东台市"
                                }
                            ],
                            "city": "盐城市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "广陵区"
                                },
                                {
                                    "area": "邗江区"
                                },
                                {
                                    "area": "江都区"
                                },
                                {
                                    "area": "宝应县"
                                },
                                {
                                    "area": "仪征市"
                                },
                                {
                                    "area": "高邮市"
                                }
                            ],
                            "city": "扬州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "京口区"
                                },
                                {
                                    "area": "润州区"
                                },
                                {
                                    "area": "丹徒区"
                                },
                                {
                                    "area": "丹阳市"
                                },
                                {
                                    "area": "扬中市"
                                },
                                {
                                    "area": "句容市"
                                }
                            ],
                            "city": "镇江市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "海陵区"
                                },
                                {
                                    "area": "高港区"
                                },
                                {
                                    "area": "姜堰区"
                                },
                                {
                                    "area": "兴化市"
                                },
                                {
                                    "area": "靖江市"
                                },
                                {
                                    "area": "泰兴市"
                                }
                            ],
                            "city": "泰州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "宿城区"
                                },
                                {
                                    "area": "宿豫区"
                                },
                                {
                                    "area": "沭阳县"
                                },
                                {
                                    "area": "泗阳县"
                                },
                                {
                                    "area": "泗洪县"
                                }
                            ],
                            "city": "宿迁市"
                        }
                    ],
                    "province": "江苏省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "上城区"
                                },
                                {
                                    "area": "拱墅区"
                                },
                                {
                                    "area": "西湖区"
                                },
                                {
                                    "area": "滨江区"
                                },
                                {
                                    "area": "萧山区"
                                },
                                {
                                    "area": "余杭区"
                                },
                                {
                                    "area": "富阳区"
                                },
                                {
                                    "area": "临安区"
                                },
                                {
                                    "area": "临平区"
                                },
                                {
                                    "area": "钱塘区"
                                },
                                {
                                    "area": "桐庐县"
                                },
                                {
                                    "area": "淳安县"
                                },
                                {
                                    "area": "建德市"
                                }
                            ],
                            "city": "杭州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "海曙区"
                                },
                                {
                                    "area": "江北区"
                                },
                                {
                                    "area": "北仑区"
                                },
                                {
                                    "area": "镇海区"
                                },
                                {
                                    "area": "鄞州区"
                                },
                                {
                                    "area": "奉化区"
                                },
                                {
                                    "area": "象山县"
                                },
                                {
                                    "area": "宁海县"
                                },
                                {
                                    "area": "余姚市"
                                },
                                {
                                    "area": "慈溪市"
                                }
                            ],
                            "city": "宁波市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "鹿城区"
                                },
                                {
                                    "area": "龙湾区"
                                },
                                {
                                    "area": "瓯海区"
                                },
                                {
                                    "area": "洞头区"
                                },
                                {
                                    "area": "永嘉县"
                                },
                                {
                                    "area": "平阳县"
                                },
                                {
                                    "area": "苍南县"
                                },
                                {
                                    "area": "文成县"
                                },
                                {
                                    "area": "泰顺县"
                                },
                                {
                                    "area": "瑞安市"
                                },
                                {
                                    "area": "乐清市"
                                },
                                {
                                    "area": "龙港市"
                                }
                            ],
                            "city": "温州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "南湖区"
                                },
                                {
                                    "area": "秀洲区"
                                },
                                {
                                    "area": "嘉善县"
                                },
                                {
                                    "area": "海盐县"
                                },
                                {
                                    "area": "海宁市"
                                },
                                {
                                    "area": "平湖市"
                                },
                                {
                                    "area": "桐乡市"
                                }
                            ],
                            "city": "嘉兴市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "吴兴区"
                                },
                                {
                                    "area": "南浔区"
                                },
                                {
                                    "area": "德清县"
                                },
                                {
                                    "area": "长兴县"
                                },
                                {
                                    "area": "安吉县"
                                }
                            ],
                            "city": "湖州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "越城区"
                                },
                                {
                                    "area": "柯桥区"
                                },
                                {
                                    "area": "上虞区"
                                },
                                {
                                    "area": "新昌县"
                                },
                                {
                                    "area": "诸暨市"
                                },
                                {
                                    "area": "嵊州市"
                                }
                            ],
                            "city": "绍兴市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "婺城区"
                                },
                                {
                                    "area": "金东区"
                                },
                                {
                                    "area": "武义县"
                                },
                                {
                                    "area": "浦江县"
                                },
                                {
                                    "area": "磐安县"
                                },
                                {
                                    "area": "兰溪市"
                                },
                                {
                                    "area": "义乌市"
                                },
                                {
                                    "area": "东阳市"
                                },
                                {
                                    "area": "永康市"
                                }
                            ],
                            "city": "金华市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "柯城区"
                                },
                                {
                                    "area": "衢江区"
                                },
                                {
                                    "area": "常山县"
                                },
                                {
                                    "area": "开化县"
                                },
                                {
                                    "area": "龙游县"
                                },
                                {
                                    "area": "江山市"
                                }
                            ],
                            "city": "衢州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "定海区"
                                },
                                {
                                    "area": "普陀区"
                                },
                                {
                                    "area": "岱山县"
                                },
                                {
                                    "area": "嵊泗县"
                                }
                            ],
                            "city": "舟山市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "椒江区"
                                },
                                {
                                    "area": "黄岩区"
                                },
                                {
                                    "area": "路桥区"
                                },
                                {
                                    "area": "三门县"
                                },
                                {
                                    "area": "天台县"
                                },
                                {
                                    "area": "仙居县"
                                },
                                {
                                    "area": "温岭市"
                                },
                                {
                                    "area": "临海市"
                                },
                                {
                                    "area": "玉环市"
                                }
                            ],
                            "city": "台州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "莲都区"
                                },
                                {
                                    "area": "青田县"
                                },
                                {
                                    "area": "缙云县"
                                },
                                {
                                    "area": "遂昌县"
                                },
                                {
                                    "area": "松阳县"
                                },
                                {
                                    "area": "云和县"
                                },
                                {
                                    "area": "庆元县"
                                },
                                {
                                    "area": "景宁畲族自治县"
                                },
                                {
                                    "area": "龙泉市"
                                }
                            ],
                            "city": "丽水市"
                        }
                    ],
                    "province": "浙江省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "瑶海区"
                                },
                                {
                                    "area": "庐阳区"
                                },
                                {
                                    "area": "蜀山区"
                                },
                                {
                                    "area": "包河区"
                                },
                                {
                                    "area": "长丰县"
                                },
                                {
                                    "area": "肥东县"
                                },
                                {
                                    "area": "肥西县"
                                },
                                {
                                    "area": "庐江县"
                                },
                                {
                                    "area": "巢湖市"
                                }
                            ],
                            "city": "合肥市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "镜湖区"
                                },
                                {
                                    "area": "鸠江区"
                                },
                                {
                                    "area": "弋江区"
                                },
                                {
                                    "area": "湾沚区"
                                },
                                {
                                    "area": "繁昌区"
                                },
                                {
                                    "area": "南陵县"
                                },
                                {
                                    "area": "无为市"
                                }
                            ],
                            "city": "芜湖市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "龙子湖区"
                                },
                                {
                                    "area": "蚌山区"
                                },
                                {
                                    "area": "禹会区"
                                },
                                {
                                    "area": "淮上区"
                                },
                                {
                                    "area": "怀远县"
                                },
                                {
                                    "area": "五河县"
                                },
                                {
                                    "area": "固镇县"
                                }
                            ],
                            "city": "蚌埠市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "大通区"
                                },
                                {
                                    "area": "田家庵区"
                                },
                                {
                                    "area": "谢家集区"
                                },
                                {
                                    "area": "八公山区"
                                },
                                {
                                    "area": "潘集区"
                                },
                                {
                                    "area": "凤台县"
                                },
                                {
                                    "area": "寿县"
                                }
                            ],
                            "city": "淮南市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "花山区"
                                },
                                {
                                    "area": "雨山区"
                                },
                                {
                                    "area": "博望区"
                                },
                                {
                                    "area": "当涂县"
                                },
                                {
                                    "area": "含山县"
                                },
                                {
                                    "area": "和县"
                                }
                            ],
                            "city": "马鞍山市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "杜集区"
                                },
                                {
                                    "area": "相山区"
                                },
                                {
                                    "area": "烈山区"
                                },
                                {
                                    "area": "濉溪县"
                                }
                            ],
                            "city": "淮北市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "铜官区"
                                },
                                {
                                    "area": "义安区"
                                },
                                {
                                    "area": "郊区"
                                },
                                {
                                    "area": "枞阳县"
                                }
                            ],
                            "city": "铜陵市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "迎江区"
                                },
                                {
                                    "area": "大观区"
                                },
                                {
                                    "area": "宜秀区"
                                },
                                {
                                    "area": "怀宁县"
                                },
                                {
                                    "area": "太湖县"
                                },
                                {
                                    "area": "宿松县"
                                },
                                {
                                    "area": "望江县"
                                },
                                {
                                    "area": "岳西县"
                                },
                                {
                                    "area": "桐城市"
                                },
                                {
                                    "area": "潜山市"
                                }
                            ],
                            "city": "安庆市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "屯溪区"
                                },
                                {
                                    "area": "黄山区"
                                },
                                {
                                    "area": "徽州区"
                                },
                                {
                                    "area": "歙县"
                                },
                                {
                                    "area": "休宁县"
                                },
                                {
                                    "area": "黟县"
                                },
                                {
                                    "area": "祁门县"
                                }
                            ],
                            "city": "黄山市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "琅琊区"
                                },
                                {
                                    "area": "南谯区"
                                },
                                {
                                    "area": "来安县"
                                },
                                {
                                    "area": "全椒县"
                                },
                                {
                                    "area": "定远县"
                                },
                                {
                                    "area": "凤阳县"
                                },
                                {
                                    "area": "天长市"
                                },
                                {
                                    "area": "明光市"
                                }
                            ],
                            "city": "滁州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "颍州区"
                                },
                                {
                                    "area": "颍东区"
                                },
                                {
                                    "area": "颍泉区"
                                },
                                {
                                    "area": "临泉县"
                                },
                                {
                                    "area": "太和县"
                                },
                                {
                                    "area": "阜南县"
                                },
                                {
                                    "area": "颍上县"
                                },
                                {
                                    "area": "界首市"
                                }
                            ],
                            "city": "阜阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "埇桥区"
                                },
                                {
                                    "area": "砀山县"
                                },
                                {
                                    "area": "萧县"
                                },
                                {
                                    "area": "灵璧县"
                                },
                                {
                                    "area": "泗县"
                                }
                            ],
                            "city": "宿州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "金安区"
                                },
                                {
                                    "area": "裕安区"
                                },
                                {
                                    "area": "叶集区"
                                },
                                {
                                    "area": "霍邱县"
                                },
                                {
                                    "area": "舒城县"
                                },
                                {
                                    "area": "金寨县"
                                },
                                {
                                    "area": "霍山县"
                                }
                            ],
                            "city": "六安市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "谯城区"
                                },
                                {
                                    "area": "涡阳县"
                                },
                                {
                                    "area": "蒙城县"
                                },
                                {
                                    "area": "利辛县"
                                }
                            ],
                            "city": "亳州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "贵池区"
                                },
                                {
                                    "area": "东至县"
                                },
                                {
                                    "area": "石台县"
                                },
                                {
                                    "area": "青阳县"
                                }
                            ],
                            "city": "池州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "宣州区"
                                },
                                {
                                    "area": "郎溪县"
                                },
                                {
                                    "area": "泾县"
                                },
                                {
                                    "area": "绩溪县"
                                },
                                {
                                    "area": "旌德县"
                                },
                                {
                                    "area": "宁国市"
                                },
                                {
                                    "area": "广德市"
                                }
                            ],
                            "city": "宣城市"
                        }
                    ],
                    "province": "安徽省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "鼓楼区"
                                },
                                {
                                    "area": "台江区"
                                },
                                {
                                    "area": "仓山区"
                                },
                                {
                                    "area": "马尾区"
                                },
                                {
                                    "area": "晋安区"
                                },
                                {
                                    "area": "长乐区"
                                },
                                {
                                    "area": "闽侯县"
                                },
                                {
                                    "area": "连江县"
                                },
                                {
                                    "area": "罗源县"
                                },
                                {
                                    "area": "闽清县"
                                },
                                {
                                    "area": "永泰县"
                                },
                                {
                                    "area": "平潭县"
                                },
                                {
                                    "area": "福清市"
                                }
                            ],
                            "city": "福州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "思明区"
                                },
                                {
                                    "area": "海沧区"
                                },
                                {
                                    "area": "湖里区"
                                },
                                {
                                    "area": "集美区"
                                },
                                {
                                    "area": "同安区"
                                },
                                {
                                    "area": "翔安区"
                                }
                            ],
                            "city": "厦门市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "城厢区"
                                },
                                {
                                    "area": "涵江区"
                                },
                                {
                                    "area": "荔城区"
                                },
                                {
                                    "area": "秀屿区"
                                },
                                {
                                    "area": "仙游县"
                                }
                            ],
                            "city": "莆田市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "三元区"
                                },
                                {
                                    "area": "沙县区"
                                },
                                {
                                    "area": "明溪县"
                                },
                                {
                                    "area": "清流县"
                                },
                                {
                                    "area": "宁化县"
                                },
                                {
                                    "area": "大田县"
                                },
                                {
                                    "area": "尤溪县"
                                },
                                {
                                    "area": "将乐县"
                                },
                                {
                                    "area": "泰宁县"
                                },
                                {
                                    "area": "建宁县"
                                },
                                {
                                    "area": "永安市"
                                }
                            ],
                            "city": "三明市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "鲤城区"
                                },
                                {
                                    "area": "丰泽区"
                                },
                                {
                                    "area": "洛江区"
                                },
                                {
                                    "area": "泉港区"
                                },
                                {
                                    "area": "惠安县"
                                },
                                {
                                    "area": "安溪县"
                                },
                                {
                                    "area": "永春县"
                                },
                                {
                                    "area": "德化县"
                                },
                                {
                                    "area": "金门县"
                                },
                                {
                                    "area": "石狮市"
                                },
                                {
                                    "area": "晋江市"
                                },
                                {
                                    "area": "南安市"
                                }
                            ],
                            "city": "泉州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "芗城区"
                                },
                                {
                                    "area": "龙文区"
                                },
                                {
                                    "area": "龙海区"
                                },
                                {
                                    "area": "长泰区"
                                },
                                {
                                    "area": "云霄县"
                                },
                                {
                                    "area": "漳浦县"
                                },
                                {
                                    "area": "诏安县"
                                },
                                {
                                    "area": "东山县"
                                },
                                {
                                    "area": "南靖县"
                                },
                                {
                                    "area": "平和县"
                                },
                                {
                                    "area": "华安县"
                                }
                            ],
                            "city": "漳州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "延平区"
                                },
                                {
                                    "area": "建阳区"
                                },
                                {
                                    "area": "顺昌县"
                                },
                                {
                                    "area": "浦城县"
                                },
                                {
                                    "area": "光泽县"
                                },
                                {
                                    "area": "松溪县"
                                },
                                {
                                    "area": "政和县"
                                },
                                {
                                    "area": "邵武市"
                                },
                                {
                                    "area": "武夷山市"
                                },
                                {
                                    "area": "建瓯市"
                                }
                            ],
                            "city": "南平市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "新罗区"
                                },
                                {
                                    "area": "永定区"
                                },
                                {
                                    "area": "长汀县"
                                },
                                {
                                    "area": "上杭县"
                                },
                                {
                                    "area": "武平县"
                                },
                                {
                                    "area": "连城县"
                                },
                                {
                                    "area": "漳平市"
                                }
                            ],
                            "city": "龙岩市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "蕉城区"
                                },
                                {
                                    "area": "霞浦县"
                                },
                                {
                                    "area": "古田县"
                                },
                                {
                                    "area": "屏南县"
                                },
                                {
                                    "area": "寿宁县"
                                },
                                {
                                    "area": "周宁县"
                                },
                                {
                                    "area": "柘荣县"
                                },
                                {
                                    "area": "福安市"
                                },
                                {
                                    "area": "福鼎市"
                                }
                            ],
                            "city": "宁德市"
                        }
                    ],
                    "province": "福建省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "东湖区"
                                },
                                {
                                    "area": "西湖区"
                                },
                                {
                                    "area": "青云谱区"
                                },
                                {
                                    "area": "青山湖区"
                                },
                                {
                                    "area": "新建区"
                                },
                                {
                                    "area": "红谷滩区"
                                },
                                {
                                    "area": "南昌县"
                                },
                                {
                                    "area": "安义县"
                                },
                                {
                                    "area": "进贤县"
                                }
                            ],
                            "city": "南昌市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "昌江区"
                                },
                                {
                                    "area": "珠山区"
                                },
                                {
                                    "area": "浮梁县"
                                },
                                {
                                    "area": "乐平市"
                                }
                            ],
                            "city": "景德镇市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "安源区"
                                },
                                {
                                    "area": "湘东区"
                                },
                                {
                                    "area": "莲花县"
                                },
                                {
                                    "area": "上栗县"
                                },
                                {
                                    "area": "芦溪县"
                                }
                            ],
                            "city": "萍乡市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "濂溪区"
                                },
                                {
                                    "area": "浔阳区"
                                },
                                {
                                    "area": "柴桑区"
                                },
                                {
                                    "area": "武宁县"
                                },
                                {
                                    "area": "修水县"
                                },
                                {
                                    "area": "永修县"
                                },
                                {
                                    "area": "德安县"
                                },
                                {
                                    "area": "都昌县"
                                },
                                {
                                    "area": "湖口县"
                                },
                                {
                                    "area": "彭泽县"
                                },
                                {
                                    "area": "瑞昌市"
                                },
                                {
                                    "area": "共青城市"
                                },
                                {
                                    "area": "庐山市"
                                }
                            ],
                            "city": "九江市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "渝水区"
                                },
                                {
                                    "area": "分宜县"
                                }
                            ],
                            "city": "新余市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "月湖区"
                                },
                                {
                                    "area": "余江区"
                                },
                                {
                                    "area": "贵溪市"
                                }
                            ],
                            "city": "鹰潭市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "章贡区"
                                },
                                {
                                    "area": "南康区"
                                },
                                {
                                    "area": "赣县区"
                                },
                                {
                                    "area": "信丰县"
                                },
                                {
                                    "area": "大余县"
                                },
                                {
                                    "area": "上犹县"
                                },
                                {
                                    "area": "崇义县"
                                },
                                {
                                    "area": "安远县"
                                },
                                {
                                    "area": "定南县"
                                },
                                {
                                    "area": "全南县"
                                },
                                {
                                    "area": "宁都县"
                                },
                                {
                                    "area": "于都县"
                                },
                                {
                                    "area": "兴国县"
                                },
                                {
                                    "area": "会昌县"
                                },
                                {
                                    "area": "寻乌县"
                                },
                                {
                                    "area": "石城县"
                                },
                                {
                                    "area": "瑞金市"
                                },
                                {
                                    "area": "龙南市"
                                }
                            ],
                            "city": "赣州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "吉州区"
                                },
                                {
                                    "area": "青原区"
                                },
                                {
                                    "area": "吉安县"
                                },
                                {
                                    "area": "吉水县"
                                },
                                {
                                    "area": "峡江县"
                                },
                                {
                                    "area": "新干县"
                                },
                                {
                                    "area": "永丰县"
                                },
                                {
                                    "area": "泰和县"
                                },
                                {
                                    "area": "遂川县"
                                },
                                {
                                    "area": "万安县"
                                },
                                {
                                    "area": "安福县"
                                },
                                {
                                    "area": "永新县"
                                },
                                {
                                    "area": "井冈山市"
                                }
                            ],
                            "city": "吉安市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "袁州区"
                                },
                                {
                                    "area": "奉新县"
                                },
                                {
                                    "area": "万载县"
                                },
                                {
                                    "area": "上高县"
                                },
                                {
                                    "area": "宜丰县"
                                },
                                {
                                    "area": "靖安县"
                                },
                                {
                                    "area": "铜鼓县"
                                },
                                {
                                    "area": "丰城市"
                                },
                                {
                                    "area": "樟树市"
                                },
                                {
                                    "area": "高安市"
                                }
                            ],
                            "city": "宜春市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "临川区"
                                },
                                {
                                    "area": "东乡区"
                                },
                                {
                                    "area": "南城县"
                                },
                                {
                                    "area": "黎川县"
                                },
                                {
                                    "area": "南丰县"
                                },
                                {
                                    "area": "崇仁县"
                                },
                                {
                                    "area": "乐安县"
                                },
                                {
                                    "area": "宜黄县"
                                },
                                {
                                    "area": "金溪县"
                                },
                                {
                                    "area": "资溪县"
                                },
                                {
                                    "area": "广昌县"
                                }
                            ],
                            "city": "抚州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "信州区"
                                },
                                {
                                    "area": "广丰区"
                                },
                                {
                                    "area": "广信区"
                                },
                                {
                                    "area": "玉山县"
                                },
                                {
                                    "area": "铅山县"
                                },
                                {
                                    "area": "横峰县"
                                },
                                {
                                    "area": "弋阳县"
                                },
                                {
                                    "area": "余干县"
                                },
                                {
                                    "area": "鄱阳县"
                                },
                                {
                                    "area": "万年县"
                                },
                                {
                                    "area": "婺源县"
                                },
                                {
                                    "area": "德兴市"
                                }
                            ],
                            "city": "上饶市"
                        }
                    ],
                    "province": "江西省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "历下区"
                                },
                                {
                                    "area": "市中区"
                                },
                                {
                                    "area": "槐荫区"
                                },
                                {
                                    "area": "天桥区"
                                },
                                {
                                    "area": "历城区"
                                },
                                {
                                    "area": "长清区"
                                },
                                {
                                    "area": "章丘区"
                                },
                                {
                                    "area": "济阳区"
                                },
                                {
                                    "area": "莱芜区"
                                },
                                {
                                    "area": "钢城区"
                                },
                                {
                                    "area": "平阴县"
                                },
                                {
                                    "area": "商河县"
                                }
                            ],
                            "city": "济南市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "市南区"
                                },
                                {
                                    "area": "市北区"
                                },
                                {
                                    "area": "黄岛区"
                                },
                                {
                                    "area": "崂山区"
                                },
                                {
                                    "area": "李沧区"
                                },
                                {
                                    "area": "城阳区"
                                },
                                {
                                    "area": "即墨区"
                                },
                                {
                                    "area": "胶州市"
                                },
                                {
                                    "area": "平度市"
                                },
                                {
                                    "area": "莱西市"
                                }
                            ],
                            "city": "青岛市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "淄川区"
                                },
                                {
                                    "area": "张店区"
                                },
                                {
                                    "area": "博山区"
                                },
                                {
                                    "area": "临淄区"
                                },
                                {
                                    "area": "周村区"
                                },
                                {
                                    "area": "桓台县"
                                },
                                {
                                    "area": "高青县"
                                },
                                {
                                    "area": "沂源县"
                                }
                            ],
                            "city": "淄博市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "市中区"
                                },
                                {
                                    "area": "薛城区"
                                },
                                {
                                    "area": "峄城区"
                                },
                                {
                                    "area": "台儿庄区"
                                },
                                {
                                    "area": "山亭区"
                                },
                                {
                                    "area": "滕州市"
                                }
                            ],
                            "city": "枣庄市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "东营区"
                                },
                                {
                                    "area": "河口区"
                                },
                                {
                                    "area": "垦利区"
                                },
                                {
                                    "area": "利津县"
                                },
                                {
                                    "area": "广饶县"
                                }
                            ],
                            "city": "东营市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "芝罘区"
                                },
                                {
                                    "area": "福山区"
                                },
                                {
                                    "area": "牟平区"
                                },
                                {
                                    "area": "莱山区"
                                },
                                {
                                    "area": "蓬莱区"
                                },
                                {
                                    "area": "龙口市"
                                },
                                {
                                    "area": "莱阳市"
                                },
                                {
                                    "area": "莱州市"
                                },
                                {
                                    "area": "招远市"
                                },
                                {
                                    "area": "栖霞市"
                                },
                                {
                                    "area": "海阳市"
                                }
                            ],
                            "city": "烟台市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "潍城区"
                                },
                                {
                                    "area": "寒亭区"
                                },
                                {
                                    "area": "坊子区"
                                },
                                {
                                    "area": "奎文区"
                                },
                                {
                                    "area": "临朐县"
                                },
                                {
                                    "area": "昌乐县"
                                },
                                {
                                    "area": "青州市"
                                },
                                {
                                    "area": "诸城市"
                                },
                                {
                                    "area": "寿光市"
                                },
                                {
                                    "area": "安丘市"
                                },
                                {
                                    "area": "高密市"
                                },
                                {
                                    "area": "昌邑市"
                                }
                            ],
                            "city": "潍坊市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "任城区"
                                },
                                {
                                    "area": "兖州区"
                                },
                                {
                                    "area": "微山县"
                                },
                                {
                                    "area": "鱼台县"
                                },
                                {
                                    "area": "金乡县"
                                },
                                {
                                    "area": "嘉祥县"
                                },
                                {
                                    "area": "汶上县"
                                },
                                {
                                    "area": "泗水县"
                                },
                                {
                                    "area": "梁山县"
                                },
                                {
                                    "area": "曲阜市"
                                },
                                {
                                    "area": "邹城市"
                                }
                            ],
                            "city": "济宁市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "泰山区"
                                },
                                {
                                    "area": "岱岳区"
                                },
                                {
                                    "area": "宁阳县"
                                },
                                {
                                    "area": "东平县"
                                },
                                {
                                    "area": "新泰市"
                                },
                                {
                                    "area": "肥城市"
                                }
                            ],
                            "city": "泰安市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "环翠区"
                                },
                                {
                                    "area": "文登区"
                                },
                                {
                                    "area": "荣成市"
                                },
                                {
                                    "area": "乳山市"
                                }
                            ],
                            "city": "威海市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "东港区"
                                },
                                {
                                    "area": "岚山区"
                                },
                                {
                                    "area": "五莲县"
                                },
                                {
                                    "area": "莒县"
                                }
                            ],
                            "city": "日照市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "兰山区"
                                },
                                {
                                    "area": "罗庄区"
                                },
                                {
                                    "area": "河东区"
                                },
                                {
                                    "area": "沂南县"
                                },
                                {
                                    "area": "郯城县"
                                },
                                {
                                    "area": "沂水县"
                                },
                                {
                                    "area": "兰陵县"
                                },
                                {
                                    "area": "费县"
                                },
                                {
                                    "area": "平邑县"
                                },
                                {
                                    "area": "莒南县"
                                },
                                {
                                    "area": "蒙阴县"
                                },
                                {
                                    "area": "临沭县"
                                }
                            ],
                            "city": "临沂市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "德城区"
                                },
                                {
                                    "area": "陵城区"
                                },
                                {
                                    "area": "宁津县"
                                },
                                {
                                    "area": "庆云县"
                                },
                                {
                                    "area": "临邑县"
                                },
                                {
                                    "area": "齐河县"
                                },
                                {
                                    "area": "平原县"
                                },
                                {
                                    "area": "夏津县"
                                },
                                {
                                    "area": "武城县"
                                },
                                {
                                    "area": "乐陵市"
                                },
                                {
                                    "area": "禹城市"
                                }
                            ],
                            "city": "德州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "东昌府区"
                                },
                                {
                                    "area": "茌平区"
                                },
                                {
                                    "area": "阳谷县"
                                },
                                {
                                    "area": "莘县"
                                },
                                {
                                    "area": "东阿县"
                                },
                                {
                                    "area": "冠县"
                                },
                                {
                                    "area": "高唐县"
                                },
                                {
                                    "area": "临清市"
                                }
                            ],
                            "city": "聊城市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "滨城区"
                                },
                                {
                                    "area": "沾化区"
                                },
                                {
                                    "area": "惠民县"
                                },
                                {
                                    "area": "阳信县"
                                },
                                {
                                    "area": "无棣县"
                                },
                                {
                                    "area": "博兴县"
                                },
                                {
                                    "area": "邹平市"
                                }
                            ],
                            "city": "滨州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "牡丹区"
                                },
                                {
                                    "area": "定陶区"
                                },
                                {
                                    "area": "曹县"
                                },
                                {
                                    "area": "单县"
                                },
                                {
                                    "area": "成武县"
                                },
                                {
                                    "area": "巨野县"
                                },
                                {
                                    "area": "郓城县"
                                },
                                {
                                    "area": "鄄城县"
                                },
                                {
                                    "area": "东明县"
                                }
                            ],
                            "city": "菏泽市"
                        }
                    ],
                    "province": "山东省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "中原区"
                                },
                                {
                                    "area": "二七区"
                                },
                                {
                                    "area": "管城回族区"
                                },
                                {
                                    "area": "金水区"
                                },
                                {
                                    "area": "上街区"
                                },
                                {
                                    "area": "惠济区"
                                },
                                {
                                    "area": "中牟县"
                                },
                                {
                                    "area": "巩义市"
                                },
                                {
                                    "area": "荥阳市"
                                },
                                {
                                    "area": "新密市"
                                },
                                {
                                    "area": "新郑市"
                                },
                                {
                                    "area": "登封市"
                                }
                            ],
                            "city": "郑州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "龙亭区"
                                },
                                {
                                    "area": "顺河回族区"
                                },
                                {
                                    "area": "鼓楼区"
                                },
                                {
                                    "area": "禹王台区"
                                },
                                {
                                    "area": "祥符区"
                                },
                                {
                                    "area": "杞县"
                                },
                                {
                                    "area": "通许县"
                                },
                                {
                                    "area": "尉氏县"
                                },
                                {
                                    "area": "兰考县"
                                }
                            ],
                            "city": "开封市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "老城区"
                                },
                                {
                                    "area": "西工区"
                                },
                                {
                                    "area": "瀍河回族区"
                                },
                                {
                                    "area": "涧西区"
                                },
                                {
                                    "area": "偃师区"
                                },
                                {
                                    "area": "孟津区"
                                },
                                {
                                    "area": "洛龙区"
                                },
                                {
                                    "area": "新安县"
                                },
                                {
                                    "area": "栾川县"
                                },
                                {
                                    "area": "嵩县"
                                },
                                {
                                    "area": "汝阳县"
                                },
                                {
                                    "area": "宜阳县"
                                },
                                {
                                    "area": "洛宁县"
                                },
                                {
                                    "area": "伊川县"
                                }
                            ],
                            "city": "洛阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "新华区"
                                },
                                {
                                    "area": "卫东区"
                                },
                                {
                                    "area": "石龙区"
                                },
                                {
                                    "area": "湛河区"
                                },
                                {
                                    "area": "宝丰县"
                                },
                                {
                                    "area": "叶县"
                                },
                                {
                                    "area": "鲁山县"
                                },
                                {
                                    "area": "郏县"
                                },
                                {
                                    "area": "舞钢市"
                                },
                                {
                                    "area": "汝州市"
                                }
                            ],
                            "city": "平顶山市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "文峰区"
                                },
                                {
                                    "area": "北关区"
                                },
                                {
                                    "area": "殷都区"
                                },
                                {
                                    "area": "龙安区"
                                },
                                {
                                    "area": "安阳县"
                                },
                                {
                                    "area": "汤阴县"
                                },
                                {
                                    "area": "滑县"
                                },
                                {
                                    "area": "内黄县"
                                },
                                {
                                    "area": "林州市"
                                }
                            ],
                            "city": "安阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "鹤山区"
                                },
                                {
                                    "area": "山城区"
                                },
                                {
                                    "area": "淇滨区"
                                },
                                {
                                    "area": "浚县"
                                },
                                {
                                    "area": "淇县"
                                }
                            ],
                            "city": "鹤壁市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "红旗区"
                                },
                                {
                                    "area": "卫滨区"
                                },
                                {
                                    "area": "凤泉区"
                                },
                                {
                                    "area": "牧野区"
                                },
                                {
                                    "area": "新乡县"
                                },
                                {
                                    "area": "获嘉县"
                                },
                                {
                                    "area": "原阳县"
                                },
                                {
                                    "area": "延津县"
                                },
                                {
                                    "area": "封丘县"
                                },
                                {
                                    "area": "卫辉市"
                                },
                                {
                                    "area": "辉县市"
                                },
                                {
                                    "area": "长垣市"
                                }
                            ],
                            "city": "新乡市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "解放区"
                                },
                                {
                                    "area": "中站区"
                                },
                                {
                                    "area": "马村区"
                                },
                                {
                                    "area": "山阳区"
                                },
                                {
                                    "area": "修武县"
                                },
                                {
                                    "area": "博爱县"
                                },
                                {
                                    "area": "武陟县"
                                },
                                {
                                    "area": "温县"
                                },
                                {
                                    "area": "沁阳市"
                                },
                                {
                                    "area": "孟州市"
                                }
                            ],
                            "city": "焦作市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "华龙区"
                                },
                                {
                                    "area": "清丰县"
                                },
                                {
                                    "area": "南乐县"
                                },
                                {
                                    "area": "范县"
                                },
                                {
                                    "area": "台前县"
                                },
                                {
                                    "area": "濮阳县"
                                }
                            ],
                            "city": "濮阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "魏都区"
                                },
                                {
                                    "area": "建安区"
                                },
                                {
                                    "area": "鄢陵县"
                                },
                                {
                                    "area": "襄城县"
                                },
                                {
                                    "area": "禹州市"
                                },
                                {
                                    "area": "长葛市"
                                }
                            ],
                            "city": "许昌市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "源汇区"
                                },
                                {
                                    "area": "郾城区"
                                },
                                {
                                    "area": "召陵区"
                                },
                                {
                                    "area": "舞阳县"
                                },
                                {
                                    "area": "临颍县"
                                }
                            ],
                            "city": "漯河市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "湖滨区"
                                },
                                {
                                    "area": "陕州区"
                                },
                                {
                                    "area": "渑池县"
                                },
                                {
                                    "area": "卢氏县"
                                },
                                {
                                    "area": "义马市"
                                },
                                {
                                    "area": "灵宝市"
                                }
                            ],
                            "city": "三门峡市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "宛城区"
                                },
                                {
                                    "area": "卧龙区"
                                },
                                {
                                    "area": "南召县"
                                },
                                {
                                    "area": "方城县"
                                },
                                {
                                    "area": "西峡县"
                                },
                                {
                                    "area": "镇平县"
                                },
                                {
                                    "area": "内乡县"
                                },
                                {
                                    "area": "淅川县"
                                },
                                {
                                    "area": "社旗县"
                                },
                                {
                                    "area": "唐河县"
                                },
                                {
                                    "area": "新野县"
                                },
                                {
                                    "area": "桐柏县"
                                },
                                {
                                    "area": "邓州市"
                                }
                            ],
                            "city": "南阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "梁园区"
                                },
                                {
                                    "area": "睢阳区"
                                },
                                {
                                    "area": "民权县"
                                },
                                {
                                    "area": "睢县"
                                },
                                {
                                    "area": "宁陵县"
                                },
                                {
                                    "area": "柘城县"
                                },
                                {
                                    "area": "虞城县"
                                },
                                {
                                    "area": "夏邑县"
                                },
                                {
                                    "area": "永城市"
                                }
                            ],
                            "city": "商丘市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "浉河区"
                                },
                                {
                                    "area": "平桥区"
                                },
                                {
                                    "area": "罗山县"
                                },
                                {
                                    "area": "光山县"
                                },
                                {
                                    "area": "新县"
                                },
                                {
                                    "area": "商城县"
                                },
                                {
                                    "area": "固始县"
                                },
                                {
                                    "area": "潢川县"
                                },
                                {
                                    "area": "淮滨县"
                                },
                                {
                                    "area": "息县"
                                }
                            ],
                            "city": "信阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "川汇区"
                                },
                                {
                                    "area": "淮阳区"
                                },
                                {
                                    "area": "扶沟县"
                                },
                                {
                                    "area": "西华县"
                                },
                                {
                                    "area": "商水县"
                                },
                                {
                                    "area": "沈丘县"
                                },
                                {
                                    "area": "郸城县"
                                },
                                {
                                    "area": "太康县"
                                },
                                {
                                    "area": "鹿邑县"
                                },
                                {
                                    "area": "项城市"
                                }
                            ],
                            "city": "周口市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "驿城区"
                                },
                                {
                                    "area": "西平县"
                                },
                                {
                                    "area": "上蔡县"
                                },
                                {
                                    "area": "平舆县"
                                },
                                {
                                    "area": "正阳县"
                                },
                                {
                                    "area": "确山县"
                                },
                                {
                                    "area": "泌阳县"
                                },
                                {
                                    "area": "汝南县"
                                },
                                {
                                    "area": "遂平县"
                                },
                                {
                                    "area": "新蔡县"
                                },
                                {
                                    "area": "济源市"
                                }
                            ],
                            "city": "驻马店市"
                        }
                    ],
                    "province": "河南省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "江岸区"
                                },
                                {
                                    "area": "江汉区"
                                },
                                {
                                    "area": "硚口区"
                                },
                                {
                                    "area": "汉阳区"
                                },
                                {
                                    "area": "武昌区"
                                },
                                {
                                    "area": "青山区"
                                },
                                {
                                    "area": "洪山区"
                                },
                                {
                                    "area": "东西湖区"
                                },
                                {
                                    "area": "汉南区"
                                },
                                {
                                    "area": "蔡甸区"
                                },
                                {
                                    "area": "江夏区"
                                },
                                {
                                    "area": "黄陂区"
                                },
                                {
                                    "area": "新洲区"
                                }
                            ],
                            "city": "武汉市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "黄石港区"
                                },
                                {
                                    "area": "西塞山区"
                                },
                                {
                                    "area": "下陆区"
                                },
                                {
                                    "area": "铁山区"
                                },
                                {
                                    "area": "阳新县"
                                },
                                {
                                    "area": "大冶市"
                                }
                            ],
                            "city": "黄石市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "茅箭区"
                                },
                                {
                                    "area": "张湾区"
                                },
                                {
                                    "area": "郧阳区"
                                },
                                {
                                    "area": "郧西县"
                                },
                                {
                                    "area": "竹山县"
                                },
                                {
                                    "area": "竹溪县"
                                },
                                {
                                    "area": "房县"
                                },
                                {
                                    "area": "丹江口市"
                                }
                            ],
                            "city": "十堰市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "西陵区"
                                },
                                {
                                    "area": "伍家岗区"
                                },
                                {
                                    "area": "点军区"
                                },
                                {
                                    "area": "猇亭区"
                                },
                                {
                                    "area": "夷陵区"
                                },
                                {
                                    "area": "远安县"
                                },
                                {
                                    "area": "兴山县"
                                },
                                {
                                    "area": "秭归县"
                                },
                                {
                                    "area": "长阳土家族自治县"
                                },
                                {
                                    "area": "五峰土家族自治县"
                                },
                                {
                                    "area": "宜都市"
                                },
                                {
                                    "area": "当阳市"
                                },
                                {
                                    "area": "枝江市"
                                }
                            ],
                            "city": "宜昌市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "襄城区"
                                },
                                {
                                    "area": "樊城区"
                                },
                                {
                                    "area": "襄州区"
                                },
                                {
                                    "area": "南漳县"
                                },
                                {
                                    "area": "谷城县"
                                },
                                {
                                    "area": "保康县"
                                },
                                {
                                    "area": "老河口市"
                                },
                                {
                                    "area": "枣阳市"
                                },
                                {
                                    "area": "宜城市"
                                }
                            ],
                            "city": "襄阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "梁子湖区"
                                },
                                {
                                    "area": "华容区"
                                },
                                {
                                    "area": "鄂城区"
                                }
                            ],
                            "city": "鄂州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "东宝区"
                                },
                                {
                                    "area": "掇刀区"
                                },
                                {
                                    "area": "沙洋县"
                                },
                                {
                                    "area": "钟祥市"
                                },
                                {
                                    "area": "京山市"
                                }
                            ],
                            "city": "荆门市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "孝南区"
                                },
                                {
                                    "area": "孝昌县"
                                },
                                {
                                    "area": "大悟县"
                                },
                                {
                                    "area": "云梦县"
                                },
                                {
                                    "area": "应城市"
                                },
                                {
                                    "area": "安陆市"
                                },
                                {
                                    "area": "汉川市"
                                }
                            ],
                            "city": "孝感市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "沙市区"
                                },
                                {
                                    "area": "荆州区"
                                },
                                {
                                    "area": "公安县"
                                },
                                {
                                    "area": "江陵县"
                                },
                                {
                                    "area": "石首市"
                                },
                                {
                                    "area": "洪湖市"
                                },
                                {
                                    "area": "松滋市"
                                },
                                {
                                    "area": "监利市"
                                }
                            ],
                            "city": "荆州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "黄州区"
                                },
                                {
                                    "area": "团风县"
                                },
                                {
                                    "area": "红安县"
                                },
                                {
                                    "area": "罗田县"
                                },
                                {
                                    "area": "英山县"
                                },
                                {
                                    "area": "浠水县"
                                },
                                {
                                    "area": "蕲春县"
                                },
                                {
                                    "area": "黄梅县"
                                },
                                {
                                    "area": "麻城市"
                                },
                                {
                                    "area": "武穴市"
                                }
                            ],
                            "city": "黄冈市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "咸安区"
                                },
                                {
                                    "area": "嘉鱼县"
                                },
                                {
                                    "area": "通城县"
                                },
                                {
                                    "area": "崇阳县"
                                },
                                {
                                    "area": "通山县"
                                },
                                {
                                    "area": "赤壁市"
                                }
                            ],
                            "city": "咸宁市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "曾都区"
                                },
                                {
                                    "area": "随县"
                                },
                                {
                                    "area": "广水市"
                                }
                            ],
                            "city": "随州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "恩施市"
                                },
                                {
                                    "area": "利川市"
                                },
                                {
                                    "area": "建始县"
                                },
                                {
                                    "area": "巴东县"
                                },
                                {
                                    "area": "宣恩县"
                                },
                                {
                                    "area": "咸丰县"
                                },
                                {
                                    "area": "来凤县"
                                },
                                {
                                    "area": "鹤峰县"
                                },
                                {
                                    "area": "仙桃市"
                                },
                                {
                                    "area": "潜江市"
                                },
                                {
                                    "area": "天门市"
                                },
                                {
                                    "area": "神农架林区"
                                }
                            ],
                            "city": "恩施土家族苗族自治州"
                        }
                    ],
                    "province": "湖北省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "芙蓉区"
                                },
                                {
                                    "area": "天心区"
                                },
                                {
                                    "area": "岳麓区"
                                },
                                {
                                    "area": "开福区"
                                },
                                {
                                    "area": "雨花区"
                                },
                                {
                                    "area": "望城区"
                                },
                                {
                                    "area": "长沙县"
                                },
                                {
                                    "area": "浏阳市"
                                },
                                {
                                    "area": "宁乡市"
                                }
                            ],
                            "city": "长沙市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "荷塘区"
                                },
                                {
                                    "area": "芦淞区"
                                },
                                {
                                    "area": "石峰区"
                                },
                                {
                                    "area": "天元区"
                                },
                                {
                                    "area": "渌口区"
                                },
                                {
                                    "area": "攸县"
                                },
                                {
                                    "area": "茶陵县"
                                },
                                {
                                    "area": "炎陵县"
                                },
                                {
                                    "area": "醴陵市"
                                }
                            ],
                            "city": "株洲市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "雨湖区"
                                },
                                {
                                    "area": "岳塘区"
                                },
                                {
                                    "area": "湘潭县"
                                },
                                {
                                    "area": "湘乡市"
                                },
                                {
                                    "area": "韶山市"
                                }
                            ],
                            "city": "湘潭市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "珠晖区"
                                },
                                {
                                    "area": "雁峰区"
                                },
                                {
                                    "area": "石鼓区"
                                },
                                {
                                    "area": "蒸湘区"
                                },
                                {
                                    "area": "南岳区"
                                },
                                {
                                    "area": "衡阳县"
                                },
                                {
                                    "area": "衡南县"
                                },
                                {
                                    "area": "衡山县"
                                },
                                {
                                    "area": "衡东县"
                                },
                                {
                                    "area": "祁东县"
                                },
                                {
                                    "area": "耒阳市"
                                },
                                {
                                    "area": "常宁市"
                                }
                            ],
                            "city": "衡阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "双清区"
                                },
                                {
                                    "area": "大祥区"
                                },
                                {
                                    "area": "北塔区"
                                },
                                {
                                    "area": "新邵县"
                                },
                                {
                                    "area": "邵阳县"
                                },
                                {
                                    "area": "隆回县"
                                },
                                {
                                    "area": "洞口县"
                                },
                                {
                                    "area": "绥宁县"
                                },
                                {
                                    "area": "新宁县"
                                },
                                {
                                    "area": "城步苗族自治县"
                                },
                                {
                                    "area": "武冈市"
                                },
                                {
                                    "area": "邵东市"
                                }
                            ],
                            "city": "邵阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "岳阳楼区"
                                },
                                {
                                    "area": "云溪区"
                                },
                                {
                                    "area": "君山区"
                                },
                                {
                                    "area": "岳阳县"
                                },
                                {
                                    "area": "华容县"
                                },
                                {
                                    "area": "湘阴县"
                                },
                                {
                                    "area": "平江县"
                                },
                                {
                                    "area": "汨罗市"
                                },
                                {
                                    "area": "临湘市"
                                }
                            ],
                            "city": "岳阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "武陵区"
                                },
                                {
                                    "area": "鼎城区"
                                },
                                {
                                    "area": "安乡县"
                                },
                                {
                                    "area": "汉寿县"
                                },
                                {
                                    "area": "澧县"
                                },
                                {
                                    "area": "临澧县"
                                },
                                {
                                    "area": "桃源县"
                                },
                                {
                                    "area": "石门县"
                                },
                                {
                                    "area": "津市市"
                                }
                            ],
                            "city": "常德市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "永定区"
                                },
                                {
                                    "area": "武陵源区"
                                },
                                {
                                    "area": "慈利县"
                                },
                                {
                                    "area": "桑植县"
                                }
                            ],
                            "city": "张家界市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "资阳区"
                                },
                                {
                                    "area": "赫山区"
                                },
                                {
                                    "area": "南县"
                                },
                                {
                                    "area": "桃江县"
                                },
                                {
                                    "area": "安化县"
                                },
                                {
                                    "area": "沅江市"
                                }
                            ],
                            "city": "益阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "北湖区"
                                },
                                {
                                    "area": "苏仙区"
                                },
                                {
                                    "area": "桂阳县"
                                },
                                {
                                    "area": "宜章县"
                                },
                                {
                                    "area": "永兴县"
                                },
                                {
                                    "area": "嘉禾县"
                                },
                                {
                                    "area": "临武县"
                                },
                                {
                                    "area": "汝城县"
                                },
                                {
                                    "area": "桂东县"
                                },
                                {
                                    "area": "安仁县"
                                },
                                {
                                    "area": "资兴市"
                                }
                            ],
                            "city": "郴州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "零陵区"
                                },
                                {
                                    "area": "冷水滩区"
                                },
                                {
                                    "area": "东安县"
                                },
                                {
                                    "area": "双牌县"
                                },
                                {
                                    "area": "道县"
                                },
                                {
                                    "area": "江永县"
                                },
                                {
                                    "area": "宁远县"
                                },
                                {
                                    "area": "蓝山县"
                                },
                                {
                                    "area": "新田县"
                                },
                                {
                                    "area": "江华瑶族自治县"
                                },
                                {
                                    "area": "祁阳市"
                                }
                            ],
                            "city": "永州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "鹤城区"
                                },
                                {
                                    "area": "中方县"
                                },
                                {
                                    "area": "沅陵县"
                                },
                                {
                                    "area": "辰溪县"
                                },
                                {
                                    "area": "溆浦县"
                                },
                                {
                                    "area": "会同县"
                                },
                                {
                                    "area": "麻阳苗族自治县"
                                },
                                {
                                    "area": "新晃侗族自治县"
                                },
                                {
                                    "area": "芷江侗族自治县"
                                },
                                {
                                    "area": "靖州苗族侗族自治县"
                                },
                                {
                                    "area": "通道侗族自治县"
                                },
                                {
                                    "area": "洪江市"
                                }
                            ],
                            "city": "怀化市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "娄星区"
                                },
                                {
                                    "area": "双峰县"
                                },
                                {
                                    "area": "新化县"
                                },
                                {
                                    "area": "冷水江市"
                                },
                                {
                                    "area": "涟源市"
                                }
                            ],
                            "city": "娄底市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "吉首市"
                                },
                                {
                                    "area": "泸溪县"
                                },
                                {
                                    "area": "凤凰县"
                                },
                                {
                                    "area": "花垣县"
                                },
                                {
                                    "area": "保靖县"
                                },
                                {
                                    "area": "古丈县"
                                },
                                {
                                    "area": "永顺县"
                                },
                                {
                                    "area": "龙山县"
                                }
                            ],
                            "city": "湘西土家族苗族自治州"
                        }
                    ],
                    "province": "湖南省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "荔湾区"
                                },
                                {
                                    "area": "越秀区"
                                },
                                {
                                    "area": "海珠区"
                                },
                                {
                                    "area": "天河区"
                                },
                                {
                                    "area": "白云区"
                                },
                                {
                                    "area": "黄埔区"
                                },
                                {
                                    "area": "番禺区"
                                },
                                {
                                    "area": "花都区"
                                },
                                {
                                    "area": "南沙区"
                                },
                                {
                                    "area": "从化区"
                                },
                                {
                                    "area": "增城区"
                                }
                            ],
                            "city": "广州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "武江区"
                                },
                                {
                                    "area": "浈江区"
                                },
                                {
                                    "area": "曲江区"
                                },
                                {
                                    "area": "始兴县"
                                },
                                {
                                    "area": "仁化县"
                                },
                                {
                                    "area": "翁源县"
                                },
                                {
                                    "area": "乳源瑶族自治县"
                                },
                                {
                                    "area": "新丰县"
                                },
                                {
                                    "area": "乐昌市"
                                },
                                {
                                    "area": "南雄市"
                                }
                            ],
                            "city": "韶关市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "罗湖区"
                                },
                                {
                                    "area": "福田区"
                                },
                                {
                                    "area": "南山区"
                                },
                                {
                                    "area": "宝安区"
                                },
                                {
                                    "area": "龙岗区"
                                },
                                {
                                    "area": "盐田区"
                                },
                                {
                                    "area": "龙华区"
                                },
                                {
                                    "area": "坪山区"
                                },
                                {
                                    "area": "光明区"
                                }
                            ],
                            "city": "深圳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "香洲区"
                                },
                                {
                                    "area": "斗门区"
                                },
                                {
                                    "area": "金湾区"
                                }
                            ],
                            "city": "珠海市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "龙湖区"
                                },
                                {
                                    "area": "金平区"
                                },
                                {
                                    "area": "濠江区"
                                },
                                {
                                    "area": "潮阳区"
                                },
                                {
                                    "area": "潮南区"
                                },
                                {
                                    "area": "澄海区"
                                },
                                {
                                    "area": "南澳县"
                                }
                            ],
                            "city": "汕头市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "禅城区"
                                },
                                {
                                    "area": "南海区"
                                },
                                {
                                    "area": "顺德区"
                                },
                                {
                                    "area": "三水区"
                                },
                                {
                                    "area": "高明区"
                                }
                            ],
                            "city": "佛山市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "蓬江区"
                                },
                                {
                                    "area": "江海区"
                                },
                                {
                                    "area": "新会区"
                                },
                                {
                                    "area": "台山市"
                                },
                                {
                                    "area": "开平市"
                                },
                                {
                                    "area": "鹤山市"
                                },
                                {
                                    "area": "恩平市"
                                }
                            ],
                            "city": "江门市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "赤坎区"
                                },
                                {
                                    "area": "霞山区"
                                },
                                {
                                    "area": "坡头区"
                                },
                                {
                                    "area": "麻章区"
                                },
                                {
                                    "area": "遂溪县"
                                },
                                {
                                    "area": "徐闻县"
                                },
                                {
                                    "area": "廉江市"
                                },
                                {
                                    "area": "雷州市"
                                },
                                {
                                    "area": "吴川市"
                                }
                            ],
                            "city": "湛江市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "茂南区"
                                },
                                {
                                    "area": "电白区"
                                },
                                {
                                    "area": "高州市"
                                },
                                {
                                    "area": "化州市"
                                },
                                {
                                    "area": "信宜市"
                                }
                            ],
                            "city": "茂名市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "端州区"
                                },
                                {
                                    "area": "鼎湖区"
                                },
                                {
                                    "area": "高要区"
                                },
                                {
                                    "area": "广宁县"
                                },
                                {
                                    "area": "怀集县"
                                },
                                {
                                    "area": "封开县"
                                },
                                {
                                    "area": "德庆县"
                                },
                                {
                                    "area": "四会市"
                                }
                            ],
                            "city": "肇庆市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "惠城区"
                                },
                                {
                                    "area": "惠阳区"
                                },
                                {
                                    "area": "博罗县"
                                },
                                {
                                    "area": "惠东县"
                                },
                                {
                                    "area": "龙门县"
                                }
                            ],
                            "city": "惠州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "梅江区"
                                },
                                {
                                    "area": "梅县区"
                                },
                                {
                                    "area": "大埔县"
                                },
                                {
                                    "area": "丰顺县"
                                },
                                {
                                    "area": "五华县"
                                },
                                {
                                    "area": "平远县"
                                },
                                {
                                    "area": "蕉岭县"
                                },
                                {
                                    "area": "兴宁市"
                                }
                            ],
                            "city": "梅州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "城区"
                                },
                                {
                                    "area": "海丰县"
                                },
                                {
                                    "area": "陆河县"
                                },
                                {
                                    "area": "陆丰市"
                                }
                            ],
                            "city": "汕尾市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "源城区"
                                },
                                {
                                    "area": "紫金县"
                                },
                                {
                                    "area": "龙川县"
                                },
                                {
                                    "area": "连平县"
                                },
                                {
                                    "area": "和平县"
                                },
                                {
                                    "area": "东源县"
                                }
                            ],
                            "city": "河源市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "江城区"
                                },
                                {
                                    "area": "阳东区"
                                },
                                {
                                    "area": "阳西县"
                                },
                                {
                                    "area": "阳春市"
                                }
                            ],
                            "city": "阳江市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "清城区"
                                },
                                {
                                    "area": "清新区"
                                },
                                {
                                    "area": "佛冈县"
                                },
                                {
                                    "area": "阳山县"
                                },
                                {
                                    "area": "连山壮族瑶族自治县"
                                },
                                {
                                    "area": "连南瑶族自治县"
                                },
                                {
                                    "area": "英德市"
                                },
                                {
                                    "area": "连州市"
                                }
                            ],
                            "city": "清远市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "湘桥区"
                                },
                                {
                                    "area": "潮安区"
                                },
                                {
                                    "area": "饶平县"
                                }
                            ],
                            "city": "潮州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "榕城区"
                                },
                                {
                                    "area": "揭东区"
                                },
                                {
                                    "area": "揭西县"
                                },
                                {
                                    "area": "惠来县"
                                },
                                {
                                    "area": "普宁市"
                                }
                            ],
                            "city": "揭阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "云城区"
                                },
                                {
                                    "area": "云安区"
                                },
                                {
                                    "area": "新兴县"
                                },
                                {
                                    "area": "郁南县"
                                },
                                {
                                    "area": "罗定市"
                                }
                            ],
                            "city": "云浮市"
                        }
                    ],
                    "province": "广东省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "兴宁区"
                                },
                                {
                                    "area": "青秀区"
                                },
                                {
                                    "area": "江南区"
                                },
                                {
                                    "area": "西乡塘区"
                                },
                                {
                                    "area": "良庆区"
                                },
                                {
                                    "area": "邕宁区"
                                },
                                {
                                    "area": "武鸣区"
                                },
                                {
                                    "area": "隆安县"
                                },
                                {
                                    "area": "马山县"
                                },
                                {
                                    "area": "上林县"
                                },
                                {
                                    "area": "宾阳县"
                                },
                                {
                                    "area": "横州市"
                                }
                            ],
                            "city": "南宁市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "城中区"
                                },
                                {
                                    "area": "鱼峰区"
                                },
                                {
                                    "area": "柳南区"
                                },
                                {
                                    "area": "柳北区"
                                },
                                {
                                    "area": "柳江区"
                                },
                                {
                                    "area": "柳城县"
                                },
                                {
                                    "area": "鹿寨县"
                                },
                                {
                                    "area": "融安县"
                                },
                                {
                                    "area": "融水苗族自治县"
                                },
                                {
                                    "area": "三江侗族自治县"
                                }
                            ],
                            "city": "柳州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "秀峰区"
                                },
                                {
                                    "area": "叠彩区"
                                },
                                {
                                    "area": "象山区"
                                },
                                {
                                    "area": "七星区"
                                },
                                {
                                    "area": "雁山区"
                                },
                                {
                                    "area": "临桂区"
                                },
                                {
                                    "area": "阳朔县"
                                },
                                {
                                    "area": "灵川县"
                                },
                                {
                                    "area": "全州县"
                                },
                                {
                                    "area": "兴安县"
                                },
                                {
                                    "area": "永福县"
                                },
                                {
                                    "area": "灌阳县"
                                },
                                {
                                    "area": "龙胜各族自治县"
                                },
                                {
                                    "area": "资源县"
                                },
                                {
                                    "area": "平乐县"
                                },
                                {
                                    "area": "恭城瑶族自治县"
                                },
                                {
                                    "area": "荔浦市"
                                }
                            ],
                            "city": "桂林市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "万秀区"
                                },
                                {
                                    "area": "长洲区"
                                },
                                {
                                    "area": "龙圩区"
                                },
                                {
                                    "area": "苍梧县"
                                },
                                {
                                    "area": "藤县"
                                },
                                {
                                    "area": "蒙山县"
                                },
                                {
                                    "area": "岑溪市"
                                }
                            ],
                            "city": "梧州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "海城区"
                                },
                                {
                                    "area": "银海区"
                                },
                                {
                                    "area": "铁山港区"
                                },
                                {
                                    "area": "合浦县"
                                }
                            ],
                            "city": "北海市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "港口区"
                                },
                                {
                                    "area": "防城区"
                                },
                                {
                                    "area": "上思县"
                                },
                                {
                                    "area": "东兴市"
                                }
                            ],
                            "city": "防城港市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "钦南区"
                                },
                                {
                                    "area": "钦北区"
                                },
                                {
                                    "area": "灵山县"
                                },
                                {
                                    "area": "浦北县"
                                }
                            ],
                            "city": "钦州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "港北区"
                                },
                                {
                                    "area": "港南区"
                                },
                                {
                                    "area": "覃塘区"
                                },
                                {
                                    "area": "平南县"
                                },
                                {
                                    "area": "桂平市"
                                }
                            ],
                            "city": "贵港市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "玉州区"
                                },
                                {
                                    "area": "福绵区"
                                },
                                {
                                    "area": "容县"
                                },
                                {
                                    "area": "陆川县"
                                },
                                {
                                    "area": "博白县"
                                },
                                {
                                    "area": "兴业县"
                                },
                                {
                                    "area": "北流市"
                                }
                            ],
                            "city": "玉林市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "右江区"
                                },
                                {
                                    "area": "田阳区"
                                },
                                {
                                    "area": "田东县"
                                },
                                {
                                    "area": "德保县"
                                },
                                {
                                    "area": "那坡县"
                                },
                                {
                                    "area": "凌云县"
                                },
                                {
                                    "area": "乐业县"
                                },
                                {
                                    "area": "田林县"
                                },
                                {
                                    "area": "西林县"
                                },
                                {
                                    "area": "隆林各族自治县"
                                },
                                {
                                    "area": "靖西市"
                                },
                                {
                                    "area": "平果市"
                                }
                            ],
                            "city": "百色市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "八步区"
                                },
                                {
                                    "area": "平桂区"
                                },
                                {
                                    "area": "昭平县"
                                },
                                {
                                    "area": "钟山县"
                                },
                                {
                                    "area": "富川瑶族自治县"
                                }
                            ],
                            "city": "贺州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "金城江区"
                                },
                                {
                                    "area": "宜州区"
                                },
                                {
                                    "area": "南丹县"
                                },
                                {
                                    "area": "天峨县"
                                },
                                {
                                    "area": "凤山县"
                                },
                                {
                                    "area": "东兰县"
                                },
                                {
                                    "area": "罗城仫佬族自治县"
                                },
                                {
                                    "area": "环江毛南族自治县"
                                },
                                {
                                    "area": "巴马瑶族自治县"
                                },
                                {
                                    "area": "都安瑶族自治县"
                                },
                                {
                                    "area": "大化瑶族自治县"
                                }
                            ],
                            "city": "河池市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "兴宾区"
                                },
                                {
                                    "area": "忻城县"
                                },
                                {
                                    "area": "象州县"
                                },
                                {
                                    "area": "武宣县"
                                },
                                {
                                    "area": "金秀瑶族自治县"
                                },
                                {
                                    "area": "合山市"
                                }
                            ],
                            "city": "来宾市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "江州区"
                                },
                                {
                                    "area": "扶绥县"
                                },
                                {
                                    "area": "宁明县"
                                },
                                {
                                    "area": "龙州县"
                                },
                                {
                                    "area": "大新县"
                                },
                                {
                                    "area": "天等县"
                                },
                                {
                                    "area": "凭祥市"
                                }
                            ],
                            "city": "崇左市"
                        }
                    ],
                    "province": "广西壮族自治区"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "秀英区"
                                },
                                {
                                    "area": "龙华区"
                                },
                                {
                                    "area": "琼山区"
                                },
                                {
                                    "area": "美兰区"
                                }
                            ],
                            "city": "海口市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "海棠区"
                                },
                                {
                                    "area": "吉阳区"
                                },
                                {
                                    "area": "天涯区"
                                },
                                {
                                    "area": "崖州区"
                                }
                            ],
                            "city": "三亚市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "五指山市"
                                },
                                {
                                    "area": "琼海市"
                                },
                                {
                                    "area": "文昌市"
                                },
                                {
                                    "area": "万宁市"
                                },
                                {
                                    "area": "东方市"
                                },
                                {
                                    "area": "定安县"
                                },
                                {
                                    "area": "屯昌县"
                                },
                                {
                                    "area": "澄迈县"
                                },
                                {
                                    "area": "临高县"
                                },
                                {
                                    "area": "白沙黎族自治县"
                                },
                                {
                                    "area": "昌江黎族自治县"
                                },
                                {
                                    "area": "乐东黎族自治县"
                                },
                                {
                                    "area": "陵水黎族自治县"
                                },
                                {
                                    "area": "保亭黎族苗族自治县"
                                },
                                {
                                    "area": "琼中黎族苗族自治县"
                                }
                            ],
                            "city": "儋州市"
                        }
                    ],
                    "province": "海南省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "万州区"
                                },
                                {
                                    "area": "涪陵区"
                                },
                                {
                                    "area": "渝中区"
                                },
                                {
                                    "area": "大渡口区"
                                },
                                {
                                    "area": "江北区"
                                },
                                {
                                    "area": "沙坪坝区"
                                },
                                {
                                    "area": "九龙坡区"
                                },
                                {
                                    "area": "南岸区"
                                },
                                {
                                    "area": "北碚区"
                                },
                                {
                                    "area": "綦江区"
                                },
                                {
                                    "area": "大足区"
                                },
                                {
                                    "area": "渝北区"
                                },
                                {
                                    "area": "巴南区"
                                },
                                {
                                    "area": "黔江区"
                                },
                                {
                                    "area": "长寿区"
                                },
                                {
                                    "area": "江津区"
                                },
                                {
                                    "area": "合川区"
                                },
                                {
                                    "area": "永川区"
                                },
                                {
                                    "area": "南川区"
                                },
                                {
                                    "area": "璧山区"
                                },
                                {
                                    "area": "铜梁区"
                                },
                                {
                                    "area": "潼南区"
                                },
                                {
                                    "area": "荣昌区"
                                },
                                {
                                    "area": "开州区"
                                },
                                {
                                    "area": "梁平区"
                                },
                                {
                                    "area": "武隆区"
                                },
                                {
                                    "area": "城口县"
                                },
                                {
                                    "area": "丰都县"
                                },
                                {
                                    "area": "垫江县"
                                },
                                {
                                    "area": "忠县"
                                },
                                {
                                    "area": "云阳县"
                                },
                                {
                                    "area": "奉节县"
                                },
                                {
                                    "area": "巫山县"
                                },
                                {
                                    "area": "巫溪县"
                                },
                                {
                                    "area": "石柱土家族自治县"
                                },
                                {
                                    "area": "秀山土家族苗族自治县"
                                },
                                {
                                    "area": "酉阳土家族苗族自治县"
                                },
                                {
                                    "area": "彭水苗族土家族自治县"
                                }
                            ],
                            "city": "重庆市"
                        }
                    ],
                    "province": "重庆市"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "锦江区"
                                },
                                {
                                    "area": "青羊区"
                                },
                                {
                                    "area": "金牛区"
                                },
                                {
                                    "area": "武侯区"
                                },
                                {
                                    "area": "成华区"
                                },
                                {
                                    "area": "龙泉驿区"
                                },
                                {
                                    "area": "青白江区"
                                },
                                {
                                    "area": "新都区"
                                },
                                {
                                    "area": "温江区"
                                },
                                {
                                    "area": "双流区"
                                },
                                {
                                    "area": "郫都区"
                                },
                                {
                                    "area": "新津区"
                                },
                                {
                                    "area": "金堂县"
                                },
                                {
                                    "area": "大邑县"
                                },
                                {
                                    "area": "蒲江县"
                                },
                                {
                                    "area": "都江堰市"
                                },
                                {
                                    "area": "彭州市"
                                },
                                {
                                    "area": "邛崃市"
                                },
                                {
                                    "area": "崇州市"
                                },
                                {
                                    "area": "简阳市"
                                }
                            ],
                            "city": "成都市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "自流井区"
                                },
                                {
                                    "area": "贡井区"
                                },
                                {
                                    "area": "大安区"
                                },
                                {
                                    "area": "沿滩区"
                                },
                                {
                                    "area": "荣县"
                                },
                                {
                                    "area": "富顺县"
                                }
                            ],
                            "city": "自贡市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "东区"
                                },
                                {
                                    "area": "西区"
                                },
                                {
                                    "area": "仁和区"
                                },
                                {
                                    "area": "米易县"
                                },
                                {
                                    "area": "盐边县"
                                }
                            ],
                            "city": "攀枝花市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "江阳区"
                                },
                                {
                                    "area": "纳溪区"
                                },
                                {
                                    "area": "龙马潭区"
                                },
                                {
                                    "area": "泸县"
                                },
                                {
                                    "area": "合江县"
                                },
                                {
                                    "area": "叙永县"
                                },
                                {
                                    "area": "古蔺县"
                                }
                            ],
                            "city": "泸州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "旌阳区"
                                },
                                {
                                    "area": "罗江区"
                                },
                                {
                                    "area": "中江县"
                                },
                                {
                                    "area": "广汉市"
                                },
                                {
                                    "area": "什邡市"
                                },
                                {
                                    "area": "绵竹市"
                                }
                            ],
                            "city": "德阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "涪城区"
                                },
                                {
                                    "area": "游仙区"
                                },
                                {
                                    "area": "安州区"
                                },
                                {
                                    "area": "三台县"
                                },
                                {
                                    "area": "盐亭县"
                                },
                                {
                                    "area": "梓潼县"
                                },
                                {
                                    "area": "北川羌族自治县"
                                },
                                {
                                    "area": "平武县"
                                },
                                {
                                    "area": "江油市"
                                }
                            ],
                            "city": "绵阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "利州区"
                                },
                                {
                                    "area": "昭化区"
                                },
                                {
                                    "area": "朝天区"
                                },
                                {
                                    "area": "旺苍县"
                                },
                                {
                                    "area": "青川县"
                                },
                                {
                                    "area": "剑阁县"
                                },
                                {
                                    "area": "苍溪县"
                                }
                            ],
                            "city": "广元市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "船山区"
                                },
                                {
                                    "area": "安居区"
                                },
                                {
                                    "area": "蓬溪县"
                                },
                                {
                                    "area": "大英县"
                                },
                                {
                                    "area": "射洪市"
                                }
                            ],
                            "city": "遂宁市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "市中区"
                                },
                                {
                                    "area": "东兴区"
                                },
                                {
                                    "area": "威远县"
                                },
                                {
                                    "area": "资中县"
                                },
                                {
                                    "area": "隆昌市"
                                }
                            ],
                            "city": "内江市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "市中区"
                                },
                                {
                                    "area": "沙湾区"
                                },
                                {
                                    "area": "五通桥区"
                                },
                                {
                                    "area": "金口河区"
                                },
                                {
                                    "area": "犍为县"
                                },
                                {
                                    "area": "井研县"
                                },
                                {
                                    "area": "夹江县"
                                },
                                {
                                    "area": "沐川县"
                                },
                                {
                                    "area": "峨边彝族自治县"
                                },
                                {
                                    "area": "马边彝族自治县"
                                },
                                {
                                    "area": "峨眉山市"
                                }
                            ],
                            "city": "乐山市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "顺庆区"
                                },
                                {
                                    "area": "高坪区"
                                },
                                {
                                    "area": "嘉陵区"
                                },
                                {
                                    "area": "南部县"
                                },
                                {
                                    "area": "营山县"
                                },
                                {
                                    "area": "蓬安县"
                                },
                                {
                                    "area": "仪陇县"
                                },
                                {
                                    "area": "西充县"
                                },
                                {
                                    "area": "阆中市"
                                }
                            ],
                            "city": "南充市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "东坡区"
                                },
                                {
                                    "area": "彭山区"
                                },
                                {
                                    "area": "仁寿县"
                                },
                                {
                                    "area": "洪雅县"
                                },
                                {
                                    "area": "丹棱县"
                                },
                                {
                                    "area": "青神县"
                                }
                            ],
                            "city": "眉山市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "翠屏区"
                                },
                                {
                                    "area": "南溪区"
                                },
                                {
                                    "area": "叙州区"
                                },
                                {
                                    "area": "江安县"
                                },
                                {
                                    "area": "长宁县"
                                },
                                {
                                    "area": "高县"
                                },
                                {
                                    "area": "珙县"
                                },
                                {
                                    "area": "筠连县"
                                },
                                {
                                    "area": "兴文县"
                                },
                                {
                                    "area": "屏山县"
                                }
                            ],
                            "city": "宜宾市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "广安区"
                                },
                                {
                                    "area": "前锋区"
                                },
                                {
                                    "area": "岳池县"
                                },
                                {
                                    "area": "武胜县"
                                },
                                {
                                    "area": "邻水县"
                                },
                                {
                                    "area": "华蓥市"
                                }
                            ],
                            "city": "广安市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "通川区"
                                },
                                {
                                    "area": "达川区"
                                },
                                {
                                    "area": "宣汉县"
                                },
                                {
                                    "area": "开江县"
                                },
                                {
                                    "area": "大竹县"
                                },
                                {
                                    "area": "渠县"
                                },
                                {
                                    "area": "万源市"
                                }
                            ],
                            "city": "达州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "雨城区"
                                },
                                {
                                    "area": "名山区"
                                },
                                {
                                    "area": "荥经县"
                                },
                                {
                                    "area": "汉源县"
                                },
                                {
                                    "area": "石棉县"
                                },
                                {
                                    "area": "天全县"
                                },
                                {
                                    "area": "芦山县"
                                },
                                {
                                    "area": "宝兴县"
                                }
                            ],
                            "city": "雅安市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "巴州区"
                                },
                                {
                                    "area": "恩阳区"
                                },
                                {
                                    "area": "通江县"
                                },
                                {
                                    "area": "南江县"
                                },
                                {
                                    "area": "平昌县"
                                }
                            ],
                            "city": "巴中市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "雁江区"
                                },
                                {
                                    "area": "安岳县"
                                },
                                {
                                    "area": "乐至县"
                                }
                            ],
                            "city": "资阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "马尔康市"
                                },
                                {
                                    "area": "汶川县"
                                },
                                {
                                    "area": "理县"
                                },
                                {
                                    "area": "茂县"
                                },
                                {
                                    "area": "松潘县"
                                },
                                {
                                    "area": "九寨沟县"
                                },
                                {
                                    "area": "金川县"
                                },
                                {
                                    "area": "小金县"
                                },
                                {
                                    "area": "黑水县"
                                },
                                {
                                    "area": "壤塘县"
                                },
                                {
                                    "area": "阿坝县"
                                },
                                {
                                    "area": "若尔盖县"
                                },
                                {
                                    "area": "红原县"
                                }
                            ],
                            "city": "阿坝藏族羌族自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "康定市"
                                },
                                {
                                    "area": "泸定县"
                                },
                                {
                                    "area": "丹巴县"
                                },
                                {
                                    "area": "九龙县"
                                },
                                {
                                    "area": "雅江县"
                                },
                                {
                                    "area": "道孚县"
                                },
                                {
                                    "area": "炉霍县"
                                },
                                {
                                    "area": "甘孜县"
                                },
                                {
                                    "area": "新龙县"
                                },
                                {
                                    "area": "德格县"
                                },
                                {
                                    "area": "白玉县"
                                },
                                {
                                    "area": "石渠县"
                                },
                                {
                                    "area": "色达县"
                                },
                                {
                                    "area": "理塘县"
                                },
                                {
                                    "area": "巴塘县"
                                },
                                {
                                    "area": "乡城县"
                                },
                                {
                                    "area": "稻城县"
                                },
                                {
                                    "area": "得荣县"
                                }
                            ],
                            "city": "甘孜藏族自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "西昌市"
                                },
                                {
                                    "area": "会理市"
                                },
                                {
                                    "area": "木里藏族自治县"
                                },
                                {
                                    "area": "盐源县"
                                },
                                {
                                    "area": "德昌县"
                                },
                                {
                                    "area": "会东县"
                                },
                                {
                                    "area": "宁南县"
                                },
                                {
                                    "area": "普格县"
                                },
                                {
                                    "area": "布拖县"
                                },
                                {
                                    "area": "金阳县"
                                },
                                {
                                    "area": "昭觉县"
                                },
                                {
                                    "area": "喜德县"
                                },
                                {
                                    "area": "冕宁县"
                                },
                                {
                                    "area": "越西县"
                                },
                                {
                                    "area": "甘洛县"
                                },
                                {
                                    "area": "美姑县"
                                },
                                {
                                    "area": "雷波县"
                                }
                            ],
                            "city": "凉山彝族自治州"
                        }
                    ],
                    "province": "四川省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "南明区"
                                },
                                {
                                    "area": "云岩区"
                                },
                                {
                                    "area": "花溪区"
                                },
                                {
                                    "area": "乌当区"
                                },
                                {
                                    "area": "白云区"
                                },
                                {
                                    "area": "观山湖区"
                                },
                                {
                                    "area": "开阳县"
                                },
                                {
                                    "area": "息烽县"
                                },
                                {
                                    "area": "修文县"
                                },
                                {
                                    "area": "清镇市"
                                }
                            ],
                            "city": "贵阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "钟山区"
                                },
                                {
                                    "area": "六枝特区"
                                },
                                {
                                    "area": "水城区"
                                },
                                {
                                    "area": "盘州市"
                                }
                            ],
                            "city": "六盘水市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "红花岗区"
                                },
                                {
                                    "area": "汇川区"
                                },
                                {
                                    "area": "播州区"
                                },
                                {
                                    "area": "桐梓县"
                                },
                                {
                                    "area": "绥阳县"
                                },
                                {
                                    "area": "正安县"
                                },
                                {
                                    "area": "道真仡佬族苗族自治县"
                                },
                                {
                                    "area": "务川仡佬族苗族自治县"
                                },
                                {
                                    "area": "凤冈县"
                                },
                                {
                                    "area": "湄潭县"
                                },
                                {
                                    "area": "余庆县"
                                },
                                {
                                    "area": "习水县"
                                },
                                {
                                    "area": "赤水市"
                                },
                                {
                                    "area": "仁怀市"
                                }
                            ],
                            "city": "遵义市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "西秀区"
                                },
                                {
                                    "area": "平坝区"
                                },
                                {
                                    "area": "普定县"
                                },
                                {
                                    "area": "镇宁布依族苗族自治县"
                                },
                                {
                                    "area": "关岭布依族苗族自治县"
                                },
                                {
                                    "area": "紫云苗族布依族自治县"
                                }
                            ],
                            "city": "安顺市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "七星关区"
                                },
                                {
                                    "area": "大方县"
                                },
                                {
                                    "area": "金沙县"
                                },
                                {
                                    "area": "织金县"
                                },
                                {
                                    "area": "纳雍县"
                                },
                                {
                                    "area": "威宁彝族回族苗族自治县"
                                },
                                {
                                    "area": "赫章县"
                                },
                                {
                                    "area": "黔西市"
                                }
                            ],
                            "city": "毕节市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "碧江区"
                                },
                                {
                                    "area": "万山区"
                                },
                                {
                                    "area": "江口县"
                                },
                                {
                                    "area": "玉屏侗族自治县"
                                },
                                {
                                    "area": "石阡县"
                                },
                                {
                                    "area": "思南县"
                                },
                                {
                                    "area": "印江土家族苗族自治县"
                                },
                                {
                                    "area": "德江县"
                                },
                                {
                                    "area": "沿河土家族自治县"
                                },
                                {
                                    "area": "松桃苗族自治县"
                                }
                            ],
                            "city": "铜仁市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "兴义市"
                                },
                                {
                                    "area": "兴仁市"
                                },
                                {
                                    "area": "普安县"
                                },
                                {
                                    "area": "晴隆县"
                                },
                                {
                                    "area": "贞丰县"
                                },
                                {
                                    "area": "望谟县"
                                },
                                {
                                    "area": "册亨县"
                                },
                                {
                                    "area": "安龙县"
                                }
                            ],
                            "city": "黔西南布依族苗族自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "凯里市"
                                },
                                {
                                    "area": "黄平县"
                                },
                                {
                                    "area": "施秉县"
                                },
                                {
                                    "area": "三穗县"
                                },
                                {
                                    "area": "镇远县"
                                },
                                {
                                    "area": "岑巩县"
                                },
                                {
                                    "area": "天柱县"
                                },
                                {
                                    "area": "锦屏县"
                                },
                                {
                                    "area": "剑河县"
                                },
                                {
                                    "area": "台江县"
                                },
                                {
                                    "area": "黎平县"
                                },
                                {
                                    "area": "榕江县"
                                },
                                {
                                    "area": "从江县"
                                },
                                {
                                    "area": "雷山县"
                                },
                                {
                                    "area": "麻江县"
                                },
                                {
                                    "area": "丹寨县"
                                }
                            ],
                            "city": "黔东南苗族侗族自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "都匀市"
                                },
                                {
                                    "area": "福泉市"
                                },
                                {
                                    "area": "荔波县"
                                },
                                {
                                    "area": "贵定县"
                                },
                                {
                                    "area": "瓮安县"
                                },
                                {
                                    "area": "独山县"
                                },
                                {
                                    "area": "平塘县"
                                },
                                {
                                    "area": "罗甸县"
                                },
                                {
                                    "area": "长顺县"
                                },
                                {
                                    "area": "龙里县"
                                },
                                {
                                    "area": "惠水县"
                                },
                                {
                                    "area": "三都水族自治县"
                                }
                            ],
                            "city": "黔南布依族苗族自治州"
                        }
                    ],
                    "province": "贵州省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "五华区"
                                },
                                {
                                    "area": "盘龙区"
                                },
                                {
                                    "area": "官渡区"
                                },
                                {
                                    "area": "西山区"
                                },
                                {
                                    "area": "东川区"
                                },
                                {
                                    "area": "呈贡区"
                                },
                                {
                                    "area": "晋宁区"
                                },
                                {
                                    "area": "富民县"
                                },
                                {
                                    "area": "宜良县"
                                },
                                {
                                    "area": "石林彝族自治县"
                                },
                                {
                                    "area": "嵩明县"
                                },
                                {
                                    "area": "禄劝彝族苗族自治县"
                                },
                                {
                                    "area": "寻甸回族彝族自治县"
                                },
                                {
                                    "area": "安宁市"
                                }
                            ],
                            "city": "昆明市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "麒麟区"
                                },
                                {
                                    "area": "沾益区"
                                },
                                {
                                    "area": "马龙区"
                                },
                                {
                                    "area": "陆良县"
                                },
                                {
                                    "area": "师宗县"
                                },
                                {
                                    "area": "罗平县"
                                },
                                {
                                    "area": "富源县"
                                },
                                {
                                    "area": "会泽县"
                                },
                                {
                                    "area": "宣威市"
                                }
                            ],
                            "city": "曲靖市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "红塔区"
                                },
                                {
                                    "area": "江川区"
                                },
                                {
                                    "area": "通海县"
                                },
                                {
                                    "area": "华宁县"
                                },
                                {
                                    "area": "易门县"
                                },
                                {
                                    "area": "峨山彝族自治县"
                                },
                                {
                                    "area": "新平彝族傣族自治县"
                                },
                                {
                                    "area": "元江哈尼族彝族傣族自治县"
                                },
                                {
                                    "area": "澄江市"
                                }
                            ],
                            "city": "玉溪市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "隆阳区"
                                },
                                {
                                    "area": "施甸县"
                                },
                                {
                                    "area": "龙陵县"
                                },
                                {
                                    "area": "昌宁县"
                                },
                                {
                                    "area": "腾冲市"
                                }
                            ],
                            "city": "保山市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "昭阳区"
                                },
                                {
                                    "area": "鲁甸县"
                                },
                                {
                                    "area": "巧家县"
                                },
                                {
                                    "area": "盐津县"
                                },
                                {
                                    "area": "大关县"
                                },
                                {
                                    "area": "永善县"
                                },
                                {
                                    "area": "绥江县"
                                },
                                {
                                    "area": "镇雄县"
                                },
                                {
                                    "area": "彝良县"
                                },
                                {
                                    "area": "威信县"
                                },
                                {
                                    "area": "水富市"
                                }
                            ],
                            "city": "昭通市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "古城区"
                                },
                                {
                                    "area": "玉龙纳西族自治县"
                                },
                                {
                                    "area": "永胜县"
                                },
                                {
                                    "area": "华坪县"
                                },
                                {
                                    "area": "宁蒗彝族自治县"
                                }
                            ],
                            "city": "丽江市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "思茅区"
                                },
                                {
                                    "area": "宁洱哈尼族彝族自治县"
                                },
                                {
                                    "area": "墨江哈尼族自治县"
                                },
                                {
                                    "area": "景东彝族自治县"
                                },
                                {
                                    "area": "景谷傣族彝族自治县"
                                },
                                {
                                    "area": "镇沅彝族哈尼族拉祜族自治县"
                                },
                                {
                                    "area": "江城哈尼族彝族自治县"
                                },
                                {
                                    "area": "孟连傣族拉祜族佤族自治县"
                                },
                                {
                                    "area": "澜沧拉祜族自治县"
                                },
                                {
                                    "area": "西盟佤族自治县"
                                }
                            ],
                            "city": "普洱市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "临翔区"
                                },
                                {
                                    "area": "凤庆县"
                                },
                                {
                                    "area": "云县"
                                },
                                {
                                    "area": "永德县"
                                },
                                {
                                    "area": "镇康县"
                                },
                                {
                                    "area": "双江拉祜族佤族布朗族傣族自治县"
                                },
                                {
                                    "area": "耿马傣族佤族自治县"
                                },
                                {
                                    "area": "沧源佤族自治县"
                                }
                            ],
                            "city": "临沧市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "楚雄市"
                                },
                                {
                                    "area": "禄丰市"
                                },
                                {
                                    "area": "双柏县"
                                },
                                {
                                    "area": "牟定县"
                                },
                                {
                                    "area": "南华县"
                                },
                                {
                                    "area": "姚安县"
                                },
                                {
                                    "area": "大姚县"
                                },
                                {
                                    "area": "永仁县"
                                },
                                {
                                    "area": "元谋县"
                                },
                                {
                                    "area": "武定县"
                                }
                            ],
                            "city": "楚雄彝族自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "个旧市"
                                },
                                {
                                    "area": "开远市"
                                },
                                {
                                    "area": "蒙自市"
                                },
                                {
                                    "area": "弥勒市"
                                },
                                {
                                    "area": "屏边苗族自治县"
                                },
                                {
                                    "area": "建水县"
                                },
                                {
                                    "area": "石屏县"
                                },
                                {
                                    "area": "泸西县"
                                },
                                {
                                    "area": "元阳县"
                                },
                                {
                                    "area": "红河县"
                                },
                                {
                                    "area": "金平苗族瑶族傣族自治县"
                                },
                                {
                                    "area": "绿春县"
                                },
                                {
                                    "area": "河口瑶族自治县"
                                }
                            ],
                            "city": "红河哈尼族彝族自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "文山市"
                                },
                                {
                                    "area": "砚山县"
                                },
                                {
                                    "area": "西畴县"
                                },
                                {
                                    "area": "麻栗坡县"
                                },
                                {
                                    "area": "马关县"
                                },
                                {
                                    "area": "丘北县"
                                },
                                {
                                    "area": "广南县"
                                },
                                {
                                    "area": "富宁县"
                                }
                            ],
                            "city": "文山壮族苗族自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "景洪市"
                                },
                                {
                                    "area": "勐海县"
                                },
                                {
                                    "area": "勐腊县"
                                }
                            ],
                            "city": "西双版纳傣族自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "大理市"
                                },
                                {
                                    "area": "漾濞彝族自治县"
                                },
                                {
                                    "area": "祥云县"
                                },
                                {
                                    "area": "宾川县"
                                },
                                {
                                    "area": "弥渡县"
                                },
                                {
                                    "area": "南涧彝族自治县"
                                },
                                {
                                    "area": "巍山彝族回族自治县"
                                },
                                {
                                    "area": "永平县"
                                },
                                {
                                    "area": "云龙县"
                                },
                                {
                                    "area": "洱源县"
                                },
                                {
                                    "area": "剑川县"
                                },
                                {
                                    "area": "鹤庆县"
                                }
                            ],
                            "city": "大理白族自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "瑞丽市"
                                },
                                {
                                    "area": "芒市"
                                },
                                {
                                    "area": "梁河县"
                                },
                                {
                                    "area": "盈江县"
                                },
                                {
                                    "area": "陇川县"
                                }
                            ],
                            "city": "德宏傣族景颇族自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "泸水市"
                                },
                                {
                                    "area": "福贡县"
                                },
                                {
                                    "area": "贡山独龙族怒族自治县"
                                },
                                {
                                    "area": "兰坪白族普米族自治县"
                                }
                            ],
                            "city": "怒江傈僳族自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "香格里拉市"
                                },
                                {
                                    "area": "德钦县"
                                },
                                {
                                    "area": "维西傈僳族自治县"
                                }
                            ],
                            "city": "迪庆藏族自治州"
                        }
                    ],
                    "province": "云南省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "城关区"
                                },
                                {
                                    "area": "堆龙德庆区"
                                },
                                {
                                    "area": "达孜区"
                                },
                                {
                                    "area": "林周县"
                                },
                                {
                                    "area": "当雄县"
                                },
                                {
                                    "area": "尼木县"
                                },
                                {
                                    "area": "曲水县"
                                },
                                {
                                    "area": "墨竹工卡县"
                                }
                            ],
                            "city": "拉萨市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "桑珠孜区"
                                },
                                {
                                    "area": "南木林县"
                                },
                                {
                                    "area": "江孜县"
                                },
                                {
                                    "area": "定日县"
                                },
                                {
                                    "area": "萨迦县"
                                },
                                {
                                    "area": "拉孜县"
                                },
                                {
                                    "area": "昂仁县"
                                },
                                {
                                    "area": "谢通门县"
                                },
                                {
                                    "area": "白朗县"
                                },
                                {
                                    "area": "仁布县"
                                },
                                {
                                    "area": "康马县"
                                },
                                {
                                    "area": "定结县"
                                },
                                {
                                    "area": "仲巴县"
                                },
                                {
                                    "area": "亚东县"
                                },
                                {
                                    "area": "吉隆县"
                                },
                                {
                                    "area": "聂拉木县"
                                },
                                {
                                    "area": "萨嘎县"
                                },
                                {
                                    "area": "岗巴县"
                                }
                            ],
                            "city": "日喀则市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "卡若区"
                                },
                                {
                                    "area": "江达县"
                                },
                                {
                                    "area": "贡觉县"
                                },
                                {
                                    "area": "类乌齐县"
                                },
                                {
                                    "area": "丁青县"
                                },
                                {
                                    "area": "察雅县"
                                },
                                {
                                    "area": "八宿县"
                                },
                                {
                                    "area": "左贡县"
                                },
                                {
                                    "area": "芒康县"
                                },
                                {
                                    "area": "洛隆县"
                                },
                                {
                                    "area": "边坝县"
                                }
                            ],
                            "city": "昌都市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "巴宜区"
                                },
                                {
                                    "area": "工布江达县"
                                },
                                {
                                    "area": "米林县"
                                },
                                {
                                    "area": "墨脱县"
                                },
                                {
                                    "area": "波密县"
                                },
                                {
                                    "area": "察隅县"
                                },
                                {
                                    "area": "朗县"
                                }
                            ],
                            "city": "林芝市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "乃东区"
                                },
                                {
                                    "area": "扎囊县"
                                },
                                {
                                    "area": "贡嘎县"
                                },
                                {
                                    "area": "桑日县"
                                },
                                {
                                    "area": "琼结县"
                                },
                                {
                                    "area": "曲松县"
                                },
                                {
                                    "area": "措美县"
                                },
                                {
                                    "area": "洛扎县"
                                },
                                {
                                    "area": "加查县"
                                },
                                {
                                    "area": "隆子县"
                                },
                                {
                                    "area": "错那县"
                                },
                                {
                                    "area": "浪卡子县"
                                }
                            ],
                            "city": "山南市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "色尼区"
                                },
                                {
                                    "area": "嘉黎县"
                                },
                                {
                                    "area": "比如县"
                                },
                                {
                                    "area": "聂荣县"
                                },
                                {
                                    "area": "安多县"
                                },
                                {
                                    "area": "申扎县"
                                },
                                {
                                    "area": "索县"
                                },
                                {
                                    "area": "班戈县"
                                },
                                {
                                    "area": "巴青县"
                                },
                                {
                                    "area": "尼玛县"
                                },
                                {
                                    "area": "双湖县"
                                }
                            ],
                            "city": "那曲市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "普兰县"
                                },
                                {
                                    "area": "札达县"
                                },
                                {
                                    "area": "噶尔县"
                                },
                                {
                                    "area": "日土县"
                                },
                                {
                                    "area": "革吉县"
                                },
                                {
                                    "area": "改则县"
                                },
                                {
                                    "area": "措勤县"
                                }
                            ],
                            "city": "阿里地区"
                        }
                    ],
                    "province": "西藏自治区"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "新城区"
                                },
                                {
                                    "area": "碑林区"
                                },
                                {
                                    "area": "莲湖区"
                                },
                                {
                                    "area": "灞桥区"
                                },
                                {
                                    "area": "未央区"
                                },
                                {
                                    "area": "雁塔区"
                                },
                                {
                                    "area": "阎良区"
                                },
                                {
                                    "area": "临潼区"
                                },
                                {
                                    "area": "长安区"
                                },
                                {
                                    "area": "高陵区"
                                },
                                {
                                    "area": "鄠邑区"
                                },
                                {
                                    "area": "蓝田县"
                                },
                                {
                                    "area": "周至县"
                                }
                            ],
                            "city": "西安市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "王益区"
                                },
                                {
                                    "area": "印台区"
                                },
                                {
                                    "area": "耀州区"
                                },
                                {
                                    "area": "宜君县"
                                }
                            ],
                            "city": "铜川市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "渭滨区"
                                },
                                {
                                    "area": "金台区"
                                },
                                {
                                    "area": "陈仓区"
                                },
                                {
                                    "area": "凤翔区"
                                },
                                {
                                    "area": "岐山县"
                                },
                                {
                                    "area": "扶风县"
                                },
                                {
                                    "area": "眉县"
                                },
                                {
                                    "area": "陇县"
                                },
                                {
                                    "area": "千阳县"
                                },
                                {
                                    "area": "麟游县"
                                },
                                {
                                    "area": "凤县"
                                },
                                {
                                    "area": "太白县"
                                }
                            ],
                            "city": "宝鸡市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "秦都区"
                                },
                                {
                                    "area": "杨陵区"
                                },
                                {
                                    "area": "渭城区"
                                },
                                {
                                    "area": "三原县"
                                },
                                {
                                    "area": "泾阳县"
                                },
                                {
                                    "area": "乾县"
                                },
                                {
                                    "area": "礼泉县"
                                },
                                {
                                    "area": "永寿县"
                                },
                                {
                                    "area": "长武县"
                                },
                                {
                                    "area": "旬邑县"
                                },
                                {
                                    "area": "淳化县"
                                },
                                {
                                    "area": "武功县"
                                },
                                {
                                    "area": "兴平市"
                                },
                                {
                                    "area": "彬州市"
                                }
                            ],
                            "city": "咸阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "临渭区"
                                },
                                {
                                    "area": "华州区"
                                },
                                {
                                    "area": "潼关县"
                                },
                                {
                                    "area": "大荔县"
                                },
                                {
                                    "area": "合阳县"
                                },
                                {
                                    "area": "澄城县"
                                },
                                {
                                    "area": "蒲城县"
                                },
                                {
                                    "area": "白水县"
                                },
                                {
                                    "area": "富平县"
                                },
                                {
                                    "area": "韩城市"
                                },
                                {
                                    "area": "华阴市"
                                }
                            ],
                            "city": "渭南市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "宝塔区"
                                },
                                {
                                    "area": "安塞区"
                                },
                                {
                                    "area": "延长县"
                                },
                                {
                                    "area": "延川县"
                                },
                                {
                                    "area": "志丹县"
                                },
                                {
                                    "area": "吴起县"
                                },
                                {
                                    "area": "甘泉县"
                                },
                                {
                                    "area": "富县"
                                },
                                {
                                    "area": "洛川县"
                                },
                                {
                                    "area": "宜川县"
                                },
                                {
                                    "area": "黄龙县"
                                },
                                {
                                    "area": "黄陵县"
                                },
                                {
                                    "area": "子长市"
                                }
                            ],
                            "city": "延安市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "汉台区"
                                },
                                {
                                    "area": "南郑区"
                                },
                                {
                                    "area": "城固县"
                                },
                                {
                                    "area": "洋县"
                                },
                                {
                                    "area": "西乡县"
                                },
                                {
                                    "area": "勉县"
                                },
                                {
                                    "area": "宁强县"
                                },
                                {
                                    "area": "略阳县"
                                },
                                {
                                    "area": "镇巴县"
                                },
                                {
                                    "area": "留坝县"
                                },
                                {
                                    "area": "佛坪县"
                                }
                            ],
                            "city": "汉中市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "榆阳区"
                                },
                                {
                                    "area": "横山区"
                                },
                                {
                                    "area": "府谷县"
                                },
                                {
                                    "area": "靖边县"
                                },
                                {
                                    "area": "定边县"
                                },
                                {
                                    "area": "绥德县"
                                },
                                {
                                    "area": "米脂县"
                                },
                                {
                                    "area": "佳县"
                                },
                                {
                                    "area": "吴堡县"
                                },
                                {
                                    "area": "清涧县"
                                },
                                {
                                    "area": "子洲县"
                                },
                                {
                                    "area": "神木市"
                                }
                            ],
                            "city": "榆林市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "汉滨区"
                                },
                                {
                                    "area": "汉阴县"
                                },
                                {
                                    "area": "石泉县"
                                },
                                {
                                    "area": "宁陕县"
                                },
                                {
                                    "area": "紫阳县"
                                },
                                {
                                    "area": "岚皋县"
                                },
                                {
                                    "area": "平利县"
                                },
                                {
                                    "area": "镇坪县"
                                },
                                {
                                    "area": "白河县"
                                },
                                {
                                    "area": "旬阳市"
                                }
                            ],
                            "city": "安康市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "商州区"
                                },
                                {
                                    "area": "洛南县"
                                },
                                {
                                    "area": "丹凤县"
                                },
                                {
                                    "area": "商南县"
                                },
                                {
                                    "area": "山阳县"
                                },
                                {
                                    "area": "镇安县"
                                },
                                {
                                    "area": "柞水县"
                                }
                            ],
                            "city": "商洛市"
                        }
                    ],
                    "province": "陕西省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "城关区"
                                },
                                {
                                    "area": "七里河区"
                                },
                                {
                                    "area": "西固区"
                                },
                                {
                                    "area": "安宁区"
                                },
                                {
                                    "area": "红古区"
                                },
                                {
                                    "area": "永登县"
                                },
                                {
                                    "area": "皋兰县"
                                },
                                {
                                    "area": "榆中县"
                                }
                            ],
                            "city": "兰州市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "金川区"
                                },
                                {
                                    "area": "永昌县"
                                }
                            ],
                            "city": "金昌市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "白银区"
                                },
                                {
                                    "area": "平川区"
                                },
                                {
                                    "area": "靖远县"
                                },
                                {
                                    "area": "会宁县"
                                },
                                {
                                    "area": "景泰县"
                                }
                            ],
                            "city": "白银市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "秦州区"
                                },
                                {
                                    "area": "麦积区"
                                },
                                {
                                    "area": "清水县"
                                },
                                {
                                    "area": "秦安县"
                                },
                                {
                                    "area": "甘谷县"
                                },
                                {
                                    "area": "武山县"
                                },
                                {
                                    "area": "张家川回族自治县"
                                }
                            ],
                            "city": "天水市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "凉州区"
                                },
                                {
                                    "area": "民勤县"
                                },
                                {
                                    "area": "古浪县"
                                },
                                {
                                    "area": "天祝藏族自治县"
                                }
                            ],
                            "city": "武威市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "甘州区"
                                },
                                {
                                    "area": "肃南裕固族自治县"
                                },
                                {
                                    "area": "民乐县"
                                },
                                {
                                    "area": "临泽县"
                                },
                                {
                                    "area": "高台县"
                                },
                                {
                                    "area": "山丹县"
                                }
                            ],
                            "city": "张掖市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "崆峒区"
                                },
                                {
                                    "area": "泾川县"
                                },
                                {
                                    "area": "灵台县"
                                },
                                {
                                    "area": "崇信县"
                                },
                                {
                                    "area": "庄浪县"
                                },
                                {
                                    "area": "静宁县"
                                },
                                {
                                    "area": "华亭市"
                                }
                            ],
                            "city": "平凉市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "肃州区"
                                },
                                {
                                    "area": "金塔县"
                                },
                                {
                                    "area": "瓜州县"
                                },
                                {
                                    "area": "肃北蒙古族自治县"
                                },
                                {
                                    "area": "阿克塞哈萨克族自治县"
                                },
                                {
                                    "area": "玉门市"
                                },
                                {
                                    "area": "敦煌市"
                                }
                            ],
                            "city": "酒泉市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "西峰区"
                                },
                                {
                                    "area": "庆城县"
                                },
                                {
                                    "area": "环县"
                                },
                                {
                                    "area": "华池县"
                                },
                                {
                                    "area": "合水县"
                                },
                                {
                                    "area": "正宁县"
                                },
                                {
                                    "area": "宁县"
                                },
                                {
                                    "area": "镇原县"
                                }
                            ],
                            "city": "庆阳市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "安定区"
                                },
                                {
                                    "area": "通渭县"
                                },
                                {
                                    "area": "陇西县"
                                },
                                {
                                    "area": "渭源县"
                                },
                                {
                                    "area": "临洮县"
                                },
                                {
                                    "area": "漳县"
                                },
                                {
                                    "area": "岷县"
                                }
                            ],
                            "city": "定西市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "武都区"
                                },
                                {
                                    "area": "成县"
                                },
                                {
                                    "area": "文县"
                                },
                                {
                                    "area": "宕昌县"
                                },
                                {
                                    "area": "康县"
                                },
                                {
                                    "area": "西和县"
                                },
                                {
                                    "area": "礼县"
                                },
                                {
                                    "area": "徽县"
                                },
                                {
                                    "area": "两当县"
                                }
                            ],
                            "city": "陇南市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "临夏市"
                                },
                                {
                                    "area": "临夏县"
                                },
                                {
                                    "area": "康乐县"
                                },
                                {
                                    "area": "永靖县"
                                },
                                {
                                    "area": "广河县"
                                },
                                {
                                    "area": "和政县"
                                },
                                {
                                    "area": "东乡族自治县"
                                },
                                {
                                    "area": "积石山保安族东乡族撒拉族自治县"
                                }
                            ],
                            "city": "临夏回族自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "合作市"
                                },
                                {
                                    "area": "临潭县"
                                },
                                {
                                    "area": "卓尼县"
                                },
                                {
                                    "area": "舟曲县"
                                },
                                {
                                    "area": "迭部县"
                                },
                                {
                                    "area": "玛曲县"
                                },
                                {
                                    "area": "碌曲县"
                                },
                                {
                                    "area": "夏河县"
                                }
                            ],
                            "city": "甘南藏族自治州"
                        }
                    ],
                    "province": "甘肃省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "城东区"
                                },
                                {
                                    "area": "城中区"
                                },
                                {
                                    "area": "城西区"
                                },
                                {
                                    "area": "城北区"
                                },
                                {
                                    "area": "湟中区"
                                },
                                {
                                    "area": "大通回族土族自治县"
                                },
                                {
                                    "area": "湟源县"
                                }
                            ],
                            "city": "西宁市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "乐都区"
                                },
                                {
                                    "area": "平安区"
                                },
                                {
                                    "area": "民和回族土族自治县"
                                },
                                {
                                    "area": "互助土族自治县"
                                },
                                {
                                    "area": "化隆回族自治县"
                                },
                                {
                                    "area": "循化撒拉族自治县"
                                }
                            ],
                            "city": "海东市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "门源回族自治县"
                                },
                                {
                                    "area": "祁连县"
                                },
                                {
                                    "area": "海晏县"
                                },
                                {
                                    "area": "刚察县"
                                }
                            ],
                            "city": "海北藏族自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "同仁市"
                                },
                                {
                                    "area": "尖扎县"
                                },
                                {
                                    "area": "泽库县"
                                },
                                {
                                    "area": "河南蒙古族自治县"
                                }
                            ],
                            "city": "黄南藏族自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "共和县"
                                },
                                {
                                    "area": "同德县"
                                },
                                {
                                    "area": "贵德县"
                                },
                                {
                                    "area": "兴海县"
                                },
                                {
                                    "area": "贵南县"
                                }
                            ],
                            "city": "海南藏族自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "玛沁县"
                                },
                                {
                                    "area": "班玛县"
                                },
                                {
                                    "area": "甘德县"
                                },
                                {
                                    "area": "达日县"
                                },
                                {
                                    "area": "久治县"
                                },
                                {
                                    "area": "玛多县"
                                }
                            ],
                            "city": "果洛藏族自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "玉树市"
                                },
                                {
                                    "area": "杂多县"
                                },
                                {
                                    "area": "称多县"
                                },
                                {
                                    "area": "治多县"
                                },
                                {
                                    "area": "囊谦县"
                                },
                                {
                                    "area": "曲麻莱县"
                                }
                            ],
                            "city": "玉树藏族自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "格尔木市"
                                },
                                {
                                    "area": "德令哈市"
                                },
                                {
                                    "area": "茫崖市"
                                },
                                {
                                    "area": "乌兰县"
                                },
                                {
                                    "area": "都兰县"
                                },
                                {
                                    "area": "天峻县"
                                }
                            ],
                            "city": "海西蒙古族藏族自治州"
                        }
                    ],
                    "province": "青海省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "兴庆区"
                                },
                                {
                                    "area": "西夏区"
                                },
                                {
                                    "area": "金凤区"
                                },
                                {
                                    "area": "永宁县"
                                },
                                {
                                    "area": "贺兰县"
                                },
                                {
                                    "area": "灵武市"
                                }
                            ],
                            "city": "银川市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "大武口区"
                                },
                                {
                                    "area": "惠农区"
                                },
                                {
                                    "area": "平罗县"
                                }
                            ],
                            "city": "石嘴山市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "利通区"
                                },
                                {
                                    "area": "红寺堡区"
                                },
                                {
                                    "area": "盐池县"
                                },
                                {
                                    "area": "同心县"
                                },
                                {
                                    "area": "青铜峡市"
                                }
                            ],
                            "city": "吴忠市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "原州区"
                                },
                                {
                                    "area": "西吉县"
                                },
                                {
                                    "area": "隆德县"
                                },
                                {
                                    "area": "泾源县"
                                },
                                {
                                    "area": "彭阳县"
                                }
                            ],
                            "city": "固原市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "沙坡头区"
                                },
                                {
                                    "area": "中宁县"
                                },
                                {
                                    "area": "海原县"
                                }
                            ],
                            "city": "中卫市"
                        }
                    ],
                    "province": "宁夏回族自治区"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "天山区"
                                },
                                {
                                    "area": "沙依巴克区"
                                },
                                {
                                    "area": "新市区"
                                },
                                {
                                    "area": "水磨沟区"
                                },
                                {
                                    "area": "头屯河区"
                                },
                                {
                                    "area": "达坂城区"
                                },
                                {
                                    "area": "米东区"
                                },
                                {
                                    "area": "乌鲁木齐县"
                                }
                            ],
                            "city": "乌鲁木齐市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "独山子区"
                                },
                                {
                                    "area": "克拉玛依区"
                                },
                                {
                                    "area": "白碱滩区"
                                },
                                {
                                    "area": "乌尔禾区"
                                }
                            ],
                            "city": "克拉玛依市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "高昌区"
                                },
                                {
                                    "area": "鄯善县"
                                },
                                {
                                    "area": "托克逊县"
                                }
                            ],
                            "city": "吐鲁番市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "伊州区"
                                },
                                {
                                    "area": "巴里坤哈萨克自治县"
                                },
                                {
                                    "area": "伊吾县"
                                }
                            ],
                            "city": "哈密市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "昌吉市"
                                },
                                {
                                    "area": "阜康市"
                                },
                                {
                                    "area": "呼图壁县"
                                },
                                {
                                    "area": "玛纳斯县"
                                },
                                {
                                    "area": "奇台县"
                                },
                                {
                                    "area": "吉木萨尔县"
                                },
                                {
                                    "area": "木垒哈萨克自治县"
                                }
                            ],
                            "city": "昌吉回族自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "博乐市"
                                },
                                {
                                    "area": "阿拉山口市"
                                },
                                {
                                    "area": "精河县"
                                },
                                {
                                    "area": "温泉县"
                                }
                            ],
                            "city": "博尔塔拉蒙古自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "库尔勒市"
                                },
                                {
                                    "area": "轮台县"
                                },
                                {
                                    "area": "尉犁县"
                                },
                                {
                                    "area": "若羌县"
                                },
                                {
                                    "area": "且末县"
                                },
                                {
                                    "area": "焉耆回族自治县"
                                },
                                {
                                    "area": "和静县"
                                },
                                {
                                    "area": "和硕县"
                                },
                                {
                                    "area": "博湖县"
                                }
                            ],
                            "city": "巴音郭楞蒙古自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "阿克苏市"
                                },
                                {
                                    "area": "库车市"
                                },
                                {
                                    "area": "温宿县"
                                },
                                {
                                    "area": "沙雅县"
                                },
                                {
                                    "area": "新和县"
                                },
                                {
                                    "area": "拜城县"
                                },
                                {
                                    "area": "乌什县"
                                },
                                {
                                    "area": "阿瓦提县"
                                },
                                {
                                    "area": "柯坪县"
                                }
                            ],
                            "city": "阿克苏地区"
                        },
                        {
                            "areas": [
                                {
                                    "area": "阿图什市"
                                },
                                {
                                    "area": "阿克陶县"
                                },
                                {
                                    "area": "阿合奇县"
                                },
                                {
                                    "area": "乌恰县"
                                }
                            ],
                            "city": "克孜勒苏柯尔克孜自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "喀什市"
                                },
                                {
                                    "area": "疏附县"
                                },
                                {
                                    "area": "疏勒县"
                                },
                                {
                                    "area": "英吉沙县"
                                },
                                {
                                    "area": "泽普县"
                                },
                                {
                                    "area": "莎车县"
                                },
                                {
                                    "area": "叶城县"
                                },
                                {
                                    "area": "麦盖提县"
                                },
                                {
                                    "area": "岳普湖县"
                                },
                                {
                                    "area": "伽师县"
                                },
                                {
                                    "area": "巴楚县"
                                },
                                {
                                    "area": "塔什库尔干塔吉克自治县"
                                }
                            ],
                            "city": "喀什地区"
                        },
                        {
                            "areas": [
                                {
                                    "area": "和田市"
                                },
                                {
                                    "area": "和田县"
                                },
                                {
                                    "area": "墨玉县"
                                },
                                {
                                    "area": "皮山县"
                                },
                                {
                                    "area": "洛浦县"
                                },
                                {
                                    "area": "策勒县"
                                },
                                {
                                    "area": "于田县"
                                },
                                {
                                    "area": "民丰县"
                                }
                            ],
                            "city": "和田地区"
                        },
                        {
                            "areas": [
                                {
                                    "area": "伊宁市"
                                },
                                {
                                    "area": "奎屯市"
                                },
                                {
                                    "area": "霍尔果斯市"
                                },
                                {
                                    "area": "伊宁县"
                                },
                                {
                                    "area": "察布查尔锡伯自治县"
                                },
                                {
                                    "area": "霍城县"
                                },
                                {
                                    "area": "巩留县"
                                },
                                {
                                    "area": "新源县"
                                },
                                {
                                    "area": "昭苏县"
                                },
                                {
                                    "area": "特克斯县"
                                },
                                {
                                    "area": "尼勒克县"
                                }
                            ],
                            "city": "伊犁哈萨克自治州"
                        },
                        {
                            "areas": [
                                {
                                    "area": "塔城市"
                                },
                                {
                                    "area": "乌苏市"
                                },
                                {
                                    "area": "沙湾市"
                                },
                                {
                                    "area": "额敏县"
                                },
                                {
                                    "area": "托里县"
                                },
                                {
                                    "area": "裕民县"
                                },
                                {
                                    "area": "和布克赛尔蒙古自治县"
                                }
                            ],
                            "city": "塔城地区"
                        },
                        {
                            "areas": [
                                {
                                    "area": "阿勒泰市"
                                },
                                {
                                    "area": "布尔津县"
                                },
                                {
                                    "area": "富蕴县"
                                },
                                {
                                    "area": "福海县"
                                },
                                {
                                    "area": "哈巴河县"
                                },
                                {
                                    "area": "青河县"
                                },
                                {
                                    "area": "吉木乃县"
                                },
                                {
                                    "area": "石河子市"
                                },
                                {
                                    "area": "阿拉尔市"
                                },
                                {
                                    "area": "图木舒克市"
                                },
                                {
                                    "area": "五家渠市"
                                },
                                {
                                    "area": "北屯市"
                                },
                                {
                                    "area": "铁门关市"
                                },
                                {
                                    "area": "双河市"
                                },
                                {
                                    "area": "可克达拉市"
                                },
                                {
                                    "area": "昆玉市"
                                },
                                {
                                    "area": "胡杨河市"
                                },
                                {
                                    "area": "新星市"
                                }
                            ],
                            "city": "阿勒泰地区"
                        }
                    ],
                    "province": "新疆维吾尔自治区"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "台北市"
                                }
                            ],
                            "city": "台北市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "新北市"
                                }
                            ],
                            "city": "新北市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "桃园市"
                                }
                            ],
                            "city": "桃园市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "台中市"
                                }
                            ],
                            "city": "台中市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "台南市"
                                }
                            ],
                            "city": "台南市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "高雄市"
                                }
                            ],
                            "city": "高雄市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "基隆市"
                                }
                            ],
                            "city": "基隆市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "新竹市"
                                }
                            ],
                            "city": "新竹市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "嘉义市"
                                }
                            ],
                            "city": "嘉义市"
                        },
                        {
                            "areas": [
                                {
                                    "area": "新竹县"
                                }
                            ],
                            "city": "新竹县"
                        },
                        {
                            "areas": [
                                {
                                    "area": "苗栗县"
                                }
                            ],
                            "city": "苗栗县"
                        },
                        {
                            "areas": [
                                {
                                    "area": "彰化县"
                                }
                            ],
                            "city": "彰化县"
                        },
                        {
                            "areas": [
                                {
                                    "area": "南投县"
                                }
                            ],
                            "city": "南投县"
                        },
                        {
                            "areas": [
                                {
                                    "area": "云林县"
                                }
                            ],
                            "city": "云林县"
                        },
                        {
                            "areas": [
                                {
                                    "area": "嘉义县"
                                }
                            ],
                            "city": "嘉义县"
                        },
                        {
                            "areas": [
                                {
                                    "area": "屏东县"
                                }
                            ],
                            "city": "屏东县"
                        },
                        {
                            "areas": [
                                {
                                    "area": "宜兰县"
                                }
                            ],
                            "city": "宜兰县"
                        },
                        {
                            "areas": [
                                {
                                    "area": "花莲县"
                                }
                            ],
                            "city": "花莲县"
                        },
                        {
                            "areas": [
                                {
                                    "area": "台东县"
                                }
                            ],
                            "city": "台东县"
                        },
                        {
                            "areas": [
                                {
                                    "area": "澎湖县"
                                }
                            ],
                            "city": "澎湖县"
                        },
                        {
                            "areas": [
                                {
                                    "area": "连江县"
                                }
                            ],
                            "city": "连江县"
                        }
                    ],
                    "province": "台湾省"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "中西区"
                                },
                                {
                                    "area": "东区"
                                },
                                {
                                    "area": "南区"
                                },
                                {
                                    "area": "湾仔区"
                                },
                                {
                                    "area": "九龙城区"
                                },
                                {
                                    "area": "深水埗区"
                                },
                                {
                                    "area": "黄大仙区"
                                },
                                {
                                    "area": "油尖旺区"
                                },
                                {
                                    "area": "离岛区"
                                },
                                {
                                    "area": "葵青区"
                                },
                                {
                                    "area": "北区"
                                },
                                {
                                    "area": "西贡区"
                                },
                                {
                                    "area": "沙田区"
                                },
                                {
                                    "area": "大埔区"
                                },
                                {
                                    "area": "荃湾区"
                                },
                                {
                                    "area": "屯门区"
                                },
                                {
                                    "area": "元朗区"
                                }
                            ],
                            "city": "香港特别行政区"
                        }
                    ],
                    "province": "香港特别行政区"
                },
                {
                    "citys": [
                        {
                            "areas": [
                                {
                                    "area": "花地玛堂区"
                                },
                                {
                                    "area": "圣安多尼堂区"
                                },
                                {
                                    "area": "大堂区"
                                },
                                {
                                    "area": "望德堂区"
                                },
                                {
                                    "area": "风顺堂区"
                                },
                                {
                                    "area": "氹仔"
                                },
                                {
                                    "area": "路环岛"
                                }
                            ],
                            "city": "澳门特别行政区"
                        }
                    ],
                    "province": "澳门特别行政区"
                }
            ]
            var param = {"json":json}
            $.ajax({
                type: "POST",
                url: baseURL + "sysSfcsgl/setData",
                contentType: "application/json",
                data: JSON.stringify(param),
                success: function (r) {
                    if (r.code == 0) {
                        alert('操作成功', function () {
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        setcsfid: function () {
            var type =  $("#type").find("option:selected").val();
            if(type == '2'){//获取所有身份
                var param = {}
                $.ajax({
                    type: "POST",
                    url: baseURL + "sysSfcsgl/getSfs",
                    contentType: "application/json",
                    data: JSON.stringify(param),
                    success: function (r) {
                        if (r.code == 0) {
                            vm.sfs = r.sfs
                            vm.sfview = true;
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            }
        },
        update: function () {
            var id = getSelectedRow();
            if (id == null) {
                return;
            }

            vm.showList = false;
            vm.title = "修改";
            vm.getSfcsgl(id)
        },
        del: function () {
            var ids = getSelectedRows();
            if (ids == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "sysSfcsgl/delete",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.code == 0) {
                            alert('操作成功', function () {
                                vm.reload();
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        getSfcsgl: function (sfcsglId) {
            $.get(baseURL + "sysSfcsgl/info/" + sfcsglId, function (r) {
                vm.sfcsgl = r.sfcsgl;
                vm.allFiles = r.sfcsgl.files;
                if(vm.sfcsgl.type == '2'){
                    var param = {}
                    $.ajax({
                        type: "POST",
                        url: baseURL + "sysSfcsgl/getSfs",
                        contentType: "application/json",
                        data: JSON.stringify(param),
                        success: function (r) {
                            if (r.code == 0) {
                                vm.sfs = r.sfs
                                vm.sfview = true;
                            } else {
                                alert(r.msg);
                            }
                        }
                    });
                }else {
                    vm.sfview = false;
                }
                vm.getDept();
            });
        },
        saveOrUpdate: function () {
            var url = vm.sfcsgl.id == null ? "sysSfcsgl/save" : "sysSfcsgl/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.sfcsgl),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function () {
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        getMenuTree: function (id) {
            //加载菜单树
            $.get(baseURL + "sys/menu/list", function (r) {
                menu_ztree = $.fn.zTree.init($("#menuTree"), menu_setting, r);
                //展开所有节点
                menu_ztree.expandAll(true);

                if (id != null) {
                    vm.getSfcsgl(id);
                }
            });
        },
        getDataTree: function (id) {
            //加载菜单树
            $.get(baseURL + "sys/dept/list", function (r) {
                data_ztree = $.fn.zTree.init($("#dataTree"), data_setting, r);
                //展开所有节点
                data_ztree.expandAll(true);
            });
        },

        getDept: function () {
            //加载部门树
            $.get(baseURL + "sys/dept/list", function (r) {
                dept_ztree = $.fn.zTree.init($("#deptTree"), dept_setting, r);
                var node = dept_ztree.getNodeByParam("deptId", vm.sfcsgl.deptid);
                if (node != null) {
                    dept_ztree.selectNode(node);

                    vm.sfcsgl.deptName = node.name;
                }
            })
        },
        deptTree: function () {
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
                    vm.sfcsgl.deptid = node[0].deptId;
                    vm.sfcsgl.deptName = node[0].name;

                    layer.close(index);
                }
            });
        },
        reload: function () {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {'name': vm.q.sfcsglName},
                page: page
            }).trigger("reloadGrid");
        },

    }
});
laydate.render({
    elem: '#createtime', //指定元素
    format: 'yyyy-MM-dd HH:mm:ss',
    //日期时间选择器
    type: 'datetime',
    done: function (value, date, endDate) {
        vm.sfcsgl.createtime = value;
    }
});
laydate.render({
    elem: '#updatetime', //指定元素
    format: 'yyyy-MM-dd HH:mm:ss',
    //日期时间选择器
    type: 'datetime',
    done: function (value, date, endDate) {
        vm.sfcsgl.updatetime = value;
    }
});
