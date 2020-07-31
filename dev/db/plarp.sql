-- exported EVO DB structure, generated automatically by GenMyModel
-- DO NOT CHANGE IT MANUALLY!
--

-- function for drop all schemas
CREATE OR REPLACE FUNCTION drop_all () RETURNS VOID AS $$
   DECLARE rec RECORD;
   BEGIN
   -- Get all the schemas
    FOR rec IN
    SELECT DISTINCT schemaname
     FROM pg_catalog.pg_tables
     -- You can exclude the schema which you don't want to drop by adding another condition here
     WHERE
       schemaname NOT LIKE 'pg_%'
       AND schemaname NOT LIKE 'information_schema'
       LOOP
         EXECUTE 'DROP SCHEMA ' || rec.schemaname || ' CASCADE';
       END LOOP;
       RETURN;
   END;
   $$ LANGUAGE PLPGSQL;

-- drop all schemas
select drop_all();

-- Create schema
CREATE SCHEMA IF NOT EXISTS application;


CREATE SCHEMA IF NOT EXISTS player;


CREATE SCHEMA IF NOT EXISTS game;


CREATE SCHEMA IF NOT EXISTS organizing;



-- Create types
-- TYP TEXT se nevytvari

CREATE TYPE application.admin_level AS ENUM ('admin','editor','author');

-- Create tables
CREATE TABLE IF NOT EXISTS application.user
(
    ID SERIAL,
    first_name VARCHAR(255),
    surname VARCHAR(255),
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    admin_level application.admin_level DEFAULT 'author' NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('cet'::text, now()),
    updated_at timestamp without time zone,
    PRIMARY KEY(ID)
);



CREATE TABLE IF NOT EXISTS player.quality
(
    ID SERIAL,
    name VARCHAR(255),
    created_at timestamp without time zone DEFAULT timezone('cet'::text, now()),
    updated_at timestamp without time zone,
    PRIMARY KEY(ID)
);



CREATE TABLE IF NOT EXISTS player.player_x_quality
(
    ID SERIAL,
    id_player INTEGER,
    id_quality INTEGER,
    rate INTEGER,
    created_at timestamp without time zone DEFAULT timezone('cet'::text, now()),
    updated_at timestamp without time zone,
    PRIMARY KEY(ID)
);



CREATE TABLE IF NOT EXISTS player.player
(
    ID SERIAL,
    first_name VARCHAR(255),
    surname VARCHAR(255),
    nickname VARCHAR(255),
    email VARCHAR(255),
    fb VARCHAR(255),
    kids VARCHAR(255),
    id_character INTEGER,
    created_at timestamp without time zone DEFAULT timezone('cet'::text, now()),
    updated_at timestamp without time zone,
    PRIMARY KEY(ID)
);



CREATE TABLE IF NOT EXISTS game.character
(
    ID SERIAL,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    sandbox TEXT,
    org_note TEXT,
    summary_short TEXT,
    summary_long TEXT,
    equipment TEXT,
    id_user INTEGER,
    created_at timestamp without time zone DEFAULT timezone('cet'::text, now()),
    updated_at timestamp without time zone,
    PRIMARY KEY(ID)
);



CREATE TABLE IF NOT EXISTS game.involvement
(
    ID SERIAL,
    id_tail INTEGER,
    id_character INTEGER,
    description TEXT,
    sandbox TEXT,
    org_note TEXT,
    created_at timestamp without time zone DEFAULT timezone('cet'::text, now()),
    updated_at timestamp without time zone,
    PRIMARY KEY(ID)
);



CREATE TABLE IF NOT EXISTS game.tail
(
    ID SERIAL,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    sandbox TEXT,
    org_note TEXT,
    id_user INTEGER,
    created_at timestamp without time zone DEFAULT timezone('cet'::text, now()),
    updated_at timestamp without time zone,
    PRIMARY KEY(ID)
);



CREATE TABLE IF NOT EXISTS game.acquaintance
(
    ID SERIAL,
    id_character INTEGER,
    id_object INTEGER,
    description TEXT,
    sandbox TEXT,
    org_note TEXT,
    created_at timestamp without time zone DEFAULT timezone('cet'::text, now()),
    updated_at timestamp without time zone,
    PRIMARY KEY(ID)
);



CREATE TABLE IF NOT EXISTS game.event
(
    ID SERIAL,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    sandbox TEXT,
    org_note TEXT,
    game_time VARCHAR(255),
    created_at timestamp without time zone DEFAULT timezone('cet'::text, now()),
    updated_at timestamp without time zone,
    PRIMARY KEY(ID)
);



CREATE TABLE IF NOT EXISTS game.prop
(
    ID SERIAL,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    id_user INTEGER,
    created_at timestamp without time zone DEFAULT timezone('cet'::text, now()),
    updated_at timestamp without time zone,
    PRIMARY KEY(ID)
);



CREATE TABLE IF NOT EXISTS game.character_x_prop
(
    ID SERIAL,
    id_character INTEGER,
    id_prop INTEGER,
    created_at timestamp without time zone DEFAULT timezone('cet'::text, now()),
    updated_at timestamp without time zone,
    PRIMARY KEY(ID)
);



CREATE TABLE IF NOT EXISTS game.tail_x_prop
(
    ID SERIAL,
    id_tail INTEGER,
    id_prop INTEGER,
    created_at timestamp without time zone DEFAULT timezone('cet'::text, now()),
    updated_at timestamp without time zone,
    PRIMARY KEY(ID)
);



CREATE TABLE IF NOT EXISTS game.participation
(
    ID SERIAL,
    id_event INTEGER,
    id_character INTEGER,
    description TEXT,
    sandbox TEXT,
    org_note TEXT,
    created_at timestamp without time zone DEFAULT timezone('cet'::text, now()),
    updated_at timestamp without time zone,
    PRIMARY KEY(ID)
);



CREATE TABLE IF NOT EXISTS organizing.task
(
    ID SERIAL,
    id_user INTEGER,
    name VARCHAR(255),
    description TEXT,
    created_at timestamp without time zone DEFAULT timezone('cet'::text, now()),
    updated_at timestamp without time zone,
    PRIMARY KEY(ID)
);



CREATE TABLE IF NOT EXISTS organizing.tail_x_task
(
    ID SERIAL,
    id_tail INTEGER,
    id_task INTEGER,
    created_at timestamp without time zone DEFAULT timezone('cet'::text, now()),
    updated_at timestamp without time zone,
    PRIMARY KEY(ID)
);



CREATE TABLE IF NOT EXISTS organizing.prop_x_task
(
    ID SERIAL,
    id_prop INTEGER,
    id_task INTEGER,
    created_at timestamp without time zone DEFAULT timezone('cet'::text, now()),
    updated_at timestamp without time zone,
    PRIMARY KEY(ID)
);



CREATE TABLE IF NOT EXISTS organizing.acquaintance_x_task
(
    ID SERIAL,
    id_acquaintance INTEGER,
    id_task INTEGER,
    created_at timestamp without time zone DEFAULT timezone('cet'::text, now()),
    updated_at timestamp without time zone,
    PRIMARY KEY(ID)
);



CREATE TABLE IF NOT EXISTS organizing.character_x_task
(
    ID SERIAL,
    id_character INTEGER,
    id_task INTEGER,
    created_at timestamp without time zone DEFAULT timezone('cet'::text, now()),
    updated_at timestamp without time zone,
    PRIMARY KEY(ID)
);



CREATE TABLE IF NOT EXISTS organizing.event_x_task
(
    ID SERIAL,
    id_event INTEGER,
    id_task INTEGER,
    created_at timestamp without time zone DEFAULT timezone('cet'::text, now()),
    updated_at timestamp without time zone,
    PRIMARY KEY(ID)
);




-- Create FKs
ALTER TABLE game.character
    DROP CONSTRAINT IF EXISTS "character_id_user_fkey",
    ADD CONSTRAINT "character_id_user_fkey"
    FOREIGN KEY (id_user)
    REFERENCES application.user(ID)
    MATCH SIMPLE
;

ALTER TABLE game.tail
    DROP CONSTRAINT IF EXISTS "tail_id_user_fkey",
    ADD CONSTRAINT "tail_id_user_fkey"
    FOREIGN KEY (id_user)
    REFERENCES application.user(ID)
    MATCH SIMPLE
;

ALTER TABLE player.player_x_quality
    DROP CONSTRAINT IF EXISTS "player_x_quality_id_quality_fkey",
    ADD CONSTRAINT "player_x_quality_id_quality_fkey"
    FOREIGN KEY (id_quality)
    REFERENCES player.quality(ID)
    MATCH SIMPLE
;

ALTER TABLE player.player_x_quality
    DROP CONSTRAINT IF EXISTS "player_x_quality_id_player_fkey",
    ADD CONSTRAINT "player_x_quality_id_player_fkey"
    FOREIGN KEY (id_player)
    REFERENCES player.player(ID)
    MATCH SIMPLE
;

ALTER TABLE player.player
    DROP CONSTRAINT IF EXISTS "player_id_character_fkey",
    ADD CONSTRAINT "player_id_character_fkey"
    FOREIGN KEY (id_character)
    REFERENCES game.character(ID)
    MATCH SIMPLE
;

ALTER TABLE game.involvement
    DROP CONSTRAINT IF EXISTS "involvement_id_character_fkey",
    ADD CONSTRAINT "involvement_id_character_fkey"
    FOREIGN KEY (id_character)
    REFERENCES game.character(ID)
    MATCH SIMPLE
;

ALTER TABLE game.involvement
    DROP CONSTRAINT IF EXISTS "involvement_id_tail_fkey",
    ADD CONSTRAINT "involvement_id_tail_fkey"
    FOREIGN KEY (id_tail)
    REFERENCES game.tail(ID)
    MATCH SIMPLE
;

ALTER TABLE game.acquaintance
    DROP CONSTRAINT IF EXISTS "acquaintance_id_object_fkey",
    ADD CONSTRAINT "acquaintance_id_object_fkey"
    FOREIGN KEY (id_object)
    REFERENCES game.character(ID)
    MATCH SIMPLE
;

ALTER TABLE game.acquaintance
    DROP CONSTRAINT IF EXISTS "acquaintance_id_character_fkey",
    ADD CONSTRAINT "acquaintance_id_character_fkey"
    FOREIGN KEY (id_character)
    REFERENCES game.character(ID)
    MATCH SIMPLE
;

ALTER TABLE organizing.tail_x_task
    DROP CONSTRAINT IF EXISTS "tail_x_task_id_tail_fkey",
    ADD CONSTRAINT "tail_x_task_id_tail_fkey"
    FOREIGN KEY (id_tail)
    REFERENCES game.tail(ID)
    MATCH SIMPLE
;

ALTER TABLE organizing.tail_x_task
    DROP CONSTRAINT IF EXISTS "tail_x_task_id_task_fkey",
    ADD CONSTRAINT "tail_x_task_id_task_fkey"
    FOREIGN KEY (id_task)
    REFERENCES organizing.task(ID)
    MATCH SIMPLE
;

ALTER TABLE organizing.prop_x_task
    DROP CONSTRAINT IF EXISTS "prop_x_task_id_prop_fkey",
    ADD CONSTRAINT "prop_x_task_id_prop_fkey"
    FOREIGN KEY (id_prop)
    REFERENCES game.prop(ID)
    MATCH SIMPLE
;

ALTER TABLE organizing.prop_x_task
    DROP CONSTRAINT IF EXISTS "prop_x_task_id_task_fkey",
    ADD CONSTRAINT "prop_x_task_id_task_fkey"
    FOREIGN KEY (id_task)
    REFERENCES organizing.task(ID)
    MATCH SIMPLE
;

ALTER TABLE organizing.acquaintance_x_task
    DROP CONSTRAINT IF EXISTS "acquaintance_x_task_id_task_fkey",
    ADD CONSTRAINT "acquaintance_x_task_id_task_fkey"
    FOREIGN KEY (id_task)
    REFERENCES organizing.task(ID)
    MATCH SIMPLE
;

ALTER TABLE organizing.acquaintance_x_task
    DROP CONSTRAINT IF EXISTS "acquaintance_x_task_id_acquaintance_fkey",
    ADD CONSTRAINT "acquaintance_x_task_id_acquaintance_fkey"
    FOREIGN KEY (id_acquaintance)
    REFERENCES game.acquaintance(ID)
    MATCH SIMPLE
;

ALTER TABLE game.prop
    DROP CONSTRAINT IF EXISTS "prop_id_user_fkey",
    ADD CONSTRAINT "prop_id_user_fkey"
    FOREIGN KEY (id_user)
    REFERENCES application.user(ID)
    MATCH SIMPLE
;

ALTER TABLE organizing.task
    DROP CONSTRAINT IF EXISTS "task_id_user_fkey",
    ADD CONSTRAINT "task_id_user_fkey"
    FOREIGN KEY (id_user)
    REFERENCES application.user(ID)
    MATCH SIMPLE
;

ALTER TABLE game.character_x_prop
    DROP CONSTRAINT IF EXISTS "character_x_prop_id_character_fkey",
    ADD CONSTRAINT "character_x_prop_id_character_fkey"
    FOREIGN KEY (id_character)
    REFERENCES game.character(ID)
    MATCH SIMPLE
;

ALTER TABLE game.character_x_prop
    DROP CONSTRAINT IF EXISTS "character_x_prop_id_prop_fkey",
    ADD CONSTRAINT "character_x_prop_id_prop_fkey"
    FOREIGN KEY (id_prop)
    REFERENCES game.prop(ID)
    MATCH SIMPLE
;

ALTER TABLE game.tail_x_prop
    DROP CONSTRAINT IF EXISTS "tail_x_prop_id_tail_fkey",
    ADD CONSTRAINT "tail_x_prop_id_tail_fkey"
    FOREIGN KEY (id_tail)
    REFERENCES game.tail(ID)
    MATCH SIMPLE
;

ALTER TABLE game.tail_x_prop
    DROP CONSTRAINT IF EXISTS "tail_x_prop_id_prop_fkey",
    ADD CONSTRAINT "tail_x_prop_id_prop_fkey"
    FOREIGN KEY (id_prop)
    REFERENCES game.prop(ID)
    MATCH SIMPLE
;

ALTER TABLE organizing.character_x_task
    DROP CONSTRAINT IF EXISTS "character_x_task_id_task_fkey",
    ADD CONSTRAINT "character_x_task_id_task_fkey"
    FOREIGN KEY (id_task)
    REFERENCES organizing.task(ID)
    MATCH SIMPLE
;

ALTER TABLE organizing.character_x_task
    DROP CONSTRAINT IF EXISTS "character_x_task_id_character_fkey",
    ADD CONSTRAINT "character_x_task_id_character_fkey"
    FOREIGN KEY (id_character)
    REFERENCES game.character(ID)
    MATCH SIMPLE
;

ALTER TABLE organizing.event_x_task
    DROP CONSTRAINT IF EXISTS "event_x_task_id_event_fkey",
    ADD CONSTRAINT "event_x_task_id_event_fkey"
    FOREIGN KEY (id_event)
    REFERENCES game.event(ID)
    MATCH SIMPLE
;

ALTER TABLE organizing.event_x_task
    DROP CONSTRAINT IF EXISTS "event_x_task_id_task_fkey",
    ADD CONSTRAINT "event_x_task_id_task_fkey"
    FOREIGN KEY (id_task)
    REFERENCES organizing.task(ID)
    MATCH SIMPLE
;

ALTER TABLE game.participation
    DROP CONSTRAINT IF EXISTS "participation_id_character_fkey",
    ADD CONSTRAINT "participation_id_character_fkey"
    FOREIGN KEY (id_character)
    REFERENCES game.character(ID)
    MATCH SIMPLE
;

ALTER TABLE game.participation
    DROP CONSTRAINT IF EXISTS "participation_id_event_fkey",
    ADD CONSTRAINT "participation_id_event_fkey"
    FOREIGN KEY (id_event)
    REFERENCES game.event(ID)
    MATCH SIMPLE
;


-- Create Indexes

