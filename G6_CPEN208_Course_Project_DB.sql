create DATABASE G6_CPEN208_Course_Project_DB;

-- Create schemas
CREATE SCHEMA student;
CREATE SCHEMA staff;
CREATE SCHEMA admin;

-- student_data table in student schema
CREATE TABLE student.student_data (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGSERIAL UNIQUE NOT NULL,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    oname VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    profile_img VARCHAR,
    level INT NOT NULL
);

-- staff_data table in staff schema
CREATE TABLE staff.staff_data (
    id BIGSERIAL PRIMARY KEY,
    staff_id BIGSERIAL UNIQUE NOT NULL,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    oname VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    profile_img VARCHAR
);

-- admin_data table in admin schema
CREATE TABLE admin.admin_data (
    id SERIAL PRIMARY KEY,
    admin_id BIGSERIAL UNIQUE NOT NULL,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    oname VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    role VARCHAR(255)
);

-- account_data table in student schema
CREATE TABLE student.account_data (
    id BIGSERIAL PRIMARY KEY,
    account_id BIGSERIAL UNIQUE NOT NULL,
    student_id INT NOT NULL UNIQUE REFERENCES student.student_data(student_id),
    account_balance NUMERIC(15,2) NOT NULL
);

-- course_data table in admin schema
CREATE TABLE admin.course_data (
    id SERIAL PRIMARY KEY,
    course_id BIGSERIAL UNIQUE NOT NULL,
    course_code VARCHAR(10) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    credit_hour INT NOT NULL,
    academic_year INT NOT NULL,
    semester INT NOT NULL,
    description VARCHAR,
    img VARCHAR
);

-- fees_data table in admin schema
CREATE TABLE admin.fees_data (
    id SERIAL PRIMARY KEY,
    fee_id BIGSERIAL UNIQUE NOT NULL,
    academic_year INT NOT NULL,
    fee NUMERIC(15,2) NOT NULL
);

-- course_enrollment table in student schema
DROP TABLE student.course_enrollment
CREATE TABLE student.course_enrollment (
    id BIGSERIAL PRIMARY KEY,
    enrollment_id BIGSERIAL UNIQUE NOT NULL,
    student_id INT NOT NULL REFERENCES student.student_data(student_id),
    course_id INT NOT NULL REFERENCES admin.course_data(course_id),
    score INT,
    grade VARCHAR(2),
    date_enrolled DATE NOT NULL
);

-- payment_records table in student schema
CREATE TABLE student.payment_records (
    id BIGSERIAL PRIMARY KEY,
    payment_id BIGSERIAL UNIQUE NOT NULL,
    student_id INT NOT NULL REFERENCES student.student_data(student_id),
    amount NUMERIC(15,2) NOT NULL,
    payment_year INT NOT NULL,
    reference VARCHAR(255) NOT NULL CHECK (reference IN ('academic', 'residential', 'other')),
    payment_date DATE NOT NULL
);


-- lecturer_assignment table in staff schema
CREATE TABLE staff.lecturer_assignment (
    id BIGSERIAL PRIMARY KEY,
    assignment_id BIGSERIAL UNIQUE NOT NULL,
    staff_id INT NOT NULL REFERENCES staff.staff_data(staff_id),
    course_id INT NOT NULL REFERENCES admin.course_data(course_id)
);




-- TRIGGERS AND FUNCTIONS
-- ----------------------------
-- Trigger function to update account_balance in account_data
CREATE OR REPLACE FUNCTION update_account_balance()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE student.account_data
    SET account_balance = account_balance + NEW.amount
    WHERE student_id = NEW.student_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger function to insert a new student account
CREATE OR REPLACE FUNCTION create_student_account()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO student.account_data (student_id, account_balance)
    VALUES (NEW.student_id, 0);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for inserting a new student account
CREATE TRIGGER trg_create_student_account
AFTER INSERT ON student.student_data
FOR EACH ROW
EXECUTE FUNCTION create_student_account();


-- Trigger for updating account_balance
CREATE TRIGGER trg_update_account_balance
AFTER INSERT ON student.payment_records
FOR EACH ROW
EXECUTE FUNCTION update_account_balance();

-- Trigger function to set grade in course_enrollment
CREATE OR REPLACE FUNCTION set_grade()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.score >= 80 THEN
        NEW.grade := 'A';
    ELSIF NEW.score >= 75 THEN
        NEW.grade := 'B+';
    ELSIF NEW.score >= 70 THEN
        NEW.grade := 'B';
    ELSIF NEW.score >= 65 THEN
        NEW.grade := 'C+';
    ELSIF NEW.score >= 60 THEN
        NEW.grade := 'C';
    ELSIF NEW.score >= 55 THEN
        NEW.grade := 'D+';
    ELSIF NEW.score >= 50 THEN
        NEW.grade := 'D';
    ELSIF NEW.score >= 45 THEN
        NEW.grade := 'D';
    ELSE
        NEW.grade := 'F';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for setting grade
CREATE TRIGGER trg_set_grade
BEFORE INSERT OR UPDATE ON student.course_enrollment
FOR EACH ROW
WHEN (NEW.score IS NOT NULL)
EXECUTE FUNCTION set_grade();

-- Trigger function to set date_enrolled in course_enrollment
CREATE OR REPLACE FUNCTION set_date_enrolled()
RETURNS TRIGGER AS $$
BEGIN
    NEW.date_enrolled := CURRENT_DATE;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for setting date_enrolled
CREATE TRIGGER trg_set_date_enrolled
BEFORE INSERT ON student.course_enrollment
FOR EACH ROW
EXECUTE FUNCTION set_date_enrolled();

-- Trigger function to set payment_date in payment_records
CREATE OR REPLACE FUNCTION set_payment_date()
RETURNS TRIGGER AS $$
BEGIN
    NEW.payment_date := CURRENT_DATE;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for setting payment_date
CREATE TRIGGER trg_set_payment_date
BEFORE INSERT ON student.payment_records
FOR EACH ROW
EXECUTE FUNCTION set_payment_date();


-- INSERT STATEMENTS
-- ------------------------
-- Fill student.student_data table
INSERT INTO student.student_data (student_id, fname, lname, oname, email, phone, password, dob, level)
VALUES 
(11111111, 'John', 'Doe', 'Kwasi', 'john.doe@st.ug.edu.gh', '0234567890', 'password123', '2000-01-01',100),
(11111112, 'Jane', 'Smith', 'Akua', 'jane.smith@st.ug.edu.gh', '0587654321', 'password456', '1999-02-02', 100),
(11111113, 'Alice', 'Johnson', 'Fiifi', 'alice.johnson@st.ug.edu.gh', '0542334455', 'password789', '1998-03-03', 300);

-- Fill staff.staff_data table
INSERT INTO staff.staff_data (staff_id, fname, lname, oname, email, phone, password, dob)
VALUES 
(11111111, 'Mark', 'Taylor', 'Dwane', 'mark.taylor@ug.edu.gh', '0233445566', 'password111', '1980-04-04'),
(11111112, 'Emma', 'Brown', 'Yaw', 'emma.brown@ug.edu.gh', '0577889900', 'password222', '1979-05-05'),
(11111113, 'James', 'Williams', 'Kojo', 'james.williams@ug.edu.gh', '0244556677', 'password333', '1981-06-06');

-- Fill admin.admin_data table
INSERT INTO admin.admin_data (admin_id, fname, lname, oname, email, phone, password, dob, role)
VALUES 
(11111111, 'Kofi', 'Amegah', null, 'kamegah@ug.edu.gh', '0545667788', 'adminpass1', '1970-07-07', 'Registrar'),
(11111112, 'Ellen', 'White', 'Kushi', 'ewhite@ug.edu.gh', '0266778899', 'adminpass2', '1969-08-08', 'Dean'),
(11111113, 'Collins', 'Johnson', 'Kwame', 'cjohnson@ug.edu.gh', '0277889900', 'adminpass3', '1971-09-09', 'DB Administrator');

-- Fill student.account_data
INSERT INTO student.account_data (account_id, student_id, account_balance)
VALUES 
(11111111, 11111111, 100.20),
(11111112, 11111112, 200.00),
(11111113, 11111113, 0.00);

-- Fill admin.course_data
INSERT INTO admin.course_data (course_id, course_code, course_name, credit_hour, academic_year, semester, description)
VALUES 
(11111111, 'CPEN 208', 'Software Engineering', 3, 2023, 1, 'Covers introduction to Software Engineering and basic programming knowledge in Java and WEB. At the end of this course, you will be able to build a fully function web and mobile app.'),
(11111112, 'SENG 102', 'Calculus II', 4, 2023, 2, 'Introduction to partial differentials and integrals in calculus. We will also cover vector calculus and matrix application in calculus to solve real world problems.'),
(11111113, 'CPEN 104', 'Engineering Design', 4, 2023, 1, 'In this course, we cover the basic concepts of design in engineering and how to solve real world problems.');

-- Fill admin.fees_data
INSERT INTO admin.fees_data (fee_id, academic_year, fee)
VALUES 
(11111111, 2021, 1500),
(11111112, 2022, 1600),
(11111113, 2023, 1700);

-- Fill student.course_enrollment
INSERT INTO student.course_enrollment (enrollment_id, student_id, course_id)
VALUES 
(11111111, 11111111, 11111111),
(11111112, 11111111, 11111112),
(11111113, 11111113, 11111113);

-- Fill student.payment_records
INSERT INTO student.payment_records (payment_id, student_id, amount, payment_year, reference)
VALUES 
(11111111, 11111111, 500.50, 2023, 'academic'),
(11111112, 11111112, 600, 2022, 'residential'),
(11111113, 11111113, 700, 2023, 'other');

-- Fill staff.lecturer_assignment
INSERT INTO staff.lecturer_assignment (assignment_id, staff_id, course_id)
VALUES 
(11111111, 11111111, 11111112),
(11111112, 11111112, 11111113),
(11111113, 11111113, 11111111);





-- MISCELLANOUS FUNCTIONS
-- ------------------------
/*
For a student course management system, here are some suggested functions to handle and manipulate data effectively:

Function to Enroll a Student in a Course
Function to Record a Payment
Function to Update Student Information
Function to Retrieve Student Grades
Function to Calculate GPA
Function to Retrieve Course Information
Function to Assign a Lecturer to a Course
Function to Get Lecturer's Course Assignments
Function to Retrieve Payment History for a Student
Below are the SQL statements for these functions:
*/

-- Function to Enroll a Student in a Course
CREATE OR REPLACE FUNCTION enroll_course(p_student_id INT, p_course_id INT)
RETURNS VOID AS $$
BEGIN
    INSERT INTO student.course_enrollment (student_id, course_id)
    VALUES (p_student_id, p_course_id);
END;
$$ LANGUAGE plpgsql;

-- Function to Record a Payment
CREATE OR REPLACE FUNCTION make_payment(p_student_id INT, p_amount INT,p_year INT, p_reference VARCHAR(255))
RETURNS VOID AS $$
BEGIN
    INSERT INTO student.payment_records (student_id, payment_year, reference, amount)
    VALUES (p_student_id, p_year, p_reference, p_amount);
END;
$$ LANGUAGE plpgsql;

-- -- Function to Update Student Information
-- CREATE OR REPLACE FUNCTION update_student_info(p_student_id INT, p_fname VARCHAR, p_lname VARCHAR, p_email VARCHAR, p_phone VARCHAR)
-- RETURNS VOID AS $$
-- BEGIN
--     UPDATE student.student_data
--     SET fname = p_fname,
--         lname = p_lname,
--         email = p_email,
--         phone = p_phone
--     WHERE student_id = p_student_id;
-- END;
-- $$ LANGUAGE plpgsql;

-- -- Function to Retrieve Student Grades
-- CREATE OR REPLACE FUNCTION get_student_grades(p_student_id INT)
-- RETURNS TABLE(course_id INT, grade VARCHAR(2)) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT course_id, grade
--     FROM student.course_enrollment
--     WHERE student_id = p_student_id;
-- END;
-- $$ LANGUAGE plpgsql;

-- -- Function to Calculate GPA
-- CREATE OR REPLACE FUNCTION calculate_gpa(p_student_id INT)
-- RETURNS NUMERIC AS $$
-- DECLARE
--     total_points INT := 0;
--     total_credits INT := 0;
--     record RECORD;
-- BEGIN
--     FOR record IN
--         SELECT ce.course_id, ce.grade, cd.credit_hour
--         FROM student.course_enrollment ce
--                 JOIN admin.course_data cd ON ce.course_id = cd.course_id
--         WHERE ce.student_id = p_student_id
--     LOOP
--         total_credits := total_credits + record.credit_hour;
        
--         CASE record.grade
--             WHEN 'A' THEN total_points := total_points + (4 * record.credit_hour);
--             WHEN 'B' THEN total_points := total_points + (3 * record.credit_hour);
--             WHEN 'C' THEN total_points := total_points + (2 * record.credit_hour);
--             WHEN 'D' THEN total_points := total_points + (1 * record.credit_hour);
--             WHEN 'F' THEN total_points := total_points + (0 * record.credit_hour);
--         END CASE;
--     END LOOP;

--     IF total_credits = 0 THEN
--         RETURN 0;
--     ELSE
--         RETURN total_points / total_credits;
--     END IF;
-- END;
-- $$ LANGUAGE plpgsql;

-- -- Function to Retrieve Course Information
-- CREATE OR REPLACE FUNCTION get_course_info(p_course_id INT)
-- RETURNS TABLE(course_id INT, course_code VARCHAR, course_name VARCHAR, credit_hour INT, academic_year INT, semester INT, description VARCHAR, img VARCHAR) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT course_id, course_code, course_name, credit_hour, academic_year, semester, description, img
--     FROM admin.course_data
--     WHERE course_id = p_course_id;
-- END;
-- $$ LANGUAGE plpgsql;

-- -- Function to Assign a Lecturer to a Course
-- CREATE OR REPLACE FUNCTION assign_lecturer(p_staff_id INT, p_course_id INT)
-- RETURNS VOID AS $$
-- BEGIN
--     INSERT INTO staff.lecturer_assignment (staff_id, course_id)
--     VALUES (p_staff_id, p_course_id);
-- END;
-- $$ LANGUAGE plpgsql;

-- -- Function to Get Lecturer's Course Assignments
-- CREATE OR REPLACE FUNCTION get_lecturer_courses(p_staff_id INT)
-- RETURNS TABLE(course_id INT, course_name VARCHAR) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT la.course_id, cd.course_name
--     FROM staff.lecturer_assignment la
--     JOIN admin.course_data cd ON la.course_id = cd.course_id
--     WHERE la.staff_id = p_staff_id;
-- END;
-- $$ LANGUAGE plpgsql;

-- -- Function to Retrieve Payment History for a Student
-- CREATE OR REPLACE FUNCTION get_payment_history(p_student_id INT)
-- RETURNS TABLE(payment_id INT, payment_year INT, reference VARCHAR, payment_date DATE, amount INT) AS $$
-- BEGIN
--     RETURN QUERY
--     SELECT payment_id, payment_year, reference, payment_date, amount
--     FROM student.payment_records
--     WHERE student_id = p_student_id;
-- END;
-- $$ LANGUAGE plpgsql;







