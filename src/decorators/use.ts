import 'reflect-metadata';
import { RequestHandler, Request, Response, NextFunction } from 'express';

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export function use(middleware: Middleware) {
  return function(target: any, key: string, desc: PropertyDescriptor) {
    const middlewares =
      Reflect.getMetadata('middleware', target, key) || [];

    Reflect.defineMetadata(
      'middleware',
      [...middlewares, middleware],
      target,
      key
    );
  };
}
