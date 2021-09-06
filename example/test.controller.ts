import {CloudController, Define} from "../src/decorators/decorators";
import {Param} from "./dto/param";
import {Params, Request} from "../src/decorators/params";

@CloudController()
export class TestController {

    @Define()
    test(
        @Params() dto: Param,
        @Request() request: any
    ){
        console.log('hello world')
        return {...dto, hello: 'World'}
    }
}
