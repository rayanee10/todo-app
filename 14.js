const express = require('express')
const cors = require ('cors')

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.post('/api/users' ,(req , res) =>{

const{name , email} = req.body;

if(!name || !email || name.trim() === '' || email.trim() === ''){
    return res.status(400).json({
        success : false,
        error : 'missing required fields both name and email are required.'
    })
}
console.log('valid user receved: ' ,{name , email})

res.status(201).json({
        success: true,
        message: 'User registered successfully!',
        data: { name, email }
    });

})
app.listen(port , ()=>{
    console.log(`Server running on http://localhost:${port}`);
})