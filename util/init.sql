create table object(
    id INTEGER PRIMARY KEY,
    object text unique not null,
    type text DEFAULT "content",
    createtime   Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );

create table tag(
    id INTEGER PRIMARY KEY,
    name text unique not null
    );


-- create table tag_alias(
--     id int  primary key,
--     name text not null unique,
--     tagid int
-- );
create table relation(
    tagid int not null,
    objectid int not null,
    unique(tagid,objectid)
    );