define(["app/core/app-jquery","app/core/app-core","app/data/app-ajax","app/widgets/menu/app-contextmenu","app/widgets/app-widget","app/widgets/window/app-messager","app/widgets/window/app-dialog","jquery/hoverIntent","jquery/superfish"],
		function ($,$A,$ajax,contextmenu,Widget,Messager){
	
	/** 主菜单
	============================================================ **/
	var NavMenu = function(element,data){
		this.$element = $(element);
		
		this.$nav=this.$element.find(">div");
		this.$scrollbottom=this.$nav.find(">div.scroll-bottom");
		this.$scrolltop=this.$nav.find(">div.scroll-top");
		this.$ul = this.$nav.find(">ul");
	
		this.data = data;
		this.menuMap = {};
		this.childrenMap = {};
		this.buildMenus(data);
		var _self=this;
		this.$scrollbottom.on("click",function(){
			var height=_self.$ul.find(":first").height();
			
			_self.$ul.scrollTop(_self.$ul.scrollTop()+height+1);
		});
		this.$scrolltop.on("click",function(){
			var height=_self.$ul.find(":first").height();
			
			_self.$ul.scrollTop(_self.$ul.scrollTop()-height-1);
		})
		this.$element.on("click",{"navMenu":this},function(e){
			
			//e.data["navMenu"].show();
		
			if (e.data["navMenu"].$ul[0].offsetHeight<e.data["navMenu"].$ul[0].scrollHeight){
				e.data["navMenu"].$scrollbottom.show();
				e.data["navMenu"].$scrolltop.show();
				e.data["navMenu"].$ul.find(":first").find(">div").addClass("scrollfirst");
			}
				
								
			
		});
	};
	
	NavMenu.prototype.buildMenus = function(data){
		var menu = null,i=0,rootMenus = [];
		for(i=0;i<data.length;i++){
			menu = data[i];
			this.menuMap[menu.id] = menu;
			if(menu.fparentId=="" || menu.fparentId=="0"){
				rootMenus.push(menu);
			}
		}
		for(i=0;i<data.length;i++){
			menu = data[i];
			if(this.childrenMap[menu.fparentId]==undefined){
				this.childrenMap[menu.fparentId] = [];
			}
			this.childrenMap[menu.fparentId].push(menu);
		}
		for(i=0;i<rootMenus.length;i++){
			this.$ul.append(this._createLi(rootMenus[i],0));
		}
		this.$ul.addClass("sf-menu")
		 this.$ul.superfish({
			 animation: {height:'show'},	// slide-down effect without fade-in
			 delay:		 10			// 1.2 second delay on mouseout
			//add options here if required
		});
	};
	
	NavMenu.prototype._createLi = function(menu,deep){
		var $li = $("<li><a class=\"link\" href=\"javascript:void(0)\"></a></li>");
		if(deep==0){
			$li.addClass("menuAli");
			var icon = menu.fimage;
			if(!icon){
				icon = "navDefaultIcon";
			}
			$li.find(">i").addClass(icon);
		}else {
			//$li.addClass("navmenu_subli");
		}
	$li.hover(function(){
			//$(this).find(">ul").show();
			$(this).addClass("hover");
			/*if($(this).index()==0){
				$(this).find(">div").addClass("first");
			}*/
		},function(){
			
			$(this).removeClass("hover");
		});
		
		var $link = $li.find(">a.link");
		
		$link.text(menu.fname);
		if(this.childrenMap[menu.id]!=undefined){
			var $ul = $("<ul class=\"sub_nav\"></ul>").appendTo($li);
			/*if(deep==0){
				$ul.addClass("navmenu_ul");
			}else{
				$ul.addClass("navmenu_subul");
			}*/
			var children = this.childrenMap[menu.id];
			for(var i=0;i<children.length;i++){
				$ul.append(this._createLi(children[i],deep+1));
			}
			//$("<a class=\"arrow\" href=\"javascript:void(0)\"></a>").appendTo($li.find(">div"));
		}else{
			if(deep==0){
				$li.addClass("navlink");
			}
			$link.attr("href",menu.url)
				.attr("rel",menu.id)
				.attr("menuId",menu.id)
				.attr("funcid",menu.functionId)
				.attr("subsysid",menu.fsubSystemId);
			if(menu.fopenType=="1"){
				$link.attr("target","navTab");
			}else if(menu.fopenType=="2"){
				$link.attr("target","_blank");
			}
				
			$li.find(">i").addClass(menu.fimage);
			$("<i class=\"add_favorite\" href=\"javascript:void(0)\"></i>").bind("click",{"menu":menu},function(e){
				var menuId = e.data["menu"].id;
				//添加到常用菜单
				$ajax.ajaxCall({
					"data":{"menuId":menuId},
					"url":"platform/portal/commonlyusedmenu/addUsedMenu.do",
					"success":function(data){
						//var $dlg = $A.dialog.getCurrent();
						$A.favoriteMenu.buildMenus(data.params["usedMenuList"]);
						var $portlet = $A("#favorite_portlet",$A.getCurrentNavTab());
						if($portlet.length>0){
							$portlet.portlet("load");
						}
						Messager.correct("保存成功！");
					}
				});
			}).appendTo($li);
		}
		return $li;
	};
	
	NavMenu.prototype.hide = function(){
		this.$nav.hide();
		this.$element.addClass("");
		$(document).off("mousedown.hidenavmenu");
	};
	
	NavMenu.prototype.show = function(){
		this.$element.addClass("hover");
		this.$nav.show();
		$(document).on("mousedown.hidenavmenu",{"navMenu":this},function(e){
			var $el = $(e.target);
			
			//if($el.is("a[target=navTab]") || $el.closest("ul.navmenu").length==0){
			if($el.parents("div.nav").length==0){
				//e.data["navMenu"].hide();
				$(document).off("mousedown.hidenavmenu");
			}
		});
	};
	
	NavMenu.prototype.hide = function(){
		this.$element.removeClass("hover");
		this.$nav.hide();
	};
	$A.navMenu = new NavMenu($("#btn_shownavmenu"),navmenus);
	
	/** 常用菜单
	============================================================ **/
	var FavoriteMenu = function(element,menus){
		this.$element = $(element);
		this.$ul = this.$element.find(">ul");
		this.buildMenus(menus);
		this.$element.on("click",{"favoriteMenu":this},function(e){
			e.data["favoriteMenu"].show();
		});
		this.$ul.find("li.setting a").on("click",function(){
			$.openModalDialog({
				"url":"platform/portal/commonlyusedmenu/showSetting.do",
				"dlgid":"portlet_commonlyusedmenu_setting",
				"title":"设置常用菜单",
				"dragTarget":"#dragTarget",
				"params":{},
				"hasheader" : false,
				"width":800,
				"height":600
			});
		});
	};
	
	FavoriteMenu.prototype.buildMenus = function(menus){
		this.$ul.find("li:not(.setting)").remove();
		var n = menus.length>15?15:menus.length;
		for(var i=0;i<n;i++){
			this.$ul.append(this._createLi(menus[i],0));
		}
		this.$ul.find("li.setting").appendTo(this.$ul);
	};
	
	FavoriteMenu.prototype._createLi = function(menu,deep){
		var $li = $("<li><div><i></i><a class=\"link\" href=\"javascript:void(0)\" target=\"navTab\"></a></div></li>");
		$li.find(">div>a.link")
			.text(menu.fname)
			.attr("href",menu.url)
			.attr("rel",menu.fmenuId)
			.attr("menuId",menu.fmenuId)
			.attr("funcid",menu.funcId);
		return $li;
	};
	
	FavoriteMenu.prototype.show = function(){
		this.$element.addClass("hover");
		this.$ul.show();
		$(document).on("mousedown.hidefavoritemenu",{"$ul":this.$ul},function(e){
			var $el = $(e.target);
			//if($el.is("a[target=navTab]") || $el.closest("ul.navmenu").length==0){
			if($el.closest("ul.favoritemenu").length==0){
				e.data["$ul"].hide();
				$(document).off("mousedown.hidefavoritemenu");
			}
		});
	};
	
	FavoriteMenu.prototype.hide = function(){
		this.$element.removeClass("hover");
		this.$ul.hide();
	};
	
	$A.favoriteMenu = new FavoriteMenu($("#btn_showfavoritemenu"),usedmenus);
	
	/** 用户信息
	============================================================ **/
	var UserInfoBtn = function(element){
		this.$element = $(element);
		this.$element.click(function(){
			$(this).find(".userID").show();
			$(".userID").show();
			$(".myInfo").addClass("myInfoTop");
		}).mouseleave(function(){
			$(".userID").hide();
			$(".myInfo").removeClass("myInfoTop");
		});
		
		this.$element.find("#modifyA").click(function(){
			$.openModalDialog({
				"url":"userProfile.do",
				"dlgid":"portlet_commonlyusedmenu_setting",
				"title":"个人设置",
				"params":{},
				"dragTarget":"#dragTarget",
				"hasheader" : false,
				"width":500,
				"height":500
			});
		});
	};
	new UserInfoBtn($("#btn_shownavuser"));
	
	/** 子应用切换
	============================================================ **/
	var NavSubSystemMenu = function(element,subSysList){
		this.$element = $(element);
		this.$ul = this.$element.find(">ul");
		if(subSysList){
			this.buildSubSysMenu(subSysList);
		}
		this.$element.on("click",{"navSubSystemMenu":this},function(e){
			e.data["navSubSystemMenu"].show();
		});
	};
	
	NavSubSystemMenu.prototype.buildSubSysMenu = function(subSysList){
		for(var i=0;i<subSysList.length;i++){
			this.$ul.append(this._createLi(subSysList[i]));
		}
	};
	
	NavSubSystemMenu.prototype._createLi = function(subSystem){
		var $li = $("<li><div><i></i><a class=\"link\" href=\"main.do\" target=\"_blank\"></a></div></li>");
		$li.find(">div>a.link")
			.text(subSystem.fname)
			.attr("href","main.do?subSysId="+subSystem.id);
		return $li;
	};
	
	NavSubSystemMenu.prototype.show = function(){
		this.$ul.show();
		$(document).on("mousedown.hidenavsubsystem",{"$ul":this.$ul},function(e){
			var $el = $(e.target);
			if($el.closest("ul.subsystems").length==0){
				e.data["$ul"].hide();
				$(document).off("mousedown.hidenavsubsystem");
			}
		});
	};
	
	NavSubSystemMenu.prototype.hide = function(){
		this.$ul.hide();
	};
	
	$A.navSubSystemMenu = new NavSubSystemMenu($("#btn_shownavsubsys"),subSystems);
	
	
	
});