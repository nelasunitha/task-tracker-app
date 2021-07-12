import React, { Component } from 'react';
import { createTodo } from '../store/effects/effects';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CreateTodo extends Component {
  constructor() {
    super();
    this.state = {
      taskName: '',
      assignee: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createTodo({ ...this.state });
  }

  handleChange(evt) {
    this.setState ({
      [evt.target.name]: evt.target.value,
    })
  }

  render() {
    const { assignee, taskName } = this.state;
    const { handleSubmit } = this;

    return (
      <form id='todo-form' onSubmit={handleSubmit}>
        <label htmlFor='taskName'>Task Name:</label>
        <input name='taskName' value={taskName} onChange={this.handleChange} />

        <label htmlFor='assignee'>Assign To:</label>
        <input name='assignee' value={assignee} onChange={this.handleChange} />

        <button type='submit'>Submit</button>
        <Link to='/'>Cancel</Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createTodo: (todo) => dispatch(createTodo(todo, history))
});

export default connect(null, mapDispatchToProps)(CreateTodo);
