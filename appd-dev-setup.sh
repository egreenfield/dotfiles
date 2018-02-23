# AppD codebase basics
export PATH=${PATH}:~/dev/appdy/codebase:~/dev/appdy/codebase/tools
export CODEBASE=~/dev/appdy/codebase
export ANT_OPTS='-Dstart-glassfish-in-debug-mode=true'
export GRADLE_OPTS='-Dstart-glassfish-in-debug-mode=true -Dorg.gradle.daemon=true -Dorg.gradle.configureondemand=true'
function jdk7 {
    # See http://stackoverflow.com/questions/27558903/why-does-this-bash-pathname-expansion-not-take-place
    a=(/Library/Java/JavaVirtualMachines/jdk1.7.*.jdk/Contents/Home)
    export JAVA_HOME="${a[@]}"
}
function jdk8 {
    a=(/Library/Java/JavaVirtualMachines/jdk1.8.*.jdk/Contents/Home)
    export JAVA_HOME="${a[@]}"
}
alias jdk="env | grep JAVA_HOME"
jdk8
