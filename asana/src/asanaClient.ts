import * as asana from 'asana';
import { RawCommand } from "./rawCommand";
import { Config } from "./config";
import { Expander } from './expander';

export class AsanaCommand {
    workspace:asana.resources.Resource;
    name:string;
    assignee:number;
}

export class AsanaClient {
    rawClient:asana.Client;
    me: asana.resources.Users.Type;
    workspaces: asana.resources.Resource[];
    tags: asana.resources.Tags.Type[];
    projects: asana.resources.Projects.Type[];

    constructor(public config:Config) {
        this.rawClient = asana.Client.create().useAccessToken(config.token);
    }

    async getWorkspaces(user) {
        return user.workspaces;
    }

    async init(exp:Expander) {
		this.me = await this.rawClient.users.me();
        this.workspaces = await this.getWorkspaces(this.me);
        exp.workspaces = this.workspaces.map(w => w.name);
    }

    async populateExpanderFromWorkspace(exp:Expander,workspaceName:string) {
        let workspace = this.workspaceFromName(workspaceName);
        this.tags = (await this.rawClient.tags.findByWorkspace(workspace.id)).data;
        this.projects = (await this.rawClient.projects.findByWorkspace(workspace.id)).data;

        exp.tags = this.tags.map(t => t.name);
        exp.projects = this.projects.map(p => p.name);
    }

    workspaceFromName(name:string) {
        return this.workspaces.find((w) => w.name.toLowerCase().match(name.toLowerCase()) != undefined)
    }

    parseRawCommand(rawCmd:RawCommand):AsanaCommand {
        let command = new AsanaCommand();

        command.workspace = this.workspaceFromName(rawCmd.workspace);
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