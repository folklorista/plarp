#!/bin/bash

# Regenerování struktury databáze ze souboru
# POZOR! Smaže veškerá data v databázi

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

HELP_USAGE_PARAMETERS="--verbose|-v <\"production\"|\"development\">"
HELP_EXAMPLE_PARAMETERS="\"production\""

. ${SCRIPT_DIR}/common_functions.sh

load_lb4_config() {
  local config_type="$1"

  if [ -z ${config_type} ]; then
    config_type="production"
  fi

  local config=`cat "${SCRIPT_DIR}/../../api/src/datasources/${config_type}.datasource.ts"`

  pat="database: '([^']*)'"
  [[ "$config" =~ $pat ]] # $pat must be unquoted
  DATABASE_NAME="${BASH_REMATCH[1]}"

  pat="user: '([^']*)'"
  [[ "$config" =~ $pat ]] # $pat must be unquoted
  USER_NAME="${BASH_REMATCH[1]}"

  pat="password: '([^']*)'"
  [[ "$config" =~ $pat ]] # $pat must be unquoted
  USER_PASSWORD="${BASH_REMATCH[1]}"
}

POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"
case $key in
    --help|-h)
      help
      exit
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

PROJECT_NAME=$1
load_lb4_config $2

LOG_FILE="/tmp/${PROJECT_NAME}.recreate_db.log"

require_variable "DATABASE_NAME"

confirm "Opravdu chcete pokračovat? Skript smaže celou databázi" "${DATABASE_NAME}" || error "Přerušeno uživatelem"

truncate -s 0 "${LOG_FILE}"

label 'Log:' "${LOG_FILE}"

label 'Smazání a vytvoření databáze'
dropdb "${DATABASE_NAME}"
createdb "${DATABASE_NAME}" --owner=${USER_NAME} 1>>"${LOG_FILE}" 2> >(tee >(cat 1>&2))
status "OK"

label "Přístupová práva uživatele" "${USER_NAME}"
psql -d "${DATABASE_NAME}" -c "GRANT ALL PRIVILEGES ON DATABASE "${DATABASE_NAME}" TO ${USER_NAME};" 1>>"${LOG_FILE}" 2> >(tee >(cat 1>&2))
status "OK"

label "Nahrání struktury ze souboru" "${PROJECT_NAME}.sql"
psql -U ${USER_NAME} -d "${DATABASE_NAME}" < ${SCRIPT_DIR}/../db/${PROJECT_NAME}.sql 1>>"${LOG_FILE}" 2> >(tee >(cat 1>&2))
status "OK"

label "Vygenerování privilegií pro uživatele" "${USER_NAME}"
${SCRIPT_DIR}/generate_privileges.sh --db "${DATABASE_NAME}" --user "${USER_NAME}" 1>>"${LOG_FILE}" 2> >(tee >(cat 1>&2))
status "OK"

label 'Nahrání výchozích dat'
psql -U "${USER_NAME}" -d "${DATABASE_NAME}" < ${SCRIPT_DIR}/../db/data-default.sql 1>>"${LOG_FILE}" 2> >(tee >(cat 1>&2))
status "OK"


label 'Nahrání vzorových dat'
psql -U "${USER_NAME}" -d "${DATABASE_NAME}" < ${SCRIPT_DIR}/../db/data-demo.sql 1>>"${LOG_FILE}" 2> >(tee >(cat 1>&2))
status "OK"
#status "skipped" true

label 'Nastavení PostgreSQL rozšíření dblink'
psql -d "${DATABASE_NAME}" -c "CREATE EXTENSION dblink;" 1>>"${LOG_FILE}" 2> >(tee >(cat 1>&2))
psql -d "${DATABASE_NAME}" -c "CREATE SERVER server_"${DATABASE_NAME}"_remote FOREIGN DATA WRAPPER dblink_fdw OPTIONS (host 'localhost', dbname '"${DATABASE_NAME}"', port '5432');" 1>>"${LOG_FILE}" 2> >(tee >(cat 1>&2))
psql -d "${DATABASE_NAME}" -c "CREATE USER MAPPING FOR "${USER_NAME}" SERVER server_"${DATABASE_NAME}"_remote OPTIONS (user '${USER_NAME}', password '${USER_PASSWORD}');" 1>>"${LOG_FILE}" 2> >(tee >(cat 1>&2))
psql -d "${DATABASE_NAME}" -c "GRANT USAGE ON FOREIGN SERVER server_"${DATABASE_NAME}"_remote TO "${USER_NAME}";" 1>>"${LOG_FILE}" 2> >(tee >(cat 1>&2))
status "OK"
