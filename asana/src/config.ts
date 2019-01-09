interface WorkspaceMap {
    [index:string] : string
};

export interface Config {
    token:string;
    workspaces:WorkspaceMap;
}
