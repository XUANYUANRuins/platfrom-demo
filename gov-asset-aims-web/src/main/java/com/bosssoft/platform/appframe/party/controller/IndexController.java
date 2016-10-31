package com.bosssoft.platform.appframe.party.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bosssoft.platform.runtime.web.context.WebApplicationContext;
import com.bosssoft.platform.runtime.web.context.WebSessionContext;


@Controller
@RequestMapping("platfrom/appframe/party/")
public class IndexController {

	
	  @RequestMapping(value = "index.do")
		public String index(Model model){		
	    	WebSessionContext context=WebApplicationContext.getContext().getWebSessionContext();
			context.setTheme("default");
	    	return "platform/appframe/party/index";
		}
}
