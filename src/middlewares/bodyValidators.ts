import { userJoiSchema, userSignInSchema } from '../schema/userSchema';
import { eventJoiSchema, queryByDayorDescJoiSchema } from '../schema/eventSchema';
import { NextFunction, Request, Response } from "express";
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

export function validateEventToBeCreated(req : Request, res:Response , next:NextFunction){
    const { error } = eventJoiSchema.validate(req.body);
    if(error) handleJoiError(error as any)
    next()
}

export function validateEventByDesorDayQuery(req : Request, res:Response , next:NextFunction){
    console.log(req.query)
    const { error } = queryByDayorDescJoiSchema.validate(req.query);
    if(error) handleJoiError(error as any)
    next()
}
