// import Model from '../database/models/Model';
// import RequestError from '../utils/RequestError';
// import { Entity } from "../@types/Entity";
import 'express-async-errors'
import { ObjectId } from "mongoose";
import { Repository } from "../repositories/Repository";
import { throwNotFoundError } from "../errors/errors";

abstract class Service<T, K>{

    protected abstract _repository : Repository<T, K>

    abstract create(validObj : K) : void

    async findById(id : ObjectId | string):Promise<T>{
        const foundObj = await this._repository.findById(id)

        if(!foundObj) throwNotFoundError('Not Found')

        return foundObj as T
    }

    async deleteById(id : ObjectId | string){
        const doesObjectExist = await this.findById(id)
        
        if(doesObjectExist) await this._repository.deleteById(id)
    }
}

export default Service;