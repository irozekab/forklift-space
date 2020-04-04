#!/bin/bash

SRC="../Freya"
DEST=$PWD

echo "Removing existing frontend files from \"$DEST\"..."
rm -rf $DEST/src/public/*.js
rm -rf $DEST/src/public/*.css
rm -rf $DEST/src/views/*

echo ""
echo "Building frontend files at \"$SRC\"..."
cd $SRC
npm run build

echo "Copying frontend files from \"$SRC\" to \"$DEST\"..."
cp -rf $SRC/dist/public/*.js $DEST/src/public
cp -rf $SRC/dist/public/*.css $DEST/src/public
cp -rf $SRC/dist/img $DEST/src/views
cp -rf $SRC/dist/index.html $DEST/src/views
