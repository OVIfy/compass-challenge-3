import { Repository } from "./Repository"
import { Event } from "../db/schema-models/Event"
import { EventModel } from "../db/schema-models/Event"


export class EventRepo extends Repository<Event>{
    protected _model = EventModel

    async findEventsByDescOrDay(query : Partial<Event>){
        const events = await this._model.find(query).select('_id dayOfWeek publisher userId description')
        return events 
    }
}

