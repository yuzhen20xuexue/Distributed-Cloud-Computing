$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sysZsjh/xzzylist',
        datatype: "json",
        colModel: [
            {label: 'ID', name: 'id', index: "id", width: 45, key: true},
            {label: '序号', name: 'xh', index: "xh", width: 100},
            {label: '年份', name: 'nf', index: "nf", width: 100},
            {label: '学校', name: 'xuexiao', index: "xuexiao", width: 100},
            {label: '省份', name: 'sf', index: "sf", width: 100},
            {label: '城市', name: 'cs', index: "cs", width: 100},
            {label: '是否985', name: 'isjbw', index: "isjbw", width: 100},
            {label: '是否211', name: 'iseyy', index: "iseyy", width: 100},
            {label: '是否双一流', name: 'issyl', index: "issyl", width: 100},
            {label: '科类', name: 'kl', index: "kl", width: 100},
            {label: '批次', name: 'pc', index: "pc", width: 100},
            {label: '专业组', name: 'zyz', index: "zyz", width: 100},
            {label: '选课要求', name: 'xkyq', index: "xkyq", width: 100},
            {label: '门类', name: 'ml', index: "ml", width: 100},
            {label: '一级学科', name: 'yjxk', index: "yjxk", width: 100},
            {label: '专业', name: 'zy', index: "zy", width: 100},
            {label: '专业代码', name: 'zydm', index: "zydm", width: 100},
            {label: '招生人数', name: 'zsrs', index: "zsrs", width: 100},
            {label: '学制', name: 'xz', index: "xz", width: 100},
            {label: '学费', name: 'xf', index: "xf", width: 100},
            {label: '办公性质', name: 'bgxz', index: "bgxz", width: 100},
            {label: '学校归属', name: 'xxgs', index: "xxgs", width: 100},
            {label: '全国统一招生代码', name: 'qgtyzsdm', index: "qgtyzsdm", width: 100},
            {label: '招生类型', name: 'zslx', index: "zslx", width: 100},
            {label: '学校类别', name: 'xxlb', index: "xxlb", width: 100},
            {label: '学历类别', name: 'xllb', index: "xllb", width: 100},
            {label: '学校曾用名', name: 'xxcym', index: "xxcym", width: 100},
            {label: '生源地', name: 'syd', index: "syd", width: 100},
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
            zsjhName: null
        },
        importModle: true,
        showList: true,
        showDelect: true,
        title: null,
        equipmentList: {},
        allFiles: [],
        sfs: [],
        chengshis: [],
        jys: [{"id": "1", "name": "是"}, {"id": "2", "name": "否"}],
        sfzsyms: [{"id": "1", "name": "是"}, {"id": "2", "name": "否"}, {"id": "3", "name": "未知"}],
        types: [{"id": "1", "name": "狗"}, {"id": "2", "name": "猫"}, {"id": "3", "name": "猪"}, {
            "id": "4",
            "name": "其他"
        }],
        issfs: [{"id": "是", "name": "是"}, {"id": "否", "name": "否"},],
        jkzts: [{"id": "1", "name": "健康"}, {"id": "2", "name": "一般"}, {"id": "3", "name": "病危"}],
        zsjh: {
            id: '',
            qcmc: '',
            bh: '',
            username: '',
            createdate: '',
            enddate: '',
            equipmentIdList: [],
            equipmentId: '',
            zsjhchild: [],
            deptName: [],
            deptid: '',
            files: [],
        }
    },
    methods: {
        otherWorkToExcel: function() {
            window.top.location.href = baseURL + "sysZsjh/otherWorkToExcel?name=dc"+"&token="+token;
        },
        readExcel: function(){
            if ($("#drfj").val() == null || $("#drfj").val() == "") {
                alert("请选择具体附件再上传!");
                return;
            }else{
                var index= $("#drfj").val().lastIndexOf(".");
                var ext = $("#drfj").val().substr(index+1);
                if(ext !=="xlsx"){
                    alert("请上传正确excel 文件!");
                    return;
                }
            }
            var form = document.getElementById('dr');
            console.log("formformform"+JSON.stringify(form))
            $.ajax({
                url: baseURL + "tMaterialFile/importPsot",
                type: 'post',
                data: new FormData(form),
                processData: false,
                contentType: false,
                dataType: "json",
                success: function (r) {
                    var obj = new Object();
                    $("#fileList").val("");
                    obj['id'] = r.id;
                    obj['filePath'] = r.path;
                    obj['fileName'] = r.fileName;
                    obj['mbfklj'] = r.mbfklj;
                    $.ajax({
                        type: "POST",
                        url: baseURL + "sysZsjh/readExcel",
                        contentType: "application/json",
                        data: JSON.stringify(obj),
                        success: function(r){
                            if(r.code === 0){
                                alert('操作成功', function(){
                                    $("#drData").modal('hide');
                                    vm.reload();
                                });
                            }else{
                                alert(r.msg);
                            }
                        }
                    });
                    alert("导入成功！");
                },
                error: function () {
                    alert("导入失败！");
                }
            })

        },
        dr: function(){//导入
            $("#drData").modal('show');
        },
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
                    vm.zsjh.files = vm.allFiles;
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
            vm.zsjh = {deptName: null, deptId: null};
            vm.getSfAllName()
            vm.getDept();
        },
        update: function () {
            var id = getSelectedRow();
            if (id == null) {
                return;
            }

            vm.showList = false;
            vm.title = "修改";
            vm.getZsjh(id)
        },
        del: function () {
            var ids = getSelectedRows();
            if (ids == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "sysZsjh/delete",
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
        getZsjh: function (zsjhId) {
            $.get(baseURL + "sysZsjh/info/" + zsjhId, function (r) {
                vm.zsjh = r.zsjh;
                vm.allFiles = r.zsjh.files;
                $.ajaxSettings.async = false;
                vm.getSfAllName()
                vm.setcss()
                $.ajaxSettings.async = true;
                vm.getDept();
            });
        },
        setcss: function () {
            var shengfen =  $("#sf").find("option:selected").val();
            var param = {shengfen:shengfen}
            $.ajax({
                type: "POST",
                url: baseURL + "sysSfcsgl/getSfCs",
                contentType: "application/json",
                data: JSON.stringify(param),
                success: function (r) {
                    if (r.code == 0) {
                        vm.chengshis = r.chengshis;
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        getSfAllName: function () {
            var param = {}
            $.ajax({
                type: "POST",
                url: baseURL + "sysSfcsgl/getSfAllName",
                contentType: "application/json",
                data: JSON.stringify(param),
                success: function (r) {
                    if (r.code == 0) {
                        vm.sfs = r.sfs;
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        saveOrUpdate: function () {
            var url = vm.zsjh.id == null ? "sysZsjh/save" : "sysZsjh/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.zsjh),
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
                    vm.getZsjh(id);
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
                var node = dept_ztree.getNodeByParam("deptId", vm.zsjh.deptid);
                if (node != null) {
                    dept_ztree.selectNode(node);

                    vm.zsjh.deptName = node.name;
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
                    vm.zsjh.deptid = node[0].deptId;
                    vm.zsjh.deptName = node[0].name;

                    layer.close(index);
                }
            });
        },
        reload: function () {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {'name': vm.q.zsjhName},
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
        vm.zsjh.createtime = value;
    }
});
laydate.render({
    elem: '#updatetime', //指定元素
    format: 'yyyy-MM-dd HH:mm:ss',
    //日期时间选择器
    type: 'datetime',
    done: function (value, date, endDate) {
        vm.zsjh.updatetime = value;
    }
});
