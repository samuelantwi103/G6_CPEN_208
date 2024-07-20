package com.g6cpen208.g6_cpen_208.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.g6cpen208.g6_cpen_208.db_connector.db_layer;
import com.g6cpen208.g6_cpen_208.model.function_call;

@RestController
@RequestMapping("/course_service")
public class course_service {
  function_call course_l = new function_call();

  @Autowired
  private db_layer db_config;

  // GET HTTP REQUESTS

  // POST HTTP REQUESTS
  
}
