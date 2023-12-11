#!/bin/bash
git pull origin main
npm run build
rm -rf /var/www/panel_reactjs/build/
cp -r /srv/momentum-pm/panel_reactjs/build/ /var/www/panel_reactjs/
chmod -R 777 /var/www/panel_reactjs/build/
systemctl restart nginx
