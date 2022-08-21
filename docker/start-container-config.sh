#!/bin/sh
CONTAINER_TYPE=$1

set_links_to_efs_file_system() {
    ln -s /var/www/localhost/htdocs/wp-content/private/.htaccess /var/www/localhost/htdocs/.htaccess
    ln -s /var/www/localhost/htdocs/wp-content/private/robots.txt /var/www/localhost/htdocs/robots.txt
}

change_ownership_and_permissions() {
    chown -R apache:apache /var/www/localhost/htdocs

    mkdir /var/log/php8
    chown -R apache:apache /var/log/php8

    touch /var/log/messages
    chmod 644 /var/log/messages

    mkdir /var/log/apache2
    chown -R apache:apache /var/log/apache2
    chmod 775 /var/log/apache2

    touch /var/log/apache2/wp_debug.log
    chown apache:apache /var/log/apache2/wp_debug.log
    chmod 644 /var/log/apache2/wp_debug.log

    touch /var/log/apache2/access.log
    chown apache:apache /var/log/apache2/access.log
    chmod 644 /var/log/apache2/access.log

    touch /var/log/apache2/error.log
    chown apache:apache /var/log/apache2/error.log
    chmod 644 /var/log/apache2/error.log
}

set_link_to_debug_log() {
    rm -f /var/www/localhost/htdocs/debug.log
    ln -s /var/log/apache2/wp_debug.log /var/www/localhost/htdocs/debug.log
}

# Main

set_links_to_efs_file_system
change_ownership_and_permissions
set_link_to_debug_log
