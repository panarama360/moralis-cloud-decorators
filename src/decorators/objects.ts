import {createCloudCode} from "./decorators";
import {Moralis} from "moralis/node";

export function ObjField() {
    return function (target: Object, key: string | symbol) {
        Object.defineProperty(target, key, {
            get: function () {
                return this.get(key);
            },
            set: function (value) {
                this.set(key, value);
            },
            enumerable: true,
            configurable: true
        });
    }
}

export function Obj(nameObject?: string) {
    return (target: any) => {
        Moralis.Object.registerSubclass(nameObject || target.prototype.constructor.name, target.prototype.constructor);
    }
}

export function AfterSave(objectName: string) {
    return createCloudCode('afterSave', objectName);
}

export function BeforeSave(objectName: string) {
    return createCloudCode('beforeSave', objectName);
}

export function BeforeDelete(objectName: string) {
    return createCloudCode('beforeDelete', objectName);
}

export function AfterDelete(objectName: string) {
    return createCloudCode('afterDelete', objectName);
}

export function BeforeFind(objectName: string) {
    return createCloudCode('beforeFind', objectName);
}

export function AfterFind(objectName: string) {
    return createCloudCode('afterFind', objectName);
}
