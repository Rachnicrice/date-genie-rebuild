DROP TABLE IF EXISTS locations;
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  city VARCHAR (255),
  lat NUMERIC,
  long NUMERIC
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR (255),
  password VARCHAR (255),
  kids BOOLEAN,
  location INTEGER,
  todos VARCHAR,
  FOREIGN KEY (location) REFERENCES locations (id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS saved_dates;
CREATE TABLE saved_dates (
  id SERIAL PRIMARY KEY,
  user_is INTEGER,
  restaurant VARCHAR (255),
  budget VARCHAR(255),
  link_url VARCHAR,
  img_url VARCHAR,
  description VARCHAR,
  rating NUMERIC,
  address VARCHAR,
  phone VARCHAR,
  title VARCHAR (255),
  date_of VARCHAR(255),
  FOREIGN KEY (user_is) REFERENCES users (id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  date_is INTEGER,
  task VARCHAR (255),
  status BOOLEAN,
  FOREIGN KEY (date_is) REFERENCES saved_dates (id) ON DELETE CASCADE
);
