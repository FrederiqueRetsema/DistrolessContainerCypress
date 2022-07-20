#!/bin/bash

create_dir_if_necessary() {
  FILENAME=$1

  DIR_TO=$(dirname "$FILENAME")

  if ! test -d "$DIR_TO"
  then
    mkdir -p "$DIR_TO"
  fi
}

copy_file() {
  FROM=$1
  TO=$2

  if test -f "$FROM"
  then
    create_dir_if_necessary "$TO"
    cp -r -L "$FROM" "$TO"
  fi
}

create_var_www_logs() {
  mkdir -p /build_dir/tar/var/www/logs
 touch /build_dir/tar/var/www/logs/access.log
 touch /build_dir/tar/var/www/logs/error.log
 chmod a+w /build_dir/tar/var/www/logs/*
}

create_run_apache2() {
  mkdir -p /build_dir/tar/run/apache2
}

create_var_www_logs
create_run_apache2
