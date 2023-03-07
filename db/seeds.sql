INSERT INTO department (name)
VALUES ('IT'), 
        ('Customer Service'), 
        ('Human Resources'), 
        ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES  ('IT Manager', 100000, 1),
        ('Help Desk Associate', 40000, 1),
        ('Customer Serice Manager', 50000, 2),
        ('Customer Service Rep', 30000, 2),
        ('Human Resources Manager', 90000, 3),
        ('Human Resources Agent', 65000, 3),
        ('Sales Manager', 85000, 4),
        ('Sales Associate', 70000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Stefan', 'Boon', 1, NULL),
        ('John', 'Gilbert', 2, 1),
        ('Tyler', 'Ryan', 3, NULL),
        ('Mitch', 'Donovan', 4, 3),
        ('Caroline', 'Judy', 5, NULL),
        ('Katherine', 'Pierce', 6, 5),
        ('Bonnie', 'Salommie', 7, NULL),
        ('Klaus', 'Claus', 8, 7);