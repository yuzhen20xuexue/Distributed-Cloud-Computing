package cn.jeefast.system.service;

import cn.jeefast.system.entity.SysSfcsgl;
import com.baomidou.mybatisplus.plugins.Page;
import java.util.Map;
import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 * 省份城市管理 服务类
 * </p>
 *
 */
public interface SysSfcsglService extends IService<SysSfcsgl> {
    Page<SysSfcsgl> queryPageList(Page<SysSfcsgl> page, Map<String, Object> map);
    void deleteBatch(String[] sfcsglIds);
}
