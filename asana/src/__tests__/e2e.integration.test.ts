import { config } from "./test-private-config";
import { Parser } from "../parser";
import { AsanaClient } from '../asanaClient';
import { Expander } from "../expander";



describe("real task creation",async () => {

    let asanaClient:AsanaClient;
    let exp:Expander;
    let p:Parser;

    beforeAll(async ()=> {
        asanaClient = new AsanaClient(config);
        exp = new Expander(config);
        p = new Parser();
        await asanaClient.init(exp);
    });

    test("Simple task",async () => {
        let rawCmd = p.parse("this is a sample task");
        rawCmd = exp.expandWorkspace(rawCmd);
        await asanaClient.populateExpanderFromWorkspace(exp,rawCmd.workspace);
        rawCmd = exp.expandAll(rawCmd);
        let command = asanaClient.parseRawCommand(rawCmd);
        let result = await asanaClient.createTask(command);
        expect(result).toBeDefined();
        expect(result.name).toBe("this is a sample task");
    },5000);

    test("tagged task",async () => {
        let rawCmd = p.parse("#poe this task is tagged poe");
        rawCmd = exp.expandWorkspace(rawCmd);
        await asanaClient.populateExpanderFromWorkspace(exp,rawCmd.workspace);
        rawCmd = exp.expandAll(rawCmd);
        let command = asanaClient.parseRawCommand(rawCmd);
        let result = await asanaClient.createTask(command);
        expect(result).toBeDefined();
        expect(result.name).toBe("this task is tagged poe");
        expect(result.tags.length).toBe(1);
        expect(result.tags[0].name).toBe("poestaff");
    },5000);
});
