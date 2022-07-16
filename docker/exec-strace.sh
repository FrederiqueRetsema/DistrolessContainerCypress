#!/bin/sh

FULL_PATH_HTTPD=$(find / -name httpd)

strace -f "${FULL_PATH_HTTPD}" -D FOREGROUND 2>&1  | grep open | grep O_RDONLY | grep -v ENOENT | grep -v O_DIRECTORY | awk -F'"' '{print "COPY --from=build "$2" "$2}' > /build_dir/docker-copy-commands-strace
