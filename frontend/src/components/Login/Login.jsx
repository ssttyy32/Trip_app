import React, {Component} from 'react'
import {Button, Form, Input, Card, Grid , Header, Image, Message, Segment} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'

import styles from './styles.scss'

class Login extends Component {

    constructor() {
        super();

        this.state = {
            user: {
                password: '',
                email: ''
            },

            message: ''
        };

        this.onSubmit = this
            .onSubmit
            .bind(this);
        this.onChangeEmail = this
            .onChangeEmail
            .bind(this);
        this.onChangePassword = this
            .onChangePassword
            .bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `email=${email}&password=${password}`;

        // create an AJAX request (This should probably done with Axios instead)
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({message: 'Successfully logged in!'})
                document.location.href = '/';
            } else {
                this.setState({message: 'Unable to log in'})
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
//            <form className="Login" action="/" onSubmit={this.onSubmit}>
//                <Card className="Login__content">
//                    <div>
//                        <h1>Login</h1>
//                        <Input label="Email" onChange={this.onChangeEmail} type="email"/>
//                        <br/><br/>
//                        <Input label="Password" onChange={this.onChangePassword} type="password"/>
//                        <br/><br/>
//
//                        <p>{this.state.message}</p>
//                        <Input type="submit"/>
//                        <h4>No account yet? Click
//                            <Link to="/register">here</Link>
//                            to Register!</h4>
//                        <a href="/"><p>Go to Home</p></a>
//                    </div>
//                </Card>
//            </form>
             <div className='Login__content' action="/" onSubmit={this.onSubmit}>
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
                      {' '}Log-in to your account
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
                        <Button type="submit" color='black' fluid size='large'>Log in</Button>
                      </Segment>
                    </Form>
                    <Message>
                      New to us? <a href='/register'>Sign Up</a>
                    </Message>
                  </Grid.Column>
                </Grid>
              </div>

        )
    }
}

export default Login
