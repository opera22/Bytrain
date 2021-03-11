CREATE TABLE users (userId VARCHAR(64) PRIMARY KEY NOT NULL, username VARCHAR(24) NOT NULL, datejoined TIMESTAMPTZ NOT NULL);

INSERT INTO users (userId, username, datejoined) VALUES ('45fe9975', 'mike96', now());

CREATE TABLE videos (videoId VARCHAR(64) PRIMARY KEY NOT NULL, title TEXT NOT NULL, description TEXT, path TEXT NOT NULL, thumbnail TEXT NOT NULL, userId VARCHAR(64) NOT NULL, dateposted TIMESTAMPTZ NOT NULL, CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES users(userId));

INSERT INTO videos (videoId, title, description, path, thumbnail, userId, dateposted) VALUES ('8dc8780a', 'AEUHHH', 'Tim Allen grunts. Credit goes to Marisa Kirisame on YouTube.', './videos/AEUHHH.mp4', 'https://i.imgur.com/Gvo9ocU.png', '45fe9975', now());

CREATE TABLE comments (commentId VARCHAR(64) PRIMARY KEY NOT NULL, content TEXT NOT NULL, userId VARCHAR(64) NOT NULL, dateposted TIMESTAMPTZ NOT NULL, CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES users(userId));

INSERT INTO comments (commentId, content, userId, dateposted) VALUES ('8d3b780a', 'great video, thanks', '45fe9975', now());

INSERT INTO videos (videoId, title, description, path, thumbnail, userId, dateposted) VALUES ('94cf5d86', 'Invierno Porteño -  Astor Piazzolla (Piano Solo)', 'Credit goes to ATuttoPiano on YouTube.', './videos/inviernoporteno.mp4', 'https://i.imgur.com/1V76poG.png', '45fe9975', now());

INSERT INTO videos (videoId, title, description, path, thumbnail, userId, dateposted) VALUES ('b2ce3ad3', 'A Walk Through the Louvre', 'Credit goes to the Explore France channel on YouTube.', './videos/walkthroughlouvre.mp4', 'hhttps://i.imgur.com/sHlxECV.png', '45fe9975', now());
