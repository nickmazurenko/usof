CREATE DATABASE usof;
USE usof;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  login VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(100),
  full_name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  profile_picture LONGBLOB,
  views INT DEFAULT 0,
  rating INT DEFAULT 0,
  role ENUM("admin", "user") DEFAULT "user",
  email_verified BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(250) NOT NULL,
  description MEDIUMTEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts(
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(250),
  content MEDIUMTEXT,
  views INT DEFAULT 0,
  publish_date TIMESTAMP DEFAULT NOW(),
  status ENUM("active", "inactive") DEFAULT "active",
  category_id INT NOT NULL,
  FOREIGN KEY(category_id) REFERENCES categories(id),
  user_id INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE post_categories(
  post_id INT NOT NULL,
  FOREIGN KEY(post_id) REFERENCES posts(id),
  category_id INT NOT NULL,
  FOREIGN KEY(category_id) REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY(post_id, category_id)
);

CREATE TABLE answers(
  id INT AUTO_INCREMENT PRIMARY KEY,
  body MEDIUMTEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  post_id INT NOT NULL,
  FOREIGN KEY(post_id) REFERENCES posts(id),
  user_id INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE comments(
  id INT AUTO_INCREMENT PRIMARY KEY,
  content MEDIUMTEXT,
  publish_date TIMESTAMP DEFAULT NOW(),
  post_id INT NOT NULL,
  FOREIGN KEY(post_id) REFERENCES posts(id),
  user_id INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  publish_date TIMESTAMP DEFAULT NOW(),
  type ENUM("like", "dislike"),
  user_id INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id),
  answer_id INT,
  FOREIGN KEY(answer_id) REFERENCES answers(id)
);

