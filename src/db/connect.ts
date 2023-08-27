const mongoose = require('mongoose')

export async function connectToDB(url : string){
    return mongoose.connect(url)
}