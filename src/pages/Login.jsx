import React, { Component } from 'react';

import Form from '../components/form/Form';

// Redux stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
      console.log(this.state.errors)
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      "email":  this.state.email,
      "password": this.state.password
    }
    console.log(this.props.history)
    this.props.signupUser(newUserData, this.props.history);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const {
      UI: { loading }
    } = this.props;
    const { errors, email, password } = this.state;


    return (
      <Form 
        onChange={this.handleChange} 
        onSubmit={this.handleSubmit}
        email={email}
        password={password}
        errors={errors}
        loading={loading}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { signupUser }
)(Login);
