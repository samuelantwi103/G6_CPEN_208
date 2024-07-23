package com.g6cpen208.g6_cpen_208.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
  @CrossOrigin(origins = "*")
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
  
  // Retrieve student grades
  @CrossOrigin(origins = "*")
  @GetMapping("/course_info")
  public Object course_info(@RequestParam int c_id) {
    course_l.con = db_config.getCon();
    Object result = course_l.course_info(c_id);
    return result;
  }
  
  // Retrieve student grades
  @CrossOrigin(origins = "*")
  @GetMapping("/lecturer_courses")
  public Object lecturer_courses(@RequestParam int s_id) {
    course_l.con = db_config.getCon();
    Object result = course_l.lecturer_courses(s_id);
    return result;
  }
  
  // Payment Grades
  @CrossOrigin(origins = "*")
  @GetMapping("/payment_history")
  public Object payment_history(@RequestParam int s_id) {
    course_l.con = db_config.getCon();
    Object result = course_l.payment_history(s_id);
    return result;
  }
  
  // Get Class list
  @CrossOrigin(origins = "*")
  @GetMapping("/get_classlist")
  public Object get_classlist(@RequestParam int c_id) {
    course_l.con = db_config.getCon();
    Object result = course_l.get_classlist(c_id);
    return result;
  }
  
  // Get Student Info
  @CrossOrigin(origins = "*")
  @GetMapping("/student_info")
  public Object student_info(@RequestParam int s_id) {
    course_l.con = db_config.getCon();
    Object result = course_l.student_info(s_id);
    return result;
  }
  
  // Get Staff Info
  @GetMapping("/staff_info")
  public Object staff_info(@RequestParam int s_id) {
    course_l.con = db_config.getCon();
    Object result = course_l.staff_info(s_id);
    return result;
  }
  
  // Get Admin Info
  @GetMapping("/admin_info")
  public Object admin_info(@RequestParam int s_id) {
    course_l.con = db_config.getCon();
    Object result = course_l.admin_info(s_id);
    return result;
  }
  
  // Get Admin Info
  @GetMapping("/enrollment_courses")
  public Object enrollment_courses() {
    course_l.con = db_config.getCon();
    Object result = course_l.enrollment_courses();
    return result;
  }


  // POST HTTP REQUESTS
  // Student SignUp
  @CrossOrigin(origins = "*")
  @PostMapping("/sign_up_student")
  public String sign_up_student(@RequestBody String json_request) {
    course_l.con = db_config.getCon();
    String result  = course_l.sign_up_student(json_request);
    return result;
  }

  // ADD COURSES
  @PostMapping("/add_course")
  public String add_course(@RequestBody String json_request) {
    course_l.con = db_config.getCon();
    String result  = course_l.add_course(json_request);
    return result;
  }
}
