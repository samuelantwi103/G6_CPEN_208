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
  @CrossOrigin(origins = "*")
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
  @CrossOrigin(origins = "*")
  @GetMapping("/student_grades")
  public Object retrieve_student_grades(@RequestParam int s_id) {
    course_l.con = db_config.getCon();
    Object result = course_l.retrieve_student_grades(s_id);

    return result;
  }
  
  // Retrieve student grades
  @CrossOrigin(origins = "*")
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
  @CrossOrigin(origins = "*")
  @GetMapping("/staff_info")
  public Object staff_info(@RequestParam int s_id) {
    course_l.con = db_config.getCon();
    Object result = course_l.staff_info(s_id);
    return result;
  }
  
  // Get Admin Info
  @CrossOrigin(origins = "*")
  @GetMapping("/admin_info")
  public Object admin_info(@RequestParam int s_id) {
    course_l.con = db_config.getCon();
    Object result = course_l.admin_info(s_id);
    return result;
  }
  
  // Get Admin Info
  @CrossOrigin(origins = "*")
  @GetMapping("/enrollment_courses")
  public Object enrollment_courses() {
    course_l.con = db_config.getCon();
    Object result = course_l.enrollment_courses();
    return result;
  }
  
  // GET COURSE WORKS FOR A COURSE AS A STUDENT(ASSIGNMENTS AVAILABLE)
  @CrossOrigin(origins = "*")
  @GetMapping("/get_course_works")
  public Object get_course_works(@RequestParam int s_id,@RequestParam int c_id) {
    course_l.con = db_config.getCon();
    Object result = course_l.get_course_works(s_id, c_id);
    return result;
  }
  
  // GET ALL COURSE SUBMISSIONS FOR A COURSE WORK BY A LECTURER
  @CrossOrigin(origins = "*")
  @GetMapping("/get_all_course_submissions")
  public Object get_all_course_submissions(@RequestParam int cw_id) {
    course_l.con = db_config.getCon();
    Object result = course_l.get_all_course_submissions(cw_id);
    return result;
  }
  
  // GET ALL COURSE WORKS FOR A COURSE BY BOTH LECTURERS AND STUDENTS
  @CrossOrigin(origins = "*")
  @GetMapping("/get_all_course_submissions_for_course")
  public Object get_all_course_submissions_for_course(@RequestParam int c_id) {
    course_l.con = db_config.getCon();
    Object result = course_l.get_all_course_submissions_for_course(c_id);
    return result;
  }
  
  // GET NOTIFICATIONS FOR USER
  @CrossOrigin(origins = "*")
  @GetMapping("/get_notifications")
  public Object get_notifications(@RequestParam int user_id, @RequestParam String user_type) {
    course_l.con = db_config.getCon();
    Object result = course_l.get_notifications(user_id, user_type);
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
  @CrossOrigin(origins = "*")
  @PostMapping("/add_course")
  public String add_course(@RequestBody String json_request) {
    course_l.con = db_config.getCon();
    String result  = course_l.add_course(json_request);
    return result;
  }

  // ENROLL INTO COURSES
  @CrossOrigin(origins = "*")
  @PostMapping("/enroll_into_course")
  public String enroll_into_course(@RequestBody String json_request) {
    course_l.con = db_config.getCon();
    String result  = course_l.enroll_into_course(json_request);
    return result;
  }

  // ADD A STAFF ACCOUNT
  @CrossOrigin(origins = "*")
  @PostMapping("/add_staff")
  public String add_staff(@RequestBody String json_request) {
    course_l.con = db_config.getCon();
    String result  = course_l.add_staff(json_request);
    return result;
  }

  // ADD AN ADMIN ACCOUNT
  @CrossOrigin(origins = "*")
  @PostMapping("/add_admin")
  public String add_admin(@RequestBody String json_request) {
    course_l.con = db_config.getCon();
    String result  = course_l.add_admin(json_request);
    return result;
  }

  // MAKE A PAYMENT
  @CrossOrigin(origins = "*")
  @PostMapping("/make_payments")
  public String make_payments(@RequestBody String json_request) {
    course_l.con = db_config.getCon();
    String result  = course_l.make_payments(json_request);
    return result;
  }

  // Assign a Lecturer to a course
  @CrossOrigin(origins = "*")
  @PostMapping("/assign_lecturer")
  public String assign_lecturer(@RequestBody String json_request) {
    course_l.con = db_config.getCon();
    String result  = course_l.assign_lecturer(json_request);
    return result;
  }

  // Assign a Lecturer to a course
  @CrossOrigin(origins = "*")
  @PostMapping("/add_course_work")
  public String add_course_work(@RequestBody String json_request) {
    course_l.con = db_config.getCon();
    String result  = course_l.add_course_work(json_request);
    return result;
  }

  // Assign a Lecturer to a course
  @CrossOrigin(origins = "*")
  @PostMapping("/add_course_work_submission")
  public String add_course_work_submission(@RequestBody String json_request) {
    course_l.con = db_config.getCon();
    String result  = course_l.add_course_work_submission(json_request);
    return result;
  }

  // Assign a Lecturer to a course
  @CrossOrigin(origins = "*")
  @PostMapping("/update_course_work")
  public String update_course_work(@RequestBody String json_request) {
    course_l.con = db_config.getCon();
    String result  = course_l.update_course_work(json_request);
    return result;
  }

  // Assign a Lecturer to a course
  @CrossOrigin(origins = "*")
  @PostMapping("/update_course_work_submission")
  public String update_course_work_submission(@RequestBody String json_request) {
    course_l.con = db_config.getCon();
    String result  = course_l.update_course_work_submission(json_request);
    return result;
  }

  // score_course_submission
  @CrossOrigin(origins = "*")
  @PostMapping("/score_course_submission")
  public String score_course_submission(@RequestBody String json_request) {
    course_l.con = db_config.getCon();
    String result  = course_l.score_course_submission(json_request);
    return result;
  }

  // CRFATE A GENERAL NOTIFICATION
  @CrossOrigin(origins = "*")
  @PostMapping("/add_general_notification")
  public String add_general_notification(@RequestBody String json_request) {
    course_l.con = db_config.getCon();
    String result  = course_l.add_system_notification(json_request);
    return result;
  }

  // CRFATE A COURSE NOTIFICATION BY LECTURER
  @CrossOrigin(origins = "*")
  @PostMapping("/add_course_notification")
  public String add_course_notification(@RequestBody String json_request) {
    course_l.con = db_config.getCon();
    String result  = course_l.add_course_notification(json_request);
    return result;
  }

}
