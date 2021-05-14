USE employeetracker_db;

INSERT INTO department (name)
VALUES
    ('IT'),
    ('Accounting'),
    ('Operatoins Management'),
    ('Customer Service');

INSERT INTO role (title, salary, department_id)
VALUES
    ('IT Specialist', 130000, 1),
    ('Engineer', 220000, 1),
    ('Manager', 60000, 3);

 INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Cornell', 'Hilley', 1, 3)
    ( 'Yu', 'Kingston', 2, 3)
    ('Gordon', 'Trott', 3, 3)
    ('Filiberto', 'Edison', 1, 3); 
    
    