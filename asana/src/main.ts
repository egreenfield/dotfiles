import { config } from "./private-config";
import { Parser } from "./parser";
import { AsanaClient } from './asanaClient';

let command = {
	name: "",
	assignee: null,
	workspace: null,
}


let asanaClient = new AsanaClient(config);

async function go(taskCommand) {
	try {
        await asanaClient.init();
        let p = new Parser();
        let rawCmd = p.parse(taskCommand);
        let command = asanaClient.parseRawCommand(rawCmd);
		let result = await asanaClient.createTask(command);
		if(result) {
			//console.log("task created:",JSON.stringify(command));
			console.log("task created in",command.workspace.name);
		}
	} catch(e) {
		console.log("got error",e);
	}
}

let taskName = process.argv[2];
if(taskName == undefined) {
	console.log("need a task name")
} else {
	go(taskName);
}
