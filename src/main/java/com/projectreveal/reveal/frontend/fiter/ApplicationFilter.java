package com.projectreveal.reveal.frontend.fiter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;

import com.projectreveal.reveal.frontend.service.ValidateToken;


@ConditionalOnProperty("reveal.frontend.login.filter.enable")
@WebFilter(urlPatterns = "/")
public class ApplicationFilter implements Filter{

	@Autowired
	ValidateToken validateToken;
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		
		System.out.println("printing from token filter");
		if(httpRequest.getMethod().equals("OPTIONS")) chain.doFilter(request, response);
		else {
			String userName = "";
			Cookie[] cookies = httpRequest.getCookies();
			if(cookies!=null) {
				for(Cookie cookie: cookies) {
					if(cookie.getName().equals("access-token")) {
						System.out.println("The cookie is : " + cookie.getValue());
						userName = validateToken.verifyToken(cookie.getValue());
						break;
					}
						
				}
			}
			System.out.println("The userName is : " + userName);
			if(userName.equals("")) httpResponse.sendRedirect("/login");
			else {
				httpRequest.setAttribute("userName", userName);
				
				chain.doFilter(request, response);
				
			}
		}
		
	}
	
	

}
