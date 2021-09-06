import {ClosureMeta} from "../types";
import {plainToClass} from "class-transformer";
import {validateSync} from "class-validator";

function createParamDecorators(callback: ClosureMeta) {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        let existingRequiredParameters: any[] = Reflect.getMetadata('property', target, propertyKey) || [];
        existingRequiredParameters.unshift(callback({
            target,
            propertyKey,
            parameterIndex
        }));
        Reflect.defineMetadata( 'property', existingRequiredParameters, target, propertyKey);
    }
}

export function Request() {
    return createParamDecorators(meta => request => request)
}

export function Params(validate: boolean = true){
    return createParamDecorators(meta => request => {
        if(validate) {
            const classParams = plainToClass(Reflect.getMetadata("design:paramtypes", meta.target, meta.propertyKey)[meta.parameterIndex], request.params || {});
            const errors = validateSync(classParams)
            if (errors.length)
                throw errors;
        }
        return request.params;
    })
}
