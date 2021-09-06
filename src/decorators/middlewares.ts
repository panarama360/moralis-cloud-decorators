import {ClosureMeta} from "../types";

export function createMiddlewareDecorator(callback: ClosureMeta) {
    return (target: Object, propertyKey: string | symbol) => {
        let middlewares: any[] = Reflect.getMetadata('middleware', target, propertyKey) || [];
        middlewares.unshift(callback({
            target,
            propertyKey
        }))
        Reflect.defineMetadata('middleware', middlewares, target, propertyKey);
    }
}

export function IsAuth() {
    return createMiddlewareDecorator(meta => request => {
        if(!request.user)
            throw 'Error User';
    })
}
