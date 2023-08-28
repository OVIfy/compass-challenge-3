import mongoose, { InferSchemaType, Schema, model } from "mongoose";
import bcrypt from 'bcrypt'
const saltRounds = 10;

const eventSchema = new Schema({
   description : {
    type : String,
    required : true
   },
   dayOfWeek : {
    type : String,
    required : true,
    enum : [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
   },
   publisher: {
    type: String,
    ref: 'User'
    }
})

export type Event = InferSchemaType<typeof eventSchema>;

eventSchema.pre('save', async function(next){
})

eventSchema.pre('updateOne', async function(next){
})

eventSchema.index({description : 'text'})

export const EventModel = model<Event>("Event", eventSchema);



