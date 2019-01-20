import { Config } from "./config";
import { AsanaClient } from "./asanaClient";
import { Expander } from "./expander";
import { Parser } from "./parser";
import asana = require("asana");


export class AsanaCommander {

    public client:AsanaClient;

    constructor(private config:Config) {
        this.client  = new AsanaClient(config);
    }

    async init() {
        await this.client.init();
    }

    async createTask(input:string) {

        let result:asana.resources.Tasks.Type = undefined;

        let p = new Parser();
        let rawCmd = p.parse(input);
        let expander = new Expander(this.config);
        this.client.initExpander(expander);

        rawCmd = expander.expandWorkspace(rawCmd);
        await this.client.populateExpanderFromWorkspace(expander,rawCmd.workspace);

        rawCmd = expander.expandAll(rawCmd);
        let command = this.client.parseRawCommand(rawCmd);
        result = await this.client.createTask(command);
        return result;
    }
}