-- Define roles for users
CREATE TYPE role AS ENUM ('STUDENT', 'TEACHER');

-- Table to store users
CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role role NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store assignments
CREATE TABLE assignments (
    assignment_id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    deadline TIMESTAMP NOT NULL,
    created_by BIGINT NOT NULL, -- Teacher who created the assignment
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table to store submissions
CREATE TABLE submissions (
    submission_id BIGSERIAL PRIMARY KEY,
    assignment_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    submission_text TEXT,
    submission_file VARCHAR(255), -- If submission is a file upload
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    grade NUMERIC(5, 2), -- Grade given by teacher
    remarks TEXT, -- Remarks given by teacher
    physical_writeup_complete BOOLEAN DEFAULT FALSE, -- Indicates if physical write-up is complete
    FOREIGN KEY (assignment_id) REFERENCES assignments(assignment_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table to store additional information about students (if needed)
CREATE TABLE student_info (
    student_id BIGINT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    student_number VARCHAR(255) UNIQUE,
    department VARCHAR(255),
    FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Table to store additional information about teachers (if needed)
CREATE TABLE teacher_info (
    teacher_id BIGINT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    FOREIGN KEY (teacher_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
