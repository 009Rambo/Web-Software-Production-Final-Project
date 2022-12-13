const express = require('express');
const router = express.Router();

let todos = [
    {
      id: 1,
      text: 'Study',
      done: true
    },
    {
      id: 2,
      text: 'Work',
      done: true
    },
    {
      id: 3,
      text: 'Play',
      done: true
    },
];

router.get('/', (req, res) => {
  res.status(200).json(todos);
});


router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    const todo = todos.find((m) => m.id === Number(id));
    
    if (todo) {
        res.status(200).json(todo);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
  });

router.post('/', (req, res) => {
    const { text } = req.body;

    const maxId = todos.reduce(function(prev, current) {
      return (prev.id > current.id) ? prev.id : current.id
    })

    const newTodo = { id: maxId + 1, text, done: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  });


router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { text, done } = req.body;
    const index = todos.findIndex((m) => m.id === Number(id));
    const updatedTodo = {
      id: Number(id),
      text,
      done
    };
    todos[index] = updatedTodo;
    res.status(200).json({ message: 'Updated' });
  });


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  const deletedTodo = todos.filter(todo => {
    return todo.id === Number(id)
  });

  const updatedTodos = todos.filter((b) => {
      return b.id !== Number(id)
    });

    todos = updatedTodos;

  console.log('deletedTodo ', deletedTodo);
  res.status(200).json(deletedTodo[0]);
});
  

module.exports = router;