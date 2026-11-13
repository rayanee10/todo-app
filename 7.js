const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.post('/users', (req , res)=>{
  
    const username = req.body.username
    const email = req.body.email

    res.json({
        messag:'user created successfully',
        data:{
            username:username,
            email:email
        }
    })

})
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});