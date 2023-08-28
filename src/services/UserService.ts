import { User, StrictUser } from "../db/schema-models/User";
import Service from "./Services";
import { UserRepo } from "../repositories/UserRepository";
import { throwValidationError } from "../errors/errors";
import 'express-async-errors'

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

    }

}