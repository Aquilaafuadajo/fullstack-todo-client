import React, { Component } from 'react';

import Form from '../components/form/Form';

// Redux stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: ''
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
    // this.setState({
    //   loading: true
    // });
    const newUserData = {
      "name": this.state.name,
      "email":  this.state.email,
      "password": this.state.password,
      "passwordConfirm": this.state.confirmPassword
    }
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
    const { errors, name, email, password, confirmPassword } = this.state;


    return (
      <React.Fragment>
        <Form 
          signUp 
          onChange={this.handleChange} 
          onSubmit={this.handleSubmit}
          email={email}
          name={name}
          password={password}
          confirmPassword={confirmPassword}
          errors={errors}
          loading={loading}
        />
        {/* {
          errors !== '' ? <p>{errors}</p> : null
        }
        {
          loading && <p>loading...</p> 
        } */}
      </React.Fragment>
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
)(SignUp);
