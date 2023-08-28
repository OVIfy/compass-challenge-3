// import Model from '../database/models/Model';
// import RequestError from '../utils/RequestError';
// import { Entity } from "../@types/Entity";
import { Repository } from "../repositories/Repository";

abstract class Service<T, K>{

    protected abstract _repository : Repository<T, K>

    abstract create(validObj : K) : void
}

export default Service;