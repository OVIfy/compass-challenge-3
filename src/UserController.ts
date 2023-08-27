import { Request, Response } from "express"
import { get, controller, post, del } from "./decorators"

@controller('')
export class UserContollers{

    @get('/test')
    testUser(req : Request, res: Response){
        // console.log('test')
        res.send('hello')
    }

    @post('/test')
    hoUser(req : Request, res: Response){
        // console.log('test')
        res.send('hel')
    }
}