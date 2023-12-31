import 'express-async-errors'
import { User } from "../db/schema-models/User";
import Service from "./Services";
import { UserRepo } from "../repositories/UserRepository";
import { throwNotFoundError, throwValidationError } from "../errors/errors";
import bcrypt from 'bcrypt'
import { signJwt } from '../utils/jwtUtils';

export type UserWithEmailAndPass = {
    email : string,
    password : string
}

export class UserService extends Service<User>{

    _repository = new UserRepo()

    async create(user : Required<User>){
        const foundUser = await this._repository.findByEmail({email : user.email})
        if (foundUser) throwValidationError('invalid email, Email already exists', 'Validation Error', 'Email')

        const {firstName, lastName, email} = (await this._repository.create(user))
        return {firstName,lastName,email}
    }

    async signIn(user : UserWithEmailAndPass){
        const foundUser  = await this._repository.findByEmail({email : user.email})
        if(!foundUser) throwNotFoundError('Email does not exist in our database')

        const isPasswordCorrect = await this.validateUser(user, foundUser as Required<User>)
        
        
        if(isPasswordCorrect){
            let token = signJwt({userId : foundUser?._id})
            return {
                firstName : foundUser?.firstName,
                lastName : foundUser?.lastName,
                email : foundUser?.email,
                accessToken : token 
            }
        }else{
            throwValidationError('Wrong password', 'password', 'Validation Error')
        }
    }

    async validateUser(requestUser : UserWithEmailAndPass, userInDB : UserWithEmailAndPass){
        const isPassword = await bcrypt.compare(requestUser.password, userInDB.password)
        return isPassword
    }

}