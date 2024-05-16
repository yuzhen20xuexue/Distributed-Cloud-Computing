package cn.jeefast.system.dao;

import cn.jeefast.system.entity.SysXyhdxpm;
import com.baomidou.mybatisplus.mapper.BaseMapper;

import com.baomidou.mybatisplus.plugins.Page;

import java.util.List;
import java.util.Map;

/**
 * <p>
  * 校友会大学排名管理 Mapper 接口
 * </p>
 *
 */
public interface SysXyhdxpmDao extends BaseMapper<SysXyhdxpm> {
    List<SysXyhdxpm> queryPageList(Page<SysXyhdxpm> page, Map<String, Object> map);
    List<SysXyhdxpm> queryPagecolList(Page<SysXyhdxpm> page, Map<String, Object> map);
    int deleteBatch(Object[] id);
}