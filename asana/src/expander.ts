

import * as Fuse from "fuse.js";
import { RawCommand } from "./rawCommand";
import { Config } from "./config";


export class Expander {

    _workspaces: {nickname:string,name:string}[];
    tags:string[];
    projects:string[];

    constructor(public config:Config) {
    }

    defaultWorkspace:string;

    set workspaces(value:string[]) {
        this._workspaces = value.map(v => ({nickname:v, name:v}));
    }

    expandAll(cmd:RawCommand) {
        cmd = this.expandWorkspace(cmd);
        cmd = this.expandTags(cmd);
        return cmd;
    }
    expandTags(cmd:RawCommand) {
        let result = {...cmd};
        let f = new Fuse(this.tags,{
            tokenize:true,
            caseSensitive:false
        });
        if(result.tags) {
            result.tags = result.tags.map(t => {
                let match = f.search(t);
                return ((match && match[0]) || t);
            });
        }
        return result;
    }
    expandProject(cmd:RawCommand) {
        let result = {...cmd};
        let f = new Fuse(this.tags,{
            tokenize:true,
            caseSensitive:false
        });
        if(result.project) {
            let match = f.search(result.project);
            result.project = ((match && match[0]) || result.project);
        }
        return result;
    }

    expandWorkspace(cmd:RawCommand) {
        let result:RawCommand = {...cmd};
        let wMap = this.config.workspacesAliases;
        let workspaces = this._workspaces.concat(Object.keys(wMap).map( k => ({nickname: k, name: wMap[k]})));

        let workspaceToken = cmd.workspace;
        if (workspaceToken == undefined) {
            workspaceToken = this.config.defaultWorkspace;
        } else {
            let f = new Fuse(workspaces,{
                tokenize:true,
                caseSensitive:false,
                keys:["nickname"]
            });
            let results = f.search(workspaceToken);
            if(results.length) {
                workspaceToken = results[0].name;
            } else {
                workspaceToken = this.config.defaultWorkspace;
            }
        }
        result.workspace = workspaceToken;
        return result;
    }
}