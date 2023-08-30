import { Response } from "express";
import {   
    validateCreateUserBody, 
    validateSignInUserBody, 
    validateEventToBeCreated,
    validateEventByDesorDayQuery,
    validateParamId,
    validateByDayQuery
} from "../../src/middlewares/bodyValidators";
import { BadRequestError } from "../../src/errors/errors";

describe('middleware test suites', ()=>{

    let userRequestStub : any
    let responseStub : Response
    let mockNextStub = jest.fn()
    let correctUser =  {
        "firstName": "victor",
        "lastName": "ifaenyi",
        "birthDate": "2023-08-27",
        "city": "ph",
        "country": "ng",
        "email": "toe@gmail.com",
        "password": "1234",
        "confirmPassword": "1234"
    } 

    beforeEach(()=>{
        mockNextStub.mockReset()
        userRequestStub  = {
            params:{
                id : '001'
            },
            body : {
    
            },
            query : {
                dayOfWeek : 'sunda'
            }
        }
    })

    it('should throw error if create user body is not right', ()=>{
        expect.assertions(2)
        try {
            validateCreateUserBody(userRequestStub, responseStub, mockNextStub)
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestError)
        }

        userRequestStub.body = correctUser
        validateCreateUserBody(userRequestStub, responseStub, mockNextStub)
        expect(mockNextStub).toHaveBeenCalledTimes(1)
    })

    it('should throw error if signIn user body is not right', ()=>{
        expect.assertions(2)
        try {
            validateSignInUserBody(userRequestStub, responseStub, mockNextStub)
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestError)
        }

        userRequestStub.body = {'email' : 'ovi@gmail.com', 'password' : '123456'}
        validateSignInUserBody(userRequestStub, responseStub, mockNextStub)
        expect(mockNextStub).toHaveBeenCalledTimes(1)
    })

    it('should throw error if event to be created does not have correct structure', ()=>{
        expect.assertions(2)
        try {
            validateEventToBeCreated(userRequestStub, responseStub, mockNextStub)
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestError)
        }

        userRequestStub.body = {dayOfWeek : 'sunday', description : 'test'}
        validateEventToBeCreated(userRequestStub, responseStub, mockNextStub)
        expect(mockNextStub).toHaveBeenCalledTimes(1)
    })

    it('should throw error if event query does not have correct structure', ()=>{
        expect.assertions(2)
        try {
            validateEventByDesorDayQuery(userRequestStub, responseStub, mockNextStub)
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestError)
        }

        userRequestStub.query.dayOfWeek = 'sunday'
        validateEventByDesorDayQuery(userRequestStub, responseStub, mockNextStub) 
        expect(mockNextStub).toHaveBeenCalledTimes(1)
    })

    it('should throw error if req.param id is not correct', ()=>{
        expect.assertions(2)
        try {
            validateParamId(userRequestStub, responseStub, mockNextStub)
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestError)
        }

        userRequestStub.params.id = '64ef2eb9823d6b90e7a82ab3'
        validateParamId(userRequestStub, responseStub, mockNextStub)
        expect(mockNextStub).toHaveBeenCalledTimes(1)
    })

    it('should ensure that by day query is a valid day', () => {
        expect.assertions(2)
        try {
            validateByDayQuery(userRequestStub, responseStub, mockNextStub)
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestError)
        }

        userRequestStub.query = {dayOfWeek : 'sunday'}
        validateByDayQuery(userRequestStub, responseStub, mockNextStub)
        expect(mockNextStub).toHaveBeenCalledTimes(1)
    })
})