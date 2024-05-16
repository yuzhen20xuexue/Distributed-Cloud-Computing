$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sysTdx/lhjslist',
        datatype: "json",
        colModel: [
            //{label: 'ID', name: 'id', index: "id", width: 45, key: true},
            {label: '年份', name: 'nf', index: "nf", width: 100},
            {label: '学校', name: 'xuexiao', index: "xuexiao", width: 100},
            {label: '省份', name: 'shengfen', index: "shengfen", width: 100},
            {label: '城市', name: 'chengshi', index: "chengshi", width: 100},
            {label: '软科排名', name: 'rkpm', index: "rkpm", width: 100},
            { label: '是否985', name: 'isjbw', width: 80,
                formatter: function(value, options, row){
                    if(value === "是"){
                        return '<span class="label label-success">是</span>';
                    }else if(value === "否"){
                        return '<span class="label label-success">否</span>';
                    }else{
                        return '<span class="label label-success">未知</span>';
                    }
                }
            },
            { label: '是否211', name: 'iseyy', width: 80,
                formatter: function(value, options, row){
                    if(value === "是"){
                        return '<span class="label label-success">是</span>';
                    }else if(value === "否"){
                        return '<span class="label label-success">否</span>';
                    }else{
                        return '<span class="label label-success">未知</span>';
                    }
                }
            },
            { label: '是否双一流', name: 'sfsyl', width: 80,
                formatter: function(value, options, row){
                    if(value === "是"){
                        return '<span class="label label-success">是</span>';
                    }else if(value === "否"){
                        return '<span class="label label-success">否</span>';
                    }else{
                        return '<span class="label label-success">未知</span>';
                    }
                }
            },
            { label: '科类', name: 'kl', width: 80,
                formatter: function(value, options, row){
                    if(value === "历史"){
                        return '<span class="label label-success">历史</span>';
                    }else if(value === "物理"){
                        return '<span class="label label-success">物理</span>';
                    }else{
                        return '<span class="label label-success">未知</span>';
                    }
                }
            },
            { label: '批次', name: 'pc', width: 80,
                formatter: function(value, options, row){
                    if(value === "本科批"){
                        return '<span class="label label-success">本科批</span>';
                    }else if(value === "本科提前批"){
                        return '<span class="label label-success">本科提前批</span>';
                    }else if(value === "专科批"){
                        return '<span class="label label-success">专科批</span>';
                    }else{
                        return '<span class="label label-success">未知</span>';
                    }
                }
            },
            { label: '专业组', name: 'zyz', width: 80,
                formatter: function(value, options, row){
                    if(value === "(01)"){
                        return '<span class="label label-success">(01)</span>';
                    }else if(value === "(02)"){
                        return '<span class="label label-success">(02)</span>';
                    }else if(value === "(03)"){
                        return '<span class="label label-success">(03)</span>';
                    }else if(value === "(04)"){
                        return '<span class="label label-success">(04)</span>';
                    }else if(value === "(05)"){
                        return '<span class="label label-success">(05)</span>';
                    }else if(value === "(06)"){
                        return '<span class="label label-success">(06)</span>';
                    }else if(value === "(07)"){
                        return '<span class="label label-success">(07)</span>';
                    }else if(value === "(08)"){
                        return '<span class="label label-success">(08)</span>';
                    }else if(value === "(09)"){
                        return '<span class="label label-success">(09)</span>';
                    }else if(value === "(10)"){
                        return '<span class="label label-success">(10)</span>';
                    }else if(value === "(11)"){
                        return '<span class="label label-success">(11)</span>';
                    }else if(value === "(12)"){
                        return '<span class="label label-success">(12)</span>';
                    }else if(value === "(13)"){
                        return '<span class="label label-success">(13)</span>';
                    }else if(value === "(14)"){
                        return '<span class="label label-success">(14)</span>';
                    }else if(value === "(15)"){
                        return '<span class="label label-success">(15)</span>';
                    }else if(value === "(16)"){
                        return '<span class="label label-success">(16)</span>';
                    }else if(value === "(17)"){
                        return '<span class="label label-success">(17)</span>';
                    }else if(value === "(18)"){
                        return '<span class="label label-success">(18)</span>';
                    }else if(value === "(19)"){
                        return '<span class="label label-success">(19)</span>';
                    }else if(value === "(20)"){
                        return '<span class="label label-success">(20)</span>';
                    }else if(value === "(21)"){
                        return '<span class="label label-success">(21)</span>';
                    }else if(value === "(22)"){
                        return '<span class="label label-success">(22)</span>';
                    }else if(value === "(23)"){
                        return '<span class="label label-success">(23)</span>';
                    }else if(value === "(24)"){
                        return '<span class="label label-success">(24)</span>';
                    }else if(value === "(25)"){
                        return '<span class="label label-success">(25)</span>';
                    }else if(value === "(26)"){
                        return '<span class="label label-success">(26)</span>';
                    }else if(value === "(T1)"){
                        return '<span class="label label-success">(T1)</span>';
                    }else if(value === "(T2)"){
                        return '<span class="label label-success">(T2)</span>';
                    }else{
                        return '<span class="label label-success">未知</span>';
                    }
                }
            },
            { label: '选科要求', name: 'xkyq', width: 80,
                formatter: function(value, options, row){
                    if(value === "首选历史，再选不限"){
                        return '<span class="label label-success">首选历史，再选不限</span>';
                    }else if(value === "首选历史，再选地理"){
                        return '<span class="label label-success">首选历史，再选地理</span>';
                    }else if(value === "首选历史，再选地理/生物(2选1)"){
                        return '<span class="label label-success">首选历史，再选地理/生物(2选1)</span>';
                    }else if(value === "首选历史，再选化学"){
                        return '<span class="label label-success">首选历史，再选化学</span>';
                    }else if(value === "首选历史，再选化学、生物(2科必选)"){
                        return '<span class="label label-success">首选历史，再选化学、生物(2科必选)</span>';
                    }else if(value === "首选历史，再选化学/地理(2选1)"){
                        return '<span class="label label-success">首选历史，再选化学/地理(2选1)</span>';
                    }else if(value === "首选历史，再选化学/生物(2选1)"){
                        return '<span class="label label-success">首选历史，再选化学/生物(2选1)</span>';
                    }else if(value === "首选历史，再选化学/思想政治(2选1)"){
                        return '<span class="label label-success">首选历史，再选化学/思想政治(2选1)</span>';
                    }else if(value === "首选历史，再选生物"){
                        return '<span class="label label-success">首选历史，再选生物</span>';
                    }else if(value === "首选历史，再选思想政治"){
                        return '<span class="label label-success">首选历史，再选思想政治</span>';
                    }else if(value === "首选历史，再选思想政治、地理(2科必选)"){
                        return '<span class="label label-success">首选历史，再选思想政治、地理(2科必选)</span>';
                    }else if(value === "首选历史，再选思想政治/地理(2选1)"){
                        return '<span class="label label-success">首选历史，再选思想政治/地理(2选1)</span>';
                    }else if(value === "首选历史，再选思想政治/生物(2选1)"){
                        return '<span class="label label-success">首选历史，再选思想政治/生物(2选1)</span>';
                    }else if(value === "首选物理，再选不限"){
                        return '<span class="label label-success">首选物理，再选不限</span>';
                    }else if(value === "首选物理，再选地理"){
                        return '<span class="label label-success">首选物理，再选地理</span>';
                    }else if(value === "首选物理，再选地理、生物(2科必选)"){
                        return '<span class="label label-success">首选物理，再选地理、生物(2科必选)</span>';
                    }else if(value === "首选物理，再选地理/生物(2选1)"){
                        return '<span class="label label-success">首选物理，再选地理/生物(2选1)</span>';
                    }else if(value === "首选物理，再选化学"){
                        return '<span class="label label-success">首选物理，再选化学</span>';
                    }else if(value === "首选物理，再选化学、生物(2科必选)"){
                        return '<span class="label label-success">首选物理，再选化学、生物(2科必选)</span>';
                    }else if(value === "首选物理，再选化学/地理(2选1)"){
                        return '<span class="label label-success">首选物理，再选化学/地理(2选1)</span>';
                    }else if(value === "首选物理，再选化学/生物(2选1)"){
                        return '<span class="label label-success">首选物理，再选化学/生物(2选1)</span>';
                    }else if(value === "首选物理，再选化学/思想政治(2选1)"){
                        return '<span class="label label-success">首选物理，再选化学/思想政治(2选1)</span>';
                    }else if(value === "首选物理，再选生物"){
                        return '<span class="label label-success">首选物理，再选生物</span>';
                    }else if(value === "首选物理，再选思想政治"){
                        return '<span class="label label-success">首选物理，再选思想政治</span>';
                    }else if(value === "首选物理，再选思想政治、地理(2科必选)"){
                        return '<span class="label label-success">首选物理，再选思想政治、地理(2科必选)</span>';
                    }else if(value === "首选物理，再选思想政治/地理(2选1)"){
                        return '<span class="label label-success">首选物理，再选思想政治/地理(2选1)</span>';
                    }else if(value === "首选物理，再选思想政治/生物(2选1)"){
                        return '<span class="label label-success">首选物理，再选思想政治/生物(2选1)</span>';
                    }else{
                        return '<span class="label label-success">未知</span>';
                    }
                }
            },

            {label: '最低分', name: 'zdf', index: "zdf", width: 100},
            {label: '最低分排名', name: 'zdfpm', index: "zdfpm", width: 100},
            {label: '省控线', name: 'skx', index: "skx", width: 100},
            { label: '办学性质', name: 'bxxz', width: 80,
                formatter: function(value, options, row){
                    if(value === "公办"){
                        return '<span class="label label-success">公办</span>';
                    }else if(value === "民办"){
                        return '<span class="label label-success">民办</span>';
                    }else if(value === "中外合作办学"){
                        return '<span class="label label-success">中外合作办学</span>';
                    }else if(value === "内地与港澳台地区合作办学"){
                        return '<span class="label label-success">内地与港澳台地区合作办学</span>';
                    }else{
                        return '<span class="label label-success">未知</span>';
                    }
                }
            },
            {label: '学校归属', name: 'xxgs', index: "xxgs", width: 100},
            {label: '全国统一招生代码', name: 'qgtyzsdm', index: "qgtyzsdm", width: 100},
            {label: '招生类型', name: 'zslx', index: "zslx", width: 100},
            { label: '学校类别', name: 'xxlb', width: 80,
                formatter: function(value, options, row){
                    if(value === "财经类"){
                        return '<span class="label label-success">财经类</span>';
                    }else if(value === "军事类"){
                        return '<span class="label label-success">军事类</span>';
                    }else if(value === "理工类"){
                        return '<span class="label label-success">理工类</span>';
                    }else if(value === "民族类"){
                        return '<span class="label label-success">民族类</span>';
                    }else if(value === "农业类"){
                        return '<span class="label label-success">农业类</span>';
                    }else if(value === "其他"){
                        return '<span class="label label-success">其他</span>';
                    }else if(value === "师范类"){
                        return '<span class="label label-success">师范类</span>';
                    }else if(value === "体育类"){
                        return '<span class="label label-success">体育类</span>';
                    }else if(value === "医药类"){
                        return '<span class="label label-success">医药类</span>';
                    }else if(value === "艺术类"){
                        return '<span class="label label-success">艺术类</span>';
                    }else if(value === "语言类"){
                        return '<span class="label label-success">语言类</span>';
                    }else if(value === "政法类"){
                        return '<span class="label label-success">政法类</span>';
                    }else if(value === "综合类"){
                        return '<span class="label label-success">综合类</span>';
                    }else{
                        return '<span class="label label-success">未知</span>';
                    }
                }
            },
            { label: '学历类别', name: 'xllb', width: 80,
                formatter: function(value, options, row){
                    if(value === "普通本科"){
                        return '<span class="label label-success">普通本科</span>';
                    }else if(value === "专科（高职）"){
                        return '<span class="label label-success">专科（高职）</span>';
                    }else{
                        return '<span class="label label-success">未知</span>';
                    }
                }
            },
            {label: '学校曾用名', name: 'xxcym', index: "xxcym", width: 100},
            {label: '生源地', name: 'syd', index: "syd", width: 100},
            //{label: '创建时间', name: 'createtime', index: "createtime", width: 100},

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
                url: baseURL + 'sysTdx/collist',
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
            tdxName: null,
            xxlb:'',
            pici:'',
            csName:'',
            sfName:''
        },
        importModle: true,
        showList: true,
        showDelect: true,
        title: null,
        equipmentList: {},
        allFiles: [],
        chengshis: [],
        sfs: [],
        kls: [{"id": "历史", "name": "历史"}, {"id": "物理", "name": "物理"}],
        issfs: [{"id": "是", "name": "是"}, {"id": "否", "name": "否"},],
        pcs: [{"id": "本科批", "name": "本科批"}, {"id": "本科提前批", "name": "本科提前批"}, {"id": "专科批", "name": "专科批"
        }],
        zyzs: [{"id": "(01)", "name": "(01)"}, {"id": "(02)", "name": "(02)"},
            {"id": "(03)", "name": "(03)"}, {"id": "(04)", "name": "(04)"},
            {"id": "(05)", "name": "(05)"}, {"id": "(06)", "name": "(06)"},
            {"id": "(07)", "name": "(07)"}, {"id": "(08)", "name": "(08)"},
            {"id": "(09)", "name": "(09)"}, {"id": "(10)", "name": "(10)"},
            {"id": "(11)", "name": "(11)"}, {"id": "(12)", "name": "(12)"},
            {"id": "(13)", "name": "(13)"}, {"id": "(14)", "name": "(14)"},
            {"id": "(15)", "name": "(15)"}, {"id": "(16)", "name": "(16)"},
            {"id": "(17)", "name": "(17)"}, {"id": "(18)", "name": "(18)"},
            {"id": "(19)", "name": "(19)"}, {"id": "(20)", "name": "(20)"},
            {"id": "(21)", "name": "(21)"}, {"id": "(22)", "name": "(22)"},
            {"id": "(23)", "name": "(23)"}, {"id": "(24)", "name": "(24)"},
            {"id": "(26)", "name": "(25)"}, {"id": "(26)", "name": "(26)"},
            {"id": "(T1)", "name": "(T1)"}, {"id": "(T2)", "name": "(T2)"},],
        xkyqs: [{"id": "首选历史，再选不限", "name": "首选历史，再选不限"}, {"id": "首选历史，再选地理", "name": "首选历史，再选地理"},
            {"id": "首选历史，再选地理/生物(2选1)", "name": "首选历史，再选地理/生物(2选1)"}, {"id": "首选历史，再选化学", "name": "首选历史，再选化学"},
            {"id": "首选历史，再选化学、生物(2科必选)", "name": "首选历史，再选化学、生物(2科必选)"}, {"id": "首选历史，再选化学/地理(2选1)", "name": "首选历史，再选化学/地理(2选1)"},
            {"id": "首选历史，再选化学/生物(2选1)", "name": "首选历史，再选化学/生物(2选1)"}, {"id": "首选历史，再选化学/思想政治(2选1)", "name": "首选历史，再选化学/思想政治(2选1)"},
            {"id": "首选历史，再选生物", "name": "首选历史，再选生物"}, {"id": "首选历史，再选思想政治", "name": "首选历史，再选思想政治"},
            {"id": "首选历史，再选思想政治、地理(2科必选)", "name": "首选历史，再选思想政治、地理(2科必选)"}, {"id": "首选历史，再选思想政治/地理(2选1)", "name": "首选历史，再选思想政治/地理(2选1)"},
            {"id": "首选历史，再选思想政治/生物(2选1)", "name": "首选历史，再选思想政治/生物(2选1)"}, {"id": "首选物理，再选不限", "name": "首选物理，再选不限"},
            {"id": "首选物理，再选地理", "name": "首选物理，再选地理"}, {"id": "首选物理，再选地理、生物(2科必选)", "name": "首选物理，再选地理、生物(2科必选)"},
            {"id": "首选物理，再选地理/生物(2选1)", "name": "首选物理，再选地理/生物(2选1)"}, {"id": "首选物理，再选化学", "name": "首选物理，再选化学"},
            {"id": "首选物理，再选化学、生物(2科必选)", "name": "首选物理，再选化学、生物(2科必选)"}, {"id": "首选物理，再选化学/地理(2选1)", "name": "首选物理，再选化学/地理(2选1)"},
            {"id": "首选物理，再选化学/生物(2选1)", "name": "首选物理，再选化学/生物(2选1)"}, {"id": "首选物理，再选化学/思想政治(2选1)", "name": "首选物理，再选化学/思想政治(2选1)"},
            {"id": "首选物理，再选生物", "name": "首选物理，再选生物"}, {"id": "首选物理，再选思想政治", "name": "首选物理，再选思想政治"},
            {"id": "首选物理，再选思想政治、地理(2科必选)", "name": "首选物理，再选思想政治、地理(2科必选)"}, {"id": "首选物理，再选思想政治/地理(2选1)", "name": "首选物理，再选思想政治/地理(2选1)"},
            {"id": "首选物理，再选思想政治/生物(2选1)", "name": "首选物理，再选思想政治/生物(2选1)"},],
        bxxzs: [{"id": "公办", "name": "公办"}, {"id": "民办", "name": "民办"},
            {"id": "中外合作办学", "name": "中外合作办学"}, {"id": "内地与港澳台地区合作办学", "name": "内地与港澳台地区合作办学"},],
        xxlbs: [{"id": "财经类", "name": "财经类"}, {"id": "军事类", "name": "军事类"},
            {"id": "理工类", "name": "理工类"}, {"id": "民族类", "name": "民族类"},
            {"id": "农业类", "name": "农业类"}, {"id": "其他", "name": "其他"},
            {"id": "师范类", "name": "师范类"}, {"id": "体育类", "name": "体育类"},
            {"id": "医药类", "name": "医药类"}, {"id": "艺术类", "name": "艺术类"},
            {"id": "语言类", "name": "语言类"}, {"id": "政法类", "name": "政法类"},
            {"id": "综合类", "name": "综合类"}
        ],
        xllbs: [{"id": "普通本科", "name": "普通本科"}, {"id": "专科（高职）", "name": "专科（高职）"},],
        chengshis:[],
        tdx: {
            id: '',
            qcmc: '',
            bh: '',
            username: '',
            createdate: '',
            enddate: '',
            equipmentIdList: [],
            equipmentId: '',
            tdxchild: [],
            deptName: [],
            deptid: '',
            files: [],
        }
    },
    methods: {
        otherWorkToExcel: function() {
            window.top.location.href = baseURL + "sysTdx/otherWorkToExcel?name=dc"+"&token="+token;
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
                        url: baseURL + "sysTdx/readExcel",
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
                    vm.tdx.files = vm.allFiles;
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
            vm.tdx = {deptName: null, deptId: null};
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

            vm.getTdx(id)
        },
        del: function () {
            var ids = getSelectedRows();
            if (ids == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "sysTdx/delete",
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
        getTdx: function (tdxId) {
            $.get(baseURL + "sysTdx/info/" + tdxId, function (r) {
                vm.tdx = r.tdx;
                vm.allFiles = r.tdx.files;
                $.ajaxSettings.async = false;
                vm.getSfAllName()
                vm.setcss()
                $.ajaxSettings.async = true;

                vm.getDept();
            });
        },
        setcss: function () {
            vm.q.csName = ''
            var shengfen =  $("#shengfen option:selected").val();
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
            var url = vm.tdx.id == null ? "sysTdx/save" : "sysTdx/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.tdx),
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
                    vm.getTdx(id);
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
                var node = dept_ztree.getNodeByParam("deptId", vm.tdx.deptid);
                if (node != null) {
                    dept_ztree.selectNode(node);

                    vm.tdx.deptName = node.name;
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
                    vm.tdx.deptid = node[0].deptId;
                    vm.tdx.deptName = node[0].name;

                    layer.close(index);
                }
            });
        },
        reload: function () {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {

                postData: {'name': vm.q.tdxName,'zdfName': vm.q.zdfName,'sfName': vm.q.sfName,'csName':vm.q.csName,'zslx':vm.q.zslx,'pici':vm.q.pici,'xxlb':vm.q.xxlb},

                page: page
            }).trigger("reloadGrid");
        },

    },
    mounted() {
        this.getSfAllName();
    },
});
laydate.render({
    elem: '#createtime', //指定元素
    format: 'yyyy-MM-dd HH:mm:ss',
    //日期时间选择器
    type: 'datetime',
    done: function (value, date, endDate) {
        vm.tdx.createtime = value;
    }
});
laydate.render({
    elem: '#updatetime', //指定元素
    format: 'yyyy-MM-dd HH:mm:ss',
    //日期时间选择器
    type: 'datetime',
    done: function (value, date, endDate) {
        vm.tdx.updatetime = value;
    }
});
