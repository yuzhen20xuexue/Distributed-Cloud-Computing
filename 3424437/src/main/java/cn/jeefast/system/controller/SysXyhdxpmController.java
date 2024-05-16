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
import cn.jeefast.system.entity.SysXyhdxpm;
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


import cn.jeefast.system.service.SysXyhdxpmService;
import org.springframework.web.bind.annotation.RestController;
import cn.jeefast.common.base.BaseController;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

/**
 * <p>
 * 校友会大学排名管理 前端控制器
 * </p>
 */
@RestController
@RequestMapping("/sysXyhdxpm")
public class SysXyhdxpmController extends BaseController {
    @Autowired
    private SysXyhdxpmService sysXyhdxpmService;

    @Autowired
    private TMaterialFileService tMaterialFileService;


    /**
     * 校友会大学排名管理列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:xyhdxpm:list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysXyhdxpm> pageUtil = new Page<SysXyhdxpm>(query.getPage(), query.getLimit());
        Page<SysXyhdxpm> page = sysXyhdxpmService.queryPageList(pageUtil, query);
        return R.ok().put("page", page);
    }
    @RequestMapping("/collist")
    @RequiresPermissions("sys:tdx:list")
    public R collist(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysXyhdxpm> pageUtil = new Page<SysXyhdxpm>(query.getPage(), query.getLimit());
        Page<SysXyhdxpm> page = sysXyhdxpmService.queryPagecolList(pageUtil, query);
        return R.ok().put("page", page);
    }

    /**
     * 校友会大学排名管理
     */
    @RequestMapping("/info/{xyhdxpmId}")
    @RequiresPermissions("sys:xyhdxpm:info")
    public R info(@PathVariable("xyhdxpmId") String xyhdxpmId) {
        SysXyhdxpm xyhdxpm = sysXyhdxpmService.selectById(xyhdxpmId);
        //获取附件列表
        List<TMaterialFile> tMaterialFiles = tMaterialFileService.selectList(new EntityWrapper<TMaterialFile>().eq("parentid", xyhdxpm.getId()));
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

        xyhdxpm.setFiles(json);
        return R.ok().put("xyhdxpm", xyhdxpm);
    }

    /**
     * 获取所有校友会大学排名管理
     */
    @RequestMapping("/getXyhdxpms")
    public R getXyhdxpmList() {
        List<SysXyhdxpm> xyhdxpms = sysXyhdxpmService.selectList(new EntityWrapper<SysXyhdxpm>().orderBy(true, "updatetime", false));
        return R.ok().put("xyhdxpms", xyhdxpms);
    }

    /**
     * 保存校友会大学排名管理
     */
    @Log("保存校友会大学排名管理")
    @RequestMapping("/save")
    @RequiresPermissions("sys:xyhdxpm:save")
    public R save(@RequestBody SysXyhdxpm xyhdxpm) {
        ValidatorUtils.validateEntity(xyhdxpm);
        xyhdxpm.setCreatetime(new Date());
        xyhdxpm.setCreateuser(getUser().getUsername());
        xyhdxpm.setUpdatetime(new Date());
        xyhdxpm.setUpdateuser(getUser().getUsername());
        sysXyhdxpmService.insert(xyhdxpm);

        if (xyhdxpm.getFiles() != null) {
            tMaterialFileService.setTMaterialFilePrintId(xyhdxpm.getFiles(), xyhdxpm.getId());
        }
        return R.ok();
    }

    /**
     * 修改校友会大学排名管理
     */
    @Log("修改校友会大学排名管理")
    @RequestMapping("/update")
    @RequiresPermissions("sys:xyhdxpm:update")
    public R update(@RequestBody SysXyhdxpm xyhdxpm) {
        ValidatorUtils.validateEntity(xyhdxpm);
        xyhdxpm.setUpdatetime(new Date());
        xyhdxpm.setUpdateuser(getUser().getUsername());
        sysXyhdxpmService.updateById(xyhdxpm);
        if (xyhdxpm.getFiles() != null) {
            tMaterialFileService.setTMaterialFilePrintId(xyhdxpm.getFiles(), xyhdxpm.getId());
        }
        return R.ok();
    }

    /**
     * 删除校友会大学排名管理
     */
    @Log("删除校友会大学排名管理")
    @RequestMapping("/delete")
    @RequiresPermissions("sys:xyhdxpm:delete")
    public R delete(@RequestBody String[] xyhdxpmIds) {
        sysXyhdxpmService.deleteBatch(xyhdxpmIds);
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
        List<SysXyhdxpm> xyhdxpmList = new ArrayList<>();
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

                    SysXyhdxpm sysXyhdxpm = new SysXyhdxpm();
                    sysXyhdxpm.setXh(list.get(0) == null || list.get(0).equals("")?null:Integer.parseInt(list.get(0)));
                    if(list.get(1) != null && list.get(1).contains("*")){
                        String xxmc = list.get(1).replace("*","");
                        sysXyhdxpm.setXxmc(Integer.parseInt(xxmc));

                    }else{
                        sysXyhdxpm.setXxmc(list.get(1) == null || list.get(1).equals("")?null:Integer.parseInt(list.get(1)));

                    }
                    sysXyhdxpm.setXuexiao(list.get(2));
                    sysXyhdxpm.setZf(list.get(3) == null || list.get(3).equals("")?null:Double.parseDouble(list.get(3)));
                    sysXyhdxpm.setXj(list.get(4));
                    sysXyhdxpm.setBxcc(list.get(5));
                    sysXyhdxpm.setCreateuser(getUser().getUsername());
                    sysXyhdxpm.setCreatetime(new Date());
                    sysXyhdxpm.setUpdateuser(getUser().getUsername());
                    sysXyhdxpm.setUpdatetime(new Date());
                    xyhdxpmList.add(sysXyhdxpm);
                }
            }
        }
        if (xyhdxpmList.size() > 0) {
            sysXyhdxpmService.insertBatch(xyhdxpmList);
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

            String[] headers = {"序号", "学校名次", "学校名称", "总分", "星级", "办学层次"};
            //需要显示的对应列

            String[] includeAttr = {"xh", "xxmc", "xuexiao", "zf", "xj", "bxcc", ""};
            Workbook workbook = sysXyhdxpmService.getExcelWorkBook(headers, sysXyhdxpmService.getList(otherWorkName), false, includeAttr);
            workbook.write(outputStream);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 关闭流资源
            outputStream.close();
        }
    }


}
