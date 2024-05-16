package cn.jeefast.system.service;

import cn.jeefast.system.entity.SysYfyd;
import com.baomidou.mybatisplus.plugins.Page;

import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.service.IService;
import org.apache.poi.ss.usermodel.Workbook;

/**
 * <p>
 * 一分一段管理 服务类
 * </p>
 *
 */
public interface SysYfydService extends IService<SysYfyd> {
    Page<SysYfyd> queryPageList(Page<SysYfyd> page, Map<String, Object> map);

    Page<SysYfyd> queryPagecolList(Page<SysYfyd> page,Map<String, Object> map);
    Page<SysYfyd> queryPagednfsdxfjsList(Page<SysYfyd> page, Map<String, Object> map);
    Page<SysYfyd> queryPagednwcylnwczhList(Page<SysYfyd> page, Map<String, Object> map);

    void deleteBatch(String[] yfydIds);
    Workbook getExcelWorkBook(String[] headers, List<Map<String, Object>> list, boolean useXSSF, String[] includeAttr);
    List<Map<String, Object>> getList(String groupId);
}
