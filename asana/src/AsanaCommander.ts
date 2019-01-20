import { Config } from "./config";
import { AsanaClient } from "./asanaClient";
import { Expander } from "./expander";
import { Parser } from "./parser";
import asana = require("asana");


export class AsanaCommander {

    private asanaClient:AsanaClient;

    constructor(private config:Config) {
        this.asanaClient  = new AsanaClient(config);
    }

    async init() {
        await this.asanaClient.init();
    }

    async createTask(input:string) {

        let result:asana.resources.Tasks.Type = undefined;

        let p = new Parser();
        let rawCmd = p.parse(input);
        let expander = new Expander(this.config);
        this.asanaClient.initExpander(expander);

        rawCmd = expander.expandWorkspace(rawCmd);
        await this.asanaClient.populateExpanderFromWorkspace(expander,rawCmd.workspace);

        rawCmd = expander.expandAll(rawCmd);
        let command = this.asanaClient.parseRawCommand(rawCmd);
        result = await this.asanaClient.createTask(command);
        return result;
    }
}