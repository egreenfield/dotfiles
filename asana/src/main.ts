import { config } from "./private-config";
import { Parser } from "./parser";
import { AsanaClient } from './asanaClient';
import { Expander } from "./expander";
import { AsanaCommander } from "./AsanaCommander";


let commander = new AsanaCommander(config);

async function go(taskCommand:string) {

	try {
		await commander.init();

		let task = commander.createTask(taskCommand);
		console.log("task created");
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
