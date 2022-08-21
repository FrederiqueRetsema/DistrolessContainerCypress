#!/bin/sh

WWW_DIR="/var/www/localhost/htdocs"

configure_wp_config_php() {
    cp wp-config-sample.php wp-config.php

    sed "s/wp_/{DATABASEPREFIX}/g" -i wp-config.php
    sed "s/database_name_here/{DATABASENAME}/g" -i wp-config.php
    sed "s/username_here/{WORDPRESSUSERID}/g" -i wp-config.php
    sed "s/password_here/{WORDPRESSPASSWORD}/g" -i wp-config.php
    sed "s/localhost/{DATABASEENDPOINT}/g" -i wp-config.php
}

add_wp_debug_file() {

    LINE_NUMBER=$(grep -n WP_DEBUG wp-config.php | grep define | awk -F":" '{print $1}')
    
    sed_cmd="$LINE_NUMBER c define('WP_DEBUG', true);"
    sed "$sed_cmd" -i wp-config.php
    
    sed_cmd="$LINE_NUMBER a define('WP_DEBUG_LOG', '$WWW_DIR/debug.log');"
    sed "$sed_cmd" -i wp-config.php
    
    sed_cmd="$LINE_NUMBER a define('WP_DEBUG_DISPLAY', false);"
    sed "$sed_cmd" -i wp-config.php 
}

copy_files_to_dest_dir() {
    cp -p -r ./* $WWW_DIR
}

delete_files_under_efs_mountpoint() {
    rm -fr $WWW_DIR/wp-content
    mkdir $WWW_DIR/wp-content
}

delete_build_files() {
    rm -fr /opt/wordpress
    rm -fr /opt/latest.tar.gz
}

cd /opt/wordpress || exit 1

configure_wp_config_php
add_wp_debug_file

copy_files_to_dest_dir
delete_files_under_efs_mountpoint

cd || exit 1
delete_build_files
