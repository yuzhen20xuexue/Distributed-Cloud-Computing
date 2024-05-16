package cn.jeefast.system.dao;

import cn.jeefast.system.entity.SysRkpm;
import com.baomidou.mybatisplus.mapper.BaseMapper;

import com.baomidou.mybatisplus.plugins.Page;

import java.util.List;
import java.util.Map;

/**
 * <p>
  * 软科排名 Mapper 接口
 * </p>
 *
 */
public interface SysRkpmDao extends BaseMapper<SysRkpm> {
    List<SysRkpm> queryPageList(Page<SysRkpm> page, Map<String, Object> map);
    List<SysRkpm> queryPagecolList(Page<SysRkpm> page, Map<String, Object> map);
    List<SysRkpm> queryPagerkxypmglList(Page<SysRkpm> page, Map<String, Object> map);
    int deleteBatch(Object[] id);
}