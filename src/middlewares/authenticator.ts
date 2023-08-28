require('dotenv').config()
import 'express-async-errors'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { throwUnauthorizedError, UnauthorizedError } from '../errors/errors'
import { Request, RequestHandler, Response } from 'express'
import { NextFunction } from 'express-serve-static-core'
import { verifyJwt } from '../utils/jwtUtils'

export interface userIdObject extends JwtPayload {
    userId : string
}

// Extend the type of the Request object
export interface AuthenticatedRequest extends Request {
    user?: { userId: string }; // Add the 'user' property
}

export function authenticator(req : AuthenticatedRequest, res : Response, next:NextFunction){
    if(!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')){
      throwUnauthorizedError("Not Authenticated - token or Bearer abscent")
    }else{
        let token = req.headers.authorization.split(' ')[1]

        if(!token) throwUnauthorizedError("Not Authenticated - token or Bearer abscent")
       
        const decodedtoken = verifyJwt(token) as userIdObject
        if(!decodedtoken.userId) throwUnauthorizedError("Not Authenticated - token or Bearer abscent")
    
        req.user = {userId : decodedtoken.userId} 
        next()
    }
}
