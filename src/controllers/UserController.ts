import { Request, Response } from "express"
import { get, controller, post, del, use } from "../decorators"
import Controller from "./Controllers"
import { validateCreateUserBody, validateSignInUserBody } from "../middlewares/bodyValidators"
import { UserService, UserWithEmailAndPass } from "../services/UserService"
import { StrictUser, User } from "../db/schema-models/User"
import Service from "../services/Services"
import { UserModel } from "../db/schema-models/User"

const userService = new UserService

@controller('/users')
export class UserContollers extends Controller<User>{

    @post('/sign-up')
    @use(validateCreateUserBody)
    async signUp(req : Request, res: Response){
        const createduser = await userService.create(req.body as StrictUser)
        res.status(201).json(createduser)
    }

   
    @post('/sign-in')
    @use(validateSignInUserBody)
    async signIn(req : Request, res: Response){
        const stuff = await userService.signIn(req.body as UserWithEmailAndPass)
        res.send('sign in user')
    }
}

