package cn.jeefast.system.service.impl;
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
import cn.jeefast.system.entity.SysRkpm;
import cn.jeefast.system.dao.SysRkpmDao;
import cn.jeefast.system.service.SysRkpmService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 软科排名 服务实现类
 * </p>
 *
 */
@Service
public class SysRkpmServiceImpl extends ServiceImpl<SysRkpmDao, SysRkpm> implements SysRkpmService {
    @Autowired
    private SysRkpmDao sysRkpmDao;

    @Override
    public Page<SysRkpm> queryPageList(Page<SysRkpm> page, Map<String, Object> map) {
        page.setRecords(sysRkpmDao.queryPageList(page, map));
        return page;
    }

    public Page<SysRkpm> queryPagecolList(Page<SysRkpm> page, Map<String, Object> map) {
        page.setRecords(sysRkpmDao.queryPagecolList(page, map));
        return page;
    }

    @Override
    public Page<SysRkpm> queryPagerkxypmglList(Page<SysRkpm> page, Map<String, Object> map) {
        return page.setRecords(sysRkpmDao.queryPagerkxypmglList(page, map));
    }

    @Override
    public void deleteBatch(String[] rkpmIds) {
        sysRkpmDao.deleteBatch(rkpmIds);
    }


    @Override
    public List<Map<String, Object>> getList(String groupId) {
        List<Map<String, Object>> monthGroupXn = new ArrayList<>();
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("otherWorkName", groupId);
        List<SysRkpm> sysRkpmList = sysRkpmDao.selectList(new EntityWrapper<SysRkpm>().orderBy(true,"updatetime"));
        int i =0;
        for(SysRkpm sysRkpm : sysRkpmList) {
            Map<String, Object> GroupXnMap = new HashMap<String, Object>();
//            GroupXnMap.put("xu", ++i);
            GroupXnMap.put("xuexiao", sysRkpm.getXuexiao());
            GroupXnMap.put("pm", sysRkpm.getPm());
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
