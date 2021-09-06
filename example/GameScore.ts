import {Moralis} from "moralis/node";
import {Obj, ObjField} from "../src/decorators/objects";

@Obj('GameScore')
export class GameScore extends Moralis.Object{


    constructor() {
        super('GameScore');
    }
    @ObjField()
    score: number =  111111;
    @ObjField()
    playerName: string =  "1231313";
    @ObjField()
    cheatMode: boolean =  true;
}
