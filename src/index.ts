import express, { Express } from "express";
import { UserContollers } from "./UserController";
// import { router } from "./decorators";
import { AppRouter } from "./AppRouter";
import morgan, { format } from "morgan";

const app = express()
const PORT = process.env.PORT ||4000

app.get('/', (req, res) => {
    res.send('holla')
})

app.use(morgan('tiny'))
app.use(AppRouter.getInstance())


app.listen(PORT,()=> console.log(`server is running on ${PORT}`))
const testUser = new UserContollers()