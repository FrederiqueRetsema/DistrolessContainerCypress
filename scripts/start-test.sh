#!/bin/bash
#
# start-test.sh
# =============
# Use this space to add commands that have to be done besides running the build container (f.e. starting a database, seeding data, etc)

# Assumption done in dockerfile-entrypoint: httpd is in /usr/sbin. 
# Check this assumption.

FULL_PATH_HTTPD=$(find / -name httpd)
if test "${FULL_PATH_HTTPD}" != "/usr/sbin/httpd"
then
  echo "ERROR: httpd is not in /usr/sbin/httpd"
  exit 1
fi
