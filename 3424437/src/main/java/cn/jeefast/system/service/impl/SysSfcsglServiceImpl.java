package cn.jeefast.system.service.impl;
import com.baomidou.mybatisplus.plugins.Page;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import cn.jeefast.system.entity.SysSfcsgl;
import cn.jeefast.system.dao.SysSfcsglDao;
import cn.jeefast.system.service.SysSfcsglService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 省份城市管理 服务实现类
 * </p>
 *
 */
@Service
public class SysSfcsglServiceImpl extends ServiceImpl<SysSfcsglDao, SysSfcsgl> implements SysSfcsglService {
    @Autowired
    private SysSfcsglDao sysSfcsglDao;

    @Override
    public Page<SysSfcsgl> queryPageList(Page<SysSfcsgl> page, Map<String, Object> map) {
        page.setRecords(sysSfcsglDao.queryPageList(page, map));
        return page;
    }

    @Override
    public void deleteBatch(String[] sfcsglIds) {
        sysSfcsglDao.deleteBatch(sfcsglIds);
    }
}
