package cn.jeefast.system.service;

import cn.jeefast.system.entity.SysRkpm;
import com.baomidou.mybatisplus.plugins.Page;

import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.service.IService;
import org.apache.poi.ss.usermodel.Workbook;

/**
 * <p>
 * 软科排名 服务类
 * </p>
 *
 */
public interface SysRkpmService extends IService<SysRkpm> {
    Page<SysRkpm> queryPageList(Page<SysRkpm> page, Map<String, Object> map);
    Page<SysRkpm> queryPagecolList(Page<SysRkpm> page, Map<String, Object> map);
    Page<SysRkpm> queryPagerkxypmglList(Page<SysRkpm> page, Map<String, Object> map);
    void deleteBatch(String[] rkpmIds);
    Workbook getExcelWorkBook(String[] headers, List<Map<String, Object>> list, boolean useXSSF, String[] includeAttr);
    List<Map<String, Object>> getList(String groupId);
}
