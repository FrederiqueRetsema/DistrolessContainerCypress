#!/bin/sh

PHP_CONFIG_FILE=/etc/php8/php.ini
CONFIG_FILE=/etc/apache2/httpd.conf
WWW_DIR=/var/www/localhost/htdocs

allow_override_htaccess_root_www_dir() {
    LINE_NO_WWW_DIR=$(grep -n Directory $CONFIG_FILE | grep $WWW_DIR | awk -F":" '{print $1}')
    for lineno in $(grep -n AllowOverride $CONFIG_FILE | grep -v "#" | awk -F":" '{print $1}')
    do
        if test "${lineno}" -gt "${LINE_NO_WWW_DIR}"
        then
            LINE_NO_TO_BE_CHANGED=$lineno
            break
        fi
    done
    sed "${LINE_NO_TO_BE_CHANGED} s/None/All/" -i $CONFIG_FILE
}

uncomment_load_module_rewrite_module() {
    sed 's/#LoadModule rewrite_module modules\/mod_rewrite.so/LoadModule rewrite_module modules\/mod_rewrite.so/g' -i $CONFIG_FILE
}

configure_php_set_extension_dir() {
    sed 's/\;extension_dir\ \=\ \".\/\"/extension_dir\ \=\ \"\/usr\/lib\/php8\/modules\/\"/g' -i $PHP_CONFIG_FILE
}

configure_port_number() {
     sed -i 's/Listen 80/Listen 8080/' $CONFIG_FILE
     sed -i 's/#ServerName www.example.com:80/ServerName www.example.com:8080/' $CONFIG_FILE
}

change_ownership_and_permissions() {
    chown -R apache:apache /var/www
    chown -R apache:apache /etc/apache2
    chown -R apache:apache /usr/lib/apache2
}

allow_override_htaccess_root_www_dir
uncomment_load_module_rewrite_module
configure_php_set_extension_dir
configure_port_number
change_ownership_and_permissions
