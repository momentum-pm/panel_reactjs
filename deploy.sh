#!/bin/bash
git pull origin master
npm run build
rm -rf /var/www/greenoly-reactjs/build/
cp -r /srv/greenoly-reactjs/build/ /var/www/greenoly-reactjs/
chmod -R 777 /var/www/greenoly-reactjs/build/
systemctl restart nginx
