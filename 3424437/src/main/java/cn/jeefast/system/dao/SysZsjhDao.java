package cn.jeefast.system.dao;

import cn.jeefast.system.entity.SysZsjh;
import com.baomidou.mybatisplus.mapper.BaseMapper;

import com.baomidou.mybatisplus.plugins.Page;

import java.util.List;
import java.util.Map;

/**
 * <p>
  * 招生计划管理 Mapper 接口
 * </p>
 *
 */
public interface SysZsjhDao extends BaseMapper<SysZsjh> {
    List<SysZsjh> queryPageList(Page<SysZsjh> page, Map<String, Object> map);
    List<SysZsjh> queryPagexzyxList(Page<SysZsjh> page, Map<String, Object> map);
    List<SysZsjh> queryPagexzzyList(Page<SysZsjh> page, Map<String, Object> map);
    List<SysZsjh> queryPagemztjysdgxList(Page<SysZsjh> page, Map<String, Object> map);

    int deleteBatch(Object[] id);
}