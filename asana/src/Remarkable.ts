import { Config } from "./config";
import { Expander } from "./expander";
import { Parser } from "./parser";
import { RawCommand } from "./rawCommand";


export class Remarker {

    constructor(private config:Config) {
    }

    async init() {
    }

    rebuild(cmd:RawCommand) {
        return cmd.tags.map(t => ("#"+t)).join(" ") + " " + cmd.name;
    }

    async expand(input:string) {


        let p = new Parser();
        let rawCmd = p.parse(input);
        let expander = new Expander(this.config);
        expander.tags = "payman kiran vipin vinay shrikanth".split(" ");
//        this.client.initExpander(expander);

        rawCmd = expander.expandWorkspace(rawCmd);
        //await this.client.populateExpanderFromWorkspace(expander,rawCmd.workspace);

        rawCmd = expander.expandAll(rawCmd);
        let command = this.rebuild(rawCmd);
        return command;
    }
}