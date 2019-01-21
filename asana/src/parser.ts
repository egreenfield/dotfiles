import { RawCommand } from "./rawCommand";
//import {  } from "chrono-node";

let chrono = require("chrono-node");

const workspaceSignal = "-";
const projectSignal = "+";
const tagSignal = "#";
const notesSeparator = "|";

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

    parseNotes(words:string[], cmd:RawCommand) {
        let separatorPos = words.findIndex((v)=> v === notesSeparator);
        if(separatorPos < 0) {
            return words;
        } else {
            cmd.notes = words.slice(separatorPos+1).join(" ");
            return words.slice(0,separatorPos);''
        }
    }

    parseTrailingUrl(words:string[], cmd:RawCommand) {
        if(cmd.notes !== undefined) {
            return words;
        }
        let url = (words.length && words[words.length-1]) || "";
        if (url.match(/^http(s?):\/\//) !== null) {
            cmd.notes = url;
            return words.slice(0,-1);
        }
        return words;
    }

    parseDueDate(words:string[],cmd:RawCommand) {
        let dueDateStartIndex = words.findIndex(w => w.length && w.startsWith("@"));
        if(dueDateStartIndex === -1) {
            return words;
        }
        let potentialMatch = words.slice(dueDateStartIndex).join(" ").slice(1);
        let parseResults = chrono.parse(potentialMatch,new Date(), { forwardDate: true });
        if(parseResults.length === 0) {
            return words;
        }
        let firstResult = parseResults[0];
        if(firstResult.index > 0) {
            return words;
        }
        cmd.due = firstResult.start.date();
        let remainingWords = (words.slice(0,dueDateStartIndex).join(" ") + potentialMatch.slice(firstResult.text.length)).trim().split(" ");
        return remainingWords;
    }

    parse(taskCommand:string):RawCommand {
        let cmd = new RawCommand();
        let taskParts = taskCommand.trim().split(" ");
        cmd.workspace = null;

        let afterDates = this.parseDueDate(taskParts,cmd);
        let {options: initialOptions,rest: afterInitial} = this.stripInitialCommands(afterDates);
        let {options: trailingOptions, rest: afterTrailing} = this.stripTrailingCommands(afterInitial);
        let options = initialOptions.concat(trailingOptions);
        this.parseOptions(options,cmd);
        let afterNotes = this.parseNotes(afterTrailing,cmd);
        afterNotes = this.parseTrailingUrl(afterNotes,cmd);
        cmd.name = afterNotes.join(" ");

        return cmd;
    }

}