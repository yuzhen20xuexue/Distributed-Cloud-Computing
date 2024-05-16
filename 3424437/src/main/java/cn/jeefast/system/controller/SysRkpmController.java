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


import cn.jeefast.system.service.SysRkpmService;
import org.springframework.web.bind.annotation.RestController;
import cn.jeefast.common.base.BaseController;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

/**
 * <p>
 * 软科排名 前端控制器
 * </p>
 */
@RestController
@RequestMapping("/sysRkpm")
public class SysRkpmController extends BaseController {
    @Autowired
    private SysRkpmService sysRkpmService;

    @Autowired
    private TMaterialFileService tMaterialFileService;

    @Value("${upload.flespath}")
    public String flespath;


    /**
     * 软科排名列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:rkpm:list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysRkpm> pageUtil = new Page<SysRkpm>(query.getPage(), query.getLimit());
        Page<SysRkpm> page = sysRkpmService.queryPageList(pageUtil, query);
        return R.ok().put("page", page);
    }

    @RequestMapping("/collist")
    @RequiresPermissions("sys:tdx:list")
    public R collist(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysRkpm> pageUtil = new Page<SysRkpm>(query.getPage(), query.getLimit());
        Page<SysRkpm> page = sysRkpmService.queryPagecolList(pageUtil, query);
        return R.ok().put("page", page);
    }

    /**
     * 软科排名列表
     */
    @RequestMapping("/rkxypmgllist")
    @RequiresPermissions("sys:rkpm:rkxypmgllist")
    public R rkxypmgllist(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysRkpm> pageUtil = new Page<SysRkpm>(query.getPage(), query.getLimit());
        Page<SysRkpm> page = sysRkpmService.queryPagerkxypmglList(pageUtil, query);
        return R.ok().put("page", page);
    }


    /**
     * 软科排名
     */
    @RequestMapping("/info/{rkpmId}")
    @RequiresPermissions("sys:rkpm:info")
    public R info(@PathVariable("rkpmId") String rkpmId) {
        SysRkpm rkpm = sysRkpmService.selectById(rkpmId);
        //获取附件列表
        List<TMaterialFile> tMaterialFiles = tMaterialFileService.selectList(new EntityWrapper<TMaterialFile>().eq("parentid", rkpm.getId()));
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

        rkpm.setFiles(json);
        return R.ok().put("rkpm", rkpm);
    }

    /**
     * 获取所有软科排名
     */
    @RequestMapping("/getRkpms")
    public R getRkpmList() {
        List<SysRkpm> rkpms = sysRkpmService.selectList(new EntityWrapper<SysRkpm>().orderBy(true, "updatetime", false));
        return R.ok().put("rkpms", rkpms);
    }

    /**
     * 保存软科排名
     */
    @Log("保存软科排名")
    @RequestMapping("/save")
    @RequiresPermissions("sys:rkpm:save")
    public R save(@RequestBody SysRkpm rkpm) {
        ValidatorUtils.validateEntity(rkpm);
        rkpm.setCreatetime(new Date());
        rkpm.setCreateuser(getUser().getUsername());
        rkpm.setUpdatetime(new Date());
        rkpm.setUpdateuser(getUser().getUsername());
        sysRkpmService.insert(rkpm);

        if (rkpm.getFiles() != null) {
            tMaterialFileService.setTMaterialFilePrintId(rkpm.getFiles(), rkpm.getId());
        }
        return R.ok();
    }

    /**
     * 修改软科排名
     */
    @Log("修改软科排名")
    @RequestMapping("/update")
    @RequiresPermissions("sys:rkpm:update")
    public R update(@RequestBody SysRkpm rkpm) {
        ValidatorUtils.validateEntity(rkpm);
        rkpm.setUpdatetime(new Date());
        rkpm.setUpdateuser(getUser().getUsername());
        sysRkpmService.updateById(rkpm);
        if (rkpm.getFiles() != null) {
            tMaterialFileService.setTMaterialFilePrintId(rkpm.getFiles(), rkpm.getId());
        }
        return R.ok();
    }

    /**
     * 删除软科排名
     */
    @Log("删除软科排名")
    @RequestMapping("/delete")
    @RequiresPermissions("sys:rkpm:delete")
    public R delete(@RequestBody String[] rkpmIds) {
        sysRkpmService.deleteBatch(rkpmIds);
        return R.ok();
    }

    @RequestMapping("/readExcel")
    public R readExcel(@RequestBody Map<String,Object> obj) throws IOException {
        System.out.println("objobjobjobjobj"+obj);
        SysUser sysUser = getUser();

        String flespathZh = flespath+"\\"+obj.get("filePath");
        //获取工作簿
        XSSFWorkbook book = new XSSFWorkbook(flespathZh);
        //获取工作表
        XSSFSheet sheet = book.getSheetAt(0);
        List<SysRkpm> rkpmList=new ArrayList<>();
        //普通for循环
        //开始索引0  结束索引
        int lastRowNum = sheet.getLastRowNum();
        System.out.println("最后一行："+lastRowNum);
        for (int i = 1; i <= lastRowNum; i++) {
            //获取单元格
            XSSFRow row = sheet.getRow(i);
            if(row!=null){
                List<String> list =new ArrayList<>();
                for (Cell cell : row) {
                    if(cell!=null && !"".equals(cell)){
                        //此处是把单元格都转换成String类型
                        cell.setCellType(CellType.STRING);
                        String cellValue = cell.getStringCellValue();
                        System.out.println("单元格数据："+cellValue);
                        list.add(cellValue);
                    }else {
                        list.add(null);
                    }
                }
                if(list.size()>0){
                    System.out.println("listlistlistlist"+list);

                    SysRkpm sysRkpm = new SysRkpm();
                    sysRkpm.setXuexiao(list.get(0));
                    sysRkpm.setPm(Integer.parseInt(list.get(1)));
                    sysRkpm.setCreateuser(getUser().getUsername());
                    sysRkpm.setCreatetime(new Date());
                    sysRkpm.setUpdateuser(getUser().getUsername());
                    sysRkpm.setUpdatetime(new Date());

                    rkpmList.add(sysRkpm);
                }
            }
        }
        if(rkpmList.size()>0){
            for (SysRkpm rkpm : rkpmList) {
                System.out.println(rkpm);
            }
            sysRkpmService.insertBatch(rkpmList);
        }
//        deleteFile(flespathZh);

        //释放资源
        book.close();

        return R.ok();
    }

    /**
     * 导出Excel
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


            String[] headers = { "学校", "排名"};
            //需要显示的对应列
            String[] includeAttr = { "xuexiao", "pm", ""};
            Workbook workbook = sysRkpmService.getExcelWorkBook(headers, sysRkpmService.getList(otherWorkName), false, includeAttr);
            workbook.write(outputStream);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 关闭流资源
            outputStream.close();
        }
    }

}
