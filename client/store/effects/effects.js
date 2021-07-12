import axios from "axios";

import {
  _createTodo,
  _deleteTodo,
  _updateTodo,
  setTodos,
} from "../actions/actions";

// THUNK CREATORS

export const createTodo = (todo, history) => {
  return async (dispatch) => {
    const { data: created } = await axios.post("/api/todos", todo);
    dispatch(_createTodo(created));
    history.push("/");
  };
};

export const deleteTodo = (id, history) => {
  return async (dispatch) => {
    try {
      const { data: deleted } = await axios.delete(`/api/todos/${id}`);
      dispatch(_deleteTodo(deleted));
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateTodo = (id, history) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(`/api/todos/${id}`, id);
      dispatch(_updateTodo(updated));
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchTodos = () => {
  return async (dispatch) => {
    const { data: todos } = await axios.get("/api/todos");
    dispatch(setTodos(todos));
  };
};
