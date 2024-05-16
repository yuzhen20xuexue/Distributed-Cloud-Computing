package cn.jeefast.system.dao;

import cn.jeefast.system.entity.SysZsjz;
import com.baomidou.mybatisplus.mapper.BaseMapper;

import com.baomidou.mybatisplus.plugins.Page;

import java.util.List;
import java.util.Map;

/**
 * <p>
  * 各校招生简章管理 Mapper 接口
 * </p>
 *
 */
public interface SysZsjzDao extends BaseMapper<SysZsjz> {
    List<SysZsjz> queryPageList(Page<SysZsjz> page, Map<String, Object> map);

    int deleteBatch(Object[] id);
}