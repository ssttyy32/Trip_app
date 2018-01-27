import React, { Component } from 'react';
import {Image,Button,Card,Container,Icon} from 'semantic-ui-react';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import getPlan from '../../../../backend/algo/plan'

require('./Personalized.scss');

class Personalize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            must_go: this.props.location.state.must_go,
            want_go:this.props.location.state.want_go,
            no_go: this.props.location.state.no_go,
            day: this.props.location.state.day,
            results: Array(),
            isLoggedIn: false,
            currentId: ''
        };

        var cityName = this.props.match.params.cityName

        let city_url = '/api/spots?where={"cityName":"' + cityName + '"}'
            axios.get(city_url)
            .then((response)=>{
                var all_spots = response.data.data
                var plan_results = getPlan(all_spots, this.state.must_go, this.state.want_go, this.state.no_go, cityName, this.state.day)
                this.setState({
                    results: plan_results
                })
        });

        this.handleSave = this.handleSave.bind(this);
    }

     componentDidMount() {
       axios.get('/api/profile')
         .then((res) => {
           this.setState({
             isLoggedIn: true,
             currentId: res.data.user_id
           });
         })
         .catch((err) => {
           this.setState({isLoggedIn: false});
         });
     }

    handleSave(){
        if (this.state.isLoggedIn === true) {
          let save_url = '/api/users/' + this.state.currentId
          let body  = {
            'plan' : this.state.results
          }
          axios.put(save_url, body).then(response=>{
            this.setState({message: 'Saved successfully!'})
          })

        } else {
          this.setState({message: 'Please log in first'})
        }
    }

    render() {

		return (
           <div>
               <Container>
                  <div class="title">
                    <div class="ui header"><h2>Your Schedule</h2></div>
                  </div>
                  <div class="ui three column grid">

                     {this.state.results.map((day_results, index)=>
                       <div class= "column">
                         <div class="ui header"> Day {index + 1} </div>
                           <div class="ui divided items">
                             {day_results.map((spot)=>
                               <div class="item">
                                 <div class="ui tiny image">
                                   <img src={spot.id.image} />
                                 </div>
                                 <div class="middle aligned content">
                                   <a class="header">{spot.id.spotName}</a>
                                 </div>
                               </div>
                               )
                             }
                          </div>
                        </div>

                     )}
                  </div>

                   <div class='save'>
                     <div class="ui one column stackable center aligned page grid">
                       <div class="column twelve wide">
                         <Button positive onClick={this.handleSave}>Save</Button>
                         <p>{this.state.message}</p>
                       </div>
                    </div>
                  </div>
               </Container>
           </div>
       );
    }
}



export default Personalize
