require('dotenv').config()
import express, { Express } from "express";
import { AppRouter } from "./AppRouter";
import morgan from "morgan";
import { connectToDB } from "./db/connect";
import { errorHandler } from "./middlewares/handler";

//controllers
import "./controllers/UserController";
import "./controllers/EventController";

const app = express()
const PORT = process.env.PORT || 4000

app.use(morgan('tiny'))
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('holla')
})

app.use('/api/v1', AppRouter.getInstance())
app.use(errorHandler)

app.listen(PORT,async ()=>{
    try {
        await connectToDB(process.env.MONGO_URI as string)
        console.log(`server is listening on port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})