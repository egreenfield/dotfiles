import { RawCommand } from "./rawCommand";

const workspaceSignal = "-";
const projectSignal = "+";
const tagSignal = "#";

function parseWorkspace(value:string,cmd:RawCommand) {
    cmd.workspace = value;
}

function parseProject(value:string,cmd:RawCommand) {
    cmd.project = value;
}

function parseTag(value:string,cmd:RawCommand) {
    cmd.tags = cmd.tags.concat(value);
}


const optionSignals:{[index:string]:(string,RawCommand)=>void} = {};

optionSignals[workspaceSignal] = parseWorkspace;
optionSignals[projectSignal] = parseProject;
optionSignals[tagSignal] = parseTag;

export class Parser {
    isOption(part:string) {
        let firstChar = part.charAt(0);
        return (firstChar in optionSignals);
    }

    stripInitialCommands(parts:string[]) {
        let firstTaskNameToken = 0;
        for(let i=0;i<parts.length;i++) {
            firstTaskNameToken = i;
            let p = parts[i];
            if(this.isOption(p) === false)
                break;
        }
        return {
            options:parts.slice(0,firstTaskNameToken),
            rest:parts.slice(firstTaskNameToken)
        }
    }

    stripTrailingCommands(parts:string[]) {
        let lastTaskNameToken = parts.length-1;
        for(let i=parts.length-1;i>=0;i--) {
            lastTaskNameToken = i;
            let p = parts[i];
            if(this.isOption(p) === false)
                break;
        }

        return {
            options:parts.slice(lastTaskNameToken+1),
            rest:parts.slice(0,lastTaskNameToken+1)
        }
    }

    parseOptions(options:string[],cmd:RawCommand) {
        options.forEach(opt => {
            let signal = opt.charAt(0);
            let value = opt.slice(1);
            optionSignals[signal](value,cmd);
        });
    }

    parse(taskCommand:string):RawCommand {
        let cmd = new RawCommand();
        let taskParts = taskCommand.split(" ");
        cmd.workspace = null;

        let {options: initialOptions,rest: afterInitial} = this.stripInitialCommands(taskParts);
        let {options: trailingOptions, rest: afterTrailing} = this.stripTrailingCommands(afterInitial);
        let options = initialOptions.concat(trailingOptions);
        this.parseOptions(options,cmd);
        cmd.name = afterTrailing.join(" ");

        return cmd;
    }

}