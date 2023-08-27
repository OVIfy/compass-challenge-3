import { Request, Response } from "express"
import { get, controller, post, del } from "../decorators"

@controller('/users')
export class UserContollers{

    @post('/sign-up')
    signUp(req : Request, res: Response){
        res.send('sign up user')
    }

    @post('/sign-in')
    signIn(req : Request, res: Response){
        res.send('sign in user')
    }
}