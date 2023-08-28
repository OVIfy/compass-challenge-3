export class CustomError extends Error{
    public status
    public statusCode
    public resource
    public ty = ''
    constructor(message : string, statusCode:number, resource:string){
        super(message)
        this.status = 400
        this.statusCode = statusCode
        this.resource = resource
    }
}

export class BadRequestError extends CustomError{
    constructor(message : string, resource:string){
        super(message, 400, resource)
    }
}

export class InternalServerError extends CustomError{
    constructor(message : string, resource:string){
        super(message, 500, resource)
    }
}

export class NotFoundError extends CustomError{
    constructor(message : string, resource:string){
        super(message, 404, resource)
    }
}

export class UnauthorizedError extends CustomError{
    constructor(message : string, resource:string){
        super(message, 401, resource)
    }
}

export class ValidationError extends CustomError{
    constructor(message : string, resource:string, typ : string){
        super(message, 401, resource)
        this.ty = typ
    }
}


export function throwInternalServerError(){
    const error = new InternalServerError('something went wrong', 'server')
    throw error
}

export function throwBadRequestError(message: string, resource : string){
    const err = new BadRequestError(message,resource)
    throw err
}

export function throwNotFoundError(message: string){
    const err = new NotFoundError(message, '')
    throw err
}

export function throwUnauthorizedError(message : string){
    typeof(message)
    if(!message) message = 'Not Authenticated'
    const err = new UnauthorizedError(message, '')
    throw err
}

export function throwValidationError(message: string, resource : string, ty : string){
    const err = new ValidationError(message, resource, ty)
    throw err
}