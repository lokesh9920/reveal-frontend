package com.projectreveal.reveal.frontend.service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.util.HashMap;

import javax.net.ssl.HttpsURLConnection;

import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ValidateToken {
	
	@Value("${auth.service.address}")
	private String authServiceAddress;

	public String verifyToken(String jwtToken) {
		
		String userName = "";
		URI uri = null;
		try {
			uri = new URI(authServiceAddress + "/tokens/verify");
			System.out.println("The uri is : " + uri);
		} catch (URISyntaxException e) {
			System.out.println("Failed to form URI");
		}
		
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.add("auth-token", jwtToken);
		httpHeaders.add("X-idms-Auth","A-b6O5nb549M9kSm0z9YSHB8ufTB36jLuTeFOCSZVQU");
		
		RequestEntity<Object> requestEntity = new RequestEntity<Object>(httpHeaders,HttpMethod.GET, uri);
		
		
		//RestTemplate restTemplate = new RestTemplate();
		try{
			
			/**
			 * 
			 * Below lines are to skip certificate verfication for consuming https url
			 * 
			 */
			CloseableHttpClient httpClient = HttpClients.custom()
					.setSSLHostnameVerifier(new NoopHostnameVerifier())
					.build();
			HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
			requestFactory.setHttpClient(httpClient);
		
			// till here
			
			
			
			ResponseEntity<HashMap> responseEntity = new RestTemplate(requestFactory)
					.exchange(requestEntity, HashMap.class);
		
		
			if(responseEntity.getStatusCode().equals(HttpStatus.OK)) {
			System.out.println("The response code is: " + responseEntity.getStatusCode());
			userName =  (String) responseEntity.getBody().get("userName");
			System.out.println("The userName is: " + userName);
			
			}
		}catch (Exception e) {
				System.out.println("caught exception");
				e.printStackTrace();
			}
		
		
		
		return userName;
	}
}
