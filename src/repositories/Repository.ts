import { FilterQuery, Model, ObjectId } from "mongoose"
import { User } from "../db/schema-models/User"
import { UserModel } from "../db/schema-models/User"

export abstract class Repository<T, K>{
    protected abstract _model : Model<T>

    async create(validObj : K){
        const createdObj = await this._model.create(validObj)
        return createdObj
    }

    async find(validObj : FilterQuery<T>){
        const foundObj = this._model.find(validObj)
        return foundObj
    }

    async deleteById(id : ObjectId | string){
        // await this._model.deleteOne
    }
}