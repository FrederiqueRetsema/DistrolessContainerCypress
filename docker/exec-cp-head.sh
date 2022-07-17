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
    cp -r "$FROM" "$TO"
  fi
}

create_logs() {
  rm -fr /etc/httpd/logs
  mkdir -p /etc/httpd/logs
  touch /etc/httpd/logs/access_log
  touch /etc/httpd/logs/error_log
  chmod a+rw /etc/httpd/logs/*
}

create_etc_httpd_run() {
  mkdir -p /run/httpd
  ln -s /run/httpd /etc/httpd/run

  mkdir -p /build_dir/tar/run/httpd
  mkdir -p /build_dir/tar/etc/httpd/
  cp -P /etc/httpd/run /build_dir/tar/etc/httpd/run
}

create_logs
create_etc_httpd_run
