import { Parser } from "../parser";
import { RawCommand } from "../rawCommand";
function testParse(name:string,command:string,result:RawCommand) {
    return test(name,() => {
        let p = new Parser();
        let c = p.parse(command);
        expect(c).toEqual(result);
    });
}

testParse("just name","this is a simple test",{name:"this is a simple test",workspace:null});
