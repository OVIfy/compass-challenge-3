import { Repository } from "./Repository"
import { StrictUser, User } from "../db/schema-models/User"
import { UserModel } from "../db/schema-models/User"
import { Entity } from "../@types/Entity"
import { Document, Query, QueryOpThatReturnsDocument } from "mongoose"

type userHasEmail = {
    email : string
}

export class UserRepo extends Repository<User, StrictUser>{
    protected _model = UserModel

    async findByEmail(validObj : userHasEmail){
        const foundObj = await this._model.findOne(validObj).select('firstName lastNae email')
        
        return foundObj
    }
}

const userRepo = new UserRepo()
