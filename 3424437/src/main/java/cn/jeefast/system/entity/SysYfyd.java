package cn.jeefast.system.entity;

import java.io.Serializable;
import com.alibaba.fastjson.JSONArray;
import com.baomidou.mybatisplus.annotations.TableField;

import java.util.Date;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.IdType;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;

/**
 * <p>
 * 一分一段管理
 * </p>
 *
 */
@TableName("sys_yfyd")
public class SysYfyd extends Model<SysYfyd> {

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
     * 科类
     */
	private String kl;
    /**
     * 分数
     */
	private Double fs;
    /**
     * 本段人数
     */
	private Integer bdrs;
    /**
     * 累计人数
     */
	private Integer ljrs;
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
	private String bs;

	public String getBs() {
		return bs;
	}

	public void setBs(String bs) {
		this.bs = bs;
	}

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

	public String getKl() {
		return kl;
	}

	public void setKl(String kl) {
		this.kl = kl;
	}

	public Double getFs() {
		return fs;
	}

	public void setFs(Double fs) {
		this.fs = fs;
	}

	public Integer getBdrs() {
		return bdrs;
	}

	public void setBdrs(Integer bdrs) {
		this.bdrs = bdrs;
	}

	public Integer getLjrs() {
		return ljrs;
	}

	public void setLjrs(Integer ljrs) {
		this.ljrs = ljrs;
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
		return "SysYfyd{" +
				"id='" + id + '\'' +
				", xh=" + xh +
				", sf='" + sf + '\'' +
				", nf='" + nf + '\'' +
				", kl='" + kl + '\'' +
				", fs=" + fs +
				", bdrs=" + bdrs +
				", ljrs=" + ljrs +
				", createuser='" + createuser + '\'' +
				", createtime=" + createtime +
				", updateuser='" + updateuser + '\'' +
				", updatetime=" + updatetime +
				", bs='" + bs + '\'' +
				", files=" + files +
				'}';
	}
}
