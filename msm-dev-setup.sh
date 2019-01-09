# AppD codebase basics
export PATH=${PATH}:~/dev/msm
export CODEBASE=~/dev/appdy/codebase
export SAMPLE_APP_CODEBASE=~/dev/appdy/agentscaling
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

alias runSampleApp="pushd ${SAMPLE_APP_CODEBASE};java -jar netflix.jar --config samples/polaris.ini"


export POLARIS_REMOTE_CLUSTER=a22e7dbba53cc11e8b5b00236e4b0082-347878865.us-west-1.elb.amazonaws.com
