package cn.jeefast.system.dao;

import cn.jeefast.system.entity.SysYfyd;
import com.baomidou.mybatisplus.mapper.BaseMapper;

import com.baomidou.mybatisplus.plugins.Page;

import java.util.List;
import java.util.Map;

/**
 * <p>
  * 一分一段管理 Mapper 接口
 * </p>
 *
 */
public interface SysYfydDao extends BaseMapper<SysYfyd> {
    List<SysYfyd> queryPageList(Page<SysYfyd> page, Map<String, Object> map);

    List<SysYfyd> queryPagecolList(Page<SysYfyd> page,Map<String, Object> map);

    List<SysYfyd> queryPagednfsdxfjsList(Page<SysYfyd> page, Map<String, Object> map);
    List<SysYfyd> queryPagednwcylnwczhList(Page<SysYfyd> page, Map<String, Object> map);

    int deleteBatch(Object[] id);
}