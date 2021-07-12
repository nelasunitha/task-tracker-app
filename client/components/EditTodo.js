import React, { Component } from "react";
import { deleteTodo, updateTodo, fetchTodo, fetchTodos } from "../store/effects/effects";
import { connect } from "react-redux";
 import { Link } from 'react-router-dom';

class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      assignee: ''
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount () {
    try {
      this.props.loadTodo(this.props.match.params.id)
    } catch (error) {
      console.log(error)
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.todo.id !== this.props.todo.id) {
      this.setState({
        taskName: this.props.todo.taskName || '',
        assignee: this.props.todo.assignee || ''
      })
    }
  }

  handleDelete() {
    this.props.deleteTodo(this.props.match.params.id);
  }

  handleUpdate() {
    this.props.updateTodo(this.props.match.params.id);
  }

  handleChange(evt) {
    this.setState ({
      [evt.target.name]: evt.target.value,
    })
  }


  render() {
    const { assignee, taskName } = this.state;
    return (
      <form id='todo-form' >
      <label htmlFor='taskName'>Task Name:</label>
      <input name='taskName' value={taskName} onChange={this.handleChange} />

      <label htmlFor='assignee'>Assign To:</label>
      <input name='assignee' value={assignee} onChange={this.handleChange} />

      <button type="delete" onClick = {this.handleDelete}>Delete</button>
      <button type="update" onClick = {this.handleUpdate}>Edit</button>

      <Link to='/'>Cancel</Link>

      </form>
    );
  }
}

const mapStateToProps = ({todo}) => ({
  todo
})

const mapDispatchToProps = (dispatch, { history })=> ({
  deleteTodo: (id) => dispatch(deleteTodo(id,history)),
  updateTodo: (id) => dispatch(updateTodo(id, history)),
  loadTodo: (id) => dispatch(fetchTodo(id))
});

export default connect(mapStateToProps,mapDispatchToProps)(EditTodo);
