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
import cn.jeefast.system.entity.SysZsjz;
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


import cn.jeefast.system.service.SysZsjzService;
import org.springframework.web.bind.annotation.RestController;
import cn.jeefast.common.base.BaseController;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

/**
 * <p>
 * 各校招生简章管理 前端控制器
 * </p>
 */
@RestController
@RequestMapping("/sysZsjz")
public class SysZsjzController extends BaseController {
    @Autowired
    private SysZsjzService sysZsjzService;

    @Autowired
    private TMaterialFileService tMaterialFileService;


    /**
     * 各校招生简章管理列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:zsjz:list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysZsjz> pageUtil = new Page<SysZsjz>(query.getPage(), query.getLimit());
        Page<SysZsjz> page = sysZsjzService.queryPageList(pageUtil, query);
        return R.ok().put("page", page);
    }


    /**
     * 各校招生简章管理
     */
    @RequestMapping("/info/{zsjzId}")
    @RequiresPermissions("sys:zsjz:info")
    public R info(@PathVariable("zsjzId") String zsjzId) {
        SysZsjz zsjz = sysZsjzService.selectById(zsjzId);
        //获取附件列表
        List<TMaterialFile> tMaterialFiles = tMaterialFileService.selectList(new EntityWrapper<TMaterialFile>().eq("parentid", zsjz.getId()));
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

        zsjz.setFiles(json);
        return R.ok().put("zsjz", zsjz);
    }

    /**
     * 获取所有各校招生简章管理
     */
    @RequestMapping("/getZsjzs")
    public R getZsjzList() {
        List<SysZsjz> zsjzs = sysZsjzService.selectList(new EntityWrapper<SysZsjz>().orderBy(true, "updatetime", false));
        return R.ok().put("zsjzs", zsjzs);
    }

    /**
     * 保存各校招生简章管理
     */
    @Log("保存各校招生简章管理")
    @RequestMapping("/save")
    @RequiresPermissions("sys:zsjz:save")
    public R save(@RequestBody SysZsjz zsjz) {
        ValidatorUtils.validateEntity(zsjz);
        zsjz.setCreatetime(new Date());
        zsjz.setCreateuser(getUser().getUsername());
        zsjz.setUpdatetime(new Date());
        zsjz.setUpdateuser(getUser().getUsername());
        sysZsjzService.insert(zsjz);

        if (zsjz.getFiles() != null) {
            tMaterialFileService.setTMaterialFilePrintId(zsjz.getFiles(), zsjz.getId());
        }
        return R.ok();
    }

    /**
     * 修改各校招生简章管理
     */
    @Log("修改各校招生简章管理")
    @RequestMapping("/update")
    @RequiresPermissions("sys:zsjz:update")
    public R update(@RequestBody SysZsjz zsjz) {
        ValidatorUtils.validateEntity(zsjz);
        zsjz.setUpdatetime(new Date());
        zsjz.setUpdateuser(getUser().getUsername());
        sysZsjzService.updateById(zsjz);
        if (zsjz.getFiles() != null) {
            tMaterialFileService.setTMaterialFilePrintId(zsjz.getFiles(), zsjz.getId());
        }
        return R.ok();
    }

    /**
     * 删除各校招生简章管理
     */
    @Log("删除各校招生简章管理")
    @RequestMapping("/delete")
    @RequiresPermissions("sys:zsjz:delete")
    public R delete(@RequestBody String[] zsjzIds) {
        sysZsjzService.deleteBatch(zsjzIds);
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
        List<SysZsjz> zsjzList = new ArrayList<>();
        //普通for循环
        //开始索引0  结束索引
        int lastRowNum = sheet.getLastRowNum();
        System.out.println("最后一行：" + lastRowNum);
        for (int i = 1; i <= lastRowNum; i++) {
            //获取单元格
            XSSFRow row = sheet.getRow(i);
            if (row != null) {
                List<String> list = new ArrayList<>();
                for (Cell cell : row) {
                    if (cell != null && !"".equals(cell)) {
                        //此处是把单元格都转换成String类型
                        cell.setCellType(CellType.STRING);
                        String cellValue = cell.getStringCellValue();
                        System.out.println("单元格数据：" + cellValue);
                        list.add(cellValue);
                    }else {
                        list.add(null);
                    }
                }
                if (list.size() > 0) {
                    System.out.println("listlistlistlist" + list);

                    SysZsjz sysZsjz = new SysZsjz();
                    sysZsjz.setXuexiao(list.get(0));
                    sysZsjz.setAddress(list.get(1));
                    sysZsjz.setCreateuser(getUser().getUsername());
                    sysZsjz.setCreatetime(new Date());
                    sysZsjz.setUpdateuser(getUser().getUsername());
                    sysZsjz.setUpdatetime(new Date());

                    zsjzList.add(sysZsjz);
                }
            }
        }
        if (zsjzList.size() > 0) {
            sysZsjzService.insertBatch(zsjzList);
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

            String[] headers = {"学校名称", "招生简章"};
            //需要显示的对应列
            String[] includeAttr = {"xuexiao", "address", ""};
            Workbook workbook = sysZsjzService.getExcelWorkBook(headers, sysZsjzService.getList(otherWorkName), false, includeAttr);
            workbook.write(outputStream);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 关闭流资源
            outputStream.close();
        }
    }


}
