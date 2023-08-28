import 'express-async-errors'
import Service from "./Services";
import { EventRepo } from '../repositories/EventRepository';
import { Event } from '../db/schema-models/Event';
import { ObjectId } from 'mongoose';



export class EventService extends Service<Event, Event>{
    _repository = new EventRepo()
  
    async create(event : Event){
        const {_id, description, dayOfWeek, publisher} = await this._repository.create(event)
        return {_id, description, dayOfWeek, publisher}
    }

    async findEventsByDescOrDay(query : Event){
        if(query.description){
            let re = new RegExp(query.description, "i");
            query.description = re as any
        }
        const events =  await this._repository.findEventsByDescOrDay(query)
        return events
    }

    
}