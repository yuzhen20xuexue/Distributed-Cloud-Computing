package cn.jeefast.common.aspect;

import org.apache.commons.lang.StringUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import cn.jeefast.common.annotation.DataFilter;
import cn.jeefast.common.exception.RRException;
import cn.jeefast.common.utils.Constant;
import cn.jeefast.common.utils.ShiroUtils;
import cn.jeefast.system.entity.SysUser;
import cn.jeefast.system.service.SysDeptService;

import java.util.Map;

/**
 * 数据过滤，切面处理类
 */
@Aspect
@Component
public class DataFilterAspect {
    @Autowired
    private SysDeptService sysDeptService;

    @Pointcut("@annotation(cn.jeefast.common.annotation.DataFilter)")
    public void dataFilterCut() {

    }

    @Before("dataFilterCut()")
    public void dataFilter(JoinPoint point) throws Throwable {
        Object params = point.getArgs()[0];
        if(params != null && params instanceof Map){
        	SysUser user = ShiroUtils.getUser();

            //如果不是超级管理员，则只能查询本部门及子部门数据
            if(user.getUserId() != Constant.SUPER_ADMIN){
                Map map = (Map)params;
                map.put("filterSql", getFilterSQL(user, point));
            }

            return ;
        }

        throw new RRException("要实现数据权限接口的参数，只能是Map类型，且不能为NULL");
    }

    /**
     * 获取数据过滤的SQL
     */
    private String getFilterSQL(SysUser user, JoinPoint point){
        MethodSignature signature = (MethodSignature) point.getSignature();
        DataFilter dataFilter = signature.getMethod().getAnnotation(DataFilter.class);
        //获取表的别名
        String tableAlias = dataFilter.tableAlias();
        if(StringUtils.isNotBlank(tableAlias)){
            tableAlias +=  ".";
        }

        //获取子部门ID
        String subDeptIds = sysDeptService.getSubDeptIdList(user.getDeptId());

        StringBuilder filterSql = new StringBuilder();
        filterSql.append("and (");
        filterSql.append(tableAlias).append("dept_id in(").append(subDeptIds).append(")");

        //没有本部门数据权限，也能查询本人数据
        if(dataFilter.user()){
            filterSql.append(" or ").append(tableAlias).append("user_id=").append(user.getUserId());
        }
        filterSql.append(")");

        return filterSql.toString();
    }
}
