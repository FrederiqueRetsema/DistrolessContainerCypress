#!/bin/sh

FULL_PATH_MKNOD=$(find / -name mknod)

# Normal output of ldd:
# ldd /usr/sbin/httpd
#     /lib/ld-musl-x86_64.so.1 (0x7f301d631000)
#     libpcre.so.1 => /usr/lib/libpcre.so.1 (0x7f301d53a000)
#     libaprutil-1.so.0 => /usr/lib/libaprutil-1.so.0 (0x7f301d511000)
#     libapr-1.so.0 => /usr/lib/libapr-1.so.0 (0x7f301d4dc000)
#     libc.musl-x86_64.so.1 => /lib/ld-musl-x86_64.so.1 (0x7f301d631000)
#     libexpat.so.1 => /usr/lib/libexpat.so.1 (0x7f301d4b7000)
#     libuuid.so.1 => /lib/libuuid.so.1 (0x7f301d4ae000)

ldd "${FULL_PATH_MKNOD}" | grep -v "=>" | awk '{print "COPY --from=build "$1" "$1}' >> /build_dir/docker-copy-commands-ldd  || exit 1
ldd "${FULL_PATH_MKNOD}" | grep "=>"    | awk '{print "COPY --from=build "$3" "$3}' >> /build_dir/docker-copy-commands-ldd || exit 1
