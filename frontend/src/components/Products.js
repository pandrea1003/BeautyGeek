// Products.js

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';


class Products extends Component {
    
    state = {
        selectedProduct: []
      }

    componentDidMount(){
        console.log("We made it here!" + this.props.match.params.id);
        var pID= this.props.match.params.id;
        axios.get('/products/description/'+pID)
            .then(response => {
                console.log(response.data);
                this.setState({
                    selectedProduct: response.data[0]
                  }); 
            })
            .catch(err => {
                console.log("We got error: " + err);
            });
            console.log("This is selected.. " + this.state.selectedProduct);

    }

    render() {
        const {isAuthenticated, user} = this.props.auth;

        const authProduct = (
            <div className="container">
                <h2>{this.state.selectedProduct.Title}</h2><br/>
                <img src={this.state.selectedProduct.picURL} alt={this.state.selectedProduct._id} height="160" width="160"/><br/>
                <br/><a href={this.state.selectedProduct.productLink}>Buy</a>
            </div>
        )

        const guestProduct = (
            <div className="container">
                Please login to see this page
            </div>
        )
        
        return(
            
            <div>
                {isAuthenticated ? authProduct : guestProduct}
            </div>
           
        )
            
        
    }
}


Products.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Products));