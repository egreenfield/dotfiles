var asana = require('asana');
var config = require('./private-config');
var p = require('process');

var client = asana.Client.create().useAccessToken(config.token);


class foo {


}

let command = {
	name: "",
	assignee: null,
	workspace: null,	
}

async function getWorkspaces(user) {
	return user.workspaces;
}
// async function createTask(user,targetWorkspace,taskName) {
// 	let result = await client.tasks.createInWorkspace(targetWorkspace.id,{
// 		name: taskName,
// 		assignee: user.id
// 	});
// 	return result;
// }

async function createTask(sourceCommand) {
	let command = { ...sourceCommand };
	let workspaceID = command.workspace.id;
	delete command.workspace;

	let result = await client.tasks.createInWorkspace(workspaceID,command);
	return result;
}

function pickWorkspace(taskCommand,workspaces) {
	
	let taskParts = taskCommand.split(" ");
	let workspaceToken = taskParts[0];	
	let workspaceName = config.workspaces[workspaceToken];
	if (workspaceName) {
		taskParts.shift();
		taskCommand = taskParts.join(" ");
	} else {
		workspaceName = config.workspaces.default;
	}	
	let workspace = workspaces.find((w) => w.name.toLowerCase().match(workspaceName.toLowerCase()))
	return [workspace,taskCommand];
}

function parseCommand(taskCommand, user, workspaces) {
	let taskParts = taskCommand.split(" ");

	let workspaceToken = taskParts[0];	
	let workspaceName = config.workspaces[workspaceToken];
	if (workspaceName) {
		taskParts.shift();
		taskCommand = taskParts.join(" ");
	} else {
		workspaceName = config.workspaces.default;
	}	
	let workspace = workspaces.find((w) => w.name.toLowerCase().match(workspaceName.toLowerCase()))
	command.workspace = workspace;
	command.name = taskCommand;
	command.assignee = user.id;

	return command;
}

async function go(taskCommand) {
	try {
		let me = await client.users.me();
		let workspaces = await getWorkspaces(me);
		let command = parseCommand(taskCommand,me,workspaces)
//		let result = await createTask(me,targetWorkspace,taskName);
		let result = await createTask(command);
		if(result) {
			//console.log("task created:",JSON.stringify(command));
			console.log("task created in",command.workspace.name);
		}
	} catch(e) {
		console.log("got error",e);
	}
}

let taskName = p.argv[2];
if(taskName == undefined) {
	console.log("need a task name")
} else {
	go(taskName);	
}
