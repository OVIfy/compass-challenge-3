require('dotenv').config()
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

export function signJwt(payload : any){
    let token = jwt.sign(payload, process.env.SECRET as string, { expiresIn: '1h' }) 

    return token
}

export function verifyJwt(unverifiedTok : string){
    const decoded  = jwt.verify(unverifiedTok, process.env.SECRET as Secret)
    return decoded
}