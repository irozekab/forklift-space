#!/bin/bash

NOW="$(date +'%Y%m%d')"
FILENAME="production_$NOW.dump.tar"

echo "Dumping production database to $FILENAME..."

ssh root@forklift.space << 'endssh'
dokku mongo:export production > backup.dump.tar
endssh

echo "Downloading backup from server..."
scp root@forklift.space:~/backup.dump.tar .

echo "Renaming backup.dump.tar to $FILENAME..."
mv backup.dump.tar ./backups/$FILENAME
