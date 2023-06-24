import React, { Component } from "react";
import { deleteTodo, updateTodo, fetchTodo } from "../store/effects/effects";
import { setTodo } from '../store/actions/actions';
import { connect } from "react-redux";

class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      status: '',
      dueDate: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    try {
      this.props.fetchTodo(this.props.match.params.id);
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.todo.id !== this.props.todo.id) {
      this.setState({
        title: this.props.todo.title || '',
        description: this.props.todo.description || '',
        status: this.props.todo.status || '',
        dueDate: this.props.todo.dueDate || ''
      });
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { title, description, status, dueDate } = this.state;
    // Check if required fields are not empty
    if (title.trim() === '' || description.trim() === '' || status.trim() === '' || dueDate.trim() === '') {
      // Handle error when required fields are empty
      console.log('Please fill in all the required fields.');
      return;
    }
    const updatedTodo = {
      ...this.props.todo,
      title,
      description,
      status,
      dueDate: new Date(dueDate).toISOString() // Format dueDate to ISO string
    };
    this.props.updateTodo(updatedTodo);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  render() {
    const { title, description, status, dueDate } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <form id="todo-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input name="title" onChange={handleChange} value={title} />

          <label htmlFor="description">Description:</label>
          <textarea name="description" onChange={handleChange} value={description}></textarea>

          <label htmlFor="status">Status:</label>
          <select name="status" onChange={handleChange} value={status}>
            <option value="">Select status</option>
            <option value="completed">Completed</option>
            <option value="inProgress">In Progress</option>
            <option value="pending">Pending</option>
          </select>

          <label htmlFor="dueDate">Due Date:</label>
          <input type="date" name="dueDate" onChange={handleChange} value={dueDate} />

          <button type="submit">Submit</button>
        </form>
        <form onSubmit={(ev) => ev.preventDefault()}>
          <button
            className="remove"
            onClick={() => this.props.deleteTodo(this.props.match.params.id)}
          >
            Delete
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ todo }) => ({
  todo
});

const mapDispatchToProps = (dispatch, { history }) => ({
  deleteTodo: (todo) => dispatch(deleteTodo(todo, history)),
  updateTodo: (todo) => dispatch(updateTodo(todo, history)),
  fetchTodo: (id) => dispatch(fetchTodo(id)),
  clearTodo: () => dispatch(setTodo({}))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo)
