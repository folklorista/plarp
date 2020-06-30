#!/bin/bash

label () {
  local action="$1"
  local entity="$2"
  local non_waiting="$3"

  local highlight='\e[33m'
  local default='\e[36m'
  local reset='\e[0m' # No Color

  echo -en "${default}- ${action}"

  if [ ! -z ${entity} ]; then echo -en " ${highlight}${entity}${reset}"; fi

  if [ "${VERBOSE}" != "true" ] && [ -z ${non_waiting} ]; then
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

  if [ "${VERBOSE}" != "true" ]; then
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

  if [ ! -z ${verbose} ] && [ "${VERBOSE}" != "true" ]; then
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

confirm() {
  local question="$1"
  local entity="$2"

  local blue='\e[96m'
  local dim='\e[2m'
  local undim='\e[22m'
  local highlight='\e[33m'
  local reset='\e[0m' # No Color

  echo -e -n "${blue}${question}"
  if [ ! -z ${entity} ]; then echo -en " ${highlight}${entity}${reset}"; fi
  echo -e -n "${reset} ${dim}(a/N)${undim} "

  read -e -n 1 -r
  case "$REPLY" in
    [aA])
      true
      ;;
    *)
      false
      ;;
  esac
}

require_variable() {
  local variable_name="$1"

  [ ! -v ${variable_name} ] && error "Variable required:" ${variable_name}
}

require_file() {
  local file="$1"

  [ ! -f "${file}" ] && error "File does not exist:" ${file}
}

help() {
  local orange='\e[38;5;166m'
  local reset='\e[0m' # No Color
  echo -e "Usage: \e[3m${orange}$(basename "$0") ${HELP_USAGE_PARAMETERS}${reset}"
  echo -e "\e[2m- f.e. ${orange}$(basename "$0") ${HELP_EXAMPLE_PARAMETERS}${reset}"
}

contains() {
  local needle="$1"
  local element

  shift

  for element; do
      if [ "$element" == "$needle" ]; then
          return 0
      fi
  done

  return 1
}

require_variable "HELP_USAGE_PARAMETERS"
require_variable "HELP_EXAMPLE_PARAMETERS"

