#!/bin/bash

for f in *.jpg
do
    w=`magick identify -format "%w" $f`
    h=`magick identify -format "%h" $f`

    for width in 2560 2000 1500 1000 750 500 350
    do
        if [ "$w" -gt $width ]
        then
            filename="${f%.*}"
            magick $f -resize $width $filename-$width.webp
        fi
    done
done
