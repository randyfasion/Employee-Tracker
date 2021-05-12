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
);

CREATE TABLE employees (
  -- Makes a int column called "id" which cannot contain null and auto increments--
  id INTEGER(10) NOT NULL AUTO_INCREMENT,
  -- Makes a VARCHAR column called "NAME" which cannot contain null --
  name VARCHAR(30) NOT NULL,
);

CREATE TABLE roles (
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(30) NOT NULL,
  -- Makes a boolean column called "has_pet" which cannot contain null --
  has_pet BOOLEAN NOT NULL,
  -- Makes a sting column called "pet_name" --
  pet_name VARCHAR(30),
  -- Makes an numeric column called "pet_age" --
  pet_age INTEGER(10)
);