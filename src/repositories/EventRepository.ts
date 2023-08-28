import { Repository } from "./Repository"
import { Event } from "../db/schema-models/Event"
import { EventModel } from "../db/schema-models/Event"
import { Document, Query, QueryOpThatReturnsDocument } from "mongoose"


export class EventRepo extends Repository<Event, Event>{
    protected _model = EventModel

    async findEventsByDescOrDay(query : Event){
        const events = await this._model.find(query).select('_id dayOfWeek publisher userId description')
        return events 
    }

    async deleteEventsByDay(){
        
    }
}

