import * as asana from 'asana';
import { RawCommand } from "./rawCommand";
import { Config } from "./config";

export class AsanaCommand {
    workspace:asana.resources.Resource;
    name:string;
    assignee:number;
}

export class AsanaClient {
    rawClient:asana.Client;
    me: asana.resources.Users.Type;
    workspaces: asana.resources.Resource[];

    constructor(public config:Config) {
        this.rawClient = asana.Client.create().useAccessToken(config.token);
    }

    async getWorkspaces(user) {
        return user.workspaces;
    }

    async init() {
		this.me = await this.rawClient.users.me();
		this.workspaces = await this.getWorkspaces(this.me);
    }

    parseRawCommand(rawCmd:RawCommand):AsanaCommand {
        let command = new AsanaCommand();

        let workspaceToken = rawCmd.workspace;
        let workspaceName = this.config.workspaces[workspaceToken];
        if (workspaceName == undefined) {
            workspaceName = this.config.workspaces.default;
        }
        let workspace = this.workspaces.find((w) => w.name.toLowerCase().match(workspaceName.toLowerCase()) != undefined)
        command.workspace = workspace;
        command.name = rawCmd.name;
        command.assignee = this.me.id;
        return command;
    }

    async createTask(sourceCommand) {
        let command = { ...sourceCommand };
        let workspaceID = command.workspace.id;
        delete command.workspace;

        let result = await this.rawClient.tasks.createInWorkspace(workspaceID,command);
        return result;
    }
}