import { useCallback, useEffect, useState } from "react";
import TodoInput from "./todoInput";
import TodoList from "./todoList";
import "./App.css";
import { addTodoApi, deleteTodoApi, getTodosApi } from "./todoApi";
import axios from "axios";


const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const getTodos2 = useCallback(async () => {
    const todosData = await getTodosApi();
    console.log('todos is ', todos);
    setTodos(todosData);
  }, []);

  useEffect(() => {    
    getTodos2();
  }, [getTodos2]);


  async function addTodo() {
    const newTodo = await addTodoApi({text: todo});
    setTodo("");
    setTodos([...todos, newTodo])
  }

  const deleteTodo = async (id) => {
    const deletedTodo = await deleteTodoApi(id);
    
    const todosAfterDelete = todos.filter((b) => {
      return b.id !== Number(deletedTodo.id)
    });
    console.log('todos after delete ', todosAfterDelete);
    setTodos(todosAfterDelete);
  };

  return (
    <div className="App">
      <h1>React Todo App</h1>
      <TodoInput todo={todo} setTodo={setTodo} addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;