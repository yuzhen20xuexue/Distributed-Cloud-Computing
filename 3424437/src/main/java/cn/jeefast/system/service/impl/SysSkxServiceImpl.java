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
import cn.jeefast.system.entity.SysSkx;
import cn.jeefast.system.dao.SysSkxDao;
import cn.jeefast.system.service.SysSkxService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 省控线管理 服务实现类
 * </p>
 *
 */
@Service
public class SysSkxServiceImpl extends ServiceImpl<SysSkxDao, SysSkx> implements SysSkxService {
    @Autowired
    private SysSkxDao sysSkxDao;

    @Override
    public Page<SysSkx> queryPageList(Page<SysSkx> page, Map<String, Object> map) {
        page.setRecords(sysSkxDao.queryPageList(page, map));
        return page;
    }

    @Override
    public Page<SysSkx> queryPagecolList(Page<SysSkx> page,Map<String, Object> map) {
        page.setRecords(sysSkxDao.queryPagecolList(page, map));
        return page;
    }

    @Override
    public void deleteBatch(String[] skxIds) {
        sysSkxDao.deleteBatch(skxIds);
    }


    @Override
    public List<Map<String, Object>> getList(String groupId) {
        List<Map<String, Object>> monthGroupXn = new ArrayList<>();
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("otherWorkName", groupId);
        List<SysSkx> sysSkxList = sysSkxDao.selectList(new EntityWrapper<SysSkx>().orderBy(true,"updatetime"));
        int i =0;
        for(SysSkx sysSkx : sysSkxList) {
            Map<String, Object> GroupXnMap = new HashMap<String, Object>();
//            GroupXnMap.put("xu", ++i);
            GroupXnMap.put("xh", sysSkx.getXh());
            GroupXnMap.put("sf", sysSkx.getSf());
            GroupXnMap.put("nf", sysSkx.getNf());
            GroupXnMap.put("lb", sysSkx.getLb());
            GroupXnMap.put("pc", sysSkx.getPc());
            GroupXnMap.put("fsx", sysSkx.getFsx());
            GroupXnMap.put("zyf", sysSkx.getZyf());
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
        String[] firs = { "省控线管理表,0,6", ",7,8"};
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
