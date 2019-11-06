DROP TABLE IF EXISTS locations;
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  city VARCHAR (255),
  lat NUMERIC,
  long NUMERIC
);

DROP TABLE IF EXISTS saved_dates;
CREATE TABLE saved_dates (
  id SERIAL PRIMARY KEY,
  restaurant VARCHAR (255),
  budget NUMERIC,
  link_url VARCHAR,
  img_url VARCHAR,
  description VARCHAR,
  rating NUMERIC,
  address VARCHAR,
  phone VARCHAR
);

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR (255),
  password VARCHAR (255),
  saved_dates INTEGER,
  kids BOOLEAN,
  location INTEGER,
  todos VARCHAR,
  FOREIGN KEY (saved_dates) REFERENCES saved_dates (id) ON DELETE CASCADE,
  FOREIGN KEY (location) REFERENCES locations (id) ON DELETE CASCADE
);
