package cn.jeefast.system.dao;

import cn.jeefast.system.entity.SysSkx;
import com.baomidou.mybatisplus.mapper.BaseMapper;

import com.baomidou.mybatisplus.plugins.Page;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
/**
 * <p>
  * 省控线管理 Mapper 接口
 * </p>
 *
 */
public interface SysSkxDao extends BaseMapper<SysSkx> {
    List<SysSkx> queryPageList(Page<SysSkx> page, Map<String, Object> map);
    List<SysSkx> queryPagecolList(Page<SysSkx> page,Map<String, Object> map);

    int deleteBatch(Object[] id);
}