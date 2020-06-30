INSERT INTO "application"."user" ("id", "first_name", "surname", "username", "password", "admin_level", "created_at", "updated_at") VALUES
(1,	'admin',	'admin',	'stana@folklorista.cz',	'$2y$10$7kIomHF6nZ2WZ.HdvGi.sueeKZIV8SW4INSX31mpTNl7ehKwMpfHW',	'admin',	'2019-06-10 16:06:35',	NULL);

INSERT INTO "player"."quality" ("id", "name", "created_at", "updated_at") VALUES
(1,	'politika',	NOW(),	NULL),
(2,	'imerze',	NOW(),	NULL),
(3,	'náboženství',	NOW(),	NULL),
(4,	'romance',	NOW(),	NULL);
