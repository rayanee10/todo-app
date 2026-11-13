const express = require('express');
const cors = require('cors');

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())


app.post('/api/users',(req , res) =>{
    const {name , email} = req.body;

    console.log('Received Data from Frontend:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);

    res.json({
        success : true ,
        message : 'Data received successfully'
    })
})
app.listen(port , ()=>{
    console.log(`Server running on http://localhost:${port}`)
})
