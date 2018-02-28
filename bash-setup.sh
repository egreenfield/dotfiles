
export LSCOLORS=dxfxcxdxbxegedabagacad
current_directory="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

alias ls='/bin/ls -p -G'
alias la='/bin/ls -ap -G'
alias l='/usr/bin/less'
alias cp='cp -r'
alias pd='pushd'
alias ppd='popd'

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

# Useful aliases
#alias ls='ls $LS_OPTIONS -hF'

alias e='/Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl'
# set our editor to be sublime text
export EDITOR='emacs'

# GIT
source $current_directory/git_completion.sh
source $current_directory/git-flow-completion.sh



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


# alias todo-txt to t and turn on autocomplete 
#source /usr/local/Cellar/todo-txt/2.10/etc/bash_completion.d/todo_completion complete -F _todo t
#alias t='/usr/local/Cellar/todo-txt/2.10/bin/todo.sh -d $HOME/Dropbox/personal/todo/todo.cfg'

alias maclogout="osascript -e 'tell application \"System Events\" to log out'"


# grunt autocompletion
#eval "$(grunt --completion=bash)"

# npm bin commands
PATH=./node_modules/.bin:$PATH
function npm-do { (PATH=$(npm bin):$PATH; eval $@;) }


# set up aws autocompletion
complete -C '/usr/local/bin/aws_completer' aws

# set up kubectl autocompletion
source <(kubectl completion bash)

alias tmux='tmux -f ~/dotfiles/tmux.conf'

#export XDG_CONFIG_HOME=~/dotfiles/config
export XDG_CONFIG_DIRS=$HOME/dotfiles/config:/etc/xdg
