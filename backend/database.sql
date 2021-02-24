CREATE TABLE users(
user_id uuid NOT NULL DEFAULT
uuid_generate_v4(),
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
gender VARCHAR(100) NULL,
country_of_birth VARCHAR(255) NULL,
profile_picture_url VARCHAR(255) NULL,
birth_date VARCHAR(255) NULL,
PRIMARY KEY (user_id),
UNIQUE (email)
);

CREATE TABLE posts(
post_id SERIAL NOT NULL PRIMARY KEY,
user_id uuid,
caption VARCHAR(255) NULL,
image_url VARCHAR(255) NULL,
date_created DATE NOT NULL,
date_updated DATE NULL,
CONSTRAINT fk_user
 FOREIGN KEY (user_id)
  REFERENCES users(user_id)
   ON DELETE CASCADE
);

CREATE TABLE user_read(
user_id uuid,
post_id INT,
CONSTRAINT fk_user
 FOREIGN KEY (user_id)
  REFERENCES users(user_id)
   ON DELETE CASCADE,
CONSTRAINT fk_post
 FOREIGN KEY (post_id)
  REFERENCES posts(post_id)
   ON DELETE CASCADE
);