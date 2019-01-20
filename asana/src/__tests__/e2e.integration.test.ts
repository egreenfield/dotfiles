import { config } from "./test-private-config";
import { Parser } from "../parser";
import { AsanaClient } from '../asanaClient';
import { Expander } from "../expander";
import { AsanaCommander } from "../AsanaCommander";



describe("real task creation",async () => {

    let commander:AsanaCommander;
    beforeAll(async ()=> {
        commander = new AsanaCommander(config);
        await commander.init();
    });

    test("Simple task",async () => {
        let result = await commander.createTask("DELETE: this is a sample task");
        expect(result.name).toBe("DELETE: this is a sample task");
    },5000);

    test("tagged task",async () => {
        let result = await commander.createTask("#poe DELETE: this task is tagged poe");
        expect(result).toBeDefined();
        expect(result.name).toBe("DELETE: this task is tagged poe");
        expect(result.tags.length).toBe(1);
        expect(result.tags[0].name).toBe("poestaff");
    },5000);

    test("task with project",async () => {
        let result = await commander.createTask("+modul DELETE: this task is in project Modularity");
        expect(result).toBeDefined();
        expect(result.name).toBe("DELETE: this task is in project Modularity");
        expect(result.projects).toBeDefined();
        expect(result.projects.length).toBe(1);
        expect(result.projects[0].name).toBe("Modularity");
    },5000);

});
