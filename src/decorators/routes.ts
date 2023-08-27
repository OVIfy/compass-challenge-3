import "reflect-metadata";

export function get(path : string) : MethodDecorator{
    return function(target: any, propertyKey: any, descriptor: PropertyDescriptor){
        
        Reflect.defineMetadata('path', path, target, propertyKey)
        Reflect.defineMetadata('method', 'get', target, propertyKey)
    }
}

export function post(path : string) : MethodDecorator{
    return function(target: any, propertyKey: any, descriptor: PropertyDescriptor){
        
        Reflect.defineMetadata('path', path, target, propertyKey)
        Reflect.defineMetadata('method', 'post', target, propertyKey)
    }
}

export function del(path : string) : MethodDecorator{
    return function(target: any, propertyKey: any, descriptor: PropertyDescriptor){
        
        Reflect.defineMetadata('path', path, target, propertyKey)
        Reflect.defineMetadata('method', 'delete', target, propertyKey)
    }
}
