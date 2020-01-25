import { config } from "./private-config";
import { Parser } from "./parser";
import { Expander } from "./expander";
import { Remarker } from "./Remarkable";


async function expand(taskCommand:string) {

	try {
		let marker = new Remarker(config);
		let expanded = marker.expand(taskCommand);
		return expanded;
	} catch(e) {
		return "";
	}
}

async function go(mode:string) {
	switch(mode) {
		case "expand":
			result = await expand(note);
			break;
	}

	let response = {
		items: []
	};

	if(result) {
		response.items.push({
			"title": result
		});
	}
	console.log(JSON.stringify(response));
}


let mode = process.argv[2];
let note = process.argv[3] || "";
let result:string;

//go(mode);
console.log(JSON.stringify({
	items: [
		{ title:"abc"},
		{ title:"def"},
		{ title:"ghi"},
	]
}));