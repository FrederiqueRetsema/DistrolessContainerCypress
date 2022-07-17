#!/bin/sh

FULL_PATH_HTTPD=$(find / -name httpd -type f -executable)

strace -f -z -e trace=open "${FULL_PATH_HTTPD}" -D FOREGROUND 2>&1 | awk -F'"' '{if ($2 != "") { print "copy_file "$2" /build_dir/tar"$2} else { print "# Skipped "$0}}' > /build_dir/docker-copy-commands-strace
