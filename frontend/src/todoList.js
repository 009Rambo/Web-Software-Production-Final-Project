const TodoList = ({ todos, deleteTodo }) => {
    return (
      <>
        {todos?.length > 0 ? (
          <ul className="todo-list">
            {todos.map((todo, index) => (
              <div className="todo" key={index}>
                <li> {todo.text} </li>
  
                <button
                  className="delete-button"
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p>No task found</p>
          </div>
        )}
      </>
    );
  };
  
  export default TodoList;