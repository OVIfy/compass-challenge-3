import Joi from 'joi';
import { throwBadRequestError } from '../errors/errors';

export function handleJoiError(joiError : Joi.ValidationError){
    let errorType = joiError?.details[0]?.type
    let errorMessage = joiError?.details[0]?.message
    let errorKey = joiError?.details[0]?.path[0] 

    if(errorType == 'any.required') return throwBadRequestError(errorMessage, 'all Required fields must be provided')

    if(errorType == 'any.only') return throwBadRequestError(errorMessage, 'value mismatch')

    if(errorType == 'string.email') return throwBadRequestError(errorMessage, 'Validation Error')

    if(errorType == 'object.and') return throwBadRequestError(errorMessage, 'Required pair fiield missing')

    if(errorType == 'object.unknown') return throwBadRequestError(errorMessage, 'Unknown Field')
    
    throwBadRequestError(errorMessage, 'Validation Error')
}