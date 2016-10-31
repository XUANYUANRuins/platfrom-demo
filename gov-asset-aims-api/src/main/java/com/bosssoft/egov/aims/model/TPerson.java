/**
 * 福建博思软件 1997-2016 版权所有
 * Auto generated by Bosssoft Studio version 1.0 beta
 * Sat Oct 08 14:03:42 CST 2016
 */
package com.bosssoft.egov.aims.model;
import javax.persistence.Column;
import javax.persistence.Table;

/**
 * 对象.
 * 
 * <pre>
 * 修改记录：
 * 修改日期　　　修改人　　　修改原因
 * 2016-10-08   Administrator　　　新建
 * </pre>
 */
 @Table(name = "T_PERSON")
public class TPerson implements java.io.Serializable {

	private static final long serialVersionUID = 161008140424706L;
	
	// Fields
	
	/**
	 * .
	 */
    @Column(name = "ID")
	private String id;
	/**
	 * .
	 */
    @Column(name = "NAME")
	private String name;
	
	// Constructors
 
    /** default constructor */
	public TPerson() {
	}

	/**
	 * .
	 * @return
	 */
	public String getId() {
		return this.id;
	}

	/**
	 * .
	 * @param id
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * .
	 * @return
	 */
	public String getName() {
		return this.name;
	}

	/**
	 * .
	 * @param name
	 */
	public void setName(String name) {
		this.name = name;
	}

}