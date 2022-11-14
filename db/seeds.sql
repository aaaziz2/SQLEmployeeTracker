INSERT INTO department(name)
VALUES ('Administration'),
('Sales'),
('Creative');

INSERT INTO role(title, salary, department_id)
VALUES  ('CEO', 300000, 1),
        ('VP', 150000, 1),
        ('Supervisor', 80000, 2),
        ('Associate', 50000, 2),
        ('Lead', 90000, 3),
        ('Intermediate', 70000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ('Stan','Lee',1, NULL),
        ('Steve','Ditko',2,1),
        ('Jack','Kirby',5,NULL),
        ('Peach','Momoko',6,3),
        ('Kevin','Feige',3,NULL),
        ('Joe','Quesada',4,5),
        ('John','Romita Jr',6,3),
        ('Alessandro','Cappuccio',6,3);
