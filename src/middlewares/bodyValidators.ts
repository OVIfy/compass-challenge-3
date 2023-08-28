import { userJoiSchema, userSignInSchema } from '../schema/userSchema';
import { eventJoiSchema, queryByDaySchema, queryByDayorDescJoiSchema } from '../schema/eventSchema';
import { NextFunction, Request, Response } from "express";
import { handleJoiError } from "../utils/handleJoiError";
import { isObjectIdOrHexString } from 'mongoose';
import { throwBadRequestError } from '../errors/errors';

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

export function validateParamId(req : Request, res:Response , next:NextFunction){
    const {id} = req.params

    if(!isObjectIdOrHexString(id)) throwBadRequestError('Invalid ID supplied', 'ID')
    next()
}

export function validateByDayQuery(req : Request, res:Response , next:NextFunction){
    console.log(req.query)
    const { error } = queryByDaySchema.validate(req.query);
    if(error) handleJoiError(error as any)
    next()
}
