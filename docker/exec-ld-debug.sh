#!/bin/sh

FULL_PATH_HTTPD=$(find / -name httpd -type f -executable)

# Normal output of ldd:
# ldd /usr/sbin/httpd
#     /lib/ld-musl-x86_64.so.1 (0x7f301d631000)
#     libpcre.so.1 => /usr/lib/libpcre.so.1 (0x7f301d53a000)
#     libaprutil-1.so.0 => /usr/lib/libaprutil-1.so.0 (0x7f301d511000)
#     libapr-1.so.0 => /usr/lib/libapr-1.so.0 (0x7f301d4dc000)
#     libc.musl-x86_64.so.1 => /lib/ld-musl-x86_64.so.1 (0x7f301d631000)
#     libexpat.so.1 => /usr/lib/libexpat.so.1 (0x7f301d4b7000)
#     libuuid.so.1 => /lib/libuuid.so.1 (0x7f301d4ae000)

LD_DEBUG=libs "${FULL_PATH_HTTPD}" -D FOREGROUND 2>&1 | grep calling | awk '{print "copy_file "$4" /build_dir/tar"$4}' > /build_dir/docker-copy-commands-ld-debug
