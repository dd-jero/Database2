CREATE DATABASE inha_week12;
use inha_week12;

CREATE TABLE Student (
    Fname VARCHAR(50),
    Minit CHAR(1),
    Lname VARCHAR(50),
    Ssn CHAR(9),
    Sex CHAR(1),
    Salary INT,
    Dno INT 
);

LOAD DATA LOCAL INFILE './student_data.csv' 
INTO TABLE student
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(Fname, Minit, Lname, Ssn, Sex, Salary, Dno);

