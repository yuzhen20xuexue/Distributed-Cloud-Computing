package cn.jeefast.system.controller;

import java.io.IOException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.*;

import cn.jeefast.common.annotation.Log;
import cn.jeefast.common.utils.Query;
import cn.jeefast.common.utils.R;
import cn.jeefast.common.validator.ValidatorUtils;
import cn.jeefast.system.entity.SysRkpm;
import cn.jeefast.system.entity.SysTdx;
import cn.jeefast.system.entity.SysUser;
import cn.jeefast.system.entity.TMaterialFile;
import cn.jeefast.system.service.TMaterialFileService;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import com.baomidou.mybatisplus.plugins.Page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;


import cn.jeefast.system.service.SysTdxService;
import org.springframework.web.bind.annotation.RestController;
import cn.jeefast.common.base.BaseController;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

/**
 * <p>
 * 投档线管理 前端控制器
 * </p>
 */
@RestController
@RequestMapping("/sysTdx")
public class SysTdxController extends BaseController {
    @Autowired
    private SysTdxService sysTdxService;

    @Autowired
    private TMaterialFileService tMaterialFileService;


    /**
     * 投档线管理列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:tdx:list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysTdx> pageUtil = new Page<SysTdx>(query.getPage(), query.getLimit());
        Page<SysTdx> page = sysTdxService.queryPageList(pageUtil, query);
        return R.ok().put("page", page);
    }

    @RequestMapping("/collist")
    @RequiresPermissions("sys:tdx:list")
    public R collist(@RequestParam Map<String, Object> params) {
        //查询列表数据
        //System.out.println(postData);
        Query query = new Query(params);
        Page<SysTdx> pageUtil = new Page<SysTdx>(query.getPage(), query.getLimit());
        Page<SysTdx> page = sysTdxService.queryPagecolList(pageUtil, query);
        return R.ok().put("page", page);
    }


    /**
     * 投档线管理列表
     */
    @RequestMapping("/gxzslqfsywcgllist")
    @RequiresPermissions("sys:tdx:gxzslqfsywcgllist")
    public R gxzslqfsywcgllist(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysTdx> pageUtil = new Page<SysTdx>(query.getPage(), query.getLimit());
        Page<SysTdx> page = sysTdxService.queryPagegxzslqfsywcgList(pageUtil, query);
        return R.ok().put("page", page);
    }

    /**
     * 投档线管理列表
     */
    @RequestMapping("/sjjslist")
    @RequiresPermissions("sys:tdx:sjjslist")
    public R sjjslist(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysTdx> pageUtil = new Page<SysTdx>(query.getPage(), query.getLimit());
        Page<SysTdx> page = sysTdxService.queryPagesjjsList(pageUtil, query);
        return R.ok().put("page", page);
    }


    @RequestMapping("/sjjscollist")
    @RequiresPermissions("sys:tdx:sjjslist")
    public R sjjscollist(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysTdx> pageUtil = new Page<SysTdx>(query.getPage(), query.getLimit());
        Page<SysTdx> page = sysTdxService.queryPagesjjscolList(pageUtil, query);
        return R.ok().put("page", page);
    }


    /**
     * 投档线管理列表
     */
    @RequestMapping("/zyjslist")
    @RequiresPermissions("sys:tdx:zyjslist")
    public R zyjslist(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysTdx> pageUtil = new Page<SysTdx>(query.getPage(), query.getLimit());
        Page<SysTdx> page = sysTdxService.queryPagezyjsList(pageUtil, query);
        return R.ok().put("page", page);
    }

    @RequestMapping("/zyjscollist")
    @RequiresPermissions("sys:tdx:zyjslist")
    public R zyjscollist(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysTdx> pageUtil = new Page<SysTdx>(query.getPage(), query.getLimit());
        Page<SysTdx> page = sysTdxService.queryPagezyjscolList(pageUtil, query);
        return R.ok().put("page", page);
    }


    /**
     * 投档线管理列表
     */
    @RequestMapping("/tjpxlist")
    @RequiresPermissions("sys:tdx:tjpxlist")
    public R tjpxlist(@RequestParam Map<String, Object> params) {
        System.out.println("paramsparamsparams"+params);
        //查询列表数据
        Query query = new Query(params);
        Page<SysTdx> pageUtil = new Page<SysTdx>(query.getPage(), query.getLimit());
        Page<SysTdx> page = sysTdxService.querytjpxList(pageUtil, query);
        return R.ok().put("page", page);
    }

    /**
     * 投档线管理列表
     */
    @RequestMapping("/cjjslist")
    @RequiresPermissions("sys:tdx:cjjslist")
    public R cjjslist(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysTdx> pageUtil = new Page<SysTdx>(query.getPage(), query.getLimit());
        Page<SysTdx> page = sysTdxService.queryPagecjjsList(pageUtil, query);
        return R.ok().put("page", page);
    }

    @RequestMapping("/cjjscollist")
    @RequiresPermissions("sys:tdx:cjjslist")
    public R cjjscollist(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysTdx> pageUtil = new Page<SysTdx>(query.getPage(), query.getLimit());
        Page<SysTdx> page = sysTdxService.queryPagecjjscolList(pageUtil, query);
        return R.ok().put("page", page);
    }


    @RequestMapping("/lhjslist")
    @RequiresPermissions("sys:tdx:lhjslist")
    public R lhjslist(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysTdx> pageUtil = new Page<SysTdx>(query.getPage(), query.getLimit());
        Page<SysTdx> page = sysTdxService.queryPagelhjsList(pageUtil, query);
        return R.ok().put("page", page);
    }






    /**
     * 投档线管理列表
     */
    @RequestMapping("/dyjslist")
    @RequiresPermissions("sys:tdx:dyjslist")
    public R dyjslist(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysTdx> pageUtil = new Page<SysTdx>(query.getPage(), query.getLimit());
        Page<SysTdx> page = sysTdxService.queryPagedyjsList(pageUtil, query);
        return R.ok().put("page", page);
    }

    /**
     * 投档线管理
     */
    @RequestMapping("/info/{tdxId}")
    @RequiresPermissions("sys:tdx:info")
    public R info(@PathVariable("tdxId") String tdxId) {
        SysTdx tdx = sysTdxService.selectById(tdxId);
        //获取附件列表
        List<TMaterialFile> tMaterialFiles = tMaterialFileService.selectList(new EntityWrapper<TMaterialFile>().eq("parentid", tdx.getId()));
        List<Map<String, Object>> mapList = new ArrayList<>();
        if (!tMaterialFiles.isEmpty()) {
            for (TMaterialFile tMaterialFile : tMaterialFiles) {
                Map<String, Object> map = new HashMap<>();
                map.put("id", tMaterialFile.getId());
                map.put("filePath", tMaterialFile.getSfilename());
                map.put("fileName", tMaterialFile.getSaccessoryname());
                mapList.add(map);
            }

        }
        JSONArray json = (JSONArray) JSONArray.toJSON(mapList);

        tdx.setFiles(json);
        return R.ok().put("tdx", tdx);
    }


    /**
     * 获取所有投档线管理
     */
    @RequestMapping("/getTdxs")
    public R getTdxList() {
        List<SysTdx> tdxs = sysTdxService.selectList(new EntityWrapper<SysTdx>().orderBy(true, "updatetime", false));
        return R.ok().put("tdxs", tdxs);
    }

    /**
     * 保存投档线管理
     */
    @Log("保存投档线管理")
    @RequestMapping("/save")
    @RequiresPermissions("sys:tdx:save")
    public R save(@RequestBody SysTdx tdx) {
        ValidatorUtils.validateEntity(tdx);
        tdx.setCreatetime(new Date());
        tdx.setCreateuser(getUser().getUsername());
        tdx.setUpdatetime(new Date());
        tdx.setUpdateuser(getUser().getUsername());
        sysTdxService.insert(tdx);

        if (tdx.getFiles() != null) {
            tMaterialFileService.setTMaterialFilePrintId(tdx.getFiles(), tdx.getId());
        }
        return R.ok();
    }

    /**
     * 修改投档线管理
     */
    @Log("修改投档线管理")
    @RequestMapping("/update")
    @RequiresPermissions("sys:tdx:update")
    public R update(@RequestBody SysTdx tdx) {
        ValidatorUtils.validateEntity(tdx);
        tdx.setUpdatetime(new Date());
        tdx.setUpdateuser(getUser().getUsername());
        sysTdxService.updateById(tdx);
        if (tdx.getFiles() != null) {
            tMaterialFileService.setTMaterialFilePrintId(tdx.getFiles(), tdx.getId());
        }
        return R.ok();
    }

    /**
     * 删除投档线管理
     */
    @Log("删除投档线管理")
    @RequestMapping("/delete")
    @RequiresPermissions("sys:tdx:delete")
    public R delete(@RequestBody String[] tdxIds) {
        sysTdxService.deleteBatch(tdxIds);
        return R.ok();
    }

    @Value("${upload.flespath}")
    public String flespath;


    @RequestMapping("/readExcel")
    public R readExcel(@RequestBody Map<String, Object> obj) throws IOException {
        System.out.println("objobjobjobjobj" + obj);
        SysUser sysUser = getUser();

        String flespathZh = flespath + "\\" + obj.get("filePath");
        //获取工作簿
        XSSFWorkbook book = new XSSFWorkbook(flespathZh);
        //获取工作表
        XSSFSheet sheet = book.getSheetAt(0);
        List<SysTdx> tdxList = new ArrayList<>();
        //普通for循环
        //开始索引0  结束索引
        int lastRowNum = sheet.getLastRowNum();
        System.out.println("最后一行：" + lastRowNum);
        for (int i = 1; i <= lastRowNum; i++) {
            //获取单元格
            XSSFRow row = sheet.getRow(i);
            System.out.println("rowrowrowrowrowrow"+row);
            System.out.println("ttttttttttttttttttttttt");
            if (row != null) {
                List<String> list = new ArrayList<>();
                int j=0;
                for (int index = 0; index < 24; index++) {
                    System.out.println("indexindexindex"+index);

                    Cell cell = row.getCell(index);
                    if (cell != null && !"".equals(cell)) {
                        //此处是把单元格都转换成String类型
                        cell.setCellType(CellType.STRING);
                        System.out.println("cellcellcellcellcellcellcell"+cell);
                        System.out.println("getStringCellValuegetStringCellValue"+cell.getStringCellValue());
                        String cellValue = cell.getStringCellValue();
                        System.out.println("单元格数据：" + cellValue);
                        list.add(cellValue);
                    }else {
                        list.add(null);
                    }
                }
//                for (Cell cell : row) {
//
//                }
                if (list.size() > 0) {
                    System.out.println("listlistlistlist" + list);

                    SysTdx sysTdx = new SysTdx();
                    sysTdx.setXh(list.get(0) == null || list.get(0).equals("") || list.get(0).equals("-") || list.get(0).equals("—")?null:Integer.parseInt(list.get(0)));
                    sysTdx.setNf(list.get(1));
                    sysTdx.setXuexiao(list.get(2));
                    sysTdx.setShengfen(list.get(3));
                    sysTdx.setChengshi(list.get(4));
                    sysTdx.setRkpm(list.get(5) == null || list.get(5).equals("") || list.get(5).equals("-") || list.get(5).equals("—")?null:Integer.parseInt(list.get(5)));
                    sysTdx.setIsjbw(list.get(6));
                    sysTdx.setIseyy(list.get(7));
                    sysTdx.setSfsyl(list.get(8));
                    sysTdx.setKl(list.get(9));
                    sysTdx.setPc(list.get(10));
                    sysTdx.setZyz(list.get(11));
                    sysTdx.setXkyq(list.get(12));
                    sysTdx.setZdf(list.get(13) == null || list.get(13).equals("") || list.get(13).equals("-") || list.get(13).equals("—")?null:Double.parseDouble(list.get(13)));
                    sysTdx.setZdfpm(list.get(14) == null || list.get(14).equals("") || list.get(14).equals("-") || list.get(14).equals("—")?null:Integer.parseInt(list.get(14)));
                    System.out.println("cccccccccccc"+list.get(0));
                    System.out.println("dddddddddddd"+list.get(10));
                    System.out.println("eeeeeeeee"+list.get(11));
                    System.out.println("fffffffffffff"+list.get(12));
                    System.out.println("gggggggggg"+list.get(13));
                    System.out.println("hhhhhhhhhhh"+list.get(14));
                    System.out.println("bbbbbbbbbbbbbbb"+list.get(15));
                    sysTdx.setSkx(list.get(15) == null || list.get(15).equals("") || list.get(15).equals("-") || list.get(15).equals("—")?null:Double.parseDouble(list.get(15)));
                    sysTdx.setBxxz(list.get(16));
                    sysTdx.setXxgs(list.get(17));
                    sysTdx.setQgtyzsdm(list.get(18));
                    sysTdx.setZslx(list.get(19));
                    sysTdx.setXxlb(list.get(20));
                    sysTdx.setXllb(list.get(21));
                    System.out.println("iiiiiiiiiiiii"+i);
                    System.out.println("yyyyyyyyyyyyyyy"+list.get(22));
                    sysTdx.setXxcym(list.get(22));
                    sysTdx.setSyd(list.get(23) == null || list.get(23).equals("") || list.get(23).equals("-") || list.get(23).equals("—")?null:list.get(23));
                    sysTdx.setCreateuser(getUser().getUsername());
                    sysTdx.setCreatetime(new Date());
                    sysTdx.setUpdateuser(getUser().getUsername());
                    sysTdx.setUpdatetime(new Date());

                    tdxList.add(sysTdx);
                }
            }
        }
        if (tdxList.size() > 0) {
            sysTdxService.insertBatch(tdxList);
        }
//        deleteFile(flespathZh);

        //释放资源
        book.close();

        return R.ok();
    }

    /**
     * 导出Excel
     *
     * @throws Exception
     */
    @Log("数据列表--导出")
    @RequestMapping("otherWorkToExcel")
    public void otherWorkToExcel(String otherWorkName, HttpServletResponse response) throws IOException {
        ServletOutputStream outputStream = null;
        try {
            //表名称
            SimpleDateFormat format = new SimpleDateFormat("yyyyMMddHHmmss");
            String title = "数据列表--导出--(" + format.format(new Date()) + ").xls";

            outputStream = response.getOutputStream();

            response.setContentType("application/msexcel");
            response.setHeader("Content-Disposition", "attachment;filename*=utf-8'zh_cn'" + URLEncoder.encode(title, "UTF-8"));



            String[] headers = {"序号", "年份", "学校", "省份", "城市", "软科排名", "_985", "_211"
                    , "双一流", "科类", "批次", "专业组", "选科要求", "最低分", "最低分排名", "省控线", "办学性质"
                    , "学校归属", "全国统一招生代码", "招生类型", "学校类别", "学历类别", "学校曾用名", "生源地"};
            //需要显示的对应列

            String[] includeAttr = {"nf", "xuexiao", "shengfen", "chengshi", "rkpm", "isjbw"
                    , "iseyy", "sfsyl", "kl", "pc", "zyz", "xkyq", "zdf", "zdfpm", "skx"
                    , "bxxz", "xxgs", "qgtyzsdm", "zslx", "xxlb", "xllb", "xxcym", "syd", ""};
            Workbook workbook = sysTdxService.getExcelWorkBook(headers, sysTdxService.getList(otherWorkName), false, includeAttr);
            workbook.write(outputStream);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 关闭流资源
            outputStream.close();
        }
    }

    /**
     * 投档线数据
     */
    @Log("投档线数据")
    @RequestMapping("/getData1")
    public R getData(@RequestBody JSONObject param) {
        System.out.println("paramparamparamparam"+param);
        List<SysTdx> tdxList = sysTdxService.selectList(new EntityWrapper<SysTdx>().eq("nf","2022"));
        return R.ok().put("data",tdxList);
    }

}
