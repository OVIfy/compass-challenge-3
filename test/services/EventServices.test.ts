let createMockfn = jest.fn()
let findEventsByDescMockFn = jest.fn()
let findByIdMockFn = jest.fn()
let deleteManyMockFn = jest.fn()

require('dotenv').config()
import { Event } from "../../src/db/schema-models/Event"
import { NotFoundError } from "../../src/errors/errors"
import { EventService } from "../../src/services/EventService"
import mongoose from "mongoose"

// let mockEventCreate = jest.fn().mockResolvedValue(})

jest.mock("../../src/repositories/EventRepository", function(){
    return {
        EventRepo : jest.fn().mockReturnValue({
            create : createMockfn,
            findEventsByDescOrDay : findEventsByDescMockFn,
            findById : findByIdMockFn,
            deleteMany : deleteManyMockFn
        })
    }
})


describe('EventServices test suite', ()=>{

    let eventService : EventService
    let testEvent : Required<Event>
    let testCreatedEvent : Required<Event> & {_id : string}
    let validDbConnection : typeof mongoose


    beforeAll(async ()=>{
        eventService = new EventService()
        testEvent = {
            description : 'a test event',
            dayOfWeek : 'tuesday',
            publisher : '64ef2eb9823d6b90e7a82ab3'
        }

        testCreatedEvent = {
            _id : '64ef2eb9823d6b90e7a82ad1',
            description : 'a test event',
            dayOfWeek : 'tuesday',
            publisher : '64ef2eb9823d6b90e7a82ab3'
        }

        createMockfn.mockResolvedValue(testCreatedEvent)
        findEventsByDescMockFn.mockResolvedValue([
            testEvent, 
            {...testEvent, _id : '64ef2eb9823d6b90e7a82ad2'},
            {...testEvent, _id : '64ef2eb9823d6b90e7a82ad3'}
        ])
        
        
        // await mongoose.connect(process.env.TEST_MONGO_URI as string)
        // .then((validConnection) => validDbConnection = validConnection)
        // .catch((err) => console.log(err))
    })

    beforeEach(()=>{
        findEventsByDescMockFn.mockResolvedValue([
            testEvent, 
            {...testEvent, _id : '64ef2eb9823d6b90e7a82ad2'},
            {...testEvent, _id : '64ef2eb9823d6b90e7a82ad3'}
        ])

        findByIdMockFn.mockResolvedValue(testCreatedEvent)
        deleteManyMockFn.mockResolvedValueOnce([
            testEvent, 
            {...testEvent, _id : '64ef2eb9823d6b90e7a82ad2'},
            {...testEvent, _id : '64ef2eb9823d6b90e7a82ad3'}
        ])
    })

    afterAll(async ()=>{
        // await mongoose.connection.dropCollection('events')
    })

    afterEach(() => {
        findEventsByDescMockFn.mockReset()
        findByIdMockFn.mockReset()
        deleteManyMockFn.mockReset()
    })

    // it('should connect to test database', ()=>{
    //     expect(validDbConnection).not.toBeFalsy()
    // })

    it('should call repository.create on create', async ()=>{
        const event = await eventService.create(testEvent)
        expect(createMockfn).toHaveBeenCalledTimes(1)
        expect(event).toBeTruthy()
        createMockfn.mockReset()
    })

    it('should call repository.findEventsByDescorDay on findEventsByDescorDay call', async () => {
        const events = await eventService.findEventsByDescOrDay({dayOfWeek : 'tuesday'})
        expect(findEventsByDescMockFn).toHaveBeenCalledTimes(1)
        expect(events).toBeTruthy()
    })
    
    it('should call repository.findByID on findEventsByDescorDay call', async () => {
        const event = await eventService.find('64ef2eb9823d6b90e7a82ad1')
        expect(findByIdMockFn).toHaveBeenCalledTimes(1)
        expect(event).toBeTruthy()
    })

    it('should call repository.findByID and return the found event', async () => {
        const event = await eventService.find('64ef2eb9823d6b90e7a82ad1')
        expect(findByIdMockFn).toHaveBeenCalledTimes(1)
        expect(event).toBeTruthy()
    })

    it('should check if there are availlable events to delete then delete them', async ()=>{
        const deletedEvents = await eventService.deleteEventsByDay({dayOfWeek : 'tuesday'})
        expect(findEventsByDescMockFn).toHaveBeenCalledTimes(1)
        expect(deleteManyMockFn).toHaveBeenCalledTimes(1)
        expect(deletedEvents).toBeTruthy()
    })

    it(`should throw not found error if there are no events to delete`, async ()=>{
        expect.assertions(3)
        findEventsByDescMockFn.mockResolvedValueOnce([])
        await eventService.deleteEventsByDay({dayOfWeek : 'tuesday'})
        .catch(err => {
            expect(err).toBeInstanceOf(NotFoundError)
            expect(findEventsByDescMockFn).toHaveBeenCalledTimes(1)
            expect(deleteManyMockFn).toHaveBeenCalledTimes(0)
        })
    })
})