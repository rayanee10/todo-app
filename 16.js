const express = require('express')
const router = express.Router()

let tasks = []

router.get('/' , (req , res)=>{
    res.status(200).json({
        success : true  , 
        tasks : tasks 
    })
})
router.post('/', (req , res)=>{
    const {task} = req.body
    if (!task || task.trim() === ''){
       return res.status(404).json({success: false, error: 'Task text is required' })
    }
 const newTask = {
    id:Date.now(),
text : task ,
completed : false

 }   
 tasks.push(newTask)
 res.status(201).json({
    succes : true , 
    id : newTask.id,
    completed : false , 
    message : 'task added successfully'

 })
})
router.put('/:id' , (req , res)=>{
    const taskId = Number(req.params.id);
    const task = tasks.find(t => t.id === taskId)

    if(!task){
       return res.status(404).json({success: false, error: 'Task not found'})
    }
    task.completed = !task.completed ; 


    res.status(200).json({
       success: true,
        completed: task.completed,
        message: `Task ${taskId} updated successfully` 
    })
})
router.delete('/:id' , (req , res)=>{
    const taskId = Noumber(req.params.id)
    const taskExists = tasks.some(t => t.id !== taskId)

    if(!taskExists){
        return res.status(404).json({success: false, error: 'Task not found'})
    }
tasks = tasks.filter(t => t.id !== taskId)

res.status(200).json({
        success: true,
        message: `Task ${taskId} deleted successfully`
    });

})
module.exports = router