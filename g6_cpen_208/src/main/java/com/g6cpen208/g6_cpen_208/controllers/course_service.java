package com.g6cpen208.g6_cpen_208.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
  // Yearly outstanding fees
  @GetMapping("/yearly_outstanding_fees")
  public Object yearly_outstanding_fees(@RequestParam int s_id, @RequestParam int acad_year) {
    course_l.con = db_config.getCon();
    Object result = course_l.outstanding_fees(s_id, acad_year);
    return result;
  }
  
  // Authenticate User
  @GetMapping("/auth_user")
  public Object auth_user(@RequestParam String id, @RequestParam String password) {
    course_l.con = db_config.getCon();
    Object result = course_l.authenticate_user(id, password);
    return result;
  }
  
  // Retrieve student grades
  @GetMapping("/student_grades")
  public Object retrieve_student_grades(@RequestParam int s_id) {
    course_l.con = db_config.getCon();
    Object result = course_l.retrieve_student_grades(s_id);
    return result;
  }
  
  // Retrieve student grades
  @GetMapping("/student_gpa")
  public Object calculate_gpa(@RequestParam int s_id) {
    course_l.con = db_config.getCon();
    Object result = course_l.student_gpa(s_id);
    return result;
  }


  // POST HTTP REQUESTS
  
}
