import React, { Component } from 'react';

import {getList, getAllLists, addTask, deleteTask, updateTask} from '../redux/actions/dataActions';
import {Link} from 'react-router-dom'

import {connect} from 'react-redux'

export class TaskPage extends Component {
  constructor() {
    super()
    this.state = {
      description: '',
      list: {}
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleDelete = (taskID) => {
    return () => {
      this.props.deleteTask(taskID, this.props.location.pathname.split('/')[2])
      this.props.getAllLists()
    }
  }

  handleUpdate = (taskID, status) => {
    return () => {
      this.props.updateTask(taskID, this.props.location.pathname.split('/')[2], {status: !status})
      this.props.getAllLists()
    }
  }

  handleAddTask = () => {
    if(!this.state.description) return
    const task = {description: this.state.description}
    this.props.addTask(task, this.props.location.pathname.split('/')[2])
    this.setState({description: ''})
    this.props.getAllLists()
  }

  render() {
    const listID = this.props.location.pathname.split('/')[2]
    const list = this.props.data.lists[this.props.data.lists.findIndex(list => list._id === listID)]
    const {loading} = this.props
    const listMarkup = (name, id, _id, status) => (<div onClick={this.handleUpdate(_id, status)} className={`${status? 'green': null} list-item task`} key={id}>
                                        <h3>{name}</h3>
                                        <button className='del' name='add-task' onClick={this.handleDelete(_id)}>-</button>
                                        {/* <button name='add-task' onClick={this.handleUpdate(_id, status)}>update</button> */}
                                      </div>)

    return (
      <div className='user-page-container'>
        <h2 className='title'>Add A Task To This List</h2>
        <div className="add-list">
          <div className="input-group">
            
            <div className="inset">
                            <input onChange={this.handleChange} autoComplete="off" type="name" name='description' value={this.state.name} />
              <label className="input-label" htmlFor='name' value={this.state.name}>
                <span className="input-label-content">Add Task</span>
              </label>
            </div>
          </div>
          <button name='add-list' className='add-btn' onClick={this.handleAddTask}>+</button>
        </div>
        <div className="all-list">
          {
            loading? <p>loading...</p> : (list.tasks.length === 0 ? <h3>No task yet</h3> : list.tasks.map(({description, _id, status}, id) => listMarkup(description, id, _id, status)) )
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  loading: state.UI.loading,
  user: state.user
})

export default connect(mapStateToProps, {getList, getAllLists, addTask, deleteTask, updateTask})(TaskPage)
