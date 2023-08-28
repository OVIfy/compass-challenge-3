import * as Joi from '@hapi/joi';
import { NextFunction, Request, Response } from "express";
import { userJoiSchema, userSignInSchema } from "../@types/joiTypes";
import { handleJoiError } from "../utils/handleJoiError";

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
