package cn.jeefast.system.controller;

import java.io.IOException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.*;
import com.alibaba.fastjson.JSONObject;
import cn.jeefast.common.annotation.Log;
import cn.jeefast.common.utils.Query;
import cn.jeefast.common.utils.R;
import cn.jeefast.common.validator.ValidatorUtils;
import cn.jeefast.system.entity.SysRkpm;
import cn.jeefast.system.entity.SysUser;
import cn.jeefast.system.entity.SysYfyd;
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


import cn.jeefast.system.service.SysYfydService;
import org.springframework.web.bind.annotation.RestController;
import cn.jeefast.common.base.BaseController;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

/**
 * <p>
 * 一分一段管理 前端控制器
 * </p>
 */
@RestController
@RequestMapping("/sysYfyd")
public class SysYfydController extends BaseController {
    @Autowired
    private SysYfydService sysYfydService;

    @Autowired
    private TMaterialFileService tMaterialFileService;


    /**
     * 一分一段管理列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:yfyd:list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysYfyd> pageUtil = new Page<SysYfyd>(query.getPage(), query.getLimit());
        Page<SysYfyd> page = sysYfydService.queryPageList(pageUtil, query);
        return R.ok().put("page", page);
    }

    @RequestMapping("/collist")
    @RequiresPermissions("sys:tdx:list")
    public R collist(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysYfyd> pageUtil = new Page<SysYfyd>(query.getPage(), query.getLimit());
        Page<SysYfyd> page = sysYfydService.queryPagecolList(pageUtil, query);
        return R.ok().put("page", page);
    }


    /**
     * 一分一段管理列表
     */
    @RequestMapping("/dnfsdxfjslist")
    @RequiresPermissions("sys:yfyd:dnfsdxfjslist")
    public R dnfsdxfjslist(@RequestParam Map<String, Object> params) {
        System.out.println("paramsparamsparamsparams" + params);
        //查询列表数据
        Query query = new Query(params);
        Page<SysYfyd> pageUtil = new Page<SysYfyd>(query.getPage(), query.getLimit());
        Page<SysYfyd> page = sysYfydService.queryPagednfsdxfjsList(pageUtil, query);
        return R.ok().put("page", page);
    }

    /**
     * 一分一段管理列表
     */
    @RequestMapping("/dnwcylnwczhlist")
    @RequiresPermissions("sys:yfyd:dnwcylnwczhlist")
    public R dnwcylnwczhlist(@RequestParam Map<String, Object> params) {
        System.out.println("ssssssssssssparamsparamsparamsparams" + params);
        //查询列表数据
        Query query = new Query(params);
        Page<SysYfyd> pageUtil = new Page<SysYfyd>(query.getPage(), query.getLimit());
        Page<SysYfyd> page = sysYfydService.queryPagednwcylnwczhList(pageUtil, query);
        return R.ok().put("page", page);
    }


    /**
     * 一分一段管理
     */
    @RequestMapping("/info/{yfydId}")
    @RequiresPermissions("sys:yfyd:info")
    public R info(@PathVariable("yfydId") String yfydId) {
        SysYfyd yfyd = sysYfydService.selectById(yfydId);
        //获取附件列表
        List<TMaterialFile> tMaterialFiles = tMaterialFileService.selectList(new EntityWrapper<TMaterialFile>().eq("parentid", yfyd.getId()));
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

        yfyd.setFiles(json);
        return R.ok().put("yfyd", yfyd);
    }

    /**
     * 获取所有一分一段管理
     */
    @RequestMapping("/getYfyds")
    public R getYfydList() {
        List<SysYfyd> yfyds = sysYfydService.selectList(new EntityWrapper<SysYfyd>().orderBy(true, "updatetime", false));
        return R.ok().put("yfyds", yfyds);
    }

    /**
     * 保存一分一段管理
     */
    @Log("保存一分一段管理")
    @RequestMapping("/save")
    @RequiresPermissions("sys:yfyd:save")
    public R save(@RequestBody SysYfyd yfyd) {
        ValidatorUtils.validateEntity(yfyd);
        yfyd.setCreatetime(new Date());
        yfyd.setCreateuser(getUser().getUsername());
        yfyd.setUpdatetime(new Date());
        yfyd.setUpdateuser(getUser().getUsername());
        sysYfydService.insert(yfyd);

        if (yfyd.getFiles() != null) {
            tMaterialFileService.setTMaterialFilePrintId(yfyd.getFiles(), yfyd.getId());
        }
        return R.ok();
    }

    /**
     * 修改一分一段管理
     */
    @Log("修改一分一段管理")
    @RequestMapping("/update")
    @RequiresPermissions("sys:yfyd:update")
    public R update(@RequestBody SysYfyd yfyd) {
        ValidatorUtils.validateEntity(yfyd);
        yfyd.setUpdatetime(new Date());
        yfyd.setUpdateuser(getUser().getUsername());
        sysYfydService.updateById(yfyd);
        if (yfyd.getFiles() != null) {
            tMaterialFileService.setTMaterialFilePrintId(yfyd.getFiles(), yfyd.getId());
        }
        return R.ok();
    }

    /**
     * 删除一分一段管理
     */
    @Log("删除一分一段管理")
    @RequestMapping("/delete")
    @RequiresPermissions("sys:yfyd:delete")
    public R delete(@RequestBody String[] yfydIds) {
        sysYfydService.deleteBatch(yfydIds);
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
        List<SysYfyd> yfydList = new ArrayList<>();
        //普通for循环
        //开始索引0  结束索引
        int lastRowNum = sheet.getLastRowNum();
        System.out.println("最后一行：" + lastRowNum);
        for (int i = 1; i <= lastRowNum; i++) {
            //获取单元格
            XSSFRow row = sheet.getRow(i);
            if (row != null) {
                List<String> list = new ArrayList<>();
                for (int index = 0; index < 7; index++) {
                    System.out.println("indexindexindex" + index);

                    Cell cell = row.getCell(index);
                    if (cell != null && !"".equals(cell)) {
                        //此处是把单元格都转换成String类型
                        cell.setCellType(CellType.STRING);
                        System.out.println("cellcellcellcellcellcellcell" + cell);
                        System.out.println("getStringCellValuegetStringCellValue" + cell.getStringCellValue());
                        String cellValue = cell.getStringCellValue();
                        System.out.println("单元格数据：" + cellValue);
                        list.add(cellValue);
                    } else {
                        list.add(null);
                    }
                }
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

                    SysYfyd sysYfyd = new SysYfyd();
                    sysYfyd.setXh(list.get(0) == null || list.get(0).equals("") ? null : Integer.parseInt(list.get(0)));
                    sysYfyd.setSf(list.get(1));
                    sysYfyd.setNf(list.get(2));
                    sysYfyd.setKl(list.get(3));
                    sysYfyd.setFs(list.get(4) == null || list.get(4).equals("") ? null : Double.parseDouble(list.get(4)));
                    sysYfyd.setBdrs(list.get(5) == null || list.get(5).equals("") ? null : Integer.parseInt(list.get(5)));
                    sysYfyd.setLjrs(list.get(6) == null || list.get(6).equals("") ? null : Integer.parseInt(list.get(6)));
                    sysYfyd.setCreateuser(getUser().getUsername());
                    sysYfyd.setCreatetime(new Date());
                    sysYfyd.setUpdateuser(getUser().getUsername());
                    sysYfyd.setUpdatetime(new Date());
                    yfydList.add(sysYfyd);
                }
            }
        }
        if (yfydList.size() > 0) {
            sysYfydService.insertBatch(yfydList);
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

            String[] headers = {"序号", "省份", "年份", "科类", "分数", "本段人数"
                    , "累计人数"};
            //需要显示的对应列

            String[] includeAttr = {"xh", "sf", "nf", "kl", "fs", "bdrs", "ljrs", ""};
            Workbook workbook = sysYfydService.getExcelWorkBook(headers, sysYfydService.getList(otherWorkName), false, includeAttr);
            workbook.write(outputStream);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 关闭流资源
            outputStream.close();
        }
    }

    @Log("一分一段数据")
    @RequestMapping("/getData")
    public R getData(@RequestBody JSONObject param) {
        System.out.println("paramparamparamparam" + param);
        List<SysYfyd> yfydList = sysYfydService.selectList(new EntityWrapper<SysYfyd>().eq("nf", "2022"));
        return R.ok().put("data", yfydList);
    }
}

