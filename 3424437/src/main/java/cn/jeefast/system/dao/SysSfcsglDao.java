package cn.jeefast.system.dao;

import cn.jeefast.system.entity.SysSfcsgl;
import com.baomidou.mybatisplus.mapper.BaseMapper;

import com.baomidou.mybatisplus.plugins.Page;

import java.util.List;
import java.util.Map;

/**
 * <p>
  * 省份城市管理 Mapper 接口
 * </p>
 *
 */
public interface SysSfcsglDao extends BaseMapper<SysSfcsgl> {
    List<SysSfcsgl> queryPageList(Page<SysSfcsgl> page, Map<String, Object> map);

    int deleteBatch(Object[] id);
}