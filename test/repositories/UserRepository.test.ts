require('dotenv').config()
import mongoose from "mongoose"
import { UserRepo } from "../../src/repositories/UserRepository"
import { User } from "../../src/db/schema-models/User"

describe('UserRepository test suite', ()=>{
    let userRepo : UserRepo
    let testUser : Required<User>
    let testUser2 : Required<User>
    let testUser3 : Required<User>
    let validDbConnection : typeof mongoose

    beforeAll(async ()=>{
        userRepo = new UserRepo()

        testUser = {
            "firstName": "victor",
            "lastName": "ifaenyi",
            "birthDate": "2023-08-27",
            "city": "ph",
            "country": "ng",
            "email": "joe@gmail.com",
            "password": "1234",
            "confirmPassword": "1234"
        } 

        testUser2 = {
            "firstName": "zictor",
            "lastName": "jenner",
            "birthDate": "2023-08-27",
            "city": "lg",
            "country": "ng",
            "email": "dell@gmail.com",
            "password": "1234",
            "confirmPassword": "1234"
        }

        testUser3 = {
            "firstName": "zictor",
            "lastName": "jenner",
            "birthDate": "2023-08-27",
            "city": "lg",
            "country": "ng",
            "email": "deb@gmail.com",
            "password": "1234",
            "confirmPassword": "1234" 
        }

        await mongoose.connect(process.env.TEST_MONGO_URI as string)
        .then((validConnection) => validDbConnection = validConnection)
        .catch((err) => console.log(err))
    })

    afterAll(async ()=>{
        await mongoose.connection.dropCollection('users')
    })

    it('Should connect to test database', async ()=>{
        expect(validDbConnection).not.toBeFalsy()
    })

    it('should add user to user collection on create call', async ()=>{
        const expected = testUser
        const actual = await userRepo.create(expected)
        expect(actual).toHaveProperty('email', expected.email)
        expect(actual).toHaveProperty('_id')
    })

    it('should find existing user by email', async ()=> {
        const expected = await userRepo.create(testUser2)
        const actual = await userRepo.findByEmail({email : testUser2.email})
        expect(expected._id).toStrictEqual(actual?._id)
    })

    it('should find user by id', async ()=> {
        const expectedUser = await userRepo.create(testUser3)
        const actualUser = await userRepo.findById(expectedUser._id)
        expect(expectedUser.email).toBe(actualUser?.email)
    })

})