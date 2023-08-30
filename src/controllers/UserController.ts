import { Request, Response } from "express"
import { controller, post, use } from "../decorators"
import Controller from "./Controllers"
import { validateCreateUserBody, validateSignInUserBody } from "../middlewares/bodyValidators"
import { UserService, UserWithEmailAndPass } from "../services/UserService"
import { User } from "../db/schema-models/User"

const userService = new UserService()

@controller('/users')
export class UserContollers extends Controller{
    
    @post('/sign-up')
    @use(validateCreateUserBody)
    async signUp(req : Request, res: Response){
        const createduser = await userService.create(req.body as Required<User>)
        res.status(201).json(createduser)
    }

   
    @post('/sign-in')
    @use(validateSignInUserBody)
    async signIn(req : Request, res: Response){
        const validUser = await userService.signIn(req.body as UserWithEmailAndPass)
        res.json(validUser)
    }
}

