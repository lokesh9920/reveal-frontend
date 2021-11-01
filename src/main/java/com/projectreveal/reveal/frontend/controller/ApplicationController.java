package com.projectreveal.reveal.frontend.controller;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class ApplicationController {
	
	@GetMapping()
	public String homePage(ServletRequest request){
		
		return "home";
	}
	
	
	@GetMapping("/login")
	public String login(ServletRequest request) {
		
		HttpServletRequest httpRequest = (HttpServletRequest) request;

		return "login";
	}
}
