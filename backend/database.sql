CREATE DATABASE groupnetwork;

CREATE TABLE Users(
'user_id' SERIAL NOT NULL PRIMARY KEY,
'email' VARCHAR(255) NOT NULL UNIQUE KEY,
'password' BINARY(60) NOT NULL,
'first_name' VARCHAR(255) NOT NULL,
'last_name' VARCHAR(255) NOT NULL,
'gender' VARCHAR(100) NULL,
'country_of_birth' VARCHAR(255) NULL,
'profile_picture_url' VARCHAR(255) NULL,
'birth_date' VARCHAR(255) NULL
);


CREATE TABLE Posts(
'post_id' SERIAL NOT NULL PRIMARY KEY,
'user_id' INT(20) NOT NULL FOREIGN KEY REFERENCES User('user_id')
'caption' VARCHAR(255) NULL,
'imageUrl' VARCHAR(255) NULL
'date_created' DATE NOT NULL,
'date_updated' DATE NULL
);


CREATE TABLE Comments(
'comment_id' SERIAL NOT NULL PRIMARY KEY,
'post_id' INT(20) NOT NULL FOREIGN KEY REFERENCES Posts('post_id'),
'user_id' INT(20) NOT NULL FOREIGN KEY REFERENCES Users('user_id'),
'content' TEXT NOT NULL,
'date_created' DATE NOT NULL,
'date_updated' DATE NULL
);

CREATE TABLE Likes(
'user_id' INT(20) NOT NULL FOREIGN KEY REFERENCES Users('user_id'),
'post_id' INT(20) NOT NULL FOREIGN KEY REFERENCES Posts('post_id')
'likes' INT(20) NULL
);