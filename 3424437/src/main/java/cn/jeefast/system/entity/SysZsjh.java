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
 * 招生计划管理
 * </p>
 *
 */
@TableName("sys_zsjh")
public class SysZsjh extends Model<SysZsjh> {

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
     * 年份
     */
	private String nf;
    /**
     * 学校
     */
	private String xuexiao;
    /**
     * 省份
     */
	private String sf;
    /**
     * 城市
     */
	private String cs;
    /**
     * 是否985
     */
	private String isjbw;
    /**
     * 是否211
     */
	private String iseyy;
    /**
     * 是否双一流
     */
	private String issyl;
    /**
     * 科类
     */
	private String kl;
    /**
     * 批次
     */
	private String pc;
    /**
     * 专业组
     */
	private String zyz;
    /**
     * 选课要求
     */
	private String xkyq;
    /**
     * 门类
     */
	private String ml;
    /**
     * 一级学科
     */
	private String yjxk;
    /**
     * 专业
     */
	private String zy;
    /**
     * 专业代码
     */
	private String zydm;
    /**
     * 招生人数
     */
	private Integer zsrs;
    /**
     * 学制
     */
	private String xz;
    /**
     * 学费
     */
	private String xf;
    /**
     * 办公性质
     */
	private String bgxz;
    /**
     * 学校归属
     */
	private String xxgs;
    /**
     * 全国统一招生代码
     */
	private String qgtyzsdm;
    /**
     * 招生类型
     */
	private String zslx;
    /**
     * 学校类别
     */
	private String xxlb;
    /**
     * 学历类别
     */
	private String xllb;
    /**
     * 学校曾用名
     */
	private String xxcym;
    /**
     * 生源地
     */
	private String syd;
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
	private String stkl;
	@TableField(exist = false)
	private String stpc;
	@TableField(exist = false)
	private String stzyz;
	@TableField(exist = false)
	private String stxkyq;
	@TableField(exist = false)
	private String stzdf;
	@TableField(exist = false)
	private String stzdfpm;
	@TableField(exist = false)
	private String stskx;

	@TableField(exist = false)
	private String rkpmpm;

	@TableField(exist = false)
	private String xyhdxpmxxmc;
	@TableField(exist = false)
	private String xyhdxpmzf;
	@TableField(exist = false)
	private String xyhdxpmxj;
	@TableField(exist = false)
	private String xyhdxpmbxcc;


	public String getStkl() {
		return stkl;
	}

	public void setStkl(String stkl) {
		this.stkl = stkl;
	}

	public String getStpc() {
		return stpc;
	}

	public void setStpc(String stpc) {
		this.stpc = stpc;
	}

	public String getStzyz() {
		return stzyz;
	}

	public void setStzyz(String stzyz) {
		this.stzyz = stzyz;
	}

	public String getStxkyq() {
		return stxkyq;
	}

	public void setStxkyq(String stxkyq) {
		this.stxkyq = stxkyq;
	}

	public String getStzdf() {
		return stzdf;
	}

	public void setStzdf(String stzdf) {
		this.stzdf = stzdf;
	}

	public String getStzdfpm() {
		return stzdfpm;
	}

	public void setStzdfpm(String stzdfpm) {
		this.stzdfpm = stzdfpm;
	}

	public String getStskx() {
		return stskx;
	}

	public void setStskx(String stskx) {
		this.stskx = stskx;
	}

	public String getRkpmpm() {
		return rkpmpm;
	}

	public void setRkpmpm(String rkpmpm) {
		this.rkpmpm = rkpmpm;
	}

	public String getXyhdxpmxxmc() {
		return xyhdxpmxxmc;
	}

	public void setXyhdxpmxxmc(String xyhdxpmxxmc) {
		this.xyhdxpmxxmc = xyhdxpmxxmc;
	}

	public String getXyhdxpmzf() {
		return xyhdxpmzf;
	}

	public void setXyhdxpmzf(String xyhdxpmzf) {
		this.xyhdxpmzf = xyhdxpmzf;
	}

	public String getXyhdxpmxj() {
		return xyhdxpmxj;
	}

	public void setXyhdxpmxj(String xyhdxpmxj) {
		this.xyhdxpmxj = xyhdxpmxj;
	}

	public String getXyhdxpmbxcc() {
		return xyhdxpmbxcc;
	}

	public void setXyhdxpmbxcc(String xyhdxpmbxcc) {
		this.xyhdxpmbxcc = xyhdxpmbxcc;
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

	public String getNf() {
		return nf;
	}

	public void setNf(String nf) {
		this.nf = nf;
	}

	public String getXuexiao() {
		return xuexiao;
	}

	public void setXuexiao(String xuexiao) {
		this.xuexiao = xuexiao;
	}

	public String getSf() {
		return sf;
	}

	public void setSf(String sf) {
		this.sf = sf;
	}

	public String getCs() {
		return cs;
	}

	public void setCs(String cs) {
		this.cs = cs;
	}

	public String getIsjbw() {
		return isjbw;
	}

	public void setIsjbw(String isjbw) {
		this.isjbw = isjbw;
	}

	public String getIseyy() {
		return iseyy;
	}

	public void setIseyy(String iseyy) {
		this.iseyy = iseyy;
	}

	public String getIssyl() {
		return issyl;
	}

	public void setIssyl(String issyl) {
		this.issyl = issyl;
	}

	public String getKl() {
		return kl;
	}

	public void setKl(String kl) {
		this.kl = kl;
	}

	public String getPc() {
		return pc;
	}

	public void setPc(String pc) {
		this.pc = pc;
	}

	public String getZyz() {
		return zyz;
	}

	public void setZyz(String zyz) {
		this.zyz = zyz;
	}

	public String getXkyq() {
		return xkyq;
	}

	public void setXkyq(String xkyq) {
		this.xkyq = xkyq;
	}

	public String getMl() {
		return ml;
	}

	public void setMl(String ml) {
		this.ml = ml;
	}

	public String getYjxk() {
		return yjxk;
	}

	public void setYjxk(String yjxk) {
		this.yjxk = yjxk;
	}

	public String getZy() {
		return zy;
	}

	public void setZy(String zy) {
		this.zy = zy;
	}

	public String getZydm() {
		return zydm;
	}

	public void setZydm(String zydm) {
		this.zydm = zydm;
	}

	public Integer getZsrs() {
		return zsrs;
	}

	public void setZsrs(Integer zsrs) {
		this.zsrs = zsrs;
	}

	public String getXz() {
		return xz;
	}

	public void setXz(String xz) {
		this.xz = xz;
	}

	public String getXf() {
		return xf;
	}

	public void setXf(String xf) {
		this.xf = xf;
	}

	public String getBgxz() {
		return bgxz;
	}

	public void setBgxz(String bgxz) {
		this.bgxz = bgxz;
	}

	public String getXxgs() {
		return xxgs;
	}

	public void setXxgs(String xxgs) {
		this.xxgs = xxgs;
	}

	public String getQgtyzsdm() {
		return qgtyzsdm;
	}

	public void setQgtyzsdm(String qgtyzsdm) {
		this.qgtyzsdm = qgtyzsdm;
	}

	public String getZslx() {
		return zslx;
	}

	public void setZslx(String zslx) {
		this.zslx = zslx;
	}

	public String getXxlb() {
		return xxlb;
	}

	public void setXxlb(String xxlb) {
		this.xxlb = xxlb;
	}

	public String getXllb() {
		return xllb;
	}

	public void setXllb(String xllb) {
		this.xllb = xllb;
	}

	public String getXxcym() {
		return xxcym;
	}

	public void setXxcym(String xxcym) {
		this.xxcym = xxcym;
	}

	public String getSyd() {
		return syd;
	}

	public void setSyd(String syd) {
		this.syd = syd;
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
		return "SysZsjh{" +
				"id='" + id + '\'' +
				", xh=" + xh +
				", nf='" + nf + '\'' +
				", xuexiao='" + xuexiao + '\'' +
				", sf='" + sf + '\'' +
				", cs='" + cs + '\'' +
				", isjbw='" + isjbw + '\'' +
				", iseyy='" + iseyy + '\'' +
				", issyl='" + issyl + '\'' +
				", kl='" + kl + '\'' +
				", pc='" + pc + '\'' +
				", zyz='" + zyz + '\'' +
				", xkyq='" + xkyq + '\'' +
				", ml='" + ml + '\'' +
				", yjxk='" + yjxk + '\'' +
				", zy='" + zy + '\'' +
				", zydm='" + zydm + '\'' +
				", zsrs=" + zsrs +
				", xz='" + xz + '\'' +
				", xf='" + xf + '\'' +
				", bgxz='" + bgxz + '\'' +
				", xxgs='" + xxgs + '\'' +
				", qgtyzsdm='" + qgtyzsdm + '\'' +
				", zslx='" + zslx + '\'' +
				", xxlb='" + xxlb + '\'' +
				", xllb='" + xllb + '\'' +
				", xxcym='" + xxcym + '\'' +
				", syd='" + syd + '\'' +
				", createuser='" + createuser + '\'' +
				", createtime=" + createtime +
				", updateuser='" + updateuser + '\'' +
				", updatetime=" + updatetime +
				", stkl='" + stkl + '\'' +
				", stpc='" + stpc + '\'' +
				", stzyz='" + stzyz + '\'' +
				", stxkyq='" + stxkyq + '\'' +
				", stzdf='" + stzdf + '\'' +
				", stzdfpm='" + stzdfpm + '\'' +
				", stskx='" + stskx + '\'' +
				", rkpmpm='" + rkpmpm + '\'' +
				", xyhdxpmxxmc='" + xyhdxpmxxmc + '\'' +
				", xyhdxpmzf='" + xyhdxpmzf + '\'' +
				", xyhdxpmxj='" + xyhdxpmxj + '\'' +
				", xyhdxpmbxcc='" + xyhdxpmbxcc + '\'' +
				", files=" + files +
				'}';
	}
}
