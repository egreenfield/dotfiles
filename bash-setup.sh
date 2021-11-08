

current_directory="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# add local bin folder to path by default
PATH=$current_directory/bin:$PATH

# color coded ls
export LSCOLORS=dxfxcxdxbxegedabagacad

# change basic defaults and aliases
alias ls='/bin/ls -p -G'
alias la='/bin/ls -ap -G'
alias l='/usr/bin/less'
alias cp='cp -r'
alias pd='pushd'
alias ppd='popd'

alias tmux='tmux -f ~/dotfiles/tmux.conf'

# Ignore case while completing
shopt -s nocaseglob
set completion-ignore-case on
bind "set completion-ignore-case on"

# ignore duplicate commands in the history
export HISTCONTROL=ignoredups

# Make Bash 8bit clean
set meta-flag on
set convert-meta off
set output-meta on



# turn on extended pattern matching in bash
shopt -s extglob

# Set a default prompt of: current_directory $
#PS1='\[\033[01;33m\w$(__git_ps1 " (%s)")\033[0m\] $ '
#PS1=' $ '
#PS1='\[\033[01;33m--$\033[0m\] '
#####PS1='[\u@\h \W$(__git_ps1 " (%s)")]\$ '
#user:directory
#PS1='\[\033[01;33m\u:\W\$\033[0m\] '
PS1='\[\033[01;33m\u:\w\$\033[0m\] '
if [ -f "/usr/local/lib/python2.7/site-packages/powerline/bindings/bash/powerline.sh" ]; then 
	. /usr/local/lib/python2.7/site-packages/powerline/bindings/bash/powerline.sh 
fi

# config default editor to emacs in the shell
export EDITOR='emacs'

# git setup
source $current_directory/git_completion.sh
source $current_directory/git-flow-completion.sh

# make it easy to run local npm binaries
PATH=./node_modules/.bin:$PATH
function npm-do { (PATH=$(npm bin):$PATH; eval $@;) }

# default to python 3
PATH=/usr/local/opt/python/libexec/bin:$PATH


# useful shortcuts on mac
alias maclogout="osascript -e 'tell application \"System Events\" to log out'"
# if you have sublime text installed
alias e='/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl'


# z is a useful alternative to cd that pattern matches against histories
. $current_directory/z.sh


# nvm support
source $current_directory/nvm_setup.sh
# go support
source $current_directory/go_setup.sh


# can't really remember what this does?
#export XDG_CONFIG_HOME=~/dotfiles/config
export XDG_CONFIG_DIRS=$HOME/dotfiles/config:/etc/xdg

# --------------------------------------------------
# various Mac App integrations
# --------------------------------------------------

# araxis integration
PATH=$PATH:/Applications/Araxis\ Merge.app/Contents/Utilities
# add VS Code on the command line
export PATH=$PATH:/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin
