import express from "express"

const app = express()
app.listen(8000, () => {
    console.log("hello world from the back!")
})
