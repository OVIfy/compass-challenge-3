import 'express-async-errors'
import { User, StrictUser } from "../db/schema-models/User";
import Service from "./Services";
import { UserRepo } from "../repositories/UserRepository";
import { throwNotFoundError, throwValidationError } from "../errors/errors";
import bcrypt from 'bcrypt'
import { signJwt } from '../utils/jwtUtils';

export type UserWithEmailAndPass = {
    email : string,
    password : string
}

export class UserService extends Service<User, StrictUser>{

    _repository = new UserRepo()

    async create(user: StrictUser){
        const foundUser = await this._repository.findByEmail({email : user.email})
        if (foundUser) throwValidationError('invalid email, Email already exists', 'Validation Error', 'Email')

        const createdUser = (await this._repository.create(user))
        return {
            firstName : createdUser.firstName,
            lastName : createdUser.lastName,
            email : createdUser.email
        }
    }

    async signIn(user : UserWithEmailAndPass){
        const foundUser = await this._repository.findByEmail({email : user.email})
        if(!foundUser) throwNotFoundError('Email does not exist in our database')

        const isPasswordCorrect = await this.validateUser(user, foundUser as UserWithEmailAndPass )
        
        
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