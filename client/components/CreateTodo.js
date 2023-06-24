import React, { Component } from 'react';
import { createTodo } from '../store/effects/effects';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CreateTodo extends Component {
  constructor() {
    super();
    this.state = {
      taskName: '',
      assignee: '',
      title: '',
      description: '',
      status: '',
      dueDate: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const { taskName, assignee, title, description, status, dueDate } = this.state;
    // Check if required fields are not empty
    if (taskName.trim() === '' || assignee.trim() === '' || title.trim() === '' || status.trim() === '') {
      // Handle error when required fields are empty
      console.log('Please fill in the required fields.');
      return;
    }
    // Create newTodo object with the form data
    const newTodo = {
      taskName,
      assignee,
      title,
      description,
      status,
      dueDate: new Date(dueDate).toISOString() // Format dueDate to ISO string
    };
    // Dispatch the createTodo action with the newTodo object
    this.props.createTodo(newTodo);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  render() {
    const { taskName, assignee, title, description, status, dueDate } = this.state;
    const { handleSubmit } = this;

    return (
      <form id="todo-form" onSubmit={handleSubmit}>
        <label htmlFor="taskName">Task Name:</label>
        <input name="taskName" value={taskName} onChange={this.handleChange} />

        <label htmlFor="assignee">Assignee:</label>
        <input name="assignee" value={assignee} onChange={this.handleChange} />

        <label htmlFor="title">Title:</label>
        <input name="title" value={title} onChange={this.handleChange} />

        <label htmlFor="description">Description:</label>
        <textarea name="description" value={description} onChange={this.handleChange}></textarea>

        <label htmlFor="status">Status:</label>
        <select name="status" value={status} onChange={this.handleChange}>
          <option value="">Select status</option>
          <option value="completed">Completed</option>
          <option value="inProgress">In Progress</option>
          <option value="pending">Pending</option>
        </select>

        <label htmlFor="dueDate">Due Date:</label>
        <input type="date" name="dueDate" value={dueDate} onChange={this.handleChange} />

        <button type="submit">Submit</button>
        <Link to="/">Cancel</Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createTodo: (todo) => dispatch(createTodo(todo, history)),
});

export default connect(null, mapDispatchToProps)(CreateTodo);
