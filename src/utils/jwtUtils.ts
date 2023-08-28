require('dotenv').config()
import jwt from 'jsonwebtoken'

export function signJwt(payload : any){
    let token = jwt.sign(payload, process.env.SECRET as string, { expiresIn: '1h' }) 

    return token
}