package cn.jeefast.system.service.impl;
import cn.jeefast.system.entity.SysRkpm;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFRichTextString;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import cn.jeefast.system.entity.SysTdx;
import cn.jeefast.system.dao.SysTdxDao;
import cn.jeefast.system.service.SysTdxService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 投档线管理 服务实现类
 * </p>
 *
 */
@Service
public class SysTdxServiceImpl extends ServiceImpl<SysTdxDao, SysTdx> implements SysTdxService {
    @Autowired
    private SysTdxDao sysTdxDao;

    @Override
    public Page<SysTdx> queryPageList(Page<SysTdx> page, Map<String, Object> map) {
        page.setRecords(sysTdxDao.queryPageList(page, map));
        System.out.println(map.get("order"));
        return page;
    }

    @Override
    public Page<SysTdx> queryPagecolList(Page<SysTdx> page,Map<String, Object> map) {
        page.setRecords(sysTdxDao.queryPagecolList(page,map));

        return page;
    }


    @Override
    public Page<SysTdx> queryPagelhjsList(Page<SysTdx> page, Map<String, Object> map) {
        return page.setRecords(sysTdxDao.queryPagelhjsList(page, map));
    }
    @Override
    public Page<SysTdx> queryPagegxzslqfsywcgList(Page<SysTdx> page, Map<String, Object> map) {
        return page.setRecords(sysTdxDao.queryPagegxzslqfsywcgList(page, map));
    }

    @Override
    public Page<SysTdx> queryPagesjjsList(Page<SysTdx> page, Map<String, Object> map) {
        return page.setRecords(sysTdxDao.queryPagesjjsList(page, map));
    }

    @Override
    public Page<SysTdx> queryPagesjjscolList(Page<SysTdx> page, Map<String, Object> map) {
        return page.setRecords(sysTdxDao.queryPagesjjscolList(page, map));
    }

    @Override
    public Page<SysTdx> queryPagezyjsList(Page<SysTdx> page, Map<String, Object> map) {
        return page.setRecords(sysTdxDao.queryPagezyjsList(page, map));
    }

    @Override
    public Page<SysTdx> queryPagezyjscolList(Page<SysTdx> page, Map<String, Object> map) {
        return page.setRecords(sysTdxDao.queryPagezyjscolList(page, map));
    }

    @Override
    public Page<SysTdx> queryPagedyjsList(Page<SysTdx> page, Map<String, Object> map) {
        return page.setRecords(sysTdxDao.queryPagedyjsList(page, map));
    }

    @Override
    public Page<SysTdx> queryPagecjjsList(Page<SysTdx> page, Map<String, Object> map) {
        return page.setRecords(sysTdxDao.queryPagecjjsList(page, map));
    }

    @Override
    public Page<SysTdx> queryPagecjjscolList(Page<SysTdx> page, Map<String, Object> map) {
        return page.setRecords(sysTdxDao.queryPagecjjscolList(page, map));
    }

    @Override
    public Page<SysTdx> querytjpxList(Page<SysTdx> page, Map<String, Object> map) {
        return page.setRecords(sysTdxDao.querytjpxList(page, map));
    }






    @Override
    public void deleteBatch(String[] tdxIds) {
        sysTdxDao.deleteBatch(tdxIds);
    }

    @Override
    public List<Map<String, Object>> getList(String groupId) {
        List<Map<String, Object>> monthGroupXn = new ArrayList<>();
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("otherWorkName", groupId);
        List<SysTdx> sysTdxList = sysTdxDao.selectList(new EntityWrapper<SysTdx>().orderBy(true,"updatetime"));
        int i =0;
        for(SysTdx sysTdx : sysTdxList) {
            Map<String, Object> GroupXnMap = new HashMap<String, Object>();
//            GroupXnMap.put("xu", ++i);
             
            GroupXnMap.put("nf", sysTdx.getNf());
            GroupXnMap.put("xuexiao", sysTdx.getXuexiao());
            GroupXnMap.put("shengfen", sysTdx.getShengfen());
            GroupXnMap.put("chengshi", sysTdx.getChengshi());
            GroupXnMap.put("rkpm", sysTdx.getRkpm());
            GroupXnMap.put("isjbw", sysTdx.getIsjbw());
            GroupXnMap.put("iseyy", sysTdx.getIseyy());
            GroupXnMap.put("sfsyl", sysTdx.getSfsyl());
            GroupXnMap.put("kl", sysTdx.getKl());
            GroupXnMap.put("pc", sysTdx.getPc());
            GroupXnMap.put("zyz", sysTdx.getZyz());
            GroupXnMap.put("xkyq", sysTdx.getXkyq());
            GroupXnMap.put("zdf", sysTdx.getZdf());
            GroupXnMap.put("zdfpm", sysTdx.getZdfpm());
            GroupXnMap.put("skx", sysTdx.getSkx());
            GroupXnMap.put("bxxz", sysTdx.getBxxz());
            GroupXnMap.put("xxgs", sysTdx.getXxgs());
            GroupXnMap.put("qgtyzsdm", sysTdx.getQgtyzsdm());
            GroupXnMap.put("zslx", sysTdx.getZslx());
            GroupXnMap.put("xxlb", sysTdx.getXxlb());
            GroupXnMap.put("xllb", sysTdx.getXllb());
            GroupXnMap.put("xxcym", sysTdx.getXxcym());
            GroupXnMap.put("syd", sysTdx.getSyd());

            monthGroupXn.add(GroupXnMap);
        }
        return monthGroupXn;
    }

    //数据导出方法
    @Override
    public Workbook getExcelWorkBook(String[] headers, List<Map<String, Object>> list, boolean useXSSF, String[] includeAttr) {

        Workbook workbook = useXSSF ? new XSSFWorkbook() : new HSSFWorkbook();

        // 创建sheet
        Sheet sheet = workbook.createSheet("Sheet1");
        createHeader(headers, sheet, useXSSF, workbook);

        // 确定行数
        for (int i = 0; i < list.size(); i++) {
            Map<String, Object> field = list.get(i);
            // 创建一行
            Row dataRow = sheet.createRow(i + 2);
            dataRow.setHeightInPoints(20);

            for (int j = 0, k = 0; j < includeAttr.length - 1; j++) {
                Cell dataCell = dataRow.createCell(j - k);
                String key = includeAttr[j];
                setCellValue(workbook, dataCell, field.get(key));

            }

        }

        return workbook;
    }

    private void createHeader(String[] headers, Sheet sheet, boolean b, Workbook workbook) {
        //样式
        Font ztFont = workbook.createFont();
        ztFont.setFontHeightInPoints((short)16);
        ztFont.setFontName("宋体");
        ztFont.setBold(true);

        CellStyle style = workbook.createCellStyle();
        style.setFont(ztFont);

        //创建第一行
        Row row = sheet.createRow(0);
        row.setHeightInPoints(20);
        Cell cell = row.createCell(0);
//		String[] firs = { ",0,3", "联系走访,4,10", "政策宣讲,11,16", "产业投资,17,18", "扶贫投资"};
        String[] firs = { "软科排名表,0,6", ",7,8"};
        for(int t = 0; t < firs.length; t++) {
            String str[] = firs[t].split(",");

            cell.setCellValue(str[0]);
            cell.setCellStyle(style);

            if(t < firs.length - 1) {
                CellRangeAddress region = new CellRangeAddress(0, 0, Integer.valueOf(str[1]), Integer.valueOf(str[2]));
                sheet.addMergedRegion(region);
                cell = row.createCell(Integer.valueOf(str[2]) + 1);
            }
        }

        //标题
        Row headerRow = sheet.createRow(1);
        row.setHeightInPoints(20);
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
            sheet.setColumnWidth(i, sheet.getColumnWidth(i) * 35 / 10);

            Cell headerRowCell = headerRow.createCell(i);
            RichTextString text = b ? new XSSFRichTextString(headers[i]) : new HSSFRichTextString(headers[i]);
            headerRowCell.setCellValue(text);
            headerRowCell.setCellStyle(style);
        }
    }

    private void setCellValue(Workbook workbook, Cell dataCell, Object value) {
        Font ztFont = workbook.createFont();
        ztFont.setFontHeightInPoints((short)12);
        ztFont.setFontName("宋体");

        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setFont(ztFont);

        String textValue = null;

        if (value instanceof Boolean) {
            boolean bValue = (Boolean) value;
            textValue = "√";
            if (!bValue) {
                textValue = "×";
            }
        } else if (value instanceof Date) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.CHINA);
            Date date = (Date) value;

            textValue = sdf.format(date);
        } else {
            if (value != null) {
                textValue = value.toString();
            }
        }

        if (textValue != null) {
            Pattern p = Pattern.compile("^//d+(//.//d+)?$");
            Matcher matcher = p.matcher(textValue);
            if (matcher.matches()) {
                dataCell.setCellValue(Double.parseDouble(textValue));
            } else {
                HSSFRichTextString richString = new HSSFRichTextString(textValue);
                dataCell.setCellValue(richString);
            }
        } else {
            dataCell.setCellStyle(cellStyle);
            dataCell.setCellValue("");
        }
    }
}
