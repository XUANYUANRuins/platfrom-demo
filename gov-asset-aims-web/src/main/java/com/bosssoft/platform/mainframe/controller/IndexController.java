package com.bosssoft.platform.mainframe.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bosssoft.platform.runtime.web.context.WebApplicationContext;
import com.bosssoft.platform.runtime.web.context.WebSessionContext;


@Controller
@RequestMapping("")
public class IndexController {

    @RequestMapping(value = "main.do")
	public String main(Model model){		
    	WebSessionContext context=WebApplicationContext.getContext().getWebSessionContext();
		context.setTheme("default");
    	model.addAttribute("homePage", "portal.do");

    	return "platform/mainframe/main";
    	
    	
	}
    
    @RequestMapping(value = "portal.do")
	public String homePage(Model model){		


    	WebSessionContext context=WebApplicationContext.getContext().getWebSessionContext();
		context.setTheme("default");
    	return "platform/mainframe/portal";
	}
}
