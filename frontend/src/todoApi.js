import axios from "axios";

const url = process.env.REACT_APP_BACKEND;

export const getTodosApi = async () => {
  const response = await axios.get(url + '/todos');
  return response.data;
}

export const addTodoApi = async (todo) => {
    const response = await axios
      .post(url + '/todos', todo);

    return response.data;
}

export const deleteTodoApi = async (id) => {
    const response = await axios
      .delete(url + '/todos/' + id);

    return response.data;
}