import React, { Component } from 'react';
// Include your new Components here
import {Search, Grid, Form, Checkbox,Modal,Header,Message,List,Image, Input} from 'semantic-ui-react';
import axios from 'axios';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import PropTypes from 'prop-types';

// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.
var image_base_url = 'https://image.tmdb.org/t/p/w240_and_h266_bestv2';

/**
 * Using React to build Home class
 */

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        const source = [];
        this.state = {
            isLoading: false,
            result: source,
            value: '',
            value2:'check_box1',
            value3:'Ascending'
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange_2 = this.handleChange_2.bind(this);
        this.handleResultSelect = this.handleResultSelect.bind(this);
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
            </div>
        );
    }
}



export default Gallery
