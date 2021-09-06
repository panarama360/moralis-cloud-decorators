import {createCloudCode} from "./decorators";

export function BeforeSaveFile() {
    return createCloudCode('beforeSaveFile', false);
}

export function AfterSaveFile() {
    return createCloudCode('afterSaveFile', false);
}

export function BeforeDeleteFile() {
    return createCloudCode('beforeDeleteFile', false);
}

export function AfterDeleteFile() {
    return createCloudCode('afterDeleteFile', false);
}
