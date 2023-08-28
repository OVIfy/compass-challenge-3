// import Model from '../database/models/Model';
// import RequestError from '../utils/RequestError';
// import { Entity } from "../@types/Entity";
import { ObjectId } from "mongoose";
import { Repository } from "../repositories/Repository";

abstract class Service<T, K>{

    protected abstract _repository : Repository<T, K>

    abstract create(validObj : K) : void

    async deleteById(id : ObjectId | string){
        console.log('deleted')
    }
}

export default Service;