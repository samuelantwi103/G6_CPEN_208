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


  // POST FUNCTIONS
  
}
