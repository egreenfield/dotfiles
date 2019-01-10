import { Parser } from "../parser";
import { RawCommand } from "../rawCommand";
import { Expander } from "../expander";
import { Config } from "../config";

let config:Config = {
	token: null,
	workspacesAliases: {
        f: "family",
        h: "family",
    },
	defaultWorkspace: "defaultWorkspace"
};


let workspaceNames = [
    "def",
    "ghi",
    "a",
    "abcdef",
    "abc",
    "fountain",
    "work",
    "family"
];

function testWorkspaceMatch(name:string, partialName:string,result:string,workspaces:string[] = workspaceNames, localConfig:Config = config) {
    test("workspace: " + name,() => {
        let cmd:RawCommand = {
            workspace: partialName,
            name:"test task",
            project:null
        };
        let e = new Expander(localConfig);
        e.workspaces = workspaces;
        cmd = e.expandWorkspace(cmd);
        expect(cmd.workspace).toEqual(result);
    });
}


testWorkspaceMatch(
    "exact match",
    "abc",
    "abc"
);

testWorkspaceMatch(
    "partial match",
    "fou",
    "fountain"
);

testWorkspaceMatch(
    "single character match",
    "w",
    "work"
);

testWorkspaceMatch(
    "alias match",
    "h",
    "family"
);

testWorkspaceMatch(
    "exact alias preference",
    "f",
    "family"
);

testWorkspaceMatch(
    "default match",
    null,
    "defaultWorkspace"
);
