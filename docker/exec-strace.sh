#!/bin/bash

FULL_PATH_HTTPD=$(find / -name httpd)

strace "${FULL_PATH_HTTPD}" -D FOREGROUND || exit 1