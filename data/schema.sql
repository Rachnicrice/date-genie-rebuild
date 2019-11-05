DROP TABLE location;
CREATE TABLE location (
  id SERIAL PRIMARY KEY,
  city VARCHAR (255),
  lat NUMERIC,
  long NUMERIC
);

INSERT INTO location(city,lat,long)
VALUES('Seattle', '47.6062', '122.3321');

DROP TABLE user;
CREATE TABLE user (
  id SERIAL PRIMARY KEY,
  username VARCHAR (255),
  password VARCHAR (255),
  saved_dates INTEGER,
  kids BOOLEAN,
  location INTEGER,
  todos VARCHAR,
  FOREIGN KEY (saved_dates) REFERENCES saved_dates (id),
  FOREIGN KEY (location) REFERENCES location(id)
);

INSERT INTO user(username, password, saved_dates, kids, location, todos)
VALUES('crummy', 'notCrumby', '1', 'true', '1', 'blahdiddy, blah doddy' );

DROP TABLE saved_dates;
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

INSERT INTO saved_dates(restaurant, budget, link_url, img_url, description, rating, address, phone)
VALUES('McDonalds', '60', 'https://www.mcdonalds.com', 'https://www.mcdonalds.com/is/image/content/dam/usa/nfl/assets/promo/HP_3Col_Nutrition_Calculator_760x508.jpg?$Publication_Three_Column_Desktop$', 'yummy, yummy in my tummy.', '10/5','123 easy street', '876-5309');