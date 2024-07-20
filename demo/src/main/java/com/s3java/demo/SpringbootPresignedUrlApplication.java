package com.s3java.demo;

import com.s3java.s3config;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.URL;


@SpringBootApplication
public class SpringbootPresignedUrlApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootPresignedUrlApplication.class, args);


	}

}
