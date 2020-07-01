INSERT INTO "application"."user" ("id", "first_name", "surname", "username", "password", "admin_level", "created_at", "updated_at") VALUES
(2,	'Jiří',	'Kašpárek',	'kasparek@dudr.cz',	'$2y$10$YeYK9UH5tivQ92XWR9Rp0.et2yM8waWY8RT4Ub.AgKbpAAiqR4a.u',	'admin',	'2019-07-10 17:42:21',	NULL),
(3,	'Vendula',	'Borůvková',	'vendulala@email.cz',	'$2y$10$j7G50fsSMAc5NRdPioAeZudS4PiYfbWhxzgKzCyXaVM2gp/Er0wW.',	'author',	'2019-07-12 11:56:12',	NULL);

INSERT INTO "game"."character" ("id", "name", "description", "sandbox", "org_note", "summary_short", "summary_long", "equipment", "id_user", "created_at", "updated_at") VALUES
(1,	'Valentio Piozzi',	'Bývalý voják. U Loredanů začínal jako osobní ochranka. Za ta léta služby se s knížetem velmi sblížil. Natolik, že jej kníže, i přes velký rozdíl ve společenském postavení, bere skoro jako sobě rovného. Valentino ví, že přes všechno přátelství si musí zachovávat určitý společenský odstup. Nikdy by svým chováním neuvedl knížete do rozpaků, ani nezpůsobil žádný skandál.
Okolí jej vnímá jako tichého a velmi uvážlivého muže. Valentino je uzavřený, samota mu vyhovuje. Možná to vypadá, že předčasně zestárl, ale to je jen maska. Pořád je ještě rychlý a nebezpečný, jen to nedává najevo. Zakládá si na striktním, i když poměrně netradičním morálním kodexu. Se stářím ale přicházejí pochyby a bilancování.
',	'poznámky z pískoviště',	'Postava může v závislosti na hře „řešit“ problémy poněkud silově. Také si ale projde morálním vývojem. Není ideální pro upovídané jedince.',	'Bývalý voják.',	'tichý a velmi uvážlivý muž',	'vybavení - měšec?',	2,	'2020-06-30 13:10:45.590753',	NULL),
(2,	'hrabě Enrico Loredan',	'Syn knížete Loredana. Mladý, pohledný, bystrý a velmi ambiciózní mladík. Jako dítě dostal cokoli, co si zamanul – snad jen krom pozornosti svého otce. Doma muselo být vždy vše podle přání starého knížete, a tak je cesta do Florie pro Enrica nejen příslibem nových zážitků, ale i šancí na zásadní změnu. Protože všechno to, na čem jeho konzervativní otec lpí, připadá Enricovi zkostnatělé, zbytečné a překonané. Zakládá si na tom, že má moderní názory a neuznává společenské předsudky svého otce. Ale nezávazné teoretizování nikdy nikoho nic nestálo. A Enrico bude muset možná vůbec poprvé bojovat za své poněkud radikální a snad i trochu romantické názory. A právo na vlastní život a vlastní rozhodnutí. Protože kníže Pancrazio nesadqwdqjspíš předpokládá, že na starém kontinentě synovi okamžitě organizuje další budoucnost – včetně toho, co a kde bude dělat a s kým by měla rodina obnovit styky a uzavřít nová cenná spojenectví – nejlépe pomocí sňatkové politiky.',	NULL,	'Hra o sebeurčení, plná komplikovaných rodinných vztahů.',	'Syn knížete Loredana.',	'Mladý, pohledný, bystrý a velmi ambiciózní mladík.',	NULL,	NULL,	NULL,	NULL);

INSERT INTO "game"."acquaintance" ("id", "id_character", "id_object", "description", "sandbox", "org_note", "created_at", "updated_at") VALUES
(1,	1,	2,	'Mladý pán si vůbec neváží toho co otec vybudoval. Jen by si užíval a rozhazoval plnými hrstmi. A teď ten podezřelý klub gentlemanů. Navenek je vše v pořádku, ale myslím že za tím něco je. proč jinak by se Mladý Enrico tdo něj tak hrnul? Mezi ty staré továrníky? To přeci není jeho styl.',	NULL,	NULL,	NULL,	NULL),
(2,	2,	1,	'V tom starém lišákovi je víc než se na první pohled vypadá. Zajímalo by mě, proč tak moc drží s otcem. Určitě v tom nebude jen ta nudná historka se záchranou života. Kdo by to tak mohl vědět?',	'toto hje test',	NULL,	NULL,	NULL);

INSERT INTO "game"."tail" ("id", "name", "description", "sandbox", "org_note", "id_user", "created_at", "updated_at") VALUES
(1,	'Loredan Enricovi',	'Enrico! Kde je zase ten kluk? Lotr zatracen&yacute;! Kdyby to nebyl můj syn, nechal bych ho spr&aacute;skat. To m&aacute; po matce, ta byla zrovna takov&aacute;. Ničeho si ti mlad&iacute; nev&aacute;ž&iacute;. Mysl&iacute; si, že Flor&eacute;ny padaj&iacute; z nebe. Mysl&iacute; si, že to nic nestoj&iacute;, pozvat mistra mal&iacute;řsk&eacute;ho. Mlad&eacute;mu p&aacute;novi je ale zatěžko i jen chv&iacute;li posedět a nechat si dokončit portr&eacute;t.Při Arianině trpělivosti př&iacute;sah&aacute;m, že kdybych měl jin&eacute;ho dědice, kdyby byl jin&yacute; Loredan, kter&yacute; by mohl po mě převz&iacute;t t&iacute;hu kn&iacute;žectv&iacute;, vyrazil bych toho ničemu z domu. P&aacute;r let na vlastn&iacute;ch noh&aacute;ch by ho naučilo, co je zodpovědnost.Ale j&aacute; v&iacute;m jak na něj. Ve Florii se kluk ožen&iacute;. Vezme si ř&aacute;dnou d&iacute;vku, s poř&aacute;dn&yacute;m věnem, dceru někoho, koho mu j&aacute; urč&iacute;m a kter&aacute; už ho postav&iacute; do latě. Ž&aacute;dn&eacute; vysed&aacute;v&aacute;n&iacute; po hospod&aacute;ch, ž&aacute;dn&eacute; z&aacute;vody plachetnic, ž&aacute;dn&eacute; s&aacute;zen&iacute; na koně. Jednou je hrabě, tak se tak začne chovat.&nbsp; Enrico! Ozvi se, ať tě můžu vytahat za u&scaron;i',	NULL,	'<p>hr&aacute;čova invence</p>',	NULL,	NULL,	NULL);

INSERT INTO "game"."involvement" ("id", "id_tail", "id_character", "description", "sandbox", "org_note", "created_at", "updated_at") VALUES
(1,	1,	2,	'',	'popis zapojení do příběhu',	NULL,	NULL,	NULL);

INSERT INTO "player"."player" ("id", "first_name", "surname", "nickname", "email", "fb", "kids", "id_character", "created_at", "updated_at") VALUES
(1,	'Jan',	'Štastný',	'Cuchu',	'jan.stastny@florie.cz',	NULL,	NULL,	1,	'2019-07-12 14:10:15',	NULL);

INSERT INTO "player"."player_x_quality" ("id", "id_player", "id_quality", "rate", "created_at", "updated_at") VALUES
(1,	1,	1,	8,	NULL,	NULL),
(2,	1,	2,	7,	NULL,	NULL);