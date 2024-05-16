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
 * 省控线管理
 * </p>
 *
 */
@TableName("sys_skx")
public class SysSkx extends Model<SysSkx> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
	@TableId(type = IdType.UUID)
	private String id;
    /**
     * 序号
     */
	private Integer xh;
    /**
     * 省份
     */
	private String sf;
    /**
     * 年份
     */
	private String nf;
    /**
     * 类别
     */
	private String lb;
    /**
     * 批次
     */
	private String pc;
    /**
     * 分数线
     */
	private Double fsx;
    /**
     * 专业分
     */
	private Double zyf;
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


	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Integer getXh() {
		return xh;
	}

	public void setXh(Integer xh) {
		this.xh = xh;
	}

	public String getSf() {
		return sf;
	}

	public void setSf(String sf) {
		this.sf = sf;
	}

	public String getNf() {
		return nf;
	}

	public void setNf(String nf) {
		this.nf = nf;
	}

	public String getLb() {
		return lb;
	}

	public void setLb(String lb) {
		this.lb = lb;
	}

	public String getPc() {
		return pc;
	}

	public void setPc(String pc) {
		this.pc = pc;
	}

	public Double getFsx() {
		return fsx;
	}

	public void setFsx(Double fsx) {
		this.fsx = fsx;
	}

	public Double getZyf() {
		return zyf;
	}

	public void setZyf(Double zyf) {
		this.zyf = zyf;
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
		return "SysSkx{" +
			", id=" + id +
			", xh=" + xh +
			", sf=" + sf +
			", nf=" + nf +
			", lb=" + lb +
			", pc=" + pc +
			", fsx=" + fsx +
			", zyf=" + zyf +
			", createuser=" + createuser +
			", createtime=" + createtime +
			", updateuser=" + updateuser +
			", updatetime=" + updatetime +
		", files=" + files  +
			"}";
	}
}
