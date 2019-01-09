echo "
rdr pass inet proto tcp from any to any port 8002 -> 52.53.66.23 port 8002
" | sudo pfctl -ef -