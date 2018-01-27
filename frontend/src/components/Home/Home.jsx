import React, { Component } from 'react';
// Include your new Components here
import {Search, Grid, Form, Checkbox,Modal,Header,Message,List,Image, Input,Segment,Button,Divider,Card,Icon} from 'semantic-ui-react';
import axios from 'axios';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import PropTypes from 'prop-types';

import { Carousel } from 'react-bootstrap';

// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.

require('./Home.scss');
/**
 * Using React to build Home class
 */


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            /*isLoading: false,*/
            results: [],
            value: '',
        };
        /*this.handleSearchChange = this.handleSearchChange.bind(this);*/
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.base_url = "/api/dests?query=";
    }

    /**
     * handleResult
     * @param {Element} e. the result
     * @return No return
     */

    handleResultSelect(event,data){
        this.setState({
          value:data.result.title
          });

          // (data);
    }

    handleSearchChange(event,{value}){
        this.setState({
            /*isLoading:true,*/
            value:value
          });

        let url = this.base_url+value

        axios.get(url)
        .then((response)=>{

          this.setState({
            results:response.data.data,
            /*isLoading:false,*/
          })
        });

        /*(value.value);*/
    }

    handleSubmit(event,value){
        window.location.assign(`/spots/${this.state.value}`);
    }




    render() {
           //760 × 275
    const { isLoading, value, results} = this.state
		  return (
            <div className ='Carousel'>
                <Carousel>
                <Carousel.Item>
                  <img width={1440} height={400} src="../../assets/images/test11.jpg" />
                  <Carousel.Caption>
                    <h2>Beijing</h2>
                    <p>Long story of history.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img  width={1440} height={200} src="../../assets/images/test12.jpg" />
                  <Carousel.Caption>
                    <h2>Cancun</h2>
                    <p>Relax yourself.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img width={1440} height={200} src="../../assets/images/test13.jpg" />
                  <Carousel.Caption>
                    <h2>New york</h2>
                    <p>Somewhere dream starts.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img width={1440} height={200} src="../../assets/images/test14.jpg" />
                  <Carousel.Caption>
                    <h2>Tokyo</h2>
                    <p>Proud of Asian.</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img width={1440} height={200} src="../../assets/images/test15.jpg" />
                  <Carousel.Caption>
                    <h2>Prague</h2>
                    <p>Somewhere Only We Know.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>

                <Segment vertical>
                  <Grid columns='equal' stackable>
                  <Grid.Column >
                    <br/><br/>
                    <h2>Discover, plan, and hit the road</h2>
                  </Grid.Column>
                  </Grid>
                    <Form onSubmit={this.handleSubmit} className = 'Input'>
                    <Form.Group inline>
                        <Form.Field>
                            <Search fluid
                                  defaultValue="Your destination"
                                  loading={isLoading}
                                  onResultSelect={this.handleResultSelect}
                                  onSearchChange={this.handleSearchChange}
                                  /*resultRenderer={results}*/
                                  results={results}
                                  value={value}
                                  {...this.props}
                                  size = 'massive'/>
                        </Form.Field>
                        <Form.Field>
                                <Form.Button onClick={this.handleSubmit} size ='massive'>Let's Select!</Form.Button>
                        </Form.Field>
                    </Form.Group>
                </Form>
                </Segment>

                  <Grid verticalAlign='middle' columns={3} columns='equal'>
                      <Grid.Column >
                        <br/><br/>
                        <h2>Most Famous</h2>
                      </Grid.Column>
                    <Grid.Row>

                      <Grid.Column className ='Grid'>

                        <Link to={{
                          pathname :`/spots/${"Beijing"}`,
                        }}>
                        <Card size='huge' >

                            <Image size='huge' src='././assets/images/Beijing.jpg' />


                            <Card.Content>
                              <Card.Header>Beijing</Card.Header>
                              <Card.Meta>3 days</Card.Meta>
                              <Card.Description>The Forbidden City.</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                              <a>
                                <Icon name='user'/>
                                  15223 users choose this option
                              </a>
                            </Card.Content>
                          </Card>
                          </Link>

                      </Grid.Column>

                      <Grid.Column className ='Grid'>

                        <Link to={{
                          pathname :`/spots/${"Paris"}`,
                        }}>
                        <Card size='huge' >

                            <Image size='huge' src='../../assets/images/Paris.jpg' />

                            <Card.Content>

                              <Card.Header>Paris</Card.Header>
                              <Card.Meta>3 days</Card.Meta>
                              <Card.Description>The city of lights and love.</Card.Description>
                            </Card.Content>

                            <Card.Content extra>
                              <a>
                                <Icon name='user' />
                                5866 users choose this option
                              </a>
                            </Card.Content>
                          </Card>
                          </Link>

                      </Grid.Column>
                      <Grid.Column className ='Grid'>
                      <Link to={{pathname :`/spots/${"Los Angeles"}`}}>
                        <Card size='huge' >
                            <Image size='huge' src='../../assets/images/Los_Angeles.jpg' />
                            <Card.Content>
                              <Card.Header>Los Angeles</Card.Header>
                              <Card.Meta>4 days</Card.Meta>
                              <Card.Description>The City of Angels.</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                              <a>
                                <Icon name='user' />
                                24545 users choose this option
                              </a>
                            </Card.Content>
                          </Card>
                        </Link>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column className ='Grid'>
                      <Link to={{pathname :`/spots/${"London"}`}}>
                        <Card size='huge' >
                            <Image size='huge' src='../../assets/images/London.jpg' />
                            <Card.Content>
                              <Card.Header>London</Card.Header>
                              <Card.Meta>2 days</Card.Meta>
                              <Card.Description>The city of dreams.</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                              <a>
                                <Icon name='user'/>
                                23532 users choose this option
                              </a>
                            </Card.Content>
                          </Card>
                        </Link>
                      </Grid.Column>
                        <Grid.Column className ='Grid'>

                        <Link to={{pathname :`/spots/${"Dalian"}`}}>
                        <Card size='huge' >
                            <Image size='huge' src='../../assets/images/Dalian.jpg' />
                            <Card.Content>
                              <Card.Header>Dalian</Card.Header>
                              <Card.Meta>5 days</Card.Meta>
                              <Card.Description>Home of Tracks and Field.</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                              <a>
                                <Icon name='user' />
                                13256 users choose this option
                              </a>
                            </Card.Content>
                          </Card>
                          </Link>
                      </Grid.Column>
                        <Grid.Column className ='Grid'>
                        <Link to={{pathname :`/spots/${"Barcelona"}`}}>
                        <Card size='huge' >
                            <Image size='huge' src='../../assets/images/Barcelona.png' />
                            <Card.Content>
                              <Card.Header>Barcelona</Card.Header>
                              <Card.Meta>4 days</Card.Meta>
                              <Card.Description>The City of Counts.</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                              <a>
                                <Icon name='user' />
                                54634 users choose this option
                              </a>
                            </Card.Content>
                          </Card>
                          </Link>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
            </div>
        );
    }
}

export default Home
