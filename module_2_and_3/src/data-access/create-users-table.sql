create table users (
    user_id serial primary key,
    login varchar (50) unique not null,
    password varchar (50) not null,
    age integer not null,
    is_deleted boolean default '0'
);

insert into users (login, password, age) values ('starky', 'pass', 25);
insert into users (login, password, age) values ('Vika', 'passStrong', 25);
insert into users (login, password, age) values ('Alexander', 'passWeak', 25);
insert into users (login, password, age) values ('Andrei', 'passSuperStrong', 30);