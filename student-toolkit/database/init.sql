<<<<<<< HEAD
CREATE DATABASE IF NOT EXISTS student_toolkit;
USE student_toolkit;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

CREATE TABLE IF NOT EXISTS syllabuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
);

CREATE TABLE IF NOT EXISTS syllabus_topics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    syllabus_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    estimated_hours FLOAT NOT NULL,
    priority INT DEFAULT 1,
    `order` INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (syllabus_id) REFERENCES syllabuses(id) ON DELETE CASCADE,
    INDEX idx_syllabus_id (syllabus_id)
);

CREATE TABLE IF NOT EXISTS study_materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    topic_id INT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES syllabus_topics(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_topic_id (topic_id)
);

CREATE TABLE IF NOT EXISTS study_schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    syllabus_id INT NOT NULL,
    generated_by_ai BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (syllabus_id) REFERENCES syllabuses(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_syllabus_id (syllabus_id)
);

CREATE TABLE IF NOT EXISTS study_schedule_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    schedule_id INT NOT NULL,
    topic_id INT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (schedule_id) REFERENCES study_schedules(id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES syllabus_topics(id) ON DELETE CASCADE,
    INDEX idx_schedule_id (schedule_id),
    INDEX idx_topic_id (topic_id)
);
=======
CREATE DATABASE IF NOT EXISTS student_toolkit;
USE student_toolkit;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

CREATE TABLE syllabuses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
);

CREATE TABLE syllabus_topics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    syllabus_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    estimated_hours FLOAT NOT NULL,
    priority INT DEFAULT 1,
    `order` INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (syllabus_id) REFERENCES syllabuses(id) ON DELETE CASCADE,
    INDEX idx_syllabus_id (syllabus_id)
);

CREATE TABLE study_materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    topic_id INT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES syllabus_topics(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_topic_id (topic_id)
);

CREATE TABLE study_schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    syllabus_id INT NOT NULL,
    generated_by_ai BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (syllabus_id) REFERENCES syllabuses(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_syllabus_id (syllabus_id)
);

CREATE TABLE study_schedule_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    schedule_id INT NOT NULL,
    topic_id INT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (schedule_id) REFERENCES study_schedules(id) ON DELETE CASCADE,
    FOREIGN KEY (topic_id) REFERENCES syllabus_topics(id) ON DELETE CASCADE,
    INDEX idx_schedule_id (schedule_id),
    INDEX idx_topic_id (topic_id)
);
>>>>>>> 734fbeb581725ac365e00435a2cf9275fc3673fc
