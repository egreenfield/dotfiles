import { RawCommand } from "./rawCommand";

export class Parser {
    parse(taskCommand:string):RawCommand {
        let cmd = new RawCommand();
        let taskParts = taskCommand.split(" ");

        taskParts = this.parseOptions(taskParts,cmd);
        cmd.workspace = null;
        cmd.name = taskParts.join(" ");

        return cmd;
    }

    parseOptions(taskParts:string[],cmd:RawCommand) {
        return taskParts;
    }
}