import 'reflect-metadata'
import {Service} from "typedi";
import {CloudMethodMeta} from "../types";

export function CloudController() {
    return (target: Function) => {
        Service({})(target)
    }
}

export function createCloudCode(methodName: string, name?: string | false) {
    return (target: any, propertyName: string) => {
        const methods: CloudMethodMeta[] = Reflect.getMetadata('cloudMethods', target, propertyName) || [];
        methods.push({
            method: methodName,
            name: name ?? propertyName,
        });
        Reflect.defineMetadata('cloudMethods', methods, target, propertyName);
    }
}

export function Define(name?: string) {
    return createCloudCode('define', name);
}

export function Job(name?: string) {
    return createCloudCode('job', name);
}
