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


-- Function in student schema to sign up student to student_data table
-- x
CREATE OR REPLACE FUNCTION student.sign_up_student(student_info JSON)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    INSERT INTO student.student_data (student_id, fname, lname, oname, email, phone, password, dob, profile_img, level)
    VALUES (
        (SELECT COALESCE(MAX(student_id), 11111110) + 1 FROM student.student_data),
        student_info->>'fname',
        student_info->>'lname',
        student_info->>'oname',
        student_info->>'email',
        student_info->>'phone',
        student_info->>'password',
        to_date(student_info->>'dob', 'YYYY-MM-DD'),
        student_info->>'profile_img',
        (student_info->>'level')::INT
    )
    RETURNING student_id INTO result;
    
    RETURN json_build_object('status', 'success', 'student_id', result);
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('status', 'error', 'message', SQLERRM);
END;
$$ LANGUAGE plpgsql;

-- USE CASE
SELECT student.sign_up_student('{"fname": "Roland", "lname": "Berko", "oname": "Anane", "email": "jane.doe@st.ug.edu.gh", "phone": "0547654321", "password": "password123", "dob": "2001-02-02", "profile_img": null, "level": 300}');

-- Function in admin schema to authenticate student, staff and admins
-- \/
CREATE OR REPLACE FUNCTION admin.authenticate_user(uemail TEXT, upassword TEXT)
RETURNS JSON AS $$
DECLARE
    user_type TEXT;
BEGIN
    -- Check in student_data
    IF EXISTS (SELECT 1 FROM student.student_data WHERE email = uemail AND password = upassword) THEN
        user_type := 'student';
		select student_id into user_id from student.student_data where email = uemail; 
	
    -- Check in staff_data
    ELSIF EXISTS (SELECT 1 FROM staff.staff_data WHERE email = uemail AND password = upassword) THEN
        user_type := 'staff';
		select staff_id into user_id from staff.staff_data where email = uemail; 
    -- Check in admin_data
    ELSIF EXISTS (SELECT 1 FROM admin.admin_data WHERE email = uemail AND password = upassword) THEN
        user_type := 'admin';
		select admin_id into user_id from admin.admin_data where email = uemail; 
    ELSE
        RETURN json_build_object('status', 'error', 'message', 'Invalid credentials');
    END IF;

    RETURN json_build_object('status', 'success', 'user_type', user_type);
END;
$$ LANGUAGE plpgsql;

-- USE CASE
SELECT admin.authenticate_user('jasiamah@ug.edu.gh', 'password123');

-- Function in admin schema to add staff to staff_data
-- x
CREATE OR REPLACE FUNCTION admin.add_staff(staff_info JSON)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    INSERT INTO staff.staff_data (staff_id, fname, lname, oname, email, phone, password, dob, profile_img)
    VALUES (
        (SELECT COALESCE(MAX(staff_id), 11111110) + 1 FROM staff.staff_data),
        staff_info->>'fname',
        staff_info->>'lname',
        staff_info->>'oname',
        staff_info->>'email',
        staff_info->>'phone',
        staff_info->>'password',
        to_date(staff_info->>'dob', 'YYYY-MM-DD'),
        staff_info->>'profile_img'
    )
    RETURNING staff_id INTO result;
    
    RETURN json_build_object('status', 'success', 'staff_id', result);
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('status', 'error', 'message', SQLERRM);
END;
$$ LANGUAGE plpgsql;

-- USE CASE
SELECT admin.add_staff('{"fname": "John", "lname": "Asiamah", "oname": null, "email": "jasiamah@ug.edu.gh", "phone": "0547854321", "password": "password123", "dob": "1992-02-02", "profile_img": null }');


-- Function in student schema to Enroll a Student in a Course
-- x
CREATE OR REPLACE FUNCTION student.enroll_student(enrollment_info JSON)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    INSERT INTO student.course_enrollment (enrollment_id, student_id, course_id, date_enrolled)
        (SELECT COALESCE(MAX(enrollment_id), 11111110) + 1 FROM student.course_enrollment),
        (enrollment_info->>'student_id')::INT,
        (enrollment_info->>'course_id')::INT,
        CURRENT_DATE
    )
    RETURNING enrollment_id INTO result;
    
    RETURN json_build_object('status', 'success', 'enrollment_id', result);
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('status', 'error', 'message', SQLERRM);
    VALUES (
END;
$$ LANGUAGE plpgsql;

-- USE CASE
SELECT student.enroll_student('{"student_id": 11111114, "course_id": 11111111}');

-- Function in admin schema to add admin to admin_data
-- x
CREATE OR REPLACE FUNCTION admin.add_admin(admin_info JSON)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    INSERT INTO admin.admin_data (admin_id, fname, lname, oname, email, phone, password, dob, role)
    VALUES (
        (SELECT COALESCE(MAX(admin_id), 11111110) + 1 FROM admin.admin_data),
        admin_info->>'fname',
        admin_info->>'lname',
        admin_info->>'oname',
        admin_info->>'email',
        admin_info->>'phone',
        admin_info->>'password',
        to_date(admin_info->>'dob', 'YYYY-MM-DD'),
        admin_info->>'role'
    )
    RETURNING admin_id INTO result;
    
    RETURN json_build_object('status', 'success', 'admin_id', result);
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('status', 'error', 'message', SQLERRM);
END;
$$ LANGUAGE plpgsql;

-- USE CASE
SELECT admin.add_admin('{"fname": "Bob", "lname": "Johnson", "oname": null, "email": "bob.johnson@example.com", "phone": "0233445566", "password": "password789", "dob": "1970-04-04", "role": "Software Admin"}');



-- NEXT STOP HERE
-- Function in student schema to Record a Payment
-- x
CREATE OR REPLACE FUNCTION student.record_payment(payment_info JSON)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    INSERT INTO student.payment_records (payment_id, student_id, amount, payment_year, reference, payment_date)
    VALUES (
        (SELECT COALESCE(MAX(payment_id), 11111110) + 1 FROM student.payment_records),
        (payment_info->>'student_id')::INT,
        (payment_info->>'amount')::NUMERIC(15,2),
        (payment_info->>'payment_year')::INT,
        payment_info->>'reference',
        CURRENT_DATE
    )
    RETURNING payment_id INTO result;
    
    RETURN json_build_object('status', 'success', 'payment_id', result);
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('status', 'error', 'message', SQLERRM);
END;
$$ LANGUAGE plpgsql;

-- USE CASE
SELECT student.record_payment('{"student_id": 11111111, "amount": 1500.50, "payment_year": 2023, "reference": "academic"}');



-- -- Function in student schema to Update Student Information
-- CREATE OR REPLACE FUNCTION student.update_student_info(student_id INT, student_info JSON)
-- RETURNS JSON AS $$
-- BEGIN
--     UPDATE student.student_data
--     SET 
--         fname = COALESCE(student_info->>'fname', fname),
--         lname = COALESCE(student_info->>'lname', lname),
--         oname = COALESCE(student_info->>'oname', oname),
--         email = COALESCE(student_info->>'email', email),
--         phone = COALESCE(student_info->>'phone', phone),
--         password = COALESCE(student_info->>'password', password),
--         dob = COALESCE((student_info->>'dob')::DATE, dob),
--         profile_img = COALESCE(student_info->>'profile_img', profile_img),
--         level = COALESCE((student_info->>'level')::INT, level)
--     WHERE student_id = student_id;

--     RETURN json_build_object('status', 'success', 'message', 'Student information updated successfully');
-- EXCEPTION
--     WHEN OTHERS THEN
--         RETURN json_build_object('status', 'error', 'message', SQLERRM);
-- END;
-- $$ LANGUAGE plpgsql;

-- -- USE CASE
-- SELECT student.update_student_info(11111111, '{"fname": "John", "lname": "Doe", "oname": "Updated", "email": "john.updated@example.com", "phone": "1234509876", "password": "newpassword123", "dob": "2000-01-01", "profile_img": "updated_profile.jpg", "level": 300}');


-- Function in student schema to Retrieve Student Grades
-- \/
CREATE OR REPLACE FUNCTION student.retrieve_student_grades(s_id INT)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_agg(row_to_json(t))
    INTO result
    FROM (
        SELECT course_id, score, grade 
        FROM student.course_enrollment 
        WHERE student_id = s_id
    ) t;

    RETURN json_build_object('status', 'success', 'grades', result);
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('status', 'error', 'message', SQLERRM);
END;
$$ LANGUAGE plpgsql;

-- USE CASE
SELECT student.retrieve_student_grades(11111111);


-- Function in student schema to Calculate GPA based on University of Ghana CGPA system
-- \/
CREATE OR REPLACE FUNCTION student.calculate_gpa(s_id INT)
RETURNS JSON AS $$
DECLARE
    total_points NUMERIC := 0;
    total_credits INT := 0;
    gpa NUMERIC(3,2);
    course RECORD;
BEGIN
    FOR course IN
        SELECT ce.score, cd.credit_hour
        FROM student.course_enrollment ce
        JOIN admin.course_data cd ON ce.course_id = cd.course_id
        WHERE ce.student_id = s_id
    LOOP
        total_credits := total_credits + course.credit_hour;
        IF course.score >= 80 THEN
            total_points := total_points + (4.0 * course.credit_hour);
        ELSIF course.score >= 75 THEN
            total_points := total_points + (3.5 * course.credit_hour);
        ELSIF course.score >= 70 THEN
            total_points := total_points + (3.0 * course.credit_hour);
        ELSIF course.score >= 65 THEN
            total_points := total_points + (2.5 * course.credit_hour);
        ELSIF course.score >= 60 THEN
            total_points := total_points + (2.0 * course.credit_hour);
        ELSIF course.score >= 55 THEN
            total_points := total_points + (1.5 * course.credit_hour);
        ELSIF course.score >= 50 THEN
            total_points := total_points + (1.0 * course.credit_hour);
        ELSE
            total_points := total_points + (0.0 * course.credit_hour);
        END IF;
    END LOOP;

    IF total_credits > 0 THEN
        gpa := total_points / total_credits;
    ELSE
        gpa := 0;
    END IF;

    RETURN json_build_object('status', 'success', 'gpa', gpa);
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('status', 'error', 'message', SQLERRM);
END;
$$ LANGUAGE plpgsql;

-- USE CASE
SELECT student.calculate_gpa(11111111);

-- Function in admin schema to Retrieve Course Information
-- \/
CREATE OR REPLACE FUNCTION admin.retrieve_course_info(c_id INT)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT row_to_json(t)
    INTO result
    FROM (
        SELECT * 
        FROM admin.course_data 
        WHERE course_id = c_id
    ) t;

    RETURN json_build_object('status', 'success', 'course', result);
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('status', 'error', 'message', SQLERRM);
END;
$$ LANGUAGE plpgsql;

-- USE CASE
SELECT admin.retrieve_course_info(11111111);


-- Function in admin schema to Assign a Lecturer to a Course
-- x
CREATE OR REPLACE FUNCTION admin.assign_lecturer(assignment_info JSON)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    INSERT INTO staff.lecturer_assignment (assignment_id, staff_id, course_id)
    VALUES (
        (SELECT COALESCE(MAX(assignment_id), 11111110) + 1 FROM staff.lecturer_assignment),
        (assignment_info->>'staff_id')::INT,
        (assignment_info->>'course_id')::INT
    )
    RETURNING assignment_id INTO result;
    
    RETURN json_build_object('status', 'success', 'assignment_id', result);
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('status', 'error', 'message', SQLERRM);
END;
$$ LANGUAGE plpgsql;

-- USE CASE
SELECT admin.assign_lecturer('{"staff_id": 11111111, "course_id": 11111111}');


-- Function in staff schema to Get Lecturer's Course Assignments
-- \/
CREATE OR REPLACE FUNCTION staff.get_lecturer_courses(s_id INT)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_agg(row_to_json(t))
    INTO result
    FROM (
        SELECT la.course_id, cd.course_code, cd.course_name
        FROM staff.lecturer_assignment la
		JOIN admin.course_data cd ON cd.course_id = la.course_id
        WHERE staff_id = s_id
    ) t;

    RETURN json_build_object('status', 'success', 'courses', result);
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('status', 'error', 'message', SQLERRM);
END;
$$ LANGUAGE plpgsql;

-- USE CASE
SELECT staff.get_lecturer_courses(11111111);


-- Function in staff schema to assign score in course_enrollment table
-- x
CREATE OR REPLACE FUNCTION staff.assign_score(score_info JSON)
RETURNS JSON AS $$
BEGIN
    UPDATE student.course_enrollment
    SET score = (score_info->>'score')::INT
    WHERE enrollment_id = (score_info->>'enrollment_id')::INT;

    RETURN json_build_object('status', 'success', 'message', 'Score assigned successfully');
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('status', 'error', 'message', SQLERRM);
END;
$$ LANGUAGE plpgsql;

-- USE CASE
SELECT staff.assign_score('{"enrollment_id": 11111111, "score": 85}');


-- Function in student schema to Retrieve Payment History for a Student
-- \/
-- DROP FUNCTION student.retrieve_payment_history(INT);
CREATE OR REPLACE FUNCTION student.retrieve_payment_history(s_id INT)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_agg(row_to_json(t))
    INTO result
    FROM (
        SELECT payment_id, amount, payment_year, reference, payment_date
        FROM student.payment_records
        WHERE student_id = s_id
    ) t;

    RETURN json_build_object('status', 'success', 'payments', result);
EXCEPTION
    WHEN OTHERS THEN
        RETURN json_build_object('status', 'error', 'message', SQLERRM);
END;
$$ LANGUAGE plpgsql;

-- USE CASE
SELECT student.retrieve_payment_history(11111111);


-- Function to get the class list for a specific course
-- \/
-- DROP FUNCTION staff.get_classlist(INT);
CREATE OR REPLACE FUNCTION staff.get_classlist(c_id INT)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    -- Retrieve the class list for the given course
    result := json_agg(
        json_build_object(
            'student_id', sd.student_id,
            'fname', sd.fname,
            'lname', sd.lname,
            'oname', sd.oname,
            'email', sd.email,
            'phone', sd.phone,
            'dob', sd.dob,
            'profile_img', sd.profile_img,
            'level', sd.level,
            'date_enrolled', ce.date_enrolled
        )
    )
    FROM student.course_enrollment ce
    JOIN student.student_data sd ON ce.student_id = sd.student_id
    WHERE ce.course_id = c_id;
    
    -- Handle case when no students are enrolled in the course
    IF result IS NULL THEN
        result := json_build_object('status', 'error', 'message', 'No students enrolled in this course');
    ELSE
        result := json_build_object('status', 'success', 'course_id', c_id, 'classlist', result);
    END IF;

    RETURN result;
EXCEPTION
    WHEN others THEN
        RETURN json_build_object('status', 'error', 'message', SQLERRM);
END;
$$ LANGUAGE plpgsql;

-- USE CASE
SELECT staff.get_classlist(11111113);


-- Outstanding Fees
-- \/
CREATE OR REPLACE FUNCTION student.calculate_outstanding_fees(s_id INT, acad_year INT)
RETURNS NUMERIC(15,2) AS $$
DECLARE
    total_fees NUMERIC(15,2);
    total_payments NUMERIC(15,2);
    outstanding_fees NUMERIC(15,2);
BEGIN
    -- Calculate total fees for the academic year
    SELECT COALESCE(SUM(fee), 0) INTO total_fees
    FROM admin.fees_data
    WHERE academic_year = acad_year;

    -- Calculate total payments made by the student for the academic year
    SELECT COALESCE(SUM(amount), 0) INTO total_payments
    FROM student.payment_records
    WHERE student_id = s_id
    AND payment_year = acad_year;

    -- Calculate outstanding fees
    outstanding_fees = total_fees - total_payments;

    RETURN outstanding_fees;
END;
$$ LANGUAGE plpgsql;

-- USE CASE
SELECT student.calculate_outstanding_fees(11111111, 2022);

-- View student_info
-- \/
CREATE OR REPLACE FUNCTION student.view_student_info(s_id INT)
RETURNS JSON AS $$
DECLARE
    student_info JSON;
BEGIN
    SELECT row_to_json(t)
    INTO student_info
    FROM (
        SELECT student_id, fname, lname, oname, email, phone, dob, profile_img, level
        FROM student.student_data
        WHERE student_id = s_id
    ) t;
    RETURN student_info;
END;
$$ LANGUAGE plpgsql;

-- USE CASE
SELECT student.view_student_info(11111112);

-- View staff_info
-- \/
CREATE OR REPLACE FUNCTION staff.view_staff_info(s_id INT)
RETURNS JSON AS $$
DECLARE
    staff_info JSON;
BEGIN
    SELECT row_to_json(t)
    INTO staff_info
    FROM (
        SELECT staff_id, fname, lname, oname, email, phone, dob, profile_img
        FROM staff.staff_data
        WHERE staff_id = s_id
    ) t;
    RETURN staff_info;
END;
$$ LANGUAGE plpgsql;

-- USE CASE
SELECT staff.view_staff_info(11111112);


-- View admin_info
CREATE OR REPLACE FUNCTION admin.view_admin_info(a_id INT)
RETURNS JSON AS $$
DECLARE
    admin_info JSON;
BEGIN
    SELECT row_to_json(t)
    INTO admin_info
    FROM (
        SELECT admin_id, fname, lname, oname, email, phone, dob, role
        FROM admin.admin_data
        WHERE admin_id = a_id
    ) t;
    RETURN admin_info;
END;
$$ LANGUAGE plpgsql;

-- USE CASE
SELECT admin.view_admin_info(11111112);