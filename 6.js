const express = require('express')
const app = express()
const port = 3000

app.get('/users/:id' , (req , res ) =>{
    const userId = req.params.id
    res.send(`User ID requested: ${userId}`)
})
app.get('/search',(req , res)=>{
    const name = req.query.name 
    const age = req.query.age
    res.send(`Search parameters -> Name: ${name}, Age: ${age}`)
})
app.listen(port , ()=>{
    console.log(`the the server is runig on http://localhost:${port} `)
})