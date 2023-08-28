import { Request, Response } from "express"
import { get, controller, post, del, use } from "../decorators"
import Controller from "./Controllers"
import { Event } from "../db/schema-models/Event"
import { EventService } from "../services/EventService"
import { validateEventToBeCreated } from "../middlewares/bodyValidators"
import { authenticator } from "../middlewares/authenticator"
import { AuthenticatedRequest } from "../middlewares/authenticator"

const eventService = new EventService()

@controller('/events')
export class EventContollers extends Controller<Event>{

    _service = eventService

    @post('/')
    @use(authenticator)
    @use(validateEventToBeCreated)
    async create(req : AuthenticatedRequest, res: Response){
        const event = {...req.body, publisher : req.user?.userId}
        const createdEvent = await eventService.create(event)
        res.json(createdEvent)
    }

    @get('/')
    async findEventsByDayOrDesc(req : AuthenticatedRequest, res: Response){
        const foundEvents = await eventService.findEventsByDescOrDay({} as Event)
        res.send('woo hoo')
    }
}
