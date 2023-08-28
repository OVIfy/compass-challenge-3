import * as Joi from '@hapi/joi';
import { NextFunction, Request, Response } from "express";
import { userJoiSchema, userSignInSchema } from '../schema/userSchema';
import { handleJoiError } from "../utils/handleJoiError";
import { eventJoiSchema } from '../schema/eventSchema';

export function validateCreateUserBody(req : Request, res:Response , next:NextFunction){
    const { error } = userJoiSchema.validate(req.body);
    if(error) handleJoiError(error as any)
    next()
}

export function validateSignInUserBody(req : Request, res:Response , next:NextFunction){
    const { error } = userSignInSchema.validate(req.body);
    if(error) handleJoiError(error as any)
    next()
}

export function validateEventToBeCreated(req : Request, res:Response , next:NextFunction){
    const { error } = eventJoiSchema.validate(req.body);
    if(error) handleJoiError(error as any)
    next()
}
