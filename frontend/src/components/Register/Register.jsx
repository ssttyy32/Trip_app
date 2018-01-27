import React, {Component} from 'react'
import {Button, Form, Input, Card, Grid , Header, Image, Message, Segment} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import styles from './styles.scss'

class Register extends Component {
    constructor() {
        super();

        this.state = {
            user: {
                password: '',
                email: ''
            },

            message: ''
        }

        this.onSubmit = this
            .onSubmit
            .bind(this);
        this.onChangePassword = this
            .onChangePassword
            .bind(this);
        this.onChangeEmail = this
            .onChangeEmail
            .bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        // create a string for an HTTP body message
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `email=${email}&password=${password}`;

        // create an AJAX POST request (This should probably done with Axios instead)
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/register');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                // ('The form is valid');
                this.setState({message: 'Registered!'});
                document.location.href = '/Login';
            } else {
                this.setState({message: 'Unable to register'})
            }
        });
        xhr.send(formData);
    }

    onChangeEmail(e) {
        const user = this.state.user;
        user.email = e.target.value;
        this.setState({user})
    }

    onChangePassword(e) {
        const user = this.state.user;
        user.password = e.target.value;
        this.setState({user})
    }

    render() {
        return (
//            <form className="Register" action="/" onSubmit={this.onSubmit}>
//                <Card className="Register__content">
//                    <div>
//                        <h1>Register</h1>
//                        <Input label="Email" onChange={this.onChangeEmail} type="email"/>
//                        <br/><br/>
//                        <Input label="Password" onChange={this.onChangePassword} type="password"/>
//                        <br/><br/>
//                        <p>{this.state.message}</p>
//                        <Input type="submit"/>
//                        <h4>Already registered? Click
//                            <Link to="/login">here</Link>
//                            to Log-in!</h4>
//                        <Link to="/dashboard">
//                            <p>Go to Dashboard</p>
//                        </Link>
//                    </div>
//                </Card>
//            </form>
            <div className='login-form' action="/" onSubmit={this.onSubmit}>
                <style>{`
                  body > div,
                  body > div > div,
                  body > div > div > div.login-form {
                    height: 100%;
                  }
                `}</style>
                <Grid
                  textAlign='center'
                  style={{ height: '100%' }}
                  verticalAlign='middle'
                >
                  <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='black' textAlign='center'>
                      <Image src='http://satterfieldsrestaurant.com/assets/The-Culture-Trip-Logo.png' />
                      Sign-up to your account
                    </Header>
                    <Form size='large'>
                      <Segment stacked>
                        <Form.Input
                          fluid
                          icon='user'
                          iconPosition='left'
                          placeholder='E-mail address'
                          label="Email"
                          onChange={this.onChangeEmail}
                          type="email"
                        />
                        <Form.Input
                          fluid
                          icon='lock'
                          iconPosition='left'
                          placeholder='Password'
                          label="Password"
                          onChange={this.onChangePassword}
                          type="password"
                        />
                          <p>{this.state.message}</p>
                          <Button type="submit" color='black' fluid size='large'>Register</Button>
                      </Segment>
                    </Form>
                    <Message>
                      New to us? <a href='#'>Sign Up</a>
                    </Message>
                  </Grid.Column>
                </Grid>
              </div>
        )
    }
}

export default Register
