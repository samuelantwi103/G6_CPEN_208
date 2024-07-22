package com.g6cpen208.g6_cpen_208.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.web.bind.annotation.RequestParam;

public class function_call {
  public Connection con = null;

  // GET FUNCTIONS
  // outstanding fees
  public Object outstanding_fees(@RequestParam int s_id, int acad_year){
    Object result = null;
    String SQL = "SELECT student.calculate_outstanding_fees(?,?)";
    Connection conn = con;

    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setInt(1, s_id);
      pstmt.setInt(2, acad_year);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getDouble("calculate_outstanding_fees");
      }
    } catch (SQLException e) {
     System.out.println(e.getMessage());
    } finally {
      if (conn != null) {
        try {
          conn.close();
        } catch (SQLException ex) {
          ex.printStackTrace();
        }
      }
    }

    return result;
  };

  // Authenticate user
  public String authenticate_user(@RequestParam String id, String password){
    String result = null;
    String SQL = "SELECT admin.authenticate_user(?, ?)";
    Connection conn = con;
    
    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setString(1, id);
      pstmt.setString(2, password);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("authenticate_user");
      }
    } catch (SQLException e) {
     System.out.println(e.getMessage());
    } finally {
      if (conn != null) {
        try {
          conn.close();
        } catch (SQLException ex) {
          ex.printStackTrace();
        }
      }
    }
    
    return result;
  };    
  
  // Student Grades
  public String retrieve_student_grades(@RequestParam int s_id){
    String result = null;
    String SQL = "SELECT student.retrieve_student_grades(?);";
    Connection conn = con;

    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setInt(1, s_id);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("retrieve_student_grades");
      }
    } catch (SQLException e) {
     System.out.println(e.getMessage());
    } finally {
      if (conn != null) {
        try {
          conn.close();
        } catch (SQLException ex) {
          ex.printStackTrace();
        }
      }
    }

    return result;
  };
  
  // student GPA
  public String student_gpa(@RequestParam int s_id){
    String result = null;
    String SQL = "SELECT student.calculate_gpa(?);";
    Connection conn = con;

    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setInt(1, s_id);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("calculate_gpa");
      }
    } catch (SQLException e) {
     System.out.println(e.getMessage());
    } finally {
      if (conn != null) {
        try {
          conn.close();
        } catch (SQLException ex) {
          ex.printStackTrace();
        }
      }
    }

    return result;
  };
  
  // Retrieve Course Info
  public String course_info(@RequestParam int c_id){
    String result = null;
    String SQL = "SELECT admin.retrieve_course_info(?);";
    Connection conn = con;

    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setInt(1, c_id);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("retrieve_course_info");
      }
    } catch (SQLException e) {
     System.out.println(e.getMessage());
    } finally {
      if (conn != null) {
        try {
          conn.close();
        } catch (SQLException ex) {
          ex.printStackTrace();
        }
      }
    }

    return result;
  };
  
  // Retrieve Lecturer Courses
  public String lecturer_courses(@RequestParam int s_id){
    String result = null;
    String SQL = "SELECT staff.get_lecturer_courses(?);";
    Connection conn = con;

    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setInt(1, s_id);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("get_lecturer_courses");
      }
    } catch (SQLException e) {
     System.out.println(e.getMessage());
    } finally {
      if (conn != null) {
        try {
          conn.close();
        } catch (SQLException ex) {
          ex.printStackTrace();
        }
      }
    }

    return result;
  };
  
  // Payment Histories
  public String payment_history(@RequestParam int s_id){
    String result = null;
    String SQL = "SELECT student.retrieve_payment_history(?);";
    Connection conn = con;

    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setInt(1, s_id);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("retrieve_payment_history");
      }
    } catch (SQLException e) {
     System.out.println(e.getMessage());
    } finally {
      if (conn != null) {
        try {
          conn.close();
        } catch (SQLException ex) {
          ex.printStackTrace();
        }
      }
    }

    return result;
  };
  
  // Get Class List
  public String get_classlist(@RequestParam int c_id){
    String result = null;
    String SQL = "SELECT staff.get_classlist(?);";
    Connection conn = con;

    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setInt(1, c_id);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("get_classlist");
      }
    } catch (SQLException e) {
     System.out.println(e.getMessage());
    } finally {
      if (conn != null) {
        try {
          conn.close();
        } catch (SQLException ex) {
          ex.printStackTrace();
        }
      }
    }

    return result;
  };
  
  // Get Student Info
  public String student_info(@RequestParam int s_id){
    String result = null;
    String SQL = "SELECT student.view_student_info(?);";
    Connection conn = con;

    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setInt(1, s_id);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("view_student_info");
      }
    } catch (SQLException e) {
     System.out.println(e.getMessage());
    } finally {
      if (conn != null) {
        try {
          conn.close();
        } catch (SQLException ex) {
          ex.printStackTrace();
        }
      }
    }

    return result;
  };
  
  // Get Staff Info
  public String staff_info(@RequestParam int s_id){
    String result = null;
    String SQL = "SELECT staff.view_staff_info(?);";
    Connection conn = con;

    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setInt(1, s_id);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("view_staff_info");
      }
    } catch (SQLException e) {
     System.out.println(e.getMessage());
    } finally {
      if (conn != null) {
        try {
          conn.close();
        } catch (SQLException ex) {
          ex.printStackTrace();
        }
      }
    }

    return result;
  };
  
  // Get Admin Info
  public String admin_info(@RequestParam int s_id){
    String result = null;
    String SQL = "SELECT admin.view_admin_info(?);";
    Connection conn = con;

    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setInt(1, s_id);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("view_admin_info");
      }
    } catch (SQLException e) {
     System.out.println(e.getMessage());
    } finally {
      if (conn != null) {
        try {
          conn.close();
        } catch (SQLException ex) {
          ex.printStackTrace();
        }
      }
    }

    return result;
  };
  
  // Get Admin Info
  public String enrollment_courses(){
    String result = null;
    String SQL = "SELECT student.get_courses_with_lecturers();";
    Connection conn = con;

    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("get_courses_with_lecturers");
      }
    } catch (SQLException e) {
     System.out.println(e.getMessage());
    } finally {
      if (conn != null) {
        try {
          conn.close();
        } catch (SQLException ex) {
          ex.printStackTrace();
        }
      }
    }

    return result;
  };


  // POST FUNCTIONS
  // Sign Up Student
  public String sign_up_student(String json_request) {
    String result = null;
    String SQL = "SELECT student.sign_up_student(?::JSON);";
    Connection conn = con;
    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setString(1, json_request);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("sign_up_student");
      }
    } catch (SQLException e) {
      System.out.println(e.getMessage());
    } finally {
      if (conn != null) {
        try {
          conn.close();
        } catch (SQLException ex) {
          ex.printStackTrace();
        }
      }
    }
    return result;
  }


  // Sign Up Student
  public String add_course(String json_request) {
    String result = null;
    String SQL = "SELECT admin.add_course(?::JSON);";
    Connection conn = con;
    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setString(1, json_request);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("add_course");
      }
    } catch (SQLException e) {
      System.out.println(e.getMessage());
    } finally {
      if (conn != null) {
        try {
          conn.close();
        } catch (SQLException ex) {
          ex.printStackTrace();
        }
      }
    }
    return result;
  }
}
