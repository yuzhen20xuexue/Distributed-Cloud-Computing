package cn.jeefast.system.controller;

import java.util.*;

import cn.jeefast.common.annotation.Log;
import cn.jeefast.common.utils.Query;
import cn.jeefast.common.utils.R;
import cn.jeefast.common.validator.ValidatorUtils;
import cn.jeefast.system.entity.SysSfcsgl;
import cn.jeefast.system.entity.TMaterialFile;
import cn.jeefast.system.service.TMaterialFileService;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.baomidou.mybatisplus.plugins.Page;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;


import cn.jeefast.system.service.SysSfcsglService;
import org.springframework.web.bind.annotation.RestController;
import cn.jeefast.common.base.BaseController;

/**
 * <p>
 * 省份城市管理 前端控制器
 * </p>
 */
@RestController
@RequestMapping("/sysSfcsgl")
public class SysSfcsglController extends BaseController {
    @Autowired
    private SysSfcsglService sysSfcsglService;

    @Autowired
    private TMaterialFileService tMaterialFileService;


    /**
     * 省份城市管理列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sfcsgl:list")
    public R list(@RequestParam Map<String, Object> params) {
        //查询列表数据
        Query query = new Query(params);
        Page<SysSfcsgl> pageUtil = new Page<SysSfcsgl>(query.getPage(), query.getLimit());
        Page<SysSfcsgl> page = sysSfcsglService.queryPageList(pageUtil, query);
        return R.ok().put("page", page);
    }


    @RequestMapping("/getSfs")
    public R getSfs(@RequestBody JSONObject param) {
        List<SysSfcsgl> sfs = sysSfcsglService.selectList(new EntityWrapper<SysSfcsgl>().eq("type","1").orderBy(true,"updatetime"));
        return R.ok().put("sfs",sfs);
    }

    @RequestMapping("/getSfAllName")
    public R getSfAllName(@RequestBody JSONObject param) {
        List<SysSfcsgl> sfs = sysSfcsglService.selectList(new EntityWrapper<SysSfcsgl>().eq("type","1").orderBy(true,"updatetime"));
        return R.ok().put("sfs",sfs);
    }

    @RequestMapping("/getSfCs")
    public R getSfCs(@RequestBody JSONObject param) {
        String shengfen = param.getString("shengfen");
        List<SysSfcsgl> chengshis = sysSfcsglService.selectList(new EntityWrapper<SysSfcsgl>().eq("type","2").eq("parintname",shengfen).orderBy(true,"updatetime"));
        return R.ok().put("chengshis",chengshis);
    }


    /**
     * 省份城市管理
     */
    @RequestMapping("/info/{sfcsglId}")
    @RequiresPermissions("sys:sfcsgl:info")
    public R info(@PathVariable("sfcsglId") String sfcsglId) {
        SysSfcsgl sfcsgl = sysSfcsglService.selectById(sfcsglId);
        //获取附件列表
        List<TMaterialFile> tMaterialFiles = tMaterialFileService.selectList(new EntityWrapper<TMaterialFile>().eq("parentid", sfcsgl.getId()));
        List<Map<String, Object>> mapList = new ArrayList<>();
        if (!tMaterialFiles.isEmpty()) {
            for (TMaterialFile tMaterialFile : tMaterialFiles) {
                Map<String, Object> map = new HashMap<>();
                map.put("id", tMaterialFile.getId());
                map.put("filePath", tMaterialFile.getSfilename());
                map.put("fileName", tMaterialFile.getSaccessoryname());
                mapList.add(map);
            }

        }
        JSONArray json = (JSONArray) JSONArray.toJSON(mapList);

        sfcsgl.setFiles(json);
        return R.ok().put("sfcsgl", sfcsgl);
    }

    /**
     * 获取所有省份城市管理
     */
    @RequestMapping("/getSfcsgls")
    public R getSfcsglList() {
        List<SysSfcsgl> sfcsgls = sysSfcsglService.selectList(new EntityWrapper<SysSfcsgl>().orderBy(true, "updatetime", false));
        return R.ok().put("sfcsgls", sfcsgls);
    }

    /**
     * 保存省份城市管理
     */
    @Log("保存省份城市管理")
    @RequestMapping("/save")
    @RequiresPermissions("sys:sfcsgl:save")
    public R save(@RequestBody SysSfcsgl sfcsgl) {
        ValidatorUtils.validateEntity(sfcsgl);
        sfcsgl.setCreatetime(new Date());
        sfcsgl.setCreateuser(getUser().getUsername());
        sfcsgl.setUpdatetime(new Date());
        sfcsgl.setUpdateuser(getUser().getUsername());
        sysSfcsglService.insert(sfcsgl);

        if (sfcsgl.getFiles() != null) {
            tMaterialFileService.setTMaterialFilePrintId(sfcsgl.getFiles(), sfcsgl.getId());
        }
        return R.ok();
    }

    /**
     * 修改省份城市管理
     */
    @Log("修改省份城市管理")
    @RequestMapping("/update")
    @RequiresPermissions("sys:sfcsgl:update")
    public R update(@RequestBody SysSfcsgl sfcsgl) {
        ValidatorUtils.validateEntity(sfcsgl);
        sfcsgl.setUpdatetime(new Date());
        sfcsgl.setUpdateuser(getUser().getUsername());
        sysSfcsglService.updateById(sfcsgl);
        if (sfcsgl.getFiles() != null) {
            tMaterialFileService.setTMaterialFilePrintId(sfcsgl.getFiles(), sfcsgl.getId());
        }
        return R.ok();
    }

    /**
     * 删除省份城市管理
     */
    @Log("删除省份城市管理")
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sfcsgl:delete")
    public R delete(@RequestBody String[] sfcsglIds) {
        sysSfcsglService.deleteBatch(sfcsglIds);
        return R.ok();
    }

    @RequestMapping("/setData")
    public R setData(@RequestBody JSONObject param){
        JSONArray json = param.getJSONArray("json");
        if(json.size()>0){
            for (int i = 0; i < json.size(); i++) {
                JSONObject jsonObjectsf = json.getJSONObject(i);
                String sf = jsonObjectsf.getString("province");
                JSONArray jsonObjectcss = json.getJSONObject(i).getJSONArray("citys");
                SysSfcsgl sfinsert = new SysSfcsgl();
                sfinsert.setName(sf);
                sfinsert.setType("1");
                sfinsert.setParintid("0");
                sfinsert.setCreateuser(getUser().getUsername());
                sfinsert.setCreatetime(new Date());
                sfinsert.setUpdateuser(getUser().getUsername());
                sfinsert.setParintname(null);
                sfinsert.setUpdatetime(new Date());
                sysSfcsglService.insert(sfinsert);
                if(jsonObjectcss.size()>0){
                    for (int j = 0; j < jsonObjectcss.size(); j++) {
                        JSONObject jsonObjectcs = jsonObjectcss.getJSONObject(j);
                        String cs = jsonObjectcs.getString("city");
                        SysSfcsgl csinsert = new SysSfcsgl();
                        csinsert.setName(cs);
                        csinsert.setType("2");
                        csinsert.setParintid(sfinsert.getId());
                        csinsert.setParintname(sfinsert.getName());
                        csinsert.setCreateuser(getUser().getUsername());
                        csinsert.setCreatetime(new Date());
                        csinsert.setUpdateuser(getUser().getUsername());
                        csinsert.setUpdatetime(new Date());
                        sysSfcsglService.insert(csinsert);

                    }
                }
            }
        }
        return R.ok();
    }


}
