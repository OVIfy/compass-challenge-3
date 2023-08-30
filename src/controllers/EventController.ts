import { Response } from "express"
import { get, controller, post, del, use } from "../decorators"
import Controller from "./Controllers"
import { Event } from "../db/schema-models/Event"
import { EventService} from "../services/EventService"
import { validateByDayQuery, validateEventByDesorDayQuery, validateEventToBeCreated, validateParamId } from "../middlewares/bodyValidators"
import { authenticator } from "../middlewares/authenticator"
import { AuthenticatedRequest } from "../middlewares/authenticator"

const eventService = new EventService()

@controller('/events')
export class EventContollers extends Controller{

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
    @use(authenticator)
    @use(validateEventByDesorDayQuery)
    async findEventsByDayOrDesc(req : AuthenticatedRequest, res: Response){
        const foundEvents = await eventService.findEventsByDescOrDay(req.query as Event)
        res.json(foundEvents)
    }

    @del('/')
    @use(authenticator)
    @use(validateByDayQuery)
    async deleteEventsByDay(req : AuthenticatedRequest, res: Response){
        const {dayOfWeek} = req.query
        const deletedEvents = await eventService.deleteEventsByDay({dayOfWeek : dayOfWeek as string})
        res.status(200).json({deletedEvents})
    }

    @get('/:id')
    @use(authenticator)
    @use(validateParamId)
    async findEventById(req : AuthenticatedRequest, res: Response){
        const foundEvent = await eventService.find(req.params.id)
        res.json(foundEvent)
    }

    @del('/:id')
    @use(authenticator)
    @use(validateParamId)
    async deleteById(req : AuthenticatedRequest, res: Response){
        await eventService.deleteById(req.params.id)
        res.status(204).send({})
    }
}
