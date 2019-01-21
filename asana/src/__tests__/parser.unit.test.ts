import { Parser } from "../parser";
import { RawCommand } from "../rawCommand";
let chrono = require("chrono-node");

function testParse(name:string,command:string,result:RawCommand) {
    return test(name,() => {
        let p = new Parser();
        let c = p.parse(command);
        expect(c).toEqual(result);
    });
}

testParse("just name","this is a simple test",{
    name:"this is a simple test",
    workspace:null,
    project:null,
    tags:[]
});

testParse("specify a workspace","-w this is a task",{
    name:"this is a task",
    workspace:"w",
    project:null,
    tags:[]
});

testParse("specify a project","+poe this is a task",{
    name:"this is a task",
    workspace:null,
    project:"poe",
    tags:[]
});

testParse("multiple options","-w +poe this is a task",{
    name:"this is a task",
    workspace:"w",
    project:"poe",
    tags:[]
});

testParse("tag","#poeStaff this is a task",{
    name:"this is a task",
    workspace: null,
    project: null,
    tags:["poeStaff"]
});

testParse("tag after","this is a task #poeStaff",{
    name:"this is a task",
    workspace: null,
    project: null,
    tags:["poeStaff"]
});

describe("Notes",() => {
    testParse("with notes", "this is the name | this is a note for the task",{
        workspace: null,
        project: null,
        name:"this is the name",
        tags:[],
        notes: "this is a note for the task"
    });

    testParse("with notes and after-options", "this is the name | this is a note for the task #poe",{
        workspace: null,
        project: null,
        name:"this is the name",
        tags:["poe"],
        notes: "this is a note for the task"
    });
    testParse("url parsing notes", "the name http://www.google.com/",{
        workspace: null,
        project: null,
        name:"the name",
        tags:[],
        notes: "http://www.google.com/"
    });

    testParse("url parsing notes https", "the name https://www.google.com/",{
        workspace: null,
        project: null,
        name:"the name",
        tags:[],
        notes: "https://www.google.com/"
    });

    testParse("don't get confused by http", "the name http",{
        workspace: null,
        project: null,
        name:"the name http",
        tags:[],
    });

    testParse("ignore with extra notes", "the name http://www.google.com | these are the notes",{
        workspace: null,
        project: null,
        name:"the name http://www.google.com",
        notes: "these are the notes",
        tags:[],
    });
});

describe("Due Dates",() => {

    testParse("simple due date at the end", "the name @Friday",{
        workspace: null,
        project: null,
        name:"the name",
        tags:[],
        due: chrono.parseDate("Friday")
    });

    testParse("multi-word due date at the end", "the name @next Friday",{
        workspace: null,
        project: null,
        name:"the name",
        tags:[],
        due: chrono.parseDate("next Friday")
    })
    testParse("simple due date at start", "@Friday the name",{
        workspace: null,
        project: null,
        name:"the name",
        tags:[],
        due: chrono.parseDate("Friday")
    });

    testParse("multi-word due date at the start", "@next Friday the name",{
        workspace: null,
        project: null,
        name:"the name",
        tags:[],
        due: chrono.parseDate("next Friday")
    })

    testParse("due date at the end w/ later options", "the name @Friday #poe",{
        workspace: null,
        project: null,
        name:"the name",
        tags:["poe"],
        due: chrono.parseDate("Friday")
    });

    testParse("multi-word due date at the end w/ later options", "the name @next Friday #poe",{
        workspace: null,
        project: null,
        name:"the name",
        tags:["poe"],
        due: chrono.parseDate("next Friday")
    })

});
