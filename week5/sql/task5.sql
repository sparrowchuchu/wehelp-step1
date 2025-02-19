USE website;
CREATE TABLE message(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	member_id BIGINT NOT NULL,
	content VARCHAR(255) NOT NULL,
	like_count INT UNSIGNED NOT NULL DEFAULT 0,
	time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES member(id)
);

-- Inserting 4 additional rows with arbitrary data
INSERT INTO message (member_id, content, like_count)
VALUES ('2', 'message1', 50),
       ('3', 'message2', 120),
       ('2', 'message3', 75),
       ('1', 'message4', 0);

SELECT m.id AS message_id, m.content, m.like_count, m.time, mem.name AS sender_name
FROM message m
JOIN member mem ON m.member_id = mem.id;

SELECT m.id AS message_id, m.content, m.like_count, m.time, mem.name AS sender_name
FROM message m
JOIN member mem ON m.member_id = mem.id
WHERE mem.username = "test";

SELECT AVG(m.like_count) AS avg_like_count
FROM message m
JOIN member mem ON m.member_id = mem.id
WHERE mem.username = "test";

SELECT mem.username, AVG(m.like_count) AS avg_like_count
FROM message m
JOIN member mem ON m.member_id = mem.id
GROUP BY mem.username;



