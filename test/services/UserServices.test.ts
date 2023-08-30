require('dotenv').config()
import { User } from "../../src/db/schema-models/User"
import { ValidationError } from "../../src/errors/errors"
import { UserService } from "../../src/services/UserService"
import mongoose from "mongoose"


describe.only('UserService tests', ()=>{

   let userService : UserService
   let testUser : Required<User>
   let validDbConnection : typeof mongoose

    beforeAll(async()=>{
        userService = new UserService()

        await mongoose.connect(process.env.TEST_MONGO_URI as string)
        .then((validConnection) => validDbConnection = validConnection)
        .catch((err) => console.log(err))
    })

    beforeEach(()=>{
        testUser = {
            "firstName": "victor",
            "lastName": "ifaenyi",
            "birthDate": "2023-08-27",
            "city": "ph",
            "country": "ng",
            "email": "toe@gmail.com",
            "password": "1234",
            "confirmPassword": "1234"
        } 
    })

    afterEach(() => {
    //    jest.resetAllMocks() 
    });

    afterAll(async ()=>{
        await mongoose.connection.dropCollection('users')
    })

    it('Should connect to test database', async ()=>{
        expect(validDbConnection).not.toBeFalsy()
    })

    it('Should create user if email does not exist',async ()=>{
        const expected = testUser
        const actual = await userService.create(testUser)
        
        expect(actual).toBeTruthy()
        expect(actual).toHaveProperty('email', expected.email)
    })

    it('Should not create user if email already exists',async ()=>{
        expect.assertions(1);
        await userService.create(testUser)
        .catch((err) => {
            expect(err).toBeInstanceOf(ValidationError)
        })
    })

    it('Should sign in user if user exists and details correct', async () => {
        const {email, firstName, lastName, password} = testUser
        const actual = await userService.signIn({email, password})

        expect(actual).toBeTruthy()
        expect(actual).toHaveProperty('email', email)
        expect(actual).toHaveProperty('accessToken')
    })

    it('Should not sign in user if user details are incorrect', async () => {
        const {email} = testUser
        expect.assertions(1);
        await userService.signIn({email, password : '33778'})
        .catch((err) => expect(err).toBeInstanceOf(ValidationError))
    })
})