CREATE DATABASE todo_app;

USE todo_app;

CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    todo VARCHAR(255) NOT NULL
);
