var createFn = jest.fn()
var signInFn = jest.fn()

import { Request, Response } from "express"
import { UserContollers } from "../../src/controllers/UserController"

jest.mock("../../src/services/UserService", () => {
    return {
        UserService : jest.fn().mockImplementation(()=>{
            return {
                create : createFn,
                signIn : signInFn
            }
        })
    }
})

type Mock = {
    mockReset : () => void
}

describe('UserController tests', ()=>{

   let userController : UserContollers
   const mockRequest = { /* mock request data */ } as Request;
   const mockResponse = {
     status: jest.fn().mockReturnThis(),
     json: jest.fn(),
   } as unknown as Response;

   beforeAll(()=>{
        userController = new UserContollers
   })

    beforeEach(()=>{
        createFn.mockResolvedValue({id : '1'})
        signInFn.mockResolvedValue({id : '1'})
    })

    afterEach(() => {
       jest.resetAllMocks() 
    });

    it('Should call create user service',async ()=>{
       await userController.signUp(mockRequest, mockResponse)
       expect(createFn).toHaveBeenCalledTimes(1)
    })

    it('Should call signIn user service',async ()=>{
        await userController.signIn(mockRequest, mockResponse)
        expect(signInFn).toHaveBeenCalledTimes(1)
     })
})