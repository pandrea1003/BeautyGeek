// Products.js

import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { logoutUser } from '../actions/authentication';
// import { withRouter } from 'react-router-dom';
// import { foundationDisplay } from '../actions/inventoryDisplay';
import axios from 'axios';
import './Foundation.css';



class Foundation extends Component {

    state = {
        foundations: []
      }

    componentDidMount(){
        axios.get('/products/Foundation')
            .then(response => {
                this.setState({
                    foundations: response.data
                  }); 
            })
            .catch(err => {
                console.log("We got error: " + err);
            });
            console.log(this.state.foundations);

    }
    render() {
        
        var counter = 0;
        var counter1 = 1;
        var counter2 = 2;
        
        return(
            
            <div className="FoundationBox">
            <h1>Foundations</h1>
                   { this.state.foundations.map((item, index, arr) => {
                       
                       console.log(counter+ " " + counter1+ " " + counter2);
                       if (counter2 < this.state.foundations.length){
                       
                      var first = arr[counter]
                      var second = arr[counter1];
                      var third = arr[counter2];
                      counter= counter +3;
                       counter1= counter1 +3;
                       counter2= counter2 +3;

                      var url1="/selectedProducts/" + first._id;
                      var url2="/selectedProducts/" + second._id;
                      var url3="/selectedProducts/" + third._id;

                                return <div className="row"><div className="col-md-3" id="one"><img src={first.picURL} alt={first.id} /><br/>
                                <a href={url1} id={first._id} >{item.Title}</a><br/></div><div className="col-md-3" id="two"><img src={second.picURL} alt={second._id}/><br/>
                                <a href={url2} id={second._id}>{second.Title}</a><br/></div><div className="col-md-3" id="three"><img src={third.picURL} alt={third._id}/><br/>
                                <a href={url3} id={third._id}>{third.Title}</a><br/></div></div> }
                     
                      
                  
                }
                
                )}
            </div>
           
        )
            
        
    }
}


export default Foundation;