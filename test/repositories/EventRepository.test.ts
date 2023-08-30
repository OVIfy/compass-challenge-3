require('dotenv').config()
import mongoose from "mongoose"
import { EventRepo } from "../../src/repositories/EventRepository"
import { Event } from "../../src/db/schema-models/Event"

describe('UserRepository test suite', ()=>{
    let eventRepo : EventRepo
    let testEvent : Required<Event>
    let testEvents : Required<Event>[]
    let validDbConnection : typeof mongoose

    beforeAll(async ()=>{
        eventRepo = new EventRepo()

        testEvent = {
            "dayOfWeek" : "friday",
            "description" : "a test event",
            "publisher" : "tester"
        } 

        testEvents = [testEvent, testEvent, {...testEvent, dayOfWeek: 'thursday'}]

        await mongoose.connect(process.env.TEST_MONGO_URI as string)
        .then((validConnection) => validDbConnection = validConnection)
        .catch((err) => console.log(err))
    })

    afterAll(async ()=>{
        await mongoose.connection.dropCollection('events')
    })

    it('Should connect to test database', async ()=>{
        expect(validDbConnection).not.toBeFalsy()
    })

    it('should find events by description or day',async ()=>{
        const events = await eventRepo.create(testEvents as any)
        const foundEvents = await eventRepo.findEventsByDescOrDay({dayOfWeek : 'friday'})
        expect(foundEvents).toBeTruthy()
        expect(foundEvents.length).toBe(2)
        expect(foundEvents[0].dayOfWeek).toBe('friday')
    })
})