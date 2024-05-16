$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sysSkx/list',
        datatype: "json",
        colModel: [
            {label: 'ID', name: 'id', index: "id", width: 45, key: true},
            {label: '序号', name: 'xh', index: "xh", width: 100},
            {label: '省份', name: 'sf', index: "sf", width: 100},
            {label: '年份', name: 'nf', index: "nf", width: 100},
            { label: '类别', name: 'lb', width: 80,
                formatter: function(value, options, row){
                    if(value === "物理类"){
                        return '<span class="label label-success">物理类</span>';
                    }else if(value === "历史类"){
                        return '<span class="label label-success">历史类</span>';
                    }else{
                        return '<span class="label label-success">未知</span>';
                    }
                }
            },
            { label: '批次', name: 'pc', width: 80,
                formatter: function(value, options, row){
                    if(value === "本科批"){
                        return '<span class="label label-success">本科批</span>';
                    }else if(value === "特殊类型招生控制线"){
                        return '<span class="label label-success">特殊类型招生控制线</span>';
                    }else if(value === "体育类（本科）"){
                        return '<span class="label label-success">体育类（本科）</span>';
                    }else if(value === "艺术类（本科）-编导"){
                        return '<span class="label label-success">艺术类（本科）-编导</span>';
                    }else if(value === "艺术类（本科）-美术"){
                        return '<span class="label label-success">艺术类（本科）-美术</span>';
                    }else if(value === "艺术类（本科）-音乐（声乐、器乐）省统考"){
                        return '<span class="label label-success">艺术类（本科）-音乐（声乐、器乐）省统考</span>';
                    }else{
                        return '<span class="label label-success">未知</span>';
                    }
                }
            },
            {label: '分数线', name: 'fsx', index: "fsx", width: 100},
            {label: '专业分', name: 'zyf', index: "zyf", width: 100},
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
        },

        onSortCol: function (index, columnIndex, sortOrder) {
            $("#jqGrid").jqGrid("clearGridData");
            $("#jqGrid").jqGrid("setGridParam",{
                url: baseURL + 'sysSkx/collist',
                datatype: "json",
                contentType: "application/json",
                type: "POST",

            }).trigger("reloadGrid");
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
            skxName: null
        },
        importModle: true,
        showList: true,
        showDelect: true,
        title: null,
        equipmentList: {},
        allFiles: [],
        sfs: [],
        lbs: [{"id": "物理类", "name": "物理类"}, {"id": "历史类", "name": "历史类"}],
        pcs: [{"id": "本科批", "name": "本科批"}, {"id": "特殊类型招生控制线", "name": "特殊类型招生控制线"}, {
            "id": "体育类（本科）",
            "name": "体育类（本科）"
        },
            {"id": "艺术类（本科）-编导", "name": "艺术类（本科）-编导"}, {
                "id": "艺术类（本科）-美术",
                "name": "艺术类（本科）-美术"
            }, {"id": "艺术类（本科）-音乐（声乐、器乐）省统考", "name": "艺术类（本科）-音乐（声乐、器乐）省统考"},
        ],
        jkzts: [{"id": "1", "name": "健康"}, {"id": "2", "name": "一般"}, {"id": "3", "name": "病危"}],
        skx: {
            id: '',
            qcmc: '',
            bh: '',
            username: '',
            createdate: '',
            enddate: '',
            equipmentIdList: [],
            equipmentId: '',
            skxchild: [],
            deptName: [],
            deptid: '',
            files: [],
        }
    },
    methods: {
        otherWorkToExcel: function() {
            window.top.location.href = baseURL + "sysSkx/otherWorkToExcel?name=dc"+"&token="+token;
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
                        url: baseURL + "sysSkx/readExcel",
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
                    vm.skx.files = vm.allFiles;
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
            vm.skx = {deptName: null, deptId: null};
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
            vm.getSkx(id)
        },
        del: function () {
            var ids = getSelectedRows();
            if (ids == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "sysSkx/delete",
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
        getSkx: function (skxId) {
            $.get(baseURL + "sysSkx/info/" + skxId, function (r) {
                vm.skx = r.skx;
                vm.allFiles = r.skx.files;
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
            var url = vm.skx.id == null ? "sysSkx/save" : "sysSkx/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.skx),
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
                    vm.getSkx(id);
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
                var node = dept_ztree.getNodeByParam("deptId", vm.skx.deptid);
                if (node != null) {
                    dept_ztree.selectNode(node);

                    vm.skx.deptName = node.name;
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
                    vm.skx.deptid = node[0].deptId;
                    vm.skx.deptName = node[0].name;

                    layer.close(index);
                }
            });
        },
        reload: function () {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {'name': vm.q.skxName},
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
        vm.skx.createtime = value;
    }
});
laydate.render({
    elem: '#updatetime', //指定元素
    format: 'yyyy-MM-dd HH:mm:ss',
    //日期时间选择器
    type: 'datetime',
    done: function (value, date, endDate) {
        vm.skx.updatetime = value;
    }
});
