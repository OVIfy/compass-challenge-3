import { InferSchemaType, Schema, model } from "mongoose";
import bcrypt from 'bcrypt'
const saltRounds = 10;

const userSchema = new Schema({
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

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model<User>("User", userSchema);

userSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password as string, saltRounds)
    this.password = hash
    this.confirmPassword = hash
})

userSchema.pre('updateOne', async function(next){
})

export const User = model('user', userSchema)



