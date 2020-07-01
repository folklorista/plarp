# bash commands

This is a list of bash commands, executed in order to create the project:

## Initialize all projects

Initialize git versioning

```bash
/var/www/plarp/
git init
```

Initialize new Angular project 

```bash
ng new plarp
```

Initialize new Loopback4 project

```bash
npm i -g @loopback/cli
lb4 app --applicationName plarp --description 'supportive tool for LARP organisers' --outdir api --yes plarp
```

## API: Add datasource

```bash
cd /var/www/plarp/api
npm install loopback-connector-postgresql --save
```

```bash
lb4 datasource --connector postgresql --config stdin << EOF
{
  "name": "development",
  "url": "",
  "host": "localhost",
  "port": 5432,
  "user": "plarp",
  "password": "plarp",
  "database": "plarp"
}
EOF
```

Build it to transpile new datasource

```bash
npm run build
```

## DB: create postgres users & database

```shell
sudo su postgres
```

This command will ask for password

```shell
createuser plarp --no-createdb --pwprompt --no-superuser --no-createrole
```

This command will ask for password

```shell
createuser plarp_ddl --no-createdb --pwprompt --no-superuser --no-createrole
```

```shell
/var/www/plarp/api/dev/scripts/recreate_db.sh plarp development
exit
```

## API: Discover models

```bash
cd /var/www/plarp/api
```

This commands will ask for database column naming convention. Select default option (camelCase).

```bash
lb4 discover --dataSource 'development' --views false --all --schema 'application'
```

This commands will ask for database column naming convention. Select default option (camelCase).

```bash
lb4 discover --dataSource 'development' --views false --all --schema 'game'
```

This commands will ask for database column naming convention. Select default option (camelCase).

```bash
lb4 discover --dataSource 'development' --views false --all --schema 'organizing'
```

This commands will ask for database column naming convention. Select default option (camelCase).

```bash
lb4 discover --dataSource 'development' --views false --all --schema 'player'
```

After all, regenerate barrel file `api/src/models/index.ts`!

## API: Generate lb4 structures

### lb4 repositories
```bash
cd /var/www/plarp/api
```

This command will ask for selecting models. You can select all by pressing `<a>` key.

```bash
lb4 repository --datasource 'development'
```

## lb4 controllers

```bash
lb4 controller 'acquaintance'
```

```bash
lb4 controller 'event'
```

```bash
lb4 controller 'character'
```

```bash
lb4 controller 'involvement'
```

```bash
lb4 controller 'participation'
```

```bash
lb4 controller 'player'
```

```bash
lb4 controller 'prop'
```

```bash
lb4 controller 'quality'
```

```bash
lb4 controller 'tail'
```

```bash
lb4 controller 'task'
```

```bash
lb4 controller 'user'
```

```bash
lb4 controller 'acquintanceXTask'
```

```bash
lb4 controller 'eventXTask'
```

```bash
lb4 controller 'characterXProp'
```

```bash
lb4 controller 'characterXTask'
```

```bash
lb4 controller 'playerXQuality'
```

```bash
lb4 controller 'propXTask'
```

```bash
lb4 controller 'tailXProp'
```

```bash
lb4 controller 'tailXTask'
```

## Cross-table lb4 relations

```bash
lb4 relation \
--sourceModel='CharacterXProp' \
--destinationModel='Character' \
--foreignKeyName='idCharacter' \
--relationType='belongsTo' \
--relationName='character'
```

```bash
lb4 relation \
--sourceModel='Character' \
--destinationModel='CharacterXProp' \
--foreignKeyName='idCharacter' \
--relationType='hasMany' \
--relationName='characterXPropArray'
```

```bash
lb4 relation \
--sourceModel='CharacterXProp' \
--destinationModel='Prop' \
--foreignKeyName='idProp' \
--relationType='belongsTo' \
--relationName='prop'
```

```bash
lb4 relation \
--sourceModel='Prop' \
--destinationModel='CharacterXProp' \
--foreignKeyName='idProp' \
--relationType='hasMany' \
--relationName='characterXPropArray'
```
