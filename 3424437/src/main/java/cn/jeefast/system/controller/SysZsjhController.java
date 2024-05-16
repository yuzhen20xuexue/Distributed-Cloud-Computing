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
import cn.jeefast.system.entity.SysUser;
import cn.jeefast.system.entity.SysZsjh;
import cn.jeefast.system.entity.TMaterialFile;
import cn.jeefast.system.service.TMaterialFileService;
import com.alibaba.fastjson.JSONArray;
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


import cn.jeefast.system.service.SysZsjhService;
import org.springframework.web.bind.annotation.RestController;
import cn.jeefast.common.base.BaseController;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

/**
 * <p>
 * 招生计划管理 前端控制器
 * </p>
 */
@RestController
@RequestMapping("/sysZsjh")
public class SysZsjhController extends BaseController {
    @Autowired
    private SysZsjhService sysZsjhService;

    @Autowired
    private TMaterialFileService tMaterialFileService;


    /**
     * 招生计划管理列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:zsjh:list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysZsjh> pageUtil = new Page<SysZsjh>(query.getPage(), query.getLimit());
        Page<SysZsjh> page = sysZsjhService.queryPageList(pageUtil, query);
        return R.ok().put("page", page);
    }
    /**
     * 招生计划管理列表
     */
    @RequestMapping("/xzyxlist")
    @RequiresPermissions("sys:zsjh:xzyxlist")
    public R xzyxlist(@RequestParam Map<String, Object> params) {

//        List<SysZsjh> sysZsjhList = sysZsjhService.selectList(new EntityWrapper<SysZsjh>().eq("nf","2022"));
//        if(sysZsjhList.size()>0){
//            for (int i = 0; i < sysZsjhList.size(); i++) {
//                SysZsjh sysZsjh2022 = sysZsjhList.get(i);
//                System.out.println("sizesizesizesizesizesize"+sysZsjhList.size());
//                System.out.println("iiiiiiiiiiiiiiiiiiiiiiiii"+i);
//                List<SysZsjh> sysZsjhs = sysZsjhService.selectList(new EntityWrapper<SysZsjh>().eq("nf","2023").eq("xuexiao",sysZsjh2022.getXuexiao()).isNull("sf"));
//                if(sysZsjhs.size()>0){
//                    for (int j = 0; j < sysZsjhs.size(); j++) {
//                        SysZsjh sysZsjh = sysZsjhs.get(j);
//                        sysZsjh.setSf(sysZsjh2022.getSf());
//                        sysZsjh.setCs(sysZsjh2022.getCs());
//                        sysZsjh.setIsjbw(sysZsjh2022.getIsjbw());
//                        sysZsjh.setIseyy(sysZsjh2022.getIseyy());
//                        sysZsjh.setIssyl(sysZsjh2022.getIssyl());
//                        sysZsjhService.updateById(sysZsjh);
//                    }
//                }
//
//
//            }
//        }



        //查询列表数据
        Query query = new Query(params);
        Page<SysZsjh> pageUtil = new Page<SysZsjh>(query.getPage(), query.getLimit());
        Page<SysZsjh> page = sysZsjhService.queryPagexzyxList(pageUtil, query);
        return R.ok().put("page", page);
    }

    /**
     * 招生计划管理列表
     */
    @RequestMapping("/xzzylist")
    @RequiresPermissions("sys:zsjh:xzzylist")
    public R xzzylist(@RequestParam Map<String, Object> params) {

        //查询列表数据
        Query query = new Query(params);
        Page<SysZsjh> pageUtil = new Page<SysZsjh>(query.getPage(), query.getLimit());
        Page<SysZsjh> page = sysZsjhService.queryPagexzzyList(pageUtil, query);
        return R.ok().put("page", page);
    }

    /**
     * 招生计划管理列表
     */
    @RequestMapping("/mztjysdgxlist")
    @RequiresPermissions("sys:zsjh:mztjysdgxlist")
    public R mztjysdgxlist(@RequestParam Map<String, Object> params) {

        //查询列表数据
        Query query = new Query(params);
        Page<SysZsjh> pageUtil = new Page<SysZsjh>(query.getPage(), query.getLimit());
        Page<SysZsjh> page = sysZsjhService.queryPagemztjysdgxList(pageUtil, query);
        return R.ok().put("page", page);
    }

    /**
     * 招生计划管理
     */
    @RequestMapping("/info/{zsjhId}")
    @RequiresPermissions("sys:zsjh:info")
    public R info(@PathVariable("zsjhId") String zsjhId) {
        SysZsjh zsjh = sysZsjhService.selectById(zsjhId);
        //获取附件列表
        List<TMaterialFile> tMaterialFiles = tMaterialFileService.selectList(new EntityWrapper<TMaterialFile>().eq("parentid", zsjh.getId()));
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

        zsjh.setFiles(json);
        return R.ok().put("zsjh", zsjh);
    }

    /**
     * 获取所有招生计划管理
     */
    @RequestMapping("/getZsjhs")
    public R getZsjhList() {
        List<SysZsjh> zsjhs = sysZsjhService.selectList(new EntityWrapper<SysZsjh>().orderBy(true, "updatetime", false));
        return R.ok().put("zsjhs", zsjhs);
    }

    /**
     * 保存招生计划管理
     */
    @Log("保存招生计划管理")
    @RequestMapping("/save")
    @RequiresPermissions("sys:zsjh:save")
    public R save(@RequestBody SysZsjh zsjh) {
        ValidatorUtils.validateEntity(zsjh);
        zsjh.setCreatetime(new Date());
        zsjh.setCreateuser(getUser().getUsername());
        zsjh.setUpdatetime(new Date());
        zsjh.setUpdateuser(getUser().getUsername());
        sysZsjhService.insert(zsjh);

        if (zsjh.getFiles() != null) {
            tMaterialFileService.setTMaterialFilePrintId(zsjh.getFiles(), zsjh.getId());
        }
        return R.ok();
    }

    /**
     * 修改招生计划管理
     */
    @Log("修改招生计划管理")
    @RequestMapping("/update")
    @RequiresPermissions("sys:zsjh:update")
    public R update(@RequestBody SysZsjh zsjh) {
        ValidatorUtils.validateEntity(zsjh);
        zsjh.setUpdatetime(new Date());
        zsjh.setUpdateuser(getUser().getUsername());
        sysZsjhService.updateById(zsjh);
        if (zsjh.getFiles() != null) {
            tMaterialFileService.setTMaterialFilePrintId(zsjh.getFiles(), zsjh.getId());
        }
        return R.ok();
    }

    /**
     * 删除招生计划管理
     */
    @Log("删除招生计划管理")
    @RequestMapping("/delete")
    @RequiresPermissions("sys:zsjh:delete")
    public R delete(@RequestBody String[] zsjhIds) {
        sysZsjhService.deleteBatch(zsjhIds);
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
        List<SysZsjh> zsjhList = new ArrayList<>();
        //普通for循环
        //开始索引0  结束索引
        int lastRowNum = sheet.getLastRowNum();
        System.out.println("最后一行：" + lastRowNum);
        for (int i = 1; i <= lastRowNum; i++) {
            //获取单元格
            XSSFRow row = sheet.getRow(i);
            if (row != null) {
                List<String> list = new ArrayList<>();

                for (int index = 0; index < 27; index++) {
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
//
//                for (Cell cell : row) {
//                    if (cell != null && !"".equals(cell)) {
//                        //此处是把单元格都转换成String类型
//                        cell.setCellType(CellType.STRING);
//                        String cellValue = cell.getStringCellValue();
//                        System.out.println("单元格数据：" + cellValue);
//                        list.add(cellValue);
//                    }else {
//                        list.add(null);
//                    }
//                }
                if (list.size() > 0) {
                    System.out.println("listlistlistlist" + list);

                    SysZsjh sysZsjh = new SysZsjh();
                    sysZsjh.setXh(list.get(0) == null || list.get(0).equals("")?null:Integer.parseInt(list.get(0)));
                    sysZsjh.setNf(list.get(1) == null || list.get(1).equals("")?null:list.get(1));
                    sysZsjh.setXuexiao(list.get(2) == null || list.get(2).equals("")?null:list.get(2));
                    sysZsjh.setSf(list.get(3) == null || list.get(3).equals("")?null:list.get(3));
                    sysZsjh.setCs(list.get(4) == null || list.get(4).equals("")?null:list.get(4));
                    sysZsjh.setIsjbw(list.get(5) == null || list.get(5).equals("")?null:list.get(5));
                    sysZsjh.setIseyy(list.get(6) == null || list.get(6).equals("")?null:list.get(6));
                    sysZsjh.setIssyl(list.get(7) == null || list.get(7).equals("")?null:list.get(7));
                    sysZsjh.setKl(list.get(8) == null || list.get(8).equals("")?null:list.get(8));
                    sysZsjh.setPc(list.get(9) == null || list.get(9).equals("")?null:list.get(9));
                    sysZsjh.setZyz(list.get(10) == null || list.get(10).equals("")?null:list.get(10));
                    sysZsjh.setXkyq(list.get(11) == null || list.get(11).equals("")?null:list.get(11));
                    sysZsjh.setMl(list.get(12) == null || list.get(12).equals("")?null:list.get(12));
                    sysZsjh.setYjxk(list.get(13) == null || list.get(13).equals("")?null:list.get(13));
                    sysZsjh.setZy(list.get(14) == null || list.get(14).equals("")?null:list.get(14));
                    sysZsjh.setZydm(list.get(15) == null || list.get(15).equals("")?null:list.get(15));
                    sysZsjh.setZsrs(list.get(16) == null || list.get(16).equals("")?null:Integer.parseInt(list.get(16)));
                    sysZsjh.setXz(list.get(17) == null || list.get(17).equals("")?null:list.get(17));
                    sysZsjh.setXf(list.get(18) == null || list.get(18).equals("")?null:list.get(18));
                    sysZsjh.setBgxz(list.get(19) == null || list.get(19).equals("")?null:list.get(19));
                    sysZsjh.setXxgs(list.get(20) == null || list.get(20).equals("")?null:list.get(20));
                    sysZsjh.setQgtyzsdm(list.get(21) == null || list.get(21).equals("")?null:list.get(21));
                    sysZsjh.setZslx(list.get(22) == null || list.get(22).equals("")?null:list.get(22));
                    sysZsjh.setXxlb(list.get(23) == null || list.get(23).equals("")?null:list.get(23));
                    sysZsjh.setXllb(list.get(24) == null || list.get(24).equals("")?null:list.get(24));
                    sysZsjh.setXxcym(list.get(25) == null || list.get(25).equals("")?null:list.get(25));
                    sysZsjh.setSyd(list.get(26) == null || list.get(26).equals("")?null:list.get(26));
                    sysZsjh.setCreateuser(getUser().getUsername());
                    sysZsjh.setCreatetime(new Date());
                    sysZsjh.setUpdateuser(getUser().getUsername());
                    sysZsjh.setUpdatetime(new Date());

                    zsjhList.add(sysZsjh);
                }
            }
        }
        if (zsjhList.size() > 0) {
            sysZsjhService.insertBatch(zsjhList);
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
            String[] headers = {"序号", "年份", "学校", "省份", "城市", "_985", "_211"
                    , "双一流", "科类", "批次", "专业组", "选科要求", "门类", "一级学科"
                    , "专业", "专业代码", "招生人数", "学制", "学费", "办学性质", "学校归属"
                    , "全国统一招生代码", "招生类型", "学校类别", "学历类别", "学校曾用名", "生源地"};
            //需要显示的对应列
            String[] includeAttr = {"xh", "nf", "xuexiao", "sf", "cs", "isjbw", "iseyy", "issyl", "kl"
                    , "pc", "zyz", "xkyq", "ml", "yjxk", "zy", "zydm", "zsrs", "xz", "xf", "bgxz", "xxgs", "qgtyzsdm"
                    , "zslx", "xxlb", "xllb", "xxcym", "syd",  ""};
            Workbook workbook = sysZsjhService.getExcelWorkBook(headers, sysZsjhService.getList(otherWorkName), false, includeAttr);
            workbook.write(outputStream);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 关闭流资源
            outputStream.close();
        }
    }


}
