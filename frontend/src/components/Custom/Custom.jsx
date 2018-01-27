import React, { Component } from 'react';
// Include your new Components here
import {Search, Grid, Form, Checkbox,Modal,Header,Message,List,Image, Input,Button,Card,Container,Label,Feed} from 'semantic-ui-react';
import axios from 'axios';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import  Pagination  from '../Pagination/Pagination.jsx';

// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.
var image_base_url = 'https://image.tmdb.org/t/p/w240_and_h266_bestv2';
require('./Custom.scss');
/**
 * Using React to build Home class
 */

class Custom extends React.Component {
    constructor(props) {
        super(props);
        const source = [];
        this.state = {
            cityName : this.props.match.params.cityName,
            results : Array(),
            pageOfItems:Array(),
            day:0
        };

        this.url = '/api/spots?where={"cityName":"'+this.state.cityName+'"}';
        const condition2 = []
        axios.get(this.url)
        .then((response)=>{
          for(let i=0; i<response.data.data.length;i++){
                response.data.data[i]['condition']= 'this_1'
          }

          this.setState({
            results:response.data.data
            /*types: response.data.types,*/
          });
        });

        this.onChangePage = this.onChangePage.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange_1 = this.handleChange_1.bind(this);
        this.handleChange_2 = this.handleChange_2.bind(this);
        this.handleChange_3 = this.handleChange_3.bind(this);
        this.handleChange_4 = this.handleChange_4.bind(this);
        this.handleChange_5 = this.handleChange_5.bind(this);
        this.handleChange_6 = this.handleChange_6.bind(this);
        this.handleChange_7 = this.handleChange_7.bind(this);
        this.handleChange_8 = this.handleChange_8.bind(this);
        this.handleChange_9 = this.handleChange_9.bind(this);
        this.handleChange_10 = this.handleChange_10.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.chooseChange_1 = this.chooseChange_1.bind(this);
        this.chooseChange_2 = this.chooseChange_2.bind(this);
        this.chooseChange_3 = this.chooseChange_3.bind(this);
        this.chooseChange_4= this.chooseChange_4.bind(this);

    }

    /**
     * handleResult
     * @param {Element} e. the result
     * @return No return
     */
    chooseChange_1(e,value){


    }

    chooseChange_2(e,value){
        let result_temp = this.state.results;
        for(let i=0; i<result_temp.length;i++){
                if(result_temp[i]._id == value.value){
                    if(result_temp[i]['condition']!= 'must_go'){
                        result_temp[i]['condition']= 'must_go'
                    }
                    else{
                        result_temp[i]['condition']= 'this_1'
                    }
                }
        }
        this.setState({
            results:result_temp
            /*types: response.data.types,*/
        });

    }

    chooseChange_3(e,value){
        let result_temp = this.state.results;
        for(let i=0; i<result_temp.length;i++){
                if(result_temp[i]._id == value.value){
                    if(result_temp[i]['condition']!= 'want_go'){
                        result_temp[i]['condition']= 'want_go'
                    }
                    else{
                        result_temp[i]['condition']= 'this_1'
                    }
                }
        }
        this.setState({
            results:result_temp
            /*types: response.data.types,*/
        });

    }

    chooseChange_4(e,value){
        let result_temp = this.state.results;
        for(let i=0; i<result_temp.length;i++){
            if(result_temp[i]._id == value.value){
                if(result_temp[i]['condition']!= 'no_go'){
                        result_temp[i]['condition']= 'no_go'
                }
                else{
                    result_temp[i]['condition']= 'this_1'
                }
            }
        }
        this.setState({
            results:result_temp
            /*types: response.data.types,*/
        });

    }

    handleResultSelect(e,value){
        this.setState({value:value.result.title});
    }

    handleChange(content){
        this.url = '/api/spots?where={"cityName":"'+this.state.cityName+'"';

        let request_url = this.url + content +'}';
        axios.get(request_url)
        .then((response)=>{

          this.setState({
            results:response.data.data,
            /*types: response.data.types,*/

          })
        });
    }

    handleChange_1(e,value){
        this.handleChange('');
    }

    handleChange_2(e,value){
        this.handleChange(',"type":"Sights %26 Landmarks"');
    }

    handleChange_3(e,value){
        this.handleChange(',"type":"Shopping"');
    }

    handleChange_4(e,value){
        this.handleChange(',"type":"Nature %26 Parks"');
    }
    handleChange_5(e,value){
        this.handleChange(',"type":"Architectural Buildings"');
    }

    handleChange_6(e,value){
        this.handleChange(',"type":"Historic Sites"');
    }

    handleChange_7(e,value){
        this.handleChange(',"type":"Points of Interest %26 Landmarks"');
    }

    handleChange_8(e,value){
        this.handleChange(',"type":"Museums"');
    }

    handleChange_9(e,value){
        this.handleChange(',"type":"Bodies of Water"');
    }

    handleChange_10(e,value){
        this.handleChange(',"type":"Castles"');
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    /**
     * handleSearchChange
     * @param {Element} e. the result
     * @return No return
     */

    handleSearchChange(event,{value}){
        this.setState({day: value });
    }

    render() {

		return (
            <div>
                <Container>
                <Form onSubmit={this.handleSubmit} className = 'Input'>
                    <Form.Group>
                            <Form.Input
                                  size='huge'
                                  icon='calendar'
                                  iconPosition='left'
                                  placeholder='Input your travelling days'
                                  onChange={this.handleSearchChange}
                                />
                            <Link to={{
                                  pathname :`/spots/custom/confirm/${this.state.cityName}`,
                                  state:{
                                      day:this.state.day,
                                      res:this.state.results,
                                      cityname:this.state.cityName
                                  }
                                }}>
                                <Form.Button onClick={this.handleSubmit} size ='huge'>Let's Select!</Form.Button>
                            </Link>
                    </Form.Group>
                </Form>
                 <div className = 'button'>
                    <Label as='a' onClick={this.handleChange_1} color='orange' tag>Most Popularity</Label>
                    <Label as='a' onClick={this.handleChange_2} color='olive' tag>Sights & Landmarks</Label>
                    <Label as='a' onClick={this.handleChange_3} color='green' tag>Shopping</Label>
                    <Label as='a' onClick={this.handleChange_4} color='pink' tag>Nature & Parks</Label>
                    <Label as='a' onClick={this.handleChange_5} color='yellow' tag>Architectural Buildings</Label>
                </div>
                <div className = 'button2'>
                    <Label as='a' onClick={this.handleChange_6} color='grey' tag>Historic Sites</Label>
                    <Label as='a' onClick={this.handleChange_7} color='teal' tag>Interest & Landmarks</Label>
                    <Label as='a' onClick={this.handleChange_8} color='violet' tag>Museums</Label>
                    <Label as='a' onClick={this.handleChange_9} color='red' tag>Bodies of Water</Label>
                    <Label as='a' onClick={this.handleChange_10} color='brown' tag>Castles</Label>
                </div>
                    <div className = 'card'>
                        <Card.Group itemsPerRow={3}>
                            {this.state.pageOfItems.map((results)=>
                                <Card>
                                    <Card.Content>
                                        <Card.Header textAlign='left'>
                                            {results.spotName}
                                        </Card.Header>
                                    </Card.Content>
                                    <img src={results.image} height="200"/>
                                    <Card.Content>
                                      <Feed size = 'large'>
                                        <Feed.Event>
                                          <Feed.Label icon='world' >
                                            </Feed.Label>
                                          <Feed.Content>
                                            <Feed.Date content={results.rating} />
                                            <Feed.Summary>
                                                Address: {results.street}
                                            </Feed.Summary>
                                          </Feed.Content>
                                        </Feed.Event>
                                        </Feed>
                                      </Card.Content>
                                      <Card.Content extra>
                                        <div>
                                          <Checkbox toggle
                                                label='Must Go'
                                                name='checkboxRadioGroup'
                                                value={results._id}
                                                checked={results.condition === 'must_go'}
                                                onChange={this.chooseChange_2}
                                              />
                                              <p> </p>

                                            <Checkbox toggle
                                                label='Want Go'
                                                name='checkboxRadioGroup'
                                                value={results._id}
                                                checked={results.condition === 'want_go'}
                                                onChange={this.chooseChange_3}
                                              />
                                              <p> </p>
                                            <Checkbox toggle
                                                label='Not Go'
                                                name='checkboxRadioGroup'
                                                value={results._id}
                                                checked={results.condition === 'no_go'}
                                                onChange={this.chooseChange_4}
                                              />
                                              <p> </p>
                                        </div>
                                      </Card.Content>
                                </Card>
                                )

                            }
                        </Card.Group>
                    </div>



                      <br/>

                      <Pagination items={this.state.results} onChangePage={this.onChangePage} />

                      <br/>
                </Container>
            </div>
        );
    }
}



export default Custom
