package cn.jeefast.system.dao;

import java.util.List;
import java.util.Map;

import com.baomidou.mybatisplus.mapper.BaseMapper;

import cn.jeefast.system.entity.SysMenu;

/**
 * <p>
  * 菜单管理 Mapper 接口
 * </p>
 *
 */
public interface SysMenuDao extends BaseMapper<SysMenu> {
	
	List<SysMenu> queryList(Map<String, Object> map);

	/**
	 * 根据父菜单，查询子菜单
	 * @param parentId 父菜单ID
	 */
	List<SysMenu> queryListParentId(Long parentId);
	
	/**
	 * 获取不包含按钮的菜单列表
	 */
	List<SysMenu> queryNotButtonList();
	
	/**
	 * 查询用户的权限列表
	 */
	List<SysMenu> queryUserList(Long userId);
	
	int deleteBatch(Object[] id);
	
}