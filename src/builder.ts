import 'reflect-metadata'
import {Container} from "typedi";
import {CallbackRequest, CloudMethodMeta} from "./types";

declare const Moralis: { Cloud: any };

export class CloudBuilder {

    public cloudFunctionsStorage: any = {};

    constructor(private readonly cloudModules: Function[], private readonly local?: {
        applicationId: string, serverURL: string, masterKey: string
    }) {
    }

    build() {
        this.cloudModules.forEach(classModule => {
            const controller: any = Container.get(classModule)
            Object.getOwnPropertyNames(classModule.prototype).forEach(methods => {
                const methodsMeta: CloudMethodMeta[] = (Reflect.getMetadata('cloudMethods', classModule.prototype, methods) || []) as []
                if (methodsMeta.length) {
                    const middlewares = this.getMiddleware(classModule, methods);
                    const paramsFunc = this.getParams(classModule, methods);
                    const injectParams = this.injectParams(paramsFunc);
                    methodsMeta.forEach(value => {
                        const method = this.getMethod(value.method);
                        const args: any[] = [
                            async (request: any) => {
                                request.meta = value;
                                for (const m of middlewares) await m(request);
                                return controller[methods](...await injectParams(request));
                            }
                        ]
                        if(value.name !== false) args.unshift(value.name)
                        if(value.name === false && this.local) args.unshift('$self')
                        method(...args)
                    })
                }
            })
        })
    }

    getMethod(method: string): Function{
        if(!this.local)
            return Moralis.Cloud[method]
        else {
            this.cloudFunctionsStorage[method] = this.cloudFunctionsStorage[method] || {};
            const functions = this.cloudFunctionsStorage[method];
            return (name: string, callback: Function) => {
                functions[name] = functions[name]  || []
                functions[name].push(callback);
            }
        }
    }

    getMiddleware(classModule: Function, method: string): CallbackRequest[] {
        const middlewares = Reflect.getMetadata('middleware', classModule.prototype, method) || [];
        return middlewares;
    }

    getParams(classModule: Function, method: string): CallbackRequest[] {
        const propMeta = Reflect.getMetadata('property', classModule.prototype, method) || [];
        return propMeta;
    }

    injectParams(paramsFunc: CallbackRequest[]) {
        return (request: any) => {
            return Promise.all(paramsFunc.map(value => value(request)))
        }
    }
}
