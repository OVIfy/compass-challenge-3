import 'express-async-errors'
import Service from "./Services";
import { EventRepo } from '../repositories/EventRepository';
import { Event } from '../db/schema-models/Event';
import { ObjectId } from 'mongoose';
import { throwNotFoundError } from '../errors/errors';

export type dayOfWeek = {
    dayOfWeek : string
}

export class EventService extends Service<Event>{
    _repository = new EventRepo()
  
    async create(event : Event){
        const {_id, description, dayOfWeek, publisher} = await this._repository.create(event)
        return {_id, description, dayOfWeek, publisher}
    }

    async findEventsByDescOrDay(query : Partial<Event>){
        if(query.description){
            let re = new RegExp(query.description, "i");
            query.description = re as any
        }
        const events =  await this._repository.findEventsByDescOrDay(query)
        return events
    }

    async find(id : string | ObjectId){
        const event = await this.findById(id)
        return {
            _id : event._id,
            description : event.description,
            dayOfWeek : event.dayOfWeek,
            publisher : event.publisher,
        } as Required<Event> & {_id : string}
    }

    async deleteEventsByDay(query : dayOfWeek){
        const eventsToBeDel = await this.findEventsByDescOrDay(query as Event)

        if(eventsToBeDel.length > 0) await this._repository.deleteMany(query)
        else throwNotFoundError('No matching Events')

        return eventsToBeDel
    }
}