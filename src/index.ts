import express, { Express } from "express";
import { AppRouter } from "./AppRouter";
import "./controllers/UserController";
import morgan from "morgan";

const app = express()
const PORT = process.env.PORT ||4000

app.use(morgan('tiny'))
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('holla')
})

app.use('/api/v1', AppRouter.getInstance())

app.listen(PORT,()=> console.log(`server is running on ${PORT}`))