import 'express-async-errors'
import Service from "./Services";
import { EventRepo } from '../repositories/EventRepository';
import { Event } from '../db/schema-models/Event';
import { ObjectId } from 'mongoose';

export type dayOfWeek = {
    dayOfWeek : string
}

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

    async find(id : string | ObjectId){
        const event = await this.findById(id)
        return {
            _id : event?._id,
            description : event.description,
            dayOfWeek : event.dayOfWeek,
            publisher : event?.publisher,
        } as any
    }

    async deleteEventsByDay(query : dayOfWeek){
        const eventsToBeDel = await this.findEventsByDescOrDay(query as Event)

        if(eventsToBeDel) await this._repository.deleteMany(query)

        console.log(eventsToBeDel)
        return eventsToBeDel
    }
}