/* USERS */

create table users (
    id serial primary key,
    login varchar (50) unique not null,
    password varchar (50) not null,
    age integer not null,
    is_deleted boolean default '0'
);

insert into users (login, password, age) values ('starky', 'pass', 25);
insert into users (login, password, age) values ('Vika', 'passStrong', 25);
insert into users (login, password, age) values ('Alexander', 'passWeak', 25);
insert into users (login, password, age) values ('Andrei', 'passSuperStrong', 30);

/* GROUPS */

CREATE TYPE permissionType AS ENUM ('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES');

create table groups (
    id serial primary key,
    name varchar (255) not null,
    permissions permissionType[]
);

insert into groups (name, permissions) values ('admins', '{READ, WRITE, DELETE, SHARE, UPLOAD_FILES}');
insert into groups (name, permissions) values ('developers', '{READ, WRITE}');
insert into groups (name, permissions) values ('users', '{READ}');

/* USERS-GROUPS */

create table users_groups (
    id serial primary key,
    user_id serial references users(id) on delete cascade,
    group_id serial references groups(id) on delete cascade
);

insert into users_groups (user_id, group_id) values (1, 1);
