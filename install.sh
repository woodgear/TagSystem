##!/bin/zsh
echo 'export PATH="'$PWD'/exec:$PATH"'>>~/.profile
. ~/.profile
echo "install ok"
