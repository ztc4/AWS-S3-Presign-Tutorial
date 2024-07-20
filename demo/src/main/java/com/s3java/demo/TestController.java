package com.s3java.demo;

import com.s3java.s3config;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URL;
import java.util.Map;

@RestController
public class TestController {
    @GetMapping("/")
    String test(){
        return "TEST";
    }
    @PostMapping("/presignedurl")
    ResponseEntity<String> presignedUrl(@RequestBody Map<String, String> requestBody) {
        System.out.println("1" + requestBody);
        String type = requestBody.get("type");
        System.out.println("Received type: " + type);
        try {
            s3config s3 = new s3config();
		    URL url = s3.generateSignedUrl(type,"test");
            System.out.println(url);
            return ResponseEntity.ok(url.toString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error getting the URL");
        }

    }
}
