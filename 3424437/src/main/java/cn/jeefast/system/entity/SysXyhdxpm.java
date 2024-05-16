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
 * 校友会大学排名管理
 * </p>
 *
 */
@TableName("sys_xyhdxpm")
public class SysXyhdxpm extends Model<SysXyhdxpm> {

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
     * 学校名次
     */
	private Integer xxmc;
    /**
     * 学校名称
     */
	private String xuexiao;
    /**
     * 总分
     */
	private Double zf;
    /**
     * 星级
     */
	private String xj;
    /**
     * 办学层次
     */
	private String bxcc;
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

	public Integer getXxmc() {
		return xxmc;
	}

	public void setXxmc(Integer xxmc) {
		this.xxmc = xxmc;
	}

	public String getXuexiao() {
		return xuexiao;
	}

	public void setXuexiao(String xuexiao) {
		this.xuexiao = xuexiao;
	}

	public Double getZf() {
		return zf;
	}

	public void setZf(Double zf) {
		this.zf = zf;
	}

	public String getXj() {
		return xj;
	}

	public void setXj(String xj) {
		this.xj = xj;
	}

	public String getBxcc() {
		return bxcc;
	}

	public void setBxcc(String bxcc) {
		this.bxcc = bxcc;
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
		return "SysXyhdxpm{" +
			", id=" + id +
			", xh=" + xh +
			", xxmc=" + xxmc +
			", xuexiao=" + xuexiao +
			", zf=" + zf +
			", xj=" + xj +
			", bxcc=" + bxcc +
			", createuser=" + createuser +
			", createtime=" + createtime +
			", updateuser=" + updateuser +
			", updatetime=" + updatetime +
		", files=" + files  +
			"}";
	}
}
