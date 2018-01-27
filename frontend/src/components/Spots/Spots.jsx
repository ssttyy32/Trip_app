import React, { Component } from 'react';
// Include your new Components here
import {Container,Header,Message,List,Image, Input,Segment,Button,Card,Icon,Item} from 'semantic-ui-react';
import axios from 'axios';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import PropTypes from 'prop-types';

import  Pagination  from '../Pagination/Pagination.jsx';
import { Modal, Media, Label} from 'react-bootstrap';
/*import ShowMore from 'react-show-more';*/

// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.

var image_base_url = 'https://image.tmdb.org/t/p/w240_and_h266_bestv2';
require('./Spots.scss');
/**
 * Using React to build Home class
 */



class Spots extends React.Component {
    constructor(props) {
        super(props);
        // (this.props);
        this.state = {
          cityName : this.props.match.params.cityName,
          results : Array(),
          pageOfItems:Array(),
          modalOpen:false,
          details:Array(),
          index:-1,

        };

        this.url = '/api/spots?where={"cityName":"'+this.state.cityName+'"}';
        this.image_url ="https://www.tripadvisor.com/";
        this.onChangePage = this.onChangePage.bind(this);
        this.modalDetails = this.modalDetails.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        axios.get(this.url)
        .then((response)=>{
          // (response.data.data);

          this.setState({
            results:response.data.data,
            /*types: response.data.types,*/

          })
        });
    }


    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    handleSubmit(event,value){
        window.location.assign(`/spots/custom/${this.state.cityName}`);
    }

    modalDetails(event,index){
      this.setState({
          index:index,
          modalOpen:true,
          details:this.state.pageOfItems[index],
        });
    }

    handlePrev(event){
		let prev=this.state.index-1
		if(prev >= 0){
      this.setState({
          index:prev,
          details:this.state.pageOfItems[prev],
        });
		}

	}

  	handleNext(index){
  	let next=this.state.index+1
  		if(next < this.state.pageOfItems.length){
        this.setState({
            index:next,
            details:this.state.pageOfItems[next],
          });
  		}
  	}

    handleClose(){
      this.setState({ modalOpen:false });
    }

    render() {

      return (


        <Container>



        <h1>Arractions in {this.state.cityName}</h1>
        <div className ='submitButton'>
          <Button onClick={this.handleSubmit} size='large'>Custom Your Trips</Button>
        </div>
        <Card.Group itemsPerRow={4}>
        {this.state.pageOfItems.map((results,index)=>

          <Card key={results._id} onClick = {(event)=>this.modalDetails(event,index)} >
          <img src={results.image} height="200"/>
          <Card.Content>
            <Card.Header>{results.spotName}</Card.Header>
            <Card.Meta>{results.rating}</Card.Meta>
          {/*<Card.Meta>{index}</Card.Meta>*/}
            <Card.Description>{results.type[0]}</Card.Description>
          </Card.Content>

          </Card>
          )
        }

        </Card.Group>



      <br/>

      <Pagination items={this.state.results} onChangePage={this.onChangePage} />

      <br/>

      {/*<Modal open={modalOpen} onClose={this.close} size ='mini'>
      <Modal.Header>{this.state.details.title}</Modal.Header>
      <Modal.Content image>
        <Image wrapped size='medium' src={this.state.details.image} />
        <Modal.Description>
          <Header>Overview</Header>
          <p>{this.state.details.overview}</p>
        </Modal.Description>
      </Modal.Content>

    </Modal>*/}

    <Modal
        show={this.state.modalOpen}
        onHide={this.handleClose}

        aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">{this.state.details.soptName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Media>
            <Media.Left>
              <img width={250} height={200} src={this.state.details.image} alt="Image" />
            </Media.Left>
            <Media.Body>
              <Media.Heading>Overview</Media.Heading>
              {/*<ShowMore
                lines={3}
                more='Show more'
                less='Show less'
                anchorClass=''
            >
                {this.state.details.overviewt}
            </ShowMore>*/
          /*<p>{}</p>*/}
              <Media.Heading>Address</Media.Heading>
              <p>{this.state.details.street}</p>
              <h3><Label bsStyle="info">{this.state.details.duration}</Label> </h3>
            </Media.Body>
          </Media>
          </Modal.Body>
          <Modal.Footer>
            <Button color='green' onClick={this.handlePrev}>Previous</Button>
            <Button color='green' onClick={this.handleNext}>Next</Button>
          </Modal.Footer>
        </Modal>
    </Container>

        );
    }
}

export default Spots
