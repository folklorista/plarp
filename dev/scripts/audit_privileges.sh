#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

label () {
  local action="$1"
  local entity="$2"
  local non_waiting="$3"

  local highlight='\e[33m'
  local default='\e[36m'
  local reset='\e[0m' # No Color

  echo -en "${default}- ${action}"

  if [ ! -z ${entity} ]; then echo -en " ${highlight}${entity}${reset}"; fi

  if [ ! ${VERBOSE} = "true" ] && [ -z ${non_waiting} ]; then
    echo -en "${default}...${reset}"
  else
    echo -e "${reset}"
  fi
}

verbose () {
  local action="$1"
  local entity="$2"
  local waiting="$3"

  local dim='\e[2m'
  local highlight='\e[33m'
  local default='\e[39m'
  local reset='\e[0m' # No Color

  if [ ! ${VERBOSE} = "true" ]; then
    return
  fi

  echo -en "${dim}${default}  - ${action}"

  if [ ! -z "${entity}" ]; then echo -en " ${highlight}${entity}${reset}"; fi

  if [ ! -z ${waiting} ]; then
    echo -en "${default}...${reset}"
  else
    echo -e "${reset}"
  fi
}

status () {
  local status="$1"
  local warning="$2"
  local verbose="$3"

  local green='\e[32m'
  local orange='\e[38;5;166m'
  local reset='\e[0m' # No Color

  if [ ! -z ${verbose} ] && [ ! ${VERBOSE} = "true" ]; then
    return
  fi

  if [ -z ${warning} ]|| [ "${warning}" = false ]; then
    echo -e "${green}${status}${reset}"
  else
    echo -e "${orange}${status}${reset}"
  fi
}

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

  [ -z ${!variable_name} ] && help && error "Variable required:" ${variable_name}
}

help() {
  local orange='\e[38;5;166m'
  local reset='\e[0m' # No Color
  echo -e "Usage: ${orange}$(basename "$0") \e[3m\"<database name>\"\e[0m${reset}"
  echo -e "- f.e. ${orange}$(basename "$0") "evo"${reset}"
}

POSITIONAL=()
while [[ $# -gt 0 ]]
do
key="$1"
case $key in
    --help|-h)
      help
      exit;
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

DATABASE_NAME=$1

require_variable "DATABASE_NAME"

label "Vytvoření auditního uživatele" "evo_audit"
if $(createuser evo_audit --no-createdb --pwprompt --no-superuser --no-createrole); then status "OK"; fi

label "Vygenerování privilegií pro auditního uživatele" "evo_audit"

psql -d "${DATABASE_NAME}" -c "GRANT ALL PRIVILEGES ON SCHEMA audit TO evo_audit;"

psql -d "${DATABASE_NAME}" -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA audit TO evo_audit;"

psql -d "${DATABASE_NAME}" -U evo_ddl -t -c "SELECT 'GRANT USAGE ON SCHEMA ' || nspname || ' TO evo_audit;' \
FROM pg_catalog.pg_namespace \
JOIN pg_catalog.pg_user ON (pg_catalog.pg_namespace.nspowner = pg_catalog.pg_user.usesysid) \
WHERE pg_catalog.pg_user.usename = 'evo_ddl';" | tr '\n' ' ' | xargs -I {} -t /usr/bin/psql -d "${DATABASE_NAME}" -U evo_ddl -t -c "{}"

psql -d "${DATABASE_NAME}" -U evo_ddl -t -c "SELECT 'GRANT TRIGGER ON ALL TABLES IN SCHEMA ' || nspname || ' TO evo_audit;' \
FROM pg_catalog.pg_namespace \
JOIN pg_catalog.pg_user ON (pg_catalog.pg_namespace.nspowner = pg_catalog.pg_user.usesysid) \
WHERE pg_catalog.pg_user.usename = 'evo_ddl';" | tr '\n' ' ' | xargs -I {} -t /usr/bin/psql -d "${DATABASE_NAME}" -U evo_ddl -t -c "{}"

psql -d "${DATABASE_NAME}" -U evo_ddl -t -c "SELECT 'GRANT USAGE ON ALL SEQUENCES IN SCHEMA ' || nspname || ' TO evo_audit;' \
FROM pg_catalog.pg_namespace \
JOIN pg_catalog.pg_user ON (pg_catalog.pg_namespace.nspowner = pg_catalog.pg_user.usesysid) \
WHERE pg_catalog.pg_user.usename = 'evo_ddl';" | tr '\n' ' ' | xargs -I {} -t /usr/bin/psql -d "${DATABASE_NAME}" -U evo_ddl -t -c "{}"

status "OK"

label "Vygenerování privilegií pro běžného uživatele" "evo"
verbose "Aby mohl běžný uživatel nahlížet do historie, je nutné mu zpřístupnit tabulky schématu" "audit"
psql -d "${DATABASE_NAME}" -c "GRANT USAGE ON SCHEMA audit TO evo;"
psql -d "${DATABASE_NAME}" -c "GRANT SELECT ON ALL TABLES IN SCHEMA audit TO evo;"
status "OK"

