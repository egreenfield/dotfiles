interface WorkspaceMap {
    [index:string] : string
};

export interface Config {
    token:string;
    workspacesAliases:WorkspaceMap;
    defaultWorkspace: string;
}
