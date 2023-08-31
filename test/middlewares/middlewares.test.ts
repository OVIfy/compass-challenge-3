import { Response } from "express";

import {   
    validateCreateUserBody, 
    validateSignInUserBody, 
    validateEventToBeCreated,
    validateEventByDesorDayQuery,
    validateParamId,
    validateByDayQuery
} from "../../src/middlewares/bodyValidators";
import { BadRequestError, UnauthorizedError } from "../../src/errors/errors";
import {authenticator} from '../../src/middlewares/authenticator'
import { signJwt, verifyJwt } from "../../src/utils/jwtUtils";

describe('middleware test suites', ()=>{

    let userRequestStub : any
    let responseStub : Response
    let mockNextFunction = jest.fn()
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
        mockNextFunction.mockReset()
        userRequestStub  = {
            params:{
                id : '001'
            },
            body : {
    
            },
            query : {
                dayOfWeek : 'sunda'
            },
            headers : {
                authorization : ''
            },
            user : {

            }
        }
    })

    it('should throw error if create user body is not right', ()=>{
        expect.assertions(2)
        try {
            validateCreateUserBody(userRequestStub, responseStub, mockNextFunction)
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestError)
        }

        userRequestStub.body = correctUser
        validateCreateUserBody(userRequestStub, responseStub, mockNextFunction)
        expect(mockNextFunction).toHaveBeenCalledTimes(1)
    })

    it('should throw error if signIn user body is not right', ()=>{
        expect.assertions(2)
        try {
            validateSignInUserBody(userRequestStub, responseStub, mockNextFunction)
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestError)
        }

        userRequestStub.body = {'email' : 'ovi@gmail.com', 'password' : '123456'}
        validateSignInUserBody(userRequestStub, responseStub, mockNextFunction)
        expect(mockNextFunction).toHaveBeenCalledTimes(1)
    })

    it('should throw error if event to be created does not have correct structure', ()=>{
        expect.assertions(2)
        try {
            validateEventToBeCreated(userRequestStub, responseStub, mockNextFunction)
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestError)
        }

        userRequestStub.body = {dayOfWeek : 'sunday', description : 'test'}
        validateEventToBeCreated(userRequestStub, responseStub, mockNextFunction)
        expect(mockNextFunction).toHaveBeenCalledTimes(1)
    })

    it('should throw error if event query does not have correct structure', ()=>{
        expect.assertions(2)
        try {
            validateEventByDesorDayQuery(userRequestStub, responseStub, mockNextFunction)
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestError)
        }

        userRequestStub.query.dayOfWeek = 'sunday'
        validateEventByDesorDayQuery(userRequestStub, responseStub, mockNextFunction) 
        expect(mockNextFunction).toHaveBeenCalledTimes(1)
    })

    it('should throw error if req.param id is not correct', ()=>{
        expect.assertions(2)
        try {
            validateParamId(userRequestStub, responseStub, mockNextFunction)
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestError)
        }

        userRequestStub.params.id = '64ef2eb9823d6b90e7a82ab3'
        validateParamId(userRequestStub, responseStub, mockNextFunction)
        expect(mockNextFunction).toHaveBeenCalledTimes(1)
    })

    it('should ensure that by day query is a valid day', () => {
        expect.assertions(2)
        try {
            validateByDayQuery(userRequestStub, responseStub, mockNextFunction)
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestError)
        }

        userRequestStub.query = {dayOfWeek : 'sunday'}
        validateByDayQuery(userRequestStub, responseStub, mockNextFunction)
        expect(mockNextFunction).toHaveBeenCalledTimes(1)
    })

    it('should authenticate all requests to secured routes', ()=>{
        expect.assertions(5)
        try {
            authenticator(userRequestStub, responseStub, mockNextFunction)
        } catch (error) {
            expect(error).toBeInstanceOf(UnauthorizedError)
        }

        try {
            userRequestStub.headers.authorization = 'Bearer'
            authenticator(userRequestStub, responseStub, mockNextFunction) 
        } catch (error) {
            expect(error).toBeInstanceOf(UnauthorizedError)
        }

        
        try {
            const inValidToken = signJwt({wrongKey : 'invalidString'})
            userRequestStub.headers.authorization = 'Bearer ' + inValidToken
            authenticator(userRequestStub, responseStub, mockNextFunction)
        } catch (error) {
            expect(error).toBeInstanceOf(UnauthorizedError)
        }
        
        const ValidToken = signJwt({userId : 'validID'})
        userRequestStub.headers.authorization = 'Bearer ' + ValidToken
        authenticator(userRequestStub, responseStub, mockNextFunction)
        expect(userRequestStub.user).toHaveProperty('userId', 'validID') 
        expect(mockNextFunction).toBeCalledTimes(1)
    })
})