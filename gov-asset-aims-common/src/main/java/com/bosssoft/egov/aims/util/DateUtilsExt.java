package com.bosssoft.egov.aims.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import com.bosssoft.platform.common.utils.DateUtils;

/** 
*
* @ClassName   类名：DateUtilsExt 
* @Description 功能说明：扩展com.bosssoft.platform.common.utils.DateUtils工具类
* <p>
* TODO
*</p>
************************************************************************
* @date        创建日期：2016年10月24日
* @author      创建人：xds
* @version     版本号：V1.0
*<p>
***************************修订记录*************************************
* 
*   2016年10月24日   xds   创建该类功能。
*
***********************************************************************
*</p>
*/
public class DateUtilsExt extends DateUtils{
   
	/**
	 * 
	 * <p>函数名称：  getNowDate      </p>
	 * <p>功能说明： 获取当前日期（yyyyMMdd）格式
	 *
	 * </p>
	 *<p>参数说明：</p>
	 * @return
	 *
	 * @date   创建时间：2016年10月24日
	 * @author 作者：xds (mailto:xiedeshou@bosssoft.com.cn)
	 */
	public static String getNowDate(){
		Calendar c = Calendar.getInstance();
		Date date = c.getTime();
		SimpleDateFormat simple = new SimpleDateFormat("yyyyMMdd");
		return simple.format(date);
	}
	
	/**
	 * 
	 * <p>函数名称：  getNowDateTime      </p>
	 * <p>功能说明： 获取统一格式化后的当前系统时间（yyyyMMddHHmmssSSS）
	 *
	 * </p>
	 *<p>参数说明：</p>
	 * @return
	 *
	 * @date   创建时间：2016年10月24日
	 * @author 作者：xds (mailto:xiedeshou@bosssoft.com.cn)
	 */
    public static String getNowDateTime() {
    	SimpleDateFormat formatter=new SimpleDateFormat("yyyyMMddHHmmssSSS");
    	Date date=new Date();
    	return formatter.format(date);
    }
    
    /**
     * 
     * <p>函数名称：getNowYear        </p>
     * <p>功能说明：获取当前年份
     *
     * </p>
     *<p>参数说明：</p>
     * @return
     *
     * @date   创建时间：2016年10月24日
     * @author 作者：xds (mailto:xiedeshou@bosssoft.com.cn)
     */
    public static String getNowYear(){
    	return formatDate(new Date(), "yyyy");
    }
    
    /**
     * 
     * <p>函数名称：   getNowMonth     </p>
     * <p>功能说明：  获取当前月份
     *
     * </p>
     *<p>参数说明：</p>
     * @return
     *
     * @date   创建时间：2016年10月24日
     * @author 作者：xds (mailto:xiedeshou@bosssoft.com.cn)
     */
    public static String getNowMonth(){
    	return formatDate(new Date(), "MM");
    }
    
    /**
     * 
     * <p>函数名称：  getNowDay      </p>
     * <p>功能说明： 获取当前日期（日）
     *
     * </p>
     *<p>参数说明：</p>
     * @return
     *
     * @date   创建时间：2016年10月24日
     * @author 作者：xds (mailto:xiedeshou@bosssoft.com.cn)
     */
    public static String getNowDay(){
    	return formatDate(new Date(), "dd");
    }
    
    /**
     * 
     * <p>函数名称：getNowDateTime2        </p>
     * <p>功能说明：获取当前时间（HHmmss）
     *
     * </p>
     *<p>参数说明：</p>
     * @return
     *
     * @date   创建时间：2016年10月24日
     * @author 作者：xds (mailto:xiedeshou@bosssoft.com.cn)
     */
    public static String getNowDateTime2(){
		SimpleDateFormat formatter = new SimpleDateFormat("HHmmss");
		Date date = new Date();
		return formatter.format(date);
    }
    
    /**
     * 
     * <p>函数名称： getNowDateTime3       </p>
     * <p>功能说明： 获取当前时间（HH:mm:ss）
     *
     * </p>
     *<p>参数说明：</p>
     * @return
     *
     * @date   创建时间：2016年10月24日
     * @author 作者：xds (mailto:xiedeshou@bosssoft.com.cn)
     */
    public static String getNowDateTime3(){
		SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss");
		Date date = new Date();
		return formatter.format(date);
    }
    
    public static void main(String[] args) {
    	System.out.println(getNowDate());
    	System.out.println(getNowDateTime());
    	System.out.println(getNowDateTime2());
    	System.out.println(getNowDateTime3());
		System.out.println(getNowYear());
		System.out.println(getNowMonth());
		System.out.println(getNowDay());
		System.out.println(getCurrentDate());
		System.out.println(getCurrentTime());
	}
}
