export interface RawCommand {
    workspace:string;
    name:string;
    project?:string;
    tags: string[];
    notes?:string;
    due?:Date;
}

export class RawCommand implements RawCommand{
    workspace:string = null;
    name:string = null;
    project?:string = null;
    tags:string[] = [];
    notes?:string;
    due?:Date;
}
