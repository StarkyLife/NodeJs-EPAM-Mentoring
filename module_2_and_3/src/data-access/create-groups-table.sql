CREATE TYPE permissionType AS ENUM ('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES');

create table groups (
    id serial primary key,
    name varchar (255) not null,
    permissions permissionType[]
);

insert into groups (name, permissions) values ('admins', '{READ, WRITE, DELETE, SHARE, UPLOAD_FILES}');
insert into groups (name, permissions) values ('developers', '{READ, WRITE}');
insert into groups (name, permissions) values ('users', '{READ}');
