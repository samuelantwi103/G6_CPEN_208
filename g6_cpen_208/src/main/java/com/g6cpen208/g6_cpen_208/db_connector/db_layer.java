package com.g6cpen208.g6_cpen_208.db_connector;

import java.sql.Connection;
import java.sql.DriverManager;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data
@ConfigurationProperties(prefix = "spring.datasource")
public class db_layer {
  String url;
  String username;
  String password;

  static Connection con =  null;

  public Connection getCon() {
    try {
      Class.forName("org.postgreql.Driver");
      String url = getUrl() + "?user=" + getUsername() + "&password=" + getPassword()
          + "&pooling=true&minpoolsize=1&maxpoolsize=100&connectionlifetime=15&connect_timeout=10000&max_active=100&max_idle=&30&max_wait=100";
          con = DriverManager.getConnection(url);
    } catch (Exception ex) {
      System.out.println("Error: " + ex.getMessage());
    }
    return con;
  }
}
