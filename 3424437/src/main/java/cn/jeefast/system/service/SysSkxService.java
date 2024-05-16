package cn.jeefast.system.service;

import cn.jeefast.system.entity.SysSkx;
import com.baomidou.mybatisplus.plugins.Page;

import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.service.IService;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.ibatis.annotations.Param;
/**
 * <p>
 * 省控线管理 服务类
 * </p>
 *
 */
public interface SysSkxService extends IService<SysSkx> {
    Page<SysSkx> queryPageList(Page<SysSkx> page, Map<String, Object> map);
    Page<SysSkx> queryPagecolList(Page<SysSkx> page,Map<String, Object> map);
    void deleteBatch(String[] skxIds);
    Workbook getExcelWorkBook(String[] headers, List<Map<String, Object>> list, boolean useXSSF, String[] includeAttr);
    List<Map<String, Object>> getList(String groupId);
}
