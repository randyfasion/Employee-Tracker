-- Drops the employeetracker_db if it exists currently --
DROP DATABASE IF EXISTS employeetracker_db;
-- Creates the "employeetracker_db" database --
CREATE DATABASE employeetracker_db;

-- Makes it so all of the following code will affect employeetracker_db --
USE employeetracker_d;

CREATE TABLE departments (
  -- Makes a int column called "id" which cannot contain null and auto increments--
  id INTEGER(10) NOT NULL AUTO_INCREMENT,
  -- Makes a VARCHAR column called "NAME" which cannot contain null --
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE roles (
  -- Makes a integer column called "id" which cannot contain null and auto increments --
  id INTEGER(10) NOT NULL AUTO_INCREMENT,
  -- Makes a varchar column called "title" which cannot contain null --
  title VARCHAR(30) NOT NULL,
  -- Makes a integer column called "salary" --
  salary DECIMAL(10) NOT NULL,
  department_id INT(10) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE employees (
  -- Makes a int column called "id" which cannot contain null and auto increments--
  id INTEGER(10) NOT NULL AUTO_INCREMENT,
  -- Makes a VARCHAR column called "NAME" which cannot contain null --
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT(10) NOT NULL,
  manager_id INT(10) NOT NULL,
  PRIMARY KEY(id)

);

