#!/bin/sh

FULL_PATH_HTTPD=$(find / -name httpd)

strace -f -z -e trace=open "${FULL_PATH_HTTPD}" -D FOREGROUND 2>&1 | awk -F'"' '{if ($2 != "") { print "COPY --from=build "$2" "$2}}' > /build_dir/docker-copy-commands-strace
