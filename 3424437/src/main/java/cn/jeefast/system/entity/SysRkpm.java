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
 * 软科排名
 * </p>
 *
 */
@TableName("sys_rkpm")
public class SysRkpm extends Model<SysRkpm> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
	@TableId(type = IdType.UUID)
	private String id;
    /**
     * 学校
     */
	private String xuexiao;
    /**
     * 排名
     */
	private Integer pm;
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

	@TableField(exist = false)
	private String sxxxmc;
	@TableField(exist = false)
	private String  sxzf;
	@TableField(exist = false)
	private String  sxxj;
	@TableField(exist = false)
	private String  sxbxcc;
	@TableField(exist = false)
	private String  stisjbw;
	@TableField(exist = false)
	private String  stiseyy;
	@TableField(exist = false)
	private String  stsfsyl;

	public String getSxxxmc() {
		return sxxxmc;
	}

	public void setSxxxmc(String sxxxmc) {
		this.sxxxmc = sxxxmc;
	}

	public String getSxzf() {
		return sxzf;
	}

	public void setSxzf(String sxzf) {
		this.sxzf = sxzf;
	}

	public String getSxxj() {
		return sxxj;
	}

	public void setSxxj(String sxxj) {
		this.sxxj = sxxj;
	}

	public String getSxbxcc() {
		return sxbxcc;
	}

	public void setSxbxcc(String sxbxcc) {
		this.sxbxcc = sxbxcc;
	}

	public String getStisjbw() {
		return stisjbw;
	}

	public void setStisjbw(String stisjbw) {
		this.stisjbw = stisjbw;
	}

	public String getStiseyy() {
		return stiseyy;
	}

	public void setStiseyy(String stiseyy) {
		this.stiseyy = stiseyy;
	}

	public String getStsfsyl() {
		return stsfsyl;
	}

	public void setStsfsyl(String stsfsyl) {
		this.stsfsyl = stsfsyl;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getXuexiao() {
		return xuexiao;
	}

	public void setXuexiao(String xuexiao) {
		this.xuexiao = xuexiao;
	}

	public Integer getPm() {
		return pm;
	}

	public void setPm(Integer pm) {
		this.pm = pm;
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
		return "SysRkpm{" +
				"id='" + id + '\'' +
				", xuexiao='" + xuexiao + '\'' +
				", pm=" + pm +
				", createuser='" + createuser + '\'' +
				", createtime=" + createtime +
				", updateuser='" + updateuser + '\'' +
				", updatetime=" + updatetime +
				", sxxxmc='" + sxxxmc + '\'' +
				", sxzf='" + sxzf + '\'' +
				", sxxj='" + sxxj + '\'' +
				", sxbxcc='" + sxbxcc + '\'' +
				", stisjbw='" + stisjbw + '\'' +
				", stiseyy='" + stiseyy + '\'' +
				", stsfsyl='" + stsfsyl + '\'' +
				", files=" + files +
				'}';
	}
}
