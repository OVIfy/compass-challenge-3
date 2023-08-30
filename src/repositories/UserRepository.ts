import { ObjWithID, Repository } from "./Repository"
import { User } from "../db/schema-models/User"
import { UserModel } from "../db/schema-models/User"

type userHasEmail = {
    email : string
}

export class UserRepo extends Repository<User>{
    protected _model = UserModel

    async findByEmail(validObj : userHasEmail){
        const foundObj = await this._model.findOne(validObj)
        return foundObj
    }
}

// const userRepo = new UserRepo()
