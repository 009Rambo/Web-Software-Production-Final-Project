const { req, res } = require('express')
const Todo = require('../model/todoModel')
const mongoose = require('mongoose')

// Get all todos
const getTodos = async (request, response) => {
    const todo = await Todo.find({}).sort({createdAt: -1})

    response.status(200).json(todo)
}
// Get a single todo
const getTodo = async (request ,response) => {
    const { id } = request.params

    if(!mongoose.Types.ObjectId.isValid(id)){
            return response.status(404).json({error: 'No such todo'})
     }

    const todo = await Todo.findById(id)

    if (!todo) {
        return response.status(404).json({error: 'No such todo'})
    }

    response.status(200).json(todo)
}

// Create a new todo
const createTodo = async (request, response) =>{
    const {text} = request.body
    
    // add document to db
    try{
        const todo = await Todo.create({text, done: false})
        response.status(200).json(todo)
    }catch(error){
        response.status(400).json({error: error.message})

    }
}


// Delete a todo
const deleteTodo = async(request, response) => {
    const { id } = request.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({error: 'No such todo'})
    }

    const todo = await Todo.findOneAndDelete({_id: id})

    if (!todo) {
        return response.status(404).json({error: 'No such todo'})
    }

    response.status(200).json(todo)
}

// Update a todo
const updateTodo = async (request, response) => {
    const { id } = request.params;

    if (!id) {
        return response.status(404).json({error: 'No such todo'})
    }
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return response.status(400).json({error:'No such todo'})
    }

    const todo = await Todo.findOneAndUpdate({_id: id},{
        ...request.body
    })


    if (!todo) {
        return response.status(404).json({error: 'No such todo'})
    }

    response.status(200).json({ message: 'Updated' })
    
}


module.exports = {
    getTodos,
    getTodo,
    createTodo,
    deleteTodo,
    updateTodo
}