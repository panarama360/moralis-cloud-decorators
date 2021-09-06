
export type CallbackRequest = (request: any) => (any | Promise<any>)
export type Meta = {target: Object, propertyKey: string | symbol, parameterIndex?: number}

export type ClosureMeta = (meta: Meta) => CallbackRequest

export interface CloudMethodMeta{
    method: string,
    name: string | false
}
