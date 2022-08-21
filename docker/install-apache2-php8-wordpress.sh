#!/bin/sh

add_apk_packages() {
    apk add efs-utils
    apk add apache2 curl 
    apk add php8 php8-common php8-session php8-iconv php8-json php8-gd php8-curl php8-xml php8-mysqli php8-imap 
    apk add php8-cgi fcgi php8-pdo php8-pdo_mysql php8-soap php8-posix php8-pecl-mcrypt php8-gettext php8-ldap 
    apk add php8-ctype php8-dom php8-simplexml php8-apache2 php8-phar
}

install_wordpress() {
    cd /opt || exit 1
    curl -O https://wordpress.org/latest.tar.gz
    tar -xzvf latest.tar.gz
    cd wordpress || exit 1
}

install_wp_cli() {
    curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
    php wp-cli.phar --info
    chmod +x wp-cli.phar
    cp wp-cli.phar wp
}

finalize() {
    cp -r /opt/wordpress/* /var/www/localhost/htdocs
    rm -f /var/www/localhost/htdocs/index.html
}

add_apk_packages

install_wordpress
install_wp_cli

finalize

