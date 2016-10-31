/**
 * 
 */
define(["app/widgets/portlet/app-portal", "app/app-pagebase"],function(Portal){
	
	var PortalPage = PageBase.extend({
		// 类初始化
		initialize : function() {
			PortalPage.superclass.initialize.call(this);
		},initPage : function() {

			console.log(Portal)
			
			var DATA = {
				'appL' : {
					'avatar':'头像信息',
					'comment':'留言簿',
					'doing':'最新动态',
				},
				'appM' :{
					'blog':'blog',
					'profile':'个人资料',
					'spaceinfo':'空间介绍',
					'friends':'我的好友'
				},
				'appR' : {
					'gallery':'我的相册',
					'visitors':'最近访客',
					'thread':'我的话题'
				}
			}	
			Portal.fn.init(DATA);
			Portal.Portlet.init(DATA);
			
		}
	
	})
	return new PortalPage();
		
		
})