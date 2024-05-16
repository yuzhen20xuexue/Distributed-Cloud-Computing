$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sysYfyd/dnfsdxfjslist',
        datatype: "json",
        colModel: [
            {label: 'ID', name: 'id', index: "id", width: 45, key: true},
            {label: '标识', name: 'bs', index: "xh", width: 100},
            {label: '排名', name: 'xh', index: "xh", width: 100},
            {label: '省份', name: 'sf', index: "sf", width: 100},
            {label: '年份', name: 'nf', index: "nf", width: 100},
            {label: '科类', name: 'kl', index: "kl", width: 100},
            {label: '分数', name: 'fs', index: "fs", width: 100},
            {label: '本段人数', name: 'bdrs', index: "bdrs", width: 100},
            {label: '累计人数', name: 'ljrs', index: "ljrs", width: 100},
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
            yfydName: null
        },
        importModle: true,
        showList: true,
        showDelect: true,
        title: null,
        equipmentList: {},
        allFiles: [],
        sfs: [],
        jys: [{"id": "1", "name": "是"}, {"id": "2", "name": "否"}],
        sfzsyms: [{"id": "1", "name": "是"}, {"id": "2", "name": "否"}, {"id": "3", "name": "未知"}],
        types: [{"id": "1", "name": "狗"}, {"id": "2", "name": "猫"}, {"id": "3", "name": "猪"}, {
            "id": "4",
            "name": "其他"
        }],
        jkzts: [{"id": "1", "name": "健康"}, {"id": "2", "name": "一般"}, {"id": "3", "name": "病危"}],
        yfyd: {
            id: '',
            qcmc: '',
            bh: '',
            username: '',
            createdate: '',
            enddate: '',
            equipmentIdList: [],
            equipmentId: '',
            yfydchild: [],
            deptName: [],
            deptid: '',
            files: [],
        }
    },
    methods: {
        otherWorkToExcel: function() {
            window.top.location.href = baseURL + "sysYfyd/otherWorkToExcel?name=dc"+"&token="+token;
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
                        url: baseURL + "sysYfyd/readExcel",
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
                    vm.yfyd.files = vm.allFiles;
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
            vm.yfyd = {deptName: null, deptId: null};
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
            vm.getSfAllName()
            vm.getYfyd(id)
        },
        del: function () {
            var ids = getSelectedRows();
            if (ids == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "sysYfyd/delete",
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
        getYfyd: function (yfydId) {
            $.get(baseURL + "sysYfyd/info/" + yfydId, function (r) {
                vm.yfyd = r.yfyd;
                vm.allFiles = r.yfyd.files;
                vm.getDept();
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
            var url = vm.yfyd.id == null ? "sysYfyd/save" : "sysYfyd/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.yfyd),
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
                    vm.getYfyd(id);
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
                var node = dept_ztree.getNodeByParam("deptId", vm.yfyd.deptid);
                if (node != null) {
                    dept_ztree.selectNode(node);

                    vm.yfyd.deptName = node.name;
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
                    vm.yfyd.deptid = node[0].deptId;
                    vm.yfyd.deptName = node[0].name;

                    layer.close(index);
                }
            });
        },
        reload: function () {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {'name': vm.q.yfydName,'sfName': vm.q.sfName,'dbnf': vm.q.dbnf},
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
        vm.yfyd.createtime = value;
    }
});
laydate.render({
    elem: '#updatetime', //指定元素
    format: 'yyyy-MM-dd HH:mm:ss',
    //日期时间选择器
    type: 'datetime',
    done: function (value, date, endDate) {
        vm.yfyd.updatetime = value;
    }
});
