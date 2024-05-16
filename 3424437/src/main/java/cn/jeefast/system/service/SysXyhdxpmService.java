package cn.jeefast.system.service;

import cn.jeefast.system.entity.SysXyhdxpm;
import com.baomidou.mybatisplus.plugins.Page;

import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.service.IService;
import org.apache.poi.ss.usermodel.Workbook;

/**
 * <p>
 * 校友会大学排名管理 服务类
 * </p>
 *
 */
public interface SysXyhdxpmService extends IService<SysXyhdxpm> {
    Page<SysXyhdxpm> queryPageList(Page<SysXyhdxpm> page, Map<String, Object> map);
    Page<SysXyhdxpm> queryPagecolList(Page<SysXyhdxpm> page, Map<String, Object> map);
    void deleteBatch(String[] xyhdxpmIds);
    Workbook getExcelWorkBook(String[] headers, List<Map<String, Object>> list, boolean useXSSF, String[] includeAttr);
    List<Map<String, Object>> getList(String groupId);
}
