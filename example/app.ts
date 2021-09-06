import {TestController} from "./test.controller";
import {CloudBuilder} from "../src";

async function app() {
    const builder = new CloudBuilder([
        TestController
    ], {
        applicationId: 'vdnuBkowPIrCBs993UExjv2Td79d1Ef96AuFX9id',
        serverURL: 'https://8tgl0ytv8nho.moralisweb3.com:2053/server',
        masterKey: '3y74R9LacG8Rfihin7twf2M6cjC0QQPLk9S2Zr9g'
    });
    builder.build();
    console.log(builder.cloudFunctionsStorage)
    // builder.cloudFunctionsStorage?.define?.test[0]({}).catch(reason => {
    //     console.log(reason);
    // });
    setInterval(()=>{}, 200);
}

app();
