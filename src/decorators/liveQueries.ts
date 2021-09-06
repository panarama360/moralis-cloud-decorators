import {createCloudCode} from "./decorators";

export function BeforeConnect() {
    return createCloudCode('beforeConnect', false);
}

export function BeforeSubscribe(objectName: string) {
    return createCloudCode('beforeSubscribe', objectName);
}

export function AfterLiveQueryEvent(objectName: string) {
    return createCloudCode('afterLiveQueryEvent', objectName);
}

export function OnLiveQueryEvent(objectName: string) {
    return createCloudCode('onLiveQueryEvent', false);
}
