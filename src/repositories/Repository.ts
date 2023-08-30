import { Document, FilterQuery, Model, ObjectId } from "mongoose"
import { User } from "../db/schema-models/User"
import { UserModel } from "../db/schema-models/User"

export interface ObjWithID{
    _id : string 
}

export abstract class Repository<T>{
    protected abstract _model : Model<T>

    async create(validObj : Partial<T>){
        const createdObj = await this._model.create(validObj)
        return createdObj as Required<T> & ObjWithID
    }

    async find(validObj : FilterQuery<Partial<T>>){
        const foundObj = this._model.find(validObj)
        return foundObj 
    }

    async findById(id : ObjectId | string){
        const foundObj = await this._model.findById(id)
        return foundObj
    }

    async deleteById(id : ObjectId | string){
        await this._model.findByIdAndDelete(id)
    }

    async deleteMany(query : FilterQuery<Partial<T>>){
        await this._model.deleteMany(query)
    }
}