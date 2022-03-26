CREATE TABLE users (
  id serial primary key,
  name varchar(100) not null,
  email varchar(150) not null,
  password varchar(50) not null
  );


CREATE TABLE movie(
  id serial primary key,
  title varchar(100) not null,
  description varchar(1000) not null,
  user_id integer not null,
  foreign key (user_id) references users (id),
  genderId integer not null,
  foreign key (genderId) references gender (id)
);

CREATE TABLE gender(
  id serial primary key,
  name VARCHAR(100)
);