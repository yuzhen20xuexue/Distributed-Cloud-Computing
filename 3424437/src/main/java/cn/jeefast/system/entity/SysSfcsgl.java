package cn.jeefast.system.entity;

import java.io.Serializable;
import com.alibaba.fastjson.JSONArray;
import com.baomidou.mybatisplus.annotations.TableField;

import java.util.Date;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;

import java.io.Serializable;

/**
 * <p>
 * 省份城市管理
 * </p>
 *
 */
@TableName("sys_sfcsgl")
public class SysSfcsgl extends Model<SysSfcsgl> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
	@TableId(type = IdType.UUID)
	private String id;
    /**
     * 名称
     */
	private String name;
    /**
     * 类型,1:省份,2:城市
     */
	private String type;
    /**
     * 父单位0：省份最高级
     */
	private String parintid;
    /**
     * 所属用户
     */
	private String createuser;
    /**
     * 创建时间
     */
	private Date createtime;
    /**
     * 更新用户
     */
	private String updateuser;
    /**
     * 更新时间
     */
	private Date updatetime;

	private String parintname;

	public String getParintname() {
		return parintname;
	}

	public void setParintname(String parintname) {
		this.parintname = parintname;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getParintid() {
		return parintid;
	}

	public void setParintid(String parintid) {
		this.parintid = parintid;
	}

	public String getCreateuser() {
		return createuser;
	}

	public void setCreateuser(String createuser) {
		this.createuser = createuser;
	}

	public Date getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}

	public String getUpdateuser() {
		return updateuser;
	}

	public void setUpdateuser(String updateuser) {
		this.updateuser = updateuser;
	}

	public Date getUpdatetime() {
		return updatetime;
	}

	public void setUpdatetime(Date updatetime) {
		this.updatetime = updatetime;
	}

	/**
	* 附件信息
	*/
	@TableField(exist = false)
	private JSONArray files;

	public JSONArray getFiles() {
		return files;
	}

	public void setFiles(JSONArray files) {
		this.files = files;
	}



	@Override
	protected Serializable pkVal() {
		return this.id;
	}

	@Override
	public String toString() {
		return "SysSfcsgl{" +
				"id='" + id + '\'' +
				", name='" + name + '\'' +
				", type='" + type + '\'' +
				", parintid='" + parintid + '\'' +
				", createuser='" + createuser + '\'' +
				", createtime=" + createtime +
				", updateuser='" + updateuser + '\'' +
				", updatetime=" + updatetime +
				", parintname='" + parintname + '\'' +
				", files=" + files +
				'}';
	}
}
