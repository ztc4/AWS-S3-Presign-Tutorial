package com.s3java.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*") // Allow all origins (use specific origins in production)
public class S3Controller {
    @PostMapping("/presignedurl")
    String presignedUrl(@RequestParam("type") String type){

        return "type";
    }
    @GetMapping("/hello")
    String hello(){
        return "Testing";
    }
}
