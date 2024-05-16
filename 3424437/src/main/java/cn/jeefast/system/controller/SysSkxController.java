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
import cn.jeefast.system.entity.SysSkx;
import cn.jeefast.system.entity.SysUser;
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


import cn.jeefast.system.service.SysSkxService;
import org.springframework.web.bind.annotation.RestController;
import cn.jeefast.common.base.BaseController;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

/**
 * <p>
 * 省控线管理 前端控制器
 * </p>
 */
@RestController
@RequestMapping("/sysSkx")
public class SysSkxController extends BaseController {
    @Autowired
    private SysSkxService sysSkxService;

    @Autowired
    private TMaterialFileService tMaterialFileService;


    /**
     * 省控线管理列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:skx:list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysSkx> pageUtil = new Page<SysSkx>(query.getPage(), query.getLimit());
        Page<SysSkx> page = sysSkxService.queryPageList(pageUtil, query);
        return R.ok().put("page", page);
    }

    @RequestMapping("/collist")
    @RequiresPermissions("sys:tdx:list")
    public R collist(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysSkx> pageUtil = new Page<SysSkx>(query.getPage(), query.getLimit());
        Page<SysSkx> page = sysSkxService.queryPagecolList(pageUtil, query);
        return R.ok().put("page", page);
    }

    /**
     * 省控线管理
     */
    @RequestMapping("/info/{skxId}")
    @RequiresPermissions("sys:skx:info")
    public R info(@PathVariable("skxId") String skxId) {
        SysSkx skx = sysSkxService.selectById(skxId);
        //获取附件列表
        List<TMaterialFile> tMaterialFiles = tMaterialFileService.selectList(new EntityWrapper<TMaterialFile>().eq("parentid", skx.getId()));
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

        skx.setFiles(json);
        return R.ok().put("skx", skx);
    }

    /**
     * 获取所有省控线管理
     */
    @RequestMapping("/getSkxs")
    public R getSkxList() {
        List<SysSkx> skxs = sysSkxService.selectList(new EntityWrapper<SysSkx>().orderBy(true, "updatetime", false));
        return R.ok().put("skxs", skxs);
    }

    /**
     * 保存省控线管理
     */
    @Log("保存省控线管理")
    @RequestMapping("/save")
    @RequiresPermissions("sys:skx:save")
    public R save(@RequestBody SysSkx skx) {
        ValidatorUtils.validateEntity(skx);
        skx.setCreatetime(new Date());
        skx.setCreateuser(getUser().getUsername());
        skx.setUpdatetime(new Date());
        skx.setUpdateuser(getUser().getUsername());
        sysSkxService.insert(skx);

        if (skx.getFiles() != null) {
            tMaterialFileService.setTMaterialFilePrintId(skx.getFiles(), skx.getId());
        }
        return R.ok();
    }

    /**
     * 修改省控线管理
     */
    @Log("修改省控线管理")
    @RequestMapping("/update")
    @RequiresPermissions("sys:skx:update")
    public R update(@RequestBody SysSkx skx) {
        ValidatorUtils.validateEntity(skx);
        skx.setUpdatetime(new Date());
        skx.setUpdateuser(getUser().getUsername());
        sysSkxService.updateById(skx);
        if (skx.getFiles() != null) {
            tMaterialFileService.setTMaterialFilePrintId(skx.getFiles(), skx.getId());
        }
        return R.ok();
    }

    /**
     * 删除省控线管理
     */
    @Log("删除省控线管理")
    @RequestMapping("/delete")
    @RequiresPermissions("sys:skx:delete")
    public R delete(@RequestBody String[] skxIds) {
        sysSkxService.deleteBatch(skxIds);
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
        List<SysSkx> skxList = new ArrayList<>();
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

                    SysSkx sysSkx = new SysSkx();
                    sysSkx.setXh(list.get(0) == null || list.get(0).equals("")?null:Integer.parseInt(list.get(0)));
                    sysSkx.setSf(list.get(1));
                    sysSkx.setNf(list.get(2));
                    sysSkx.setLb(list.get(3));
                    sysSkx.setPc(list.get(4));
                    sysSkx.setFsx(list.get(5) == null || list.get(5).equals("")?null:Double.parseDouble(list.get(5)));
                    sysSkx.setZyf(list.get(6) == null || list.get(6).equals("")?null:Double.parseDouble(list.get(6)));
                    sysSkx.setCreateuser(getUser().getUsername());
                    sysSkx.setCreatetime(new Date());
                    sysSkx.setUpdateuser(getUser().getUsername());
                    sysSkx.setUpdatetime(new Date());

                    skxList.add(sysSkx);
                }
            }
        }
        if (skxList.size() > 0) {
            sysSkxService.insertBatch(skxList);
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

            String[] headers = {"序号", "省份", "年份", "类别", "批次", "分数线", "专业分"};
            //需要显示的对应列

            String[] includeAttr = {"xh", "sf", "nf", "lb", "pc", "fsx", "zyf",""};
            Workbook workbook = sysSkxService.getExcelWorkBook(headers, sysSkxService.getList(otherWorkName), false, includeAttr);
            workbook.write(outputStream);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 关闭流资源
            outputStream.close();
        }
    }


}
