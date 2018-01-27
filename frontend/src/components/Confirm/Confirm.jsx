import React, { Component } from 'react';
// Include your new Components here
import {Search, Grid, Form, Checkbox,Modal,Header,Message,List,Image, Input,Button,Card,Container,Divider,Icon} from 'semantic-ui-react';
import axios from 'axios';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import PropTypes from 'prop-types';

// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.
var image_base_url = 'https://image.tmdb.org/t/p/w240_and_h266_bestv2';
require('./Confirm.scss');
/**
 * Using React to build Home class
 */

class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName : this.props.match.params.cityName,
            result: this.props.location.state.res,
            day: this.props.location.state.day,
            want_go: Array(),
            must_go: Array(),
            no_go: Array()
        };

        // (this.state.result);
        // (this.state.day);
        const result_2 = this.state.result;
        var must_go_2 = [];
        var want_go_2 = [];
        var no_go_2 = [];
        for(let i=0;i<result_2.length;i++){
            if(result_2[i].condition=='must_go'){
                must_go_2.push(result_2[i]);

            }

            else if(result_2[i].condition=='want_go'){
                want_go_2.push(result_2[i]);
            }

            else if(result_2[i].condition=='no_go'){
                no_go_2.push(result_2[i]);
            }

        }
        this.state = {
            cityName : this.props.match.params.cityName,
            result: this.props.location.state.res,
            day: this.props.location.state.day,
            want_go: want_go_2,
            must_go: must_go_2,
            no_go: no_go_2

        };
        
        this.handleChange_1 = this.handleChange_1.bind(this);
        // (this.state.must_go);
        // (this.state.want_go);
        // (this.state.no_go);
        // (this.state.day);
    }

    /**
     * handleResult
     * @param {Element} e. the result
     * @return No return
     */

    handleResultSelect(e,value){
        this.setState({value:value.result.title});
    }

    handleChange(e,value){
        this.setState({value2:value.value});
        // (value.value);
    }
    
    handleChange_1(e, value){
        (must_go)
        let must_go = this.state.must_go;
        let want_go = this.state.want_go;
        let no_go = this.state.no_go;
        for(let i=0; i<must_go.length;i++){
            if(must_go[i]._id == value){
                must_go.splice(i, 1);
            }
        }
        
        for(let i=0; i<want_go.length;i++){
            if(want_go[i]._id == value){
                want_go.splice(i, 1);
            }
        }
        
        for(let i=0; i<no_go.length;i++){
            if(no_go[i]._id == value){
                no_go.splice(i, 1);
            }
        }
        this.setState({
            must_go:must_go,
            want_go:want_go,
            no_go:no_go
            /*types: response.data.types,*/
        });

    }

    handleChange_2(e,value){
        this.setState({value3:value.value});
        // (value.value);
    }

    /**
     * handleSearchChange
     * @param {Element} e. the result
     * @return No return
     */

    handleSearchChange(event){
        this.setState({ isLoading: true});
        this.setState({value: event.target.value});
        // (this.state.value);
        let searchInput = this.state.value;
        let api_key = '8edd397260d15047f93e90209f151faf';
        let base_url = 'https://api.themoviedb.org/3/search/movie?api_key=';
        let query_name = "&query=";
        let request_url = base_url + api_key + query_name + searchInput;
        const source =[];
        if(this.state.value.length>0){
            axios.get(request_url).then(response => {
                // (response.data.results);
                if(response.data.results){
                    let i=0;
                    for(i=0; i<5;i++){
                        if(response.data.results[i]){
                            source[i]={title:response.data.results[i].title, image:image_base_url + response.data.results[i].poster_path,
                                       description:response.data.results[i].vote_average,
                                       price:response.data.results[i].popularity,
                                       id:response.data.results[i].id
                                       };
                        }
                    }
                    if(this.state.value2 =='check_box2'){
                        if(this.state.value3 =='Ascending'){
                            source.sort(function (a, b) {
                                return a.description- b.description;
                            });
                        }
                        else{
                            source.sort(function (a, b) {
                                return b.description- a.description;
                            });
                        }
                    }

                    if(this.state.value2 =='check_box1'){
                        if(this.state.value3 =='Ascending'){
                            source.sort(function (a, b) {
                                return a.price- b.price;
                            });
                        }
                        else{
                            source.sort(function (a, b) {
                                return b.price- a.price;
                            });
                        }
                    }

                    // (source);
                    this.setState({result: source,
                                  isLoading: false
                                  });
                }
//                (response.data.results[0]);
            });
        }
    }

    render() {

		return (
            <div>
                <Container>
                    <Divider horizontal section><h2>must go!</h2></Divider>
                        <div className = 'card'>
                        <Card.Group itemsPerRow={4}>
                        {this.state.must_go.map((results)=>

                            <Card key={results._id} >
                            <img src={results.image} height="200"/>
                            <Card.Content>
                               <Card.Header>{results.spotName}</Card.Header>
                               <Card.Meta>{results.rating}</Card.Meta>
                                {/*<Card.Meta>{index}</Card.Meta>*/}
                               <Card.Description>{results.type[0]}</Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                    <Button icon='delete' onClick={(event)=>this.handleChange_1(event,results._id)} content='Delete' />
                            </Card.Content>
                            </Card>
                          )
                        }
                        </Card.Group>
                    </div>
                    <Divider horizontal section><h2>want go!</h2></Divider>
                        <div className = 'card'>
                        <Card.Group itemsPerRow={4}>
                        {this.state.want_go.map((results)=>

                            <Card key={results._id} >
                            <img src={results.image} height="200"/>
                            <Card.Content>
                               <Card.Header>{results.spotName}</Card.Header>
                               <Card.Meta>{results.rating}</Card.Meta>
                                {/*<Card.Meta>{index}</Card.Meta>*/}
                               <Card.Description>{results.location}</Card.Description>
                            </Card.Content>
                            <Card.Content>
                                <Button icon='delete' onClick={(event)=>this.handleChange_1(event,results._id)} content='Delete' />
                            </Card.Content>
                            </Card>
                          )
                        }
                        </Card.Group>
                    </div>
                    <Divider horizontal section><h2>Not interested!</h2></Divider>
                        <div className = 'card'>
                        <Card.Group itemsPerRow={4}>
                        {this.state.no_go.map((results)=>

                            <Card key={results._id} >
                            <img src={results.image} height="200"/>
                            <Card.Content>
                               <Card.Header>{results.spotName}</Card.Header>
                               <Card.Meta>{results.rating}</Card.Meta>
                                {/*<Card.Meta>{index}</Card.Meta>*/}
                               <Card.Description>{results.location}</Card.Description>
                            </Card.Content>
                            <Card.Content>
                                <Button icon='delete' onClick={(event)=>this.handleChange_1(event,results._id)} content='Delete' />
                            </Card.Content>
                            </Card>
                          )
                        }
                        </Card.Group>
                    </div>
                    <div className = 'button3'>
                          <Button.Group>
                         <Link to={{
                                  pathname :`/spots/${this.state.cityName}/Custom`,
                                  res:this.state.result
                                }}>
                                <Button size ='large'>Edit</Button>
                            </Link>
                        <Button.Or />
                        <Link to={{
                                  pathname :`/spots/custom/confirm/personalize/${this.state.cityName}`,
                                  state:{
                                      want_go: this.state.want_go,
                                      must_go: this.state.must_go,
                                      no_go: this.state.no_go,
                                      day: this.state.day
                                  }
                                }}>
                            <Button size ='large' color='blue'>Apply</Button>
                        </Link>
                        </Button.Group>
                    </div>
                </Container>
            </div>
        );
    }
}



export default Confirm
