import axios from "axios";

import {
  _createTodo,
  _deleteTodo,
  _updateTodo,
  setTodos,
  setTodo
} from "../actions/actions";

// THUNK CREATORS

export const createTodo = (todo, history) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post("/api/todos", todo);
      dispatch(_createTodo(created));
      history.push("/");
    } catch (error) {
      console.log(error);
    }
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

export const updateTodo = (todo, history) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(`/api/todos/${todo.id}`, todo);
      dispatch(_updateTodo(updated));
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchTodo = (id) => {
  console.log(id)
  return async (dispatch) => {
    try {
      const { data: todo } = await axios.get(`/api/todos/${id}`);
      dispatch(setTodo(todo))
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchTodos = () => {
  return async (dispatch) => {
    try {
      const { data: todos } = await axios.get("/api/todos");
      dispatch(setTodos(todos));
    } catch (error) {
      console.log(error)
    }
  };
};
