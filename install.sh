##!/bin/zsh
echo 'export PATH="'$PWD'/exec:$PATH"'>>~/.profile
. ~/.profile
echo "install ok"
ln -s ./autocomplete/tagsystem ~/.oh-my-zsh/plugins/tagsystem
echo "add tagsystem in ~/.zshrc and source ~/.zshrc"
