import { Parser } from "../parser";
import { RawCommand } from "../rawCommand";
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
});

testParse("specify a workspace","-w this is a task",{
    name:"this is a task",
    workspace:"w",
    project:null,
});

testParse("specify a project","+poe this is a task",{
    name:"this is a task",
    workspace:null,
    project:"poe",
});

testParse("multiple options","-w +poe this is a task",{
    name:"this is a task",
    workspace:"w",
    project:"poe",
});
