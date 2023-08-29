// import Model from '../database/models/Model';
// import RequestError from '../utils/RequestError';
// import { Entity } from "../@types/Entity";
import 'express-async-errors'
import { ObjectId } from "mongoose";
import { Repository } from "../repositories/Repository";
import { throwNotFoundError } from "../errors/errors";
import { Entity } from '../@types/Entity';

interface ObjWithID{
    _id : string 
}

abstract class Service<T>{

    protected abstract _repository : Repository<T>

    abstract create(validObj : Partial<T>) : void

    async findById(id : ObjectId | string):Promise<T & ObjWithID>{
        const foundObj = await this._repository.findById(id)

        if(!foundObj) throwNotFoundError('Not Found')

        return foundObj as T & ObjWithID
    }

    async deleteById(id : ObjectId | string){
        const doesObjectExist = await this.findById(id)
        
        if(doesObjectExist) await this._repository.deleteById(id)
    }
}

export default Service;