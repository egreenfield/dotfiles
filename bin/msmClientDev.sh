#!/bin/sh 
if [[ -z "$TMUX" ]] ;then
	tmux new-session -s "msm" -d -c "~/dev/msm/"
fi
tmux set pane-border-status top
tmux rename-window "msm-client-dev"
# tmux setw remain-on-exit on
tmux split-window -h -c ~/dev/msm 
tmux split-window -v -c ~/dev/msm/client 'printf "\033]2;%s\033\\" "client compilation";gradlew -t bundle'
tmux split-window -t .bottom-left -v -c ~/dev/msm/server 'printf "\033]2;%s\033\\" "server process";gradlew run -t'
tmux split-window -t .bottom-left -v -c ~/dev/msm/client 'printf "\033]2;%s\033\\" "client test server";gradlew run -t'
if [[ -z "$TMUX" ]] ;then
	tmux -2 attach-session -d 
fi