var create = jest.fn()
var findEventsByDescOrDay = jest.fn()
var deleteEventsByDay = jest.fn()
var find = jest.fn()
var deleteById = jest.fn()


import { Request, Response } from "express"
import { EventContollers } from "../../src/controllers/EventController"

jest.mock("../../src/services/EventService", () => {
    return {
        EventService : jest.fn().mockImplementation(()=>{
            return {
                create,
                findEventsByDescOrDay,
                deleteEventsByDay,
                find,
                deleteById
            }
        })
    }
})

type Mock = {
    mockReset : () => void
}

describe.only('EventController tests', ()=>{

   let eventController : EventContollers
   let mockRequest: Request;
   let mockResponse : Response;

   beforeAll(()=>{
        eventController = new EventContollers
   })

    beforeEach(()=>{
        mockRequest = { query : {}, params : {}} as Request;
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send : jest.fn(),
        } as unknown as Response;

    })

    afterEach(() => {
       jest.resetAllMocks() 
    });

    it('Should call create event service',async ()=>{
       await eventController.create(mockRequest, mockResponse)
       expect(create).toHaveBeenCalledTimes(1)
    })

    it('Should call the findEvents by Day/Desc service',async ()=>{
        await eventController.findEventsByDayOrDesc(mockRequest, mockResponse)
        expect(findEventsByDescOrDay).toHaveBeenCalledTimes(1)
    })

    it('Should call delete events by day service',async ()=>{
        await eventController.deleteEventsByDay(mockRequest, mockResponse)
        expect(deleteEventsByDay).toHaveBeenCalledTimes(1)
    })

    it('Should call get event by id service',async ()=>{
        await eventController.findEventById(mockRequest, mockResponse)
        expect(find).toHaveBeenCalledTimes(1)
    })

    it('Should call delete event by id service',async ()=>{
        await eventController.deleteById(mockRequest, mockResponse)
        expect(deleteById).toHaveBeenCalledTimes(1)
    })
})