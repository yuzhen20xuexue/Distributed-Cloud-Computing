package cn.jeefast.system.service;

import cn.jeefast.system.entity.SysTdx;
import com.baomidou.mybatisplus.plugins.Page;

import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.service.IService;
import org.apache.ibatis.annotations.Param;
import org.apache.poi.ss.usermodel.Workbook;


/**
 * <p>
 * 投档线管理 服务类
 * </p>
 *
 */
public interface SysTdxService extends IService<SysTdx> {
    Page<SysTdx> queryPageList(Page<SysTdx> page, Map<String, Object> map);
    Page<SysTdx> queryPagecolList(Page<SysTdx> page,Map<String, Object> map);
    Page<SysTdx> queryPagegxzslqfsywcgList(Page<SysTdx> page, Map<String, Object> map);
    Page<SysTdx> queryPagesjjsList(Page<SysTdx> page, Map<String, Object> map);

    Page<SysTdx> queryPagesjjscolList(Page<SysTdx> page, Map<String, Object> map);

    Page<SysTdx> queryPagezyjsList(Page<SysTdx> page, Map<String, Object> map);

    Page<SysTdx> queryPagezyjscolList(Page<SysTdx> page, Map<String, Object> map);

    Page<SysTdx> queryPagedyjsList(Page<SysTdx> page, Map<String, Object> map);
    Page<SysTdx> queryPagecjjsList(Page<SysTdx> page, Map<String, Object> map);

    Page<SysTdx> queryPagecjjscolList(Page<SysTdx> page, Map<String, Object> map);

    Page<SysTdx> querytjpxList(Page<SysTdx> page, Map<String, Object> map);

    Page<SysTdx> queryPagelhjsList(Page<SysTdx> page, Map<String, Object> map);

    void deleteBatch(String[] tdxIds);
    Workbook getExcelWorkBook(String[] headers, List<Map<String, Object>> list, boolean useXSSF, String[] includeAttr);
    List<Map<String, Object>> getList(String groupId);
}
