import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import {createList, getAllLists, deleteList} from '../redux/actions/dataActions';

import {connect} from 'react-redux'

export class UserPage extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleAddList = () => {
    if(!this.state.name) return
    this.props.createList({name: this.state.name})
    this.setState({name: ''})
    this.props.getAllLists()
  }

  handleDelete = (listID) => {
    return () => {
      this.props.deleteList(listID)
      this.props.getAllLists()
    }
  }

  logout = () => {
    window.localStorage.removeItem('userToken')
    window.location.href = 'https://fullsnack-todo.herokuapp.com/login'
    console.log(this.props)
  }

  // componentWillMount() {
  //   this.props.getAllLists()
  // }

  componentDidMount() {
    this.props.getAllLists()
  }

  render() {
    const {loading, user, data} = this.props
    console.log('rendered')

    const listMarkup = (name, id, _id) => (
                                        <div className="list-item" key={id}>
                                          <Link  to={`/${user.data.user.name}/${_id}`}><h3>{name}</h3></Link>
                                          <button className='del' name='add-task' onClick={this.handleDelete(_id)}>-</button>
                                        </div>
                                      
    )
    return (
      <div className='user-page-container'>
        <button className='logout' onClick={this.logout}>logout</button>
        <h2 className='title'>Add List</h2>
        <div className="add-list">
          <div className="input-group">
            <div className="inset">
              <input onChange={this.handleChange} autoComplete="off" type="name" name='name' value={this.state.name} />
              <label className="input-label" htmlFor='name' value={this.state.name}>
                <span className="input-label-content">List Name</span>
              </label>
            </div>
          </div>
          <button name='add-list' className='add-btn' onClick={this.handleAddList}>+</button>
        </div>
        <div className="all-list">
          {
            loading? <p>loading...</p> : (data.lists.length === 0 ? <h2>No List Found</h2> : data.lists.map(({name, _id}, id) => listMarkup(name, id, _id)))
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  loading: state.UI.loading,
  data: state.data
})

export default connect(mapStateToProps, {createList, getAllLists, deleteList})(UserPage)
