import express, { Express, Request, Response } from "express"

const app: Express = express()

app.get("*", (req: Request, res: Response) => {
    res.send('this is the server')
})

app.listen(8000, () => {
    console.log("we up (hello world)")
})
