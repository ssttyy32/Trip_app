import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { Search, Grid, Image, Form, Checkbox, Icon, Button, Segment, Container, Header, List, Divider } from 'semantic-ui-react';
//import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';

// Include your new Components here
import Home from './components/Home/Home.jsx';
import Spots from './components/Spots/Spots.jsx';
import Custom from './components/Custom/Custom.jsx';

import Gallery from './components/Gallery/Gallery.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import Confirm from './components/Confirm/Confirm.jsx';
import Personalize from './components/Personalize/Personalize.jsx';
import History from './components/History/History.jsx';
// Include any new stylesheets here Note that components' stylesheets should NOT
// be included here. They should be 'require'd in their component class file.
require('./styles/main.scss');

import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {Carousel} from 'react-bootstrap';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      currentId: ''
    };
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    axios.get('/api/logout').then( (res) => {
        location.reload();
    });
  }

  componentDidMount() {
    axios.get('/api/profile')
      .then((res) => {
        this.setState({
          isLoggedIn: true,
          currentId: res.data.user_email
        });
      })
      .catch((err) => {
        this.setState({isLoggedIn: false});
      });
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event,value){
        window.location.assign(`/login/${this.state.currentId}`);
    }

  render() {

    let headUser = null;

    if(this.state.isLoggedIn) {
      headUser = (
        <div>
          <Navbar.Brand>
            <a onClick={this.handleSubmit}><span>Hi, {this.state.currentId}!</span></a>
          </Navbar.Brand>
          <Navbar.Brand>
            <a href="#" onClick={this.logOut}>Log out</a>
          </Navbar.Brand>
        </div>
      );
    } else {
      headUser = (
        <div>
          <Navbar.Brand>
            <a href="/Login">Log in</a>
          </Navbar.Brand>
          <Navbar.Brand>
            <a href="/Register">Sign up</a>
          </Navbar.Brand>
        </div>
      );
    }

    return (
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <h4><a href="/">Plan Your Trip</a></h4>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {headUser}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Router>
          <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/login/:userID" component={History}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/spots/:cityName" component={Spots}/>
            <Route exact path="/spots/custom/:cityName" component={Custom}/>
            <Route exact path="/spots/custom/confirm/:cityName" component={Confirm}/>
            <Route exact path="/spots/custom/confirm/personalize/:cityName" component={Personalize}/>
          </div>
        </Router>

        <Segment
          inverted
          style={{
          margin: '5em 0em 0em',
          padding: '5em 0em'
        }}
          vertical>
          <Container textAlign='center'>
            <Grid columns={4} divided stackable inverted>
              <Grid.Row>
                <Grid.Column>
                  <Header inverted as='h4' content='Asian'/>
                  <List link inverted>
                    <List.Item as='a' href='https://en.wikipedia.org/wiki/Beijing'>Beijing</List.Item>
                    <List.Item as='a' href='https://en.wikipedia.org/wiki/Singapore'>Singapore</List.Item>
                    <List.Item as='a' href='https://en.wikipedia.org/wiki/Tokyo'>Tokyo</List.Item>
                    <List.Item as='a' href='https://en.wikipedia.org/wiki/Shanghai'>Shanghai</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h4' content='North America'/>
                  <List link inverted>
                    <List.Item as='a' href='https://en.wikipedia.org/wiki/New_York'>New York</List.Item>
                    <List.Item as='a' href='https://en.wikipedia.org/wiki/Chicago'>Chicago</List.Item>
                    <List.Item as='a' href='https://en.wikipedia.org/wiki/Toronto'>Toronto</List.Item>
                    <List.Item as='a' href='https://en.wikipedia.org/wiki/Los_Angeles'>Los Angeles</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h4' content='Europe'/>
                  <List link inverted>
                    <List.Item as='a' href='https://en.wikipedia.org/wiki/Paris'>Paris</List.Item>
                    <List.Item as='a' href='https://en.wikipedia.org/wiki/London'>London</List.Item>
                    <List.Item as='a' href='https://en.wikipedia.org/wiki/Z%C3%BCrich'>Zurich</List.Item>
                    <List.Item as='a' href='https://en.wikipedia.org/wiki/Amsterdam'>Amsterdam</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <Header inverted as='h4' content='Plan your trip'/>
                  <p>The software helps you plan and organize your trip.</p>
                  <Image
                    src='https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/947475/581/387/m1/fpnw/wm1/travel-n-tour-01-.jpg?1454181928&s=a135125ba4f6202d32221d1b37d0d97a'
                    centered
                    size='mini'/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider inverted section/>

            <List horizontal inverted divided link>
              <List.Item as='a' href='#'>Site Map</List.Item>
              <List.Item as='a' href='#'>Contact Us</List.Item>
              <List.Item as='a' href='#'>Terms and Conditions</List.Item>
              <List.Item as='a' href='#'>Privacy Policy</List.Item>
            </List>
          </Container>
        </Segment>
      </div>

    )
  }

}

ReactDOM.render(
  <App/>, document.getElementById('app'));
