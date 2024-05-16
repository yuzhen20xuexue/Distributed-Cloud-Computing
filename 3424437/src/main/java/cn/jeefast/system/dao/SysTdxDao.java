package cn.jeefast.system.dao;

import cn.jeefast.system.entity.SysTdx;
import com.baomidou.mybatisplus.mapper.BaseMapper;

import com.baomidou.mybatisplus.plugins.Page;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;

/**
 * <p>
  * 投档线管理 Mapper 接口
 * </p>
 *
 */
public interface SysTdxDao extends BaseMapper<SysTdx> {
    List<SysTdx> queryPageList(Page<SysTdx> page, Map<String, Object> map);

    List<SysTdx> queryPagecolList(Page<SysTdx> page,Map<String, Object> map);
    List<SysTdx> queryPagegxzslqfsywcgList(Page<SysTdx> page, Map<String, Object> map);
    List<SysTdx> queryPagesjjsList(Page<SysTdx> page, Map<String, Object> map);

    List<SysTdx> queryPagesjjscolList(Page<SysTdx> page, Map<String, Object> map);
    List<SysTdx> queryPagezyjsList(Page<SysTdx> page, Map<String, Object> map);

    List<SysTdx> queryPagezyjscolList(Page<SysTdx> page, Map<String, Object> map);
    List<SysTdx> queryPagedyjsList(Page<SysTdx> page, Map<String, Object> map);
    List<SysTdx> queryPagecjjsList(Page<SysTdx> page, Map<String, Object> map);

    List<SysTdx> queryPagecjjscolList(Page<SysTdx> page, Map<String, Object> map);

    List<SysTdx> queryPagelhjsList(Page<SysTdx> page, Map<String, Object> map);

    List<SysTdx> querytjpxList(Page<SysTdx> page, Map<String, Object> map);

    int deleteBatch(Object[] id);
}