import axios from "axios";

let url="";
if (process.env.NODE_ENVIRONMENT === "development") {
   const url = "http://localhost:5001/api/v1";
} else {
    url = "http://172.16.4.132:4040//api/v1";
}

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