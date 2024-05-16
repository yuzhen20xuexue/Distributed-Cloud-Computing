package cn.jeefast.system.service;

import cn.jeefast.system.entity.SysZsjh;
import com.baomidou.mybatisplus.plugins.Page;

import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.service.IService;
import org.apache.poi.ss.usermodel.Workbook;

/**
 * <p>
 * 招生计划管理 服务类
 * </p>
 *
 */
public interface SysZsjhService extends IService<SysZsjh> {
    Page<SysZsjh> queryPageList(Page<SysZsjh> page, Map<String, Object> map);
    Page<SysZsjh> queryPagexzyxList(Page<SysZsjh> page, Map<String, Object> map);
    Page<SysZsjh> queryPagexzzyList(Page<SysZsjh> page, Map<String, Object> map);
    Page<SysZsjh> queryPagemztjysdgxList(Page<SysZsjh> page, Map<String, Object> map);

    void deleteBatch(String[] zsjhIds);
    Workbook getExcelWorkBook(String[] headers, List<Map<String, Object>> list, boolean useXSSF, String[] includeAttr);
    List<Map<String, Object>> getList(String groupId);
}
