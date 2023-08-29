require('dotenv').config()
import jwt, { JsonWebTokenError, JwtPayload, Secret } from 'jsonwebtoken'
import { throwUnauthorizedError } from '../errors/errors'

export function signJwt(payload : any){
    let token = jwt.sign(payload, process.env.SECRET as string, { expiresIn: '1h' }) 

    return token
}

export function verifyJwt(unverifiedTok : string){
    const decoded  = jwt.verify(unverifiedTok, process.env.SECRET as Secret)
    return decoded
}

export function handleJwtError(jwtError : JsonWebTokenError){
    const {name, message} = jwtError
    throwUnauthorizedError(message)
}