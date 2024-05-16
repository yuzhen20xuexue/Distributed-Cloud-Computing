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
 * 投档线管理
 * </p>
 *
 */
@TableName("sys_tdx")
public class SysTdx extends Model<SysTdx> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键id
     */
	@TableId(type = IdType.UUID)
	private String id;
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
	private String shengfen;
    /**
     * 城市
     */
	private String chengshi;
    /**
     * 软科排名
     */
	private Integer rkpm;
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
	private String sfsyl;
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
     * 选科要求
     */
	private String xkyq;
    /**
     * 最低分
     */
	private Double zdf;
    /**
     * 最低分排名
     */
	private Integer zdfpm;
    /**
     * 省控线
     */
	private Double skx;
    /**
     * 办学性质
     */
	private String bxxz;
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

	private Integer xh;

	@TableField(exist = false)
	private String yfydfs;

	@TableField(exist = false)
	private String yfydbdrs;

	@TableField(exist = false)
	private String yfydjrs;

	@TableField(exist = false)
	private String address;
	@TableField(exist = false)
	private String xyhxxmc;
	@TableField(exist = false)
	private String srpm;
	@TableField(exist = false)
	private String zsjhzy;
	@TableField(exist = false)
	private String zsjhzydm;

	@TableField(exist = false)
	private String sf;

	@TableField(exist = false)
	private String cs;
	@TableField(exist = false)
	private String issyl;

	@TableField(exist = false)
	private String xuhao;

	@TableField(exist = false)
	private String zy;


	public String getZy() {
		return zy;
	}

	public void setZy(String zy) {
		this.zy = zy;
	}

	public String getXuhao() {
		return xuhao;
	}

	public void setXuhao(String xuhao) {
		this.xuhao = xuhao;
	}

	public String getIssyl() {
		return issyl;
	}

	public void setIssyl(String issyl) {
		this.issyl = issyl;
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

	public String getZsjhzy() {
		return zsjhzy;
	}

	public void setZsjhzy(String zsjhzy) {
		this.zsjhzy = zsjhzy;
	}

	public String getZsjhzydm() {
		return zsjhzydm;
	}

	public void setZsjhzydm(String zsjhzydm) {
		this.zsjhzydm = zsjhzydm;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getXyhxxmc() {
		return xyhxxmc;
	}

	public void setXyhxxmc(String xyhxxmc) {
		this.xyhxxmc = xyhxxmc;
	}

	public String getSrpm() {
		return srpm;
	}

	public void setSrpm(String srpm) {
		this.srpm = srpm;
	}

	public String getYfydfs() {
		return yfydfs;
	}

	public void setYfydfs(String yfydfs) {
		this.yfydfs = yfydfs;
	}

	public String getYfydbdrs() {
		return yfydbdrs;
	}

	public void setYfydbdrs(String yfydbdrs) {
		this.yfydbdrs = yfydbdrs;
	}

	public String getYfydjrs() {
		return yfydjrs;
	}

	public void setYfydjrs(String yfydjrs) {
		this.yfydjrs = yfydjrs;
	}

	public Integer getXh() {
		return xh;
	}

	public void setXh(Integer xh) {
		this.xh = xh;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public String getShengfen() {
		return shengfen;
	}

	public void setShengfen(String shengfen) {
		this.shengfen = shengfen;
	}

	public String getChengshi() {
		return chengshi;
	}

	public void setChengshi(String chengshi) {
		this.chengshi = chengshi;
	}

	public Integer getRkpm() {
		return rkpm;
	}

	public void setRkpm(Integer rkpm) {
		this.rkpm = rkpm;
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

	public String getSfsyl() {
		return sfsyl;
	}

	public void setSfsyl(String sfsyl) {
		this.sfsyl = sfsyl;
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

	public Double getZdf() {
		return zdf;
	}

	public void setZdf(Double zdf) {
		this.zdf = zdf;
	}

	public Integer getZdfpm() {
		return zdfpm;
	}

	public void setZdfpm(Integer zdfpm) {
		this.zdfpm = zdfpm;
	}

	public Double getSkx() {
		return skx;
	}

	public void setSkx(Double skx) {
		this.skx = skx;
	}

	public String getBxxz() {
		return bxxz;
	}

	public void setBxxz(String bxxz) {
		this.bxxz = bxxz;
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
		return "SysTdx{" +
				"id='" + id + '\'' +
				", nf='" + nf + '\'' +
				", xuexiao='" + xuexiao + '\'' +
				", shengfen='" + shengfen + '\'' +
				", chengshi='" + chengshi + '\'' +
				", rkpm=" + rkpm +
				", isjbw='" + isjbw + '\'' +
				", iseyy='" + iseyy + '\'' +
				", sfsyl='" + sfsyl + '\'' +
				", kl='" + kl + '\'' +
				", pc='" + pc + '\'' +
				", zyz='" + zyz + '\'' +
				", xkyq='" + xkyq + '\'' +
				", zdf=" + zdf +
				", zdfpm=" + zdfpm +
				", skx=" + skx +
				", bxxz='" + bxxz + '\'' +
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
				", xh=" + xh +
				", yfydfs='" + yfydfs + '\'' +
				", yfydbdrs='" + yfydbdrs + '\'' +
				", yfydjrs='" + yfydjrs + '\'' +
				", address='" + address + '\'' +
				", xyhxxmc='" + xyhxxmc + '\'' +
				", srpm='" + srpm + '\'' +
				", zsjhzy='" + zsjhzy + '\'' +
				", zsjhzydm='" + zsjhzydm + '\'' +
				", sf='" + sf + '\'' +
				", cs='" + cs + '\'' +
				", issyl='" + issyl + '\'' +
				", xuhao='" + xuhao + '\'' +
				", zy='" + zy + '\'' +
				", files=" + files +
				'}';
	}
}
