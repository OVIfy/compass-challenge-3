import { Repository } from "./Repository"
import { Event } from "../db/schema-models/Event"
import { EventModel } from "../db/schema-models/Event"
import { Entity } from "../@types/Entity"
import { Document, Query, QueryOpThatReturnsDocument } from "mongoose"


export class EventRepo extends Repository<Event, Event>{
    protected _model = EventModel

    async findEventsByDescOrDay(query : Event){
        console.log('finding the awsome event')
    }
}

