define(["app/core/app-jquery","app/core/app-core","app/data/app-ajax","app/widgets/menu/app-contextmenu","app/widgets/app-widget","app/widgets/menu/app-menu"],function ($,$A,$ajax,contextmenu,Widget){

	var navTab = Widget.extend({
		componentBox: null, // tab component. contain tabBox, prevBut, nextBut, panelBox
		_tabBox: null,
		_prevBut: null,
		_nextBut: null,
		_panelBox: null,
		_moreBut:null,
		_moreBox:null,
		_currentIndex: 0,
		_spliter:{first:"split-first",center:"split-center",last:"split-last",leftSelect:"lselect",rightSelect:"rselect"},
		
		_op: {id:"navTab", findTabBox:".navtabs-tabs", findPanelBox:".navtabs-content", mainTabId:"main", close$:"a.close", prevClass:"tabsleft", nextClass:"tabsright", stMore:".tabsmore", stMoreLi:"ul.navtabs-morelist"},
		
		init: function(options){
			if ($.History) $.History.init("#mainbody");
			var $this = this;
			$.extend(this._op, options);
	
			this.componentBox = $("#"+this._op.id);
			if(this.componentBox.length == 0){
				$A.navTab = null;
				return;
			}
			this._tabBox = this.componentBox.find(this._op.findTabBox);
			this._panelBox = this.componentBox.find(this._op.findPanelBox);
			this._prevBut = this.componentBox.find("."+this._op.prevClass);
			this._nextBut = this.componentBox.find("."+this._op.nextClass);
			this._moreBut = this.componentBox.find(this._op.stMore);
			this._moreBox = this.componentBox.find(this._op.stMoreLi);
			this._menu= $(".tab-menu");
			
			var _self=this;
			var menuEvent={
					closeCurrent:function(t,m){
						var tabId = _self.indexMenuTab.attr("tabid");
						if (tabId) _self.closeTab(tabId);
						else _self.closeCurrentTab();
						
					},
					closeOther:function(t,m){
						var tabId = _self.indexMenuTab.attr("tabid");
						var index = _self._indexTabId(tabId);
						$this._closeOtherTab(index > 0 ? index : _self._currentIndex);
					},
					closeAll:function(t,m){
						_self.closeAllTab();
					}	
					
			}
			this._menu.menu({onClick:function(e){
					if (e.id&&menuEvent[e.id]){
						menuEvent[e.id]();
					}
			}});
			
			
			this.onAfterSwitch = function($tab,$pane){
					var onSwitch = $tab.data("onSwitch") || $pane.data("onSwitch");
					if(onSwitch){
						onSwitch($tab,$pane);
					}
			};
			
			this.onClose = function($tab,$pane){
				var onClose = $tab.data("onClose") || $pane.data("onClose");
				if(onClose){
					onClose($tab,$pane);
				}
			};
			
			this.onRefresh = function($tab,$panel){
				var onRefresh = $tab.data("onRefresh") || $panel.data("onRefresh");
				if(onRefresh){
					onRefresh($tab,$pane);
				}
			};
	
			this._prevBut.click(function(event) {$this._scrollPrev();});
			this._nextBut.click(function(event) {$this._scrollNext();});
			this._moreBut.click(function(){
				$this._moreBox.show();
				return false;
			});
			this._moreBut.hover(
					  function () {
						    $(this).addClass("hover");
						  },
						  function () {
						    $(this).removeClass("hover");
						  }
						);
			$(document).click(function(){$this._moreBox.hide();});
			
			this._contextmenu(this._tabBox);
			this._contextmenu(this._getTabs());
			this._initRender();
			this._init();
			this._ctrlScrollBut();
			//add by tw 初始化的时候加载首页
			this.loadMainTab();
			
			return this.componentBox;
		},
		
		_initRender:function(){
			if(!this._spliter)
				return;
			var spliter = this._spliter
			,tabs = this._getTabs()
			,len=tabs.length;
			tabs.each(function(tabIndex){
				var $o =$(this);
				if(spliter){
					if(tabIndex == 0 && $o.prev().length == 0){
						$o.before("<li class='"+spliter.first+"'></li>");
					}else if($o.prev("li."+spliter.center).length == 0){
						$o.before("<li class='"+spliter.center+"'></li>");
					}
					if(tabIndex == len-1 && $o.next().length == 0){
						$o.after("<li class='"+spliter.last+"'></li>");
					}
				}
			});
		},
		_init: function(){
			var $this = this;
			this._getTabs().each(function(iTabIndex){
				$(this).unbind("click").click(function(event){
					$this._switchTab(iTabIndex);
				});
				$(this).find($this._op.close$).unbind("click").click(function(){
					$this._closeTab(iTabIndex);
				});
			});
			this._getMoreLi().each(function(iTabIndex){
				$(this).find(">a").unbind("click").click(function(event){
					$this._switchTab(iTabIndex);
				});
			});
	
			this._switchTab(this._currentIndex);
		},
		_contextmenu:function($obj){ // navTab右键菜单
			var $this = this;
			$obj.on("contextmenu",function(e){
				$this.indexMenuTab=$obj
				var offset=$(e.target).offset();
				offset.top=offset.top-($this._menu.height()*1.8);
				//offset.left=offset.left-_self._menu.width();
				$this._menu.menu("show",offset);
				return false;
				
			})
			/*var $this = this;
			$obj.contextMenu('navTabCM', {
				bindings:{
					reload:function(t,m){
						$this._reload(t, true);
					},
					closeCurrent:function(t,m){
						var tabId = t.attr("tabid");
						if (tabId) $this.closeTab(tabId);
						else $this.closeCurrentTab();
					},
					closeOther:function(t,m){
						var index = $this._indexTabId(t.attr("tabid"));
						$this._closeOtherTab(index > 0 ? index : $this._currentIndex);
					},
					closeAll:function(t,m){
						$this.closeAllTab();
					}
				},
				ctrSub:function(t,m){
					var mReload = m.find("[rel='reload']");
					var mCur = m.find("[rel='closeCurrent']");
					var mOther = m.find("[rel='closeOther']");
					var mAll = m.find("[rel='closeAll']");
					var $tabLi = $this._getTabs();
					if ($tabLi.size() < 2) {
						mCur.addClass("disabled");
						mOther.addClass("disabled");
						mAll.addClass("disabled");
					}
					if ($this._currentIndex == 0 || t.attr("tabid") == $this._op.mainTabId) {
						mCur.addClass("disabled");
						mReload.addClass("disabled");
					} else if ($tabLi.size() == 2) {
						mOther.addClass("disabled");
					}
					
				}
			});*/
		},
		
		_getTabs: function(){
			return this._tabBox.find("> li.tab");
		},
		_getPanels: function(){
			return this._panelBox.find("> div");
		},
		_getMoreLi: function(){
			return this._moreBox.find("> li");
		},
		_getTab: function(tabid){
			var index = this._indexTabId(tabid);
			if (index >= 0) return this._getTabs().eq(index);
		},
		getPanel: function(tabid){
			var index = this._indexTabId(tabid);
			if (index >= 0) return this._getPanels().eq(index);
		},
		getPanels:function(){
			return this._getPanels();
		},
		/**
		 * add by tw 
		 * 获取首页的tab
		 * @returns
		 */
		getMainPanel:function(){
			//暂时认为第一个panel是main的
			 return this._getPanels().eq(0);
		},
		
		getMainTab:function(){
			//暂时认为第一个tab是main的
			return this._getTabs().eq(0);
		},
		
		_getTabsW: function(iStart, iEnd){
			return this._tabsW(this._getTabs().slice(iStart, iEnd));
		},
		_tabsW:function($tabs){
			var iW = 0;
			$tabs.each(function(){
				iW += $(this).outerWidth(true)+$(this).prev().outerWidth(true);
			});
			return iW;
		},
		_indexTabId: function(tabid){
			if (!tabid) return -1;
			var iOpenIndex = -1;
			this._getTabs().each(function(index){
				if ($(this).attr("tabid") == tabid){iOpenIndex = index; return;}
			});
			return iOpenIndex;
		},
		_getLeft: function(){
			return this._tabBox.position().left;
		},
		_getScrollBarW: function(){
			return this.componentBox.width()-55;
		},
		
		_visibleStart: function(){
			var iLeft = this._getLeft(), iW = 0;
			var $tabs = this._getTabs();
			var hasSpliter = this._spliter!=null;
			for (var i=0; i<$tabs.size(); i++){
				if (iW + iLeft >= 0) return i;
				var $tab = $tabs.eq(i);
				iW += $tab.outerWidth(true);
				if(hasSpliter){
					iW+=$tab.prev().outerWidth(true);
				}
			}
			return 0;
		},
		_visibleEnd: function(){
			var iLeft = this._getLeft(), iW = 0;
			var $tabs = this._getTabs();
			var barW = this._getScrollBarW();
			var hasSpliter = this._spliter!=null;
			for (var i=0; i<$tabs.size(); i++){
				var $tab = $tabs.eq(i);
				iW += $tab.outerWidth(true);
				if(hasSpliter){
					iW+=$tab.prev().outerWidth(true);
				}
				if (iW + iLeft > barW) return i;
			}
			return $tabs.size();
		},
		_scrollPrev: function(){
			var iStart = this._visibleStart();
			if (iStart > 0){
				this._scrollTab(-this._getTabsW(0, iStart-1)-15);
			}
		},
		_scrollNext: function(){
			var iEnd = this._visibleEnd();
			if (iEnd < this._getTabs().size()){
				this._scrollTab(-this._getTabsW(0, iEnd+1) + this._getScrollBarW()-15);
			}	
		},
		_scrollTab: function(iLeft, isNext){
			var $this = this;
			this._tabBox.animate({ left: iLeft+'px' }, 200, function(){$this._ctrlScrollBut();});
		},
		_scrollCurrent: function(){ // auto scroll current tab
			var iW = this._tabsW(this._getTabs());
			var barW = this._getScrollBarW();
			if (barW<0||iW <= barW){
				this._scrollTab(0);
			} else if (this._getLeft() < this._getScrollBarW() - iW){
				this._scrollTab(this._getScrollBarW()-iW);
			} else if (this._currentIndex < this._visibleStart()) {
				this._scrollTab(-this._getTabsW(0, this._currentIndex));
			} else if (this._currentIndex >= this._visibleEnd()) {
				this._scrollTab(this._getScrollBarW() - this._getTabs().eq(this._currentIndex).outerWidth(true) - this._getTabsW(0, this._currentIndex));
			}
		},
		_ctrlScrollBut: function(){
			var iW = this._tabsW(this._getTabs());
			if (this._getScrollBarW() > iW){
				this._prevBut.hide();
				this._nextBut.hide();
				this._tabBox.parent().removeClass("tabsPageHeaderMargin");
			} else {
				this._prevBut.show().removeClass("disabled");
				this._nextBut.show().removeClass("disabled");
				this._tabBox.parent().addClass("tabsPageHeaderMargin");
				if (this._getLeft() >= 0){
					this._prevBut.addClass("disabled");
				} else if (this._getLeft() <= this._getScrollBarW() - iW) {
					this._nextBut.addClass("disabled");
				} 
			}
		},
		
		_switchTab: function(iTabIndex){
			var $tabs = this._getTabs()
			,$old = $tabs.filter(".tab.selected");
			var $tab = $tabs.removeClass("selected").eq(iTabIndex).addClass("selected");
			var spliter = this._spliter;
			if(spliter){
				if($old.length>0){
					$old.prev().removeClass(spliter.leftSelect).removeClass(spliter.rightSelect);
					$old.next().removeClass(spliter.leftSelect).removeClass(spliter.rightSelect);
				}
				$tab.prev().addClass(spliter.leftSelect);
				$tab.next().addClass(spliter.rightSelect);
			}
			var $panel = this._getPanels().hide().eq(iTabIndex).show();
			var layoutpanel=$("div.app-layout:first",this._getPanels().eq(iTabIndex));
			if (layoutpanel.layout){
				layoutpanel.layout("resize");
			}
		//$("div.app-layout:first",this._getPanels().eq(iTabIndex)).layout("resize");
			this._getMoreLi().removeClass("selected").eq(iTabIndex).addClass("selected");
			this._currentIndex = iTabIndex;
			
			this._scrollCurrent();
			this._reload($tab);
			
			if(this.onAfterSwitch){
				this.onAfterSwitch($tab,$panel);
			}
		},
				
		_closeTab: function(index, openTabid){
	
			var $tab = this._getTabs().eq(index);
			var spliter = this._spliter;
			if(spliter){
				$prev = $tab.prev();
				if($prev.hasClass(spliter.first)){
					var $next = $tab.next();
					if($next.hasClass(spliter.last)){
						$next.remove();
					}else{
						$next.removeClass(spliter.center).addClass(spliter.first);
					}
				}
				
				$prev.remove();
			}
		
			var indexPanel=this._getPanels().eq(index);
			if(this.onClose){
				this.onClose($tab, indexPanel);
			}
			$tab.remove();
			
			$A.destroyDom(indexPanel);
			this._getPanels().eq(index).trigger($A.eventType.pageDestroy).remove();
		
			
			this._getMoreLi().eq(index).remove();
			if (this._currentIndex >= index) this._currentIndex--;
			
			if (openTabid) {
				var openIndex = this._indexTabId(openTabid);
				if (openIndex > 0) this._currentIndex = openIndex;
			}
			
			this._init();
			this._scrollCurrent();
			this._reload(this._getTabs().eq(this._currentIndex));
		},
		closeTab: function(tabid){
			var index = this._indexTabId(tabid);
			if (index > 0) { this._closeTab(index); }
		},
		closeCurrentTab: function(openTabid){ //openTabid 可以为空，默认关闭当前tab后，打开最后一个tab
			if (this._currentIndex > 0) {this._closeTab(this._currentIndex, openTabid);}
		},
		closeAllTab: function(){
			this._getTabs().filter(":gt(0)").remove();
			var spliter = this._spliter;
			if(spliter){
				this._tabBox.find("> li."+spliter.center).remove();
			}
			
			this._getPanels().filter(":gt(0)").trigger($A.eventType.pageDestroy).remove();
			this._getMoreLi().filter(":gt(0)").remove();
			this._currentIndex = 0;
			this._init();
			this._scrollCurrent();
		},
		_closeOtherTab: function(index){
			index = index || this._currentIndex;
			if (index > 0) {
				
				
				var str$ = ":eq("+index+")";
				var otherTabs=this._getTabs().not(str$).filter(":gt(0)");
				var _self=this;
				$.each(otherTabs,function(index,tabItem){
						var tabId=$(tabItem).attr("tabid");
						_self.closeTab(tabId);
					
				})
				
				/*var spliter = this._spliter;
				if(spliter){
					if(index == 0)
						this._tabBox.find("> li."+spliter.center).remove();
					else
						this._tabBox.find("> li."+spliter.center).filter(":not(eq("+(index)+"))").remove();
				}
				
				this._getPanels().not(str$).filter(":gt(0)").trigger($A.eventType.pageDestroy).remove();
				this._getMoreLi().not(str$).filter(":gt(0)").remove();
				this._currentIndex = 1;
				this._init();
				this._scrollCurrent();*/
			} else {
				this.closeAllTab();
			}
		},
	
		_loadUrlCallback: function($panel){
			var o = this;
			$panel.find("[layoutHeight]").layoutHeight();
			$panel.find(":button.close").click(function(){
				o.closeCurrentTab();
			});
		},
		_reload: function($tab, flag){
			flag = flag || $tab.data("reloadFlag");
			var navTab = this,url = $tab.attr("url");
			if (!flag || !url)
				return;
			$tab.data("reloadFlag", null);
			var $panel = this.getPanel($tab.attr("tabid"));
			if ($tab.hasClass("external")){
				navTab.openExternal(url, $panel);
			}else {
				//获取pagerForm参数
				var $pagerForm = $("#pagerForm", $panel);
				var args = $pagerForm.size()>0 ? $pagerForm.serializeArray() : {};
				
				$panel.htmlAJAX({url:url, data:args, callback:function(){navTab._loadUrlCallback($panel);}});
			}
		},
		reloadFlag: function(tabid){
			var $tab = this._getTab(tabid);
			if ($tab){
				if (this._indexTabId(tabid) == this._currentIndex) this._reload($tab, true);
				else $tab.data("reloadFlag", 1);
			}
		},
		
		loadMainTab : function(url){
			var $panel = this.getMainPanel();
			var $tab = this.getMainTab();
			url = url||$tab.attr("url");
			var navTab = this;
			$panel.htmlAJAX({
				type:"POST", 
				url:url, 
				data:{}, 
				callback:function(response){
					navTab._loadUrlCallback($panel);
				}
			});
		},
		
		reload: function(url, options){
			var op = $.extend({data:{}, navTabId:"", callback:null}, options);
			var $tab = op.navTabId ? this._getTab(op.navTabId) : this._getTabs().eq(this._currentIndex);
			var $panel =  op.navTabId ? this.getPanel(op.navTabId) : this._getPanels().eq(this._currentIndex);
			
			if (!$panel)
				return;
			if (!url) {
				url = $tab.attr("url");
			}
			if (!url)
				return;
			var navTab = this;
			if ($tab.hasClass("external")) {
				navTab.openExternal(url, $panel);
			} else {
				//增加刷新事件
				if(this.onRefresh){
					this.onRefresh($tab, $panel);
				}
				//这下面的是什么玩意儿？
				if ($.isEmptyObject(op.data)) { //获取pagerForm参数
					var $pagerForm = $("#pagerForm", $panel);
					op.data = $pagerForm.size()>0 ? $pagerForm.serializeArray() : {};
				}
				
				$panel.htmlAJAX({
					type:"POST", url:url, data:op.data, callback:function(response){
						navTab._loadUrlCallback($panel);
						if ($.isFunction(op.callback)) op.callback(response);
					}
				});
			}
		},
		getCurrentPanel: function() {
			return this._getPanels().eq(this._currentIndex);
		},
		checkTimeout:function(){
			var json = $A.jsonEval(this.getCurrentPanel().html());
			if (json && json.statusCode == $A.statusCode.timeout) this.closeCurrentTab();
		},
		openExternal:function(url, $panel){
			var navTab=this
			,ih = navTab._panelBox.height();
			$panel.html($A.frags["externalFrag"].replaceAll("{url}", url).replaceAll("{height}", ih+"px"));
		},
		
		/**
		 * 
		 * @param {Object} tabid
		 * @param {Object} url
		 * @param {Object} params: title, data, fresh
		 */
		openTab: function(tabid, url, options){ //if found tabid replace tab, else create a new tab.
			var op = $.extend({title:"New Tab", data:{}, fresh:true, external:false}, options);
	
			var iOpenIndex = this._indexTabId(tabid);
			var navTab = this;
			if (iOpenIndex >= 0){
				var $tab = this._getTabs().eq(iOpenIndex);
				var span$ = $tab.attr("tabid") == this._op.mainTabId ? "> span > span" : "> span";
				$tab.find(">a").attr("title", op.title).find(span$).text(op.title);
				var $panel = this._getPanels().eq(iOpenIndex);
		
				
				if(op.fresh || $tab.attr("url") != url) {
					$tab.attr("url", url);
					this._getTabs().eq(this._currentIndex).attr("url", url);
					this._currentIndex = iOpenIndex;
					this._init();
					this._scrollCurrent();
					
					if (op.external || url.isExternalUrl()) {
						$tab.addClass("external");
						navTab.openExternal(url, $panel);
					} else {
						//增加刷新事件
						if(this.onRefresh){
							this.onRefresh($tab, $panel);
						}
						$tab.removeClass("external");
							$("#_tabmask").show();
							$panel.on($A.eventType.pageLoad,function(){
							$("#_tabmask").hide();
						});
						$panel.htmlAJAX({
							type:"GET", url:url, data:op.data, callback:function(){
								navTab._loadUrlCallback($panel);
							},error:function(){
								$("#_tabmask").hide();
							}
						});
					}
				}
				
				
			} else {
				var $tabs = this._getTabs()
				,spliter = this._spliter,len = $tabs.length;
				if(spliter){
					if(len == 0){
						this._tabBox.append("<li class='"+spliter.first+"'></li>");
					}else{
						this._tabBox.find(">li."+spliter.last).removeClass(spliter.last).addClass(spliter.center);
					}
				}
				var tabFrag = '<li tabid="#tabid#" class="tab"><a href="javascript:" title="#title#"><span>#title#</span>&nbsp;&nbsp;&nbsp;</a><a href="javascript:" class="close">close</a></li>';
				this._tabBox.append(tabFrag.replaceAll("#tabid#", tabid).replaceAll("#title#", op.title));
				this._panelBox.append('<div class="tabpage"></div>');
				this._moreBox.append('<li><a href="javascript:" title="#title#">#title#</a></li>'.replaceAll("#title#", op.title));
				
				if(spliter){
					this._tabBox.append("<li class='"+spliter.last+"'></li>");
				}
				$tabs = this._getTabs();
				var $tab = $tabs.filter(":last");
				var $panel = this._getPanels().filter(":last");
				
				//add by tw 以后再优化 暂时写死这两个属性
				$panel.data("__funcid",options.funcId);
				$panel.data("__menuid",options.menuId);
				$panel.data("__subsysid",options.subSysId);
				
				this._currentIndex = $tabs.size() - 1;
				this._contextmenu($tabs.filter(":last").hoverClass("hover"));
				this._init();
				this._scrollCurrent();
				
				this._getTabs().eq(this._currentIndex).attr("url", url);
				
				if (op.external || url.isExternalUrl()) {
					$tab.addClass("external");
					navTab.openExternal(url, $panel);
				} else {
					$tab.removeClass("external");
							$("#_tabmask").show();
								$panel.on($A.eventType.pageLoad,function(){
							$("#_tabmask").hide();
				});
					$panel.htmlAJAX({
						type:"GET", url:url, data:op.data, callback:function(){
							navTab._loadUrlCallback($panel);
						},error:function(){
							$("#_tabmask").hide();
						}
					});
				}
				
				if ($.History) {
					setTimeout(function(){
						$.History.addHistory(tabid, function(tabid){
							var i = navTab._indexTabId(tabid);
							if (i >= 0) navTab._switchTab(i);
						}, tabid);
					}, 10);
				}
			}
		}
	});
	//$A.regInitMethod(function($box){
	var maintab=new navTab();
	$(document).on('click',"a[target=navTab]", function (e) {
		e.preventDefault();
		var $this = $(this);
		var title = $this.attr("title") || $this.text();
		var tabid = $this.attr("rel") || "_blank";
		var fresh = eval($this.attr("fresh") || "true");
		var external = eval($this.attr("external") || "false");
		var menuId = $this.attr("menuId");
		var funcId = $this.attr("funcid");
		var subSysId = $this.attr("subsysid");
		var url = unescape($this.attr("href")).evalTmById($(e.target).parents(".tabpage:first"));
		if (!url.isFinishedTm()) {
			//alertMsg.error($this.attr("warn") || DWZ.msg("alertSelectMsg"));
			return false;
		}
		$(this).parents(".sub_nav").hide()
		/*if($A.navMenu){
			$A.navMenu.hide();
		}*/
		if($A.favoriteMenu){
			$A.favoriteMenu.hide();
		}
		maintab.openTab(tabid, url,{title:title, fresh:fresh, external:external,menuId:menuId,funcId:funcId,subSysId:subSysId});
	});
	//});
	$A.navTab = maintab;
	
	return $A.navTab;
});