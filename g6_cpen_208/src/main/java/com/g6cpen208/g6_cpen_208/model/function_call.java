package com.g6cpen208.g6_cpen_208.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.mindrot.jbcrypt.BCrypt;
import org.json.JSONObject;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

@Service
public class function_call {
  public Connection con = null;

  // GET FUNCTIONS
  // outstanding fees
  public Object outstanding_fees(@RequestParam int s_id, int acad_year) {
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
  public String authenticate_user(@RequestParam String email, String password) {
    String result = null;
    String SQL = "SELECT admin.authenticate_user(?, ?)";
    Connection conn = con;

    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setString(1, email);
      pstmt.setString(2, password); // We're still passing the password, but it won't be used for comparison in the
                                    // DB
      ResultSet rs = pstmt.executeQuery();

      if (rs.next()) {
        String jsonResult = rs.getString(1); // Get the JSON result
        JSONObject authResult = new JSONObject(jsonResult);

        if (authResult.getString("status").equals("pending")) {
          String storedHash = authResult.getString("stored_hash");
          if (BCrypt.checkpw(password, storedHash)) {
            // Password is correct
            authResult.put("status", "success");
            authResult.remove("stored_hash"); // Remove the hash before returning
          } else {
            // Password is incorrect
            authResult.put("status", "error");
            authResult.put("message", "Invalid credentials");
          }
        }

        result = authResult.toString();
      }
    } catch (SQLException e) {
      System.out.println(e.getMessage());
      result = "{\"status\": \"error\", \"message\": \"Database error\"}";
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

  // Student Grades
  public String retrieve_student_grades(@RequestParam int s_id) {
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
  public String student_gpa(@RequestParam int s_id) {
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
  public String course_info(@RequestParam int c_id) {
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

  // Retrieve Lecturer Courses for Lecturers
  public String lecturer_courses(@RequestParam int s_id) {
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
  public String payment_history(@RequestParam int s_id) {
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
  public String get_classlist(@RequestParam int c_id) {
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
  public String student_info(@RequestParam int s_id) {
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
  public String staff_info(@RequestParam int s_id) {
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
  public String admin_info(@RequestParam int s_id) {
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

  // Get Enrolled COURSES
  public String enrollment_courses() {
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

  // GET COURSE WORKS FOR A COURSE AS A STUDENT(ASSIGNMENTS AVAILABLE)
  public String get_course_works(@RequestParam int s_id, int crs_id) {
    String result = null;
    String SQL = "SELECT student.get_course_works(?::INT,?::INT);";
    Connection conn = con;

    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setInt(1, s_id);
      pstmt.setInt(2, crs_id);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("get_course_works");
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

  // GET ALL COURSE SUBMISSIONS FOR A COURSE WORK BY A LECTURER
  public String get_all_course_submissions(@RequestParam int cw_id) {
    String result = null;
    String SQL = "SELECT staff.get_all_course_submissions(?::INT);";
    Connection conn = con;

    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setInt(1, cw_id);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("get_all_course_submissions");
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

  // GET ALL COURSE WORKS FOR A COURSE BY BOTH LECTURERS AND STUDENTS
  public String get_all_course_submissions_for_course(@RequestParam int cw_id) {
    String result = null;
    String SQL = "SELECT staff.get_all_course_submissions_for_course(?::INT);";
    Connection conn = con;

    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setInt(1, cw_id);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("get_all_course_submissions_for_course");
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

  // GET NOTIFICATIONS FOR USER
  public String get_notifications(@RequestParam int user_id, String user_type) {
    String result = null;
    String SQL = "SELECT admin.get_notifications(?::INT,?::VARCHAR);";
    Connection conn = con;

    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setInt(1, user_id);
      pstmt.setString(2, user_type);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("get_notifications");
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
      // Parse the JSON request
      JSONObject jsonObject = new JSONObject(json_request);

      // Extract the password
      String password = jsonObject.getString("password");

      // Hash the password
      String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());

      // Replace the plain password with the hashed password in the JSON
      jsonObject.put("password", hashedPassword);

      // Convert the modified JSON object back to a string
      String updatedJsonRequest = jsonObject.toString();

      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setString(1, updatedJsonRequest);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("sign_up_student");
      }
    } catch (SQLException e) {
      System.out.println("SQL Error: " + e.getMessage());
    } catch (Exception e) {
      System.out.println("Error processing JSON: " + e.getMessage());
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

  // Enroll Student into a Course
  public String enroll_into_course(String json_request) {
    String result = null;
    String SQL = "SELECT student.enroll_student(?::JSON);";
    Connection conn = con;
    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setString(1, json_request);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("enroll_student");
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

  // Add a lecturer
  public String add_staff(String json_request) {
    String result = null;
    String SQL = "SELECT admin.add_staff(?::JSON);";
    Connection conn = con;
    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setString(1, json_request);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("add_staff");
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

  // Add another admin
  public String add_admin(String json_request) {
    String result = null;
    String SQL = "SELECT admin.add_admin(?::JSON);";
    Connection conn = con;
    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setString(1, json_request);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("add_admin");
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

  // Make payments
  public String make_payments(String json_request) {
    String result = null;
    String SQL = "SELECT student.record_payment(?::JSON);";
    Connection conn = con;
    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setString(1, json_request);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("record_payment");
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

  // Assign A lecturer to a course
  public String assign_lecturer(String json_request) {
    String result = null;
    String SQL = "SELECT admin.assign_lecturer(?::JSON);";
    Connection conn = con;
    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setString(1, json_request);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("assign_lecturer");
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

  // A lecture assigns a course work
  public String add_course_work(String json_request) {
    String result = null;
    String SQL = "SELECT staff.add_course_work(?::JSON);";
    Connection conn = con;
    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setString(1, json_request);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("add_course_work");
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

  // A student makes a course submission
  public String add_course_work_submission(String json_request) {
    String result = null;
    String SQL = "SELECT student.add_course_work_submission(?::JSON);";
    Connection conn = con;
    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setString(1, json_request);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("add_course_work_submission");
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

  // A lecturer updates a course work
  public String update_course_work(String json_request) {
    String result = null;
    String SQL = "SELECT staff.update_course_work(?::JSON);";
    Connection conn = con;
    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setString(1, json_request);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("update_course_work");
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

  // UPDATE COURSE WORK SUBMISSION
  public String update_course_work_submission(String json_request) {
    String result = null;
    String SQL = "SELECT student.update_course_work_submission(?::JSON);";
    Connection conn = con;
    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setString(1, json_request);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("update_course_work_submission");
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

  // SCORING A COURSE WORK SUBMISSION
  public String score_course_submission(String json_request) {
    String result = null;
    String SQL = "SELECT staff.score_course_submission(?::JSON);";
    Connection conn = con;
    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setString(1, json_request);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("score_course_submission");
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

  // CRFATE A GENERAL NOTIFICATION
  public String add_system_notification(String json_request) {
    String result = null;
    String SQL = "SELECT admin.add_system_notification(?::JSON);";
    Connection conn = con;
    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setString(1, json_request);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("add_system_notification");
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

  // ADD A COURSE NOTIFICATION BY A LECTURER
  public String add_course_notification(String json_request) {
    String result = null;
    String SQL = "SELECT staff.add_course_notification(?::JSON);";
    Connection conn = con;
    try {
      PreparedStatement pstmt = conn.prepareStatement(SQL);
      pstmt.setString(1, json_request);
      ResultSet rs = pstmt.executeQuery();
      while (rs.next()) {
        result = rs.getString("add_course_notification");
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