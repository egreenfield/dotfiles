import { config } from "./test-private-config";
import { Parser } from "../parser";
import { AsanaClient, AsanaTask } from '../asanaClient';
import { Expander } from "../expander";
import { AsanaCommander } from "../AsanaCommander";



describe("real task creation",async () => {

    let commander:AsanaCommander;
    let createdTask:AsanaTask;
    beforeEach(async ()=> {
        commander = new AsanaCommander(config);
        await commander.init();
    });
    afterEach(async ()=> {
        if(createdTask) {
            await commander.client.deleteTask(createdTask);
        }
    });

    test("Simple task",async () => {
        createdTask = await commander.createTask("DELETE: this is a sample task");
        expect(createdTask.name).toBe("DELETE: this is a sample task");
    },12000);

    test("tagged task",async () => {
        createdTask = await commander.createTask("#poe DELETE: this task is tagged poe");
        expect(createdTask).toBeDefined();
        expect(createdTask.name).toBe("DELETE: this task is tagged poe");
        expect(createdTask.tags.length).toBe(1);
        expect(createdTask.tags[0].name).toBe("poestaff");
    },12000);

    test("task with project",async () => {
        createdTask= await commander.createTask("+modul DELETE: this task is in project Modularity");
        expect(createdTask).toBeDefined();
        expect(createdTask.name).toBe("DELETE: this task is in project Modularity");
        expect(createdTask.projects).toBeDefined();
        expect(createdTask.projects.length).toBe(1);
        expect(createdTask.projects[0].name).toBe("Modularity");
    },12000);

});
