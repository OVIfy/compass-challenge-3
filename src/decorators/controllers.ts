import "reflect-metadata";
import { Methods } from "./@types/Methods";
import { IRouter, Router } from "express";
// export const router = Router()
import { AppRouter } from "../AppRouter";


export function controller(rootRoute : string) : ClassDecorator{
    return function (target){
        Object.getOwnPropertyNames(target.prototype).forEach((key) => {
            const router = AppRouter.getInstance() 
            const controllerFn = target.prototype[key]
            const pathStr = Reflect.getMetadata('path', target.prototype, key)
            const method = Reflect.getMetadata('method', target.prototype, key) as Methods

            if(pathStr){
                router[method](`${rootRoute}${pathStr}`, controllerFn)
            }
        })
        console.log(AppRouter.getInstance().stack)
    }
}

