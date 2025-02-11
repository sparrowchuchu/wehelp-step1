INSERT INTO member (name, username, password)
VALUES("test", "test", "test");

-- Inserting 4 additional rows with arbitrary data
INSERT INTO member (name, username, password, follower_count)
VALUES ('Alice', 'alice123', 'password1', 50),
       ('Bob', 'bob456', 'password2', 120),
       ('Charlie', 'charlie789', 'password3', 75),
       ('David', 'david101', 'password4', 0);

SELECT * FROM member;
SELECT * FROM member ORDER BY time DESC;
SELECT * FROM member ORDER BY time DESC LIMIT 3 OFFSET 1;
SELECT * FROM member WHERE username = "test";
SELECT * FROM member WHERE name LIKE "%es%";
SELECT * FROM member WHERE username = "test" AND password = "test";

SET SQL_SAFE_UPDATES=0;
UPDATE member SET name = "test2" WHERE username = "test";
SET SQL_SAFE_UPDATES=1;




