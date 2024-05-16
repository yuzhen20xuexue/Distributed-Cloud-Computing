package cn.jeefast.system.service;

import cn.jeefast.system.entity.SysZsjz;
import com.baomidou.mybatisplus.plugins.Page;

import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.service.IService;
import org.apache.poi.ss.usermodel.Workbook;

/**
 * <p>
 * 各校招生简章管理 服务类
 * </p>
 *
 */
public interface SysZsjzService extends IService<SysZsjz> {
    Page<SysZsjz> queryPageList(Page<SysZsjz> page, Map<String, Object> map);
    void deleteBatch(String[] zsjzIds);
    Workbook getExcelWorkBook(String[] headers, List<Map<String, Object>> list, boolean useXSSF, String[] includeAttr);
    List<Map<String, Object>> getList(String groupId);
}
