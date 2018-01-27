import React, { Component } from 'react';
// Include your new Components here
import {Search, Grid, Form,Container, Checkbox,Modal,Header,Message,List,Image, Input,Segment,Button,Divider,Card,Icon} from 'semantic-ui-react';
import axios from 'axios';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import PropTypes from 'prop-types';

import { Carousel } from 'react-bootstrap';
// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.
/**
 * Using React to build Home class
 */
 require('./History.scss');

class History extends Component {

    constructor(props) {
         super(props);

         this.state = {
            userID : this.props.match.params.userID,
            results:[],
            history:Array()
        };

        let request_url = '/api/users?where={"email":"'+this.state.userID+'"}';
        axios.get(request_url)
        .then((response)=>{
          (response.data.data);
          this.setState({
            results:response.data.data,
            /*types: response.data.types,*/

          })
        });

        (this.state.results)
        this.handleChange_1 = this.handleChange_1.bind(this);
    }

    handleChange_1(e,value){
        (this.state.results[0].history)
        let result_temp = this.state.results;
        let history = [];

        for(let i=0; i<result_temp.length;i++){
            if((result_temp[i].email) == this.state.userID){
                //(result_temp[i].history);
                history = result_temp[i].history;

            }
            console.log(history[0]);
        }

         this.setState({
            history:history,

          })

        (history);
    }

    render() {
        return (
          <div>
            <Container>
                <Grid centered columns={2}>
                    <Button onClick={this.handleChange_1} positive>View history</Button>
                </Grid>

                {this.state.history.map((day_results2, index2)=>
                  <div class="history">
                    <div class="title">
                      <div class="ui header">
                        <h2>History {index2 + 1} To {day_results2[0][0].id.cityName}</h2>
                      </div>
                    </div>
                    <div class="ui three column grid">
                       {day_results2.map((day_results, index)=>
                          <div class= "column">
                             <div class="ui header">
                                Day {index + 1}
                             </div>
                             <div class="ui divided items">
                                 {day_results.map((spot)=>
                                   <div class="item">
                                       <div class="ui tiny image">
                                         <img src={spot.id.image} />
                                       </div>
                                       <div class="middle aligned content">
                                         {spot.id.spotName}
                                       </div>
                                   </div>
                                   )
                                 }
                            </div>
                          </div>
                       )}
                  </div>
                </div>
                )}
            </Container>
          </div>
        )
    }
}

export default History
