import { InferSchemaType, Schema, model } from "mongoose";
import bcrypt from 'bcrypt'
const saltRounds = 10;

const userSchema = new Schema({
    id:String,
    firstName : String,
    lastName : String,
    birthDate : String,
    city: String,
    country: String,
    email: {
        type : String,
        unique : true
    },
    password : String,
    confirmPassword: String
})

const userSchema2 = new Schema({
    id:String,
    firstName : {type:String, required:true},
    lastName : {type:String, required:true},
    birthDate : {type:String, required:true},
    city: {type:String, required:true},
    country: {type:String, required:true},
    email: {
        type : String,
        unique : true,
        required : true
    },
    password : {type :String, required:true},
    confirmPassword: {type :String, required:true}
})

export type User = InferSchemaType<typeof userSchema>;
export type StrictUser = InferSchemaType<typeof userSchema2>;

userSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password as string, saltRounds)
    this.password = hash
    this.confirmPassword = hash
})

userSchema.pre('updateOne', async function(next){
})

export const UserModel = model<User>("User", userSchema);



