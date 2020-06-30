#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

error () {
  local message="$1"
  local entity="$2"

  local red='\e[31m'
  local highlight='\e[91m'
  local reset='\e[0m' # No Color

  echo -en "${red}${message}"
  if [ ! -z ${entity} ]; then echo -en " ${highlight}${entity}${reset}"; fi
  echo -e ". ${red}Script interrupted.${reset}" && exit
}

require_variable() {
  local variable_name="$1"

  [ -z ${!variable_name} ] && error "Variable required:" ${variable_name}
}

POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"
case $key in
    --help|-h)
      echo 'Usage:'
      echo '- `generate_privileges.sh --user "evo" --db "evo_dev"'
      echo '- `generate_privileges.sh -u "evo" -d "evo"'
      exit;
    ;;
    --user|-u)
      USER_NAME=$2
      shift
      shift
    ;;
    --db|-db)
      DATABASE_NAME=$2
      shift
      shift
    ;;
    --verbose|-v)
      VERBOSE=true
      echo -e "[verbose mode]"
      shift
    ;;
    *) # unknown option
      POSITIONAL+=("$1") # save it in an array for later
      shift
    ;;
esac
done
set -- "${POSITIONAL[@]}" # restore positional parameters

require_variable "DATABASE_NAME"
require_variable "USER_NAME"

psql -d "${DATABASE_NAME}" -U "${USER_NAME}_ddl" -t -c "SELECT 'GRANT USAGE ON SCHEMA ' || nspname || ' TO ${USER_NAME};' \
FROM pg_catalog.pg_namespace \
JOIN pg_catalog.pg_user ON (pg_catalog.pg_namespace.nspowner = pg_catalog.pg_user.usesysid) \
WHERE pg_catalog.pg_user.usename = '${USER_NAME}_ddl';" | tr '\n' ' ' | xargs -I {} -t /usr/bin/psql -d "${DATABASE_NAME}" -U "${USER_NAME}_ddl" -t -c "{}"

psql -d "${DATABASE_NAME}" -U "${USER_NAME}_ddl" -t -c "SELECT 'GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA ' || nspname || ' TO ${USER_NAME};'
FROM pg_catalog.pg_namespace
JOIN pg_catalog.pg_user ON (pg_catalog.pg_namespace.nspowner = pg_catalog.pg_user.usesysid)
WHERE pg_catalog.pg_user.usename = '${USER_NAME}_ddl';" | tr '\n' ' ' | xargs -I {} -t /usr/bin/psql -d "${DATABASE_NAME}" -U "${USER_NAME}_ddl" -t -c "{}"

psql -d "${DATABASE_NAME}" -U "${USER_NAME}_ddl" -t -c "SELECT 'GRANT USAGE ON ALL SEQUENCES IN SCHEMA ' || nspname || ' TO ${USER_NAME};'
FROM pg_catalog.pg_namespace
JOIN pg_catalog.pg_user ON (pg_catalog.pg_namespace.nspowner = pg_catalog.pg_user.usesysid)
WHERE pg_catalog.pg_user.usename = '${USER_NAME}_ddl';" | tr '\n' ' ' | xargs -I {} -t /usr/bin/psql -d "${DATABASE_NAME}" -U "${USER_NAME}_ddl" -t -c "{}"
