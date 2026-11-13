const express = require('express');
const app = express();
const PORT = 3000 ;

app.get('/users' , (req , res )=>{
    res.send('get : the users list has been braught')
})
app.post('/users',(req , res)=>{
    res.send('post: a new user has beem add')
})
app.put('/users',(req , res)=>{
    res.send('put: the data hase been ')
})
app.delete('/users',(req , res)=>{
    res.send('delete: the user has been deleted')
})
app.listen(PORT , ()=>{
    console.log(`the server is working on http://localhost:${PORT}`)
})
