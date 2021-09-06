import {IsNumber} from "class-validator";

export class Param{
    @IsNumber()
    id: number
}
