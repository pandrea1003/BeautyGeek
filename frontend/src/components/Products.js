// Products.js

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import "./Products.css";

class Products extends Component {
    
    state = {
        selectedProduct: [],
        productReviews: [],
        currentUser: {},
        title: "",
        body: ""
      }

    componentDidMount(){
        console.log("We made it here!" + this.props.match.params.id);

        axios.get('/api/users/me').then(response => {
            console.log(response.data);
            this.setState({
                currentUser: response.data
              }); 
        }).catch(err => {
            console.log("We got error for current user: " + err);
        });

        var pID= this.props.match.params.id;
        axios.get('/products/description/'+pID)
            .then(response => {
                this.setState({
                    selectedProduct: response.data[0]
                  }); 
            })
            .catch(err => {
                console.log("We got error: " + err);
            });
            console.log("This is selected.. " + this.state.selectedProduct);

            //get call for product reviews
            axios.get('/reviews/productPage/'+pID)
            .then(response => {
                console.log("Esto es el review... v");
                console.log(response.data[0]);
                this.setState({
                    productReviews: response.data[0].Review
                  }); 
            })
            .catch(err => {
                console.log("We got error: " + err);
            });
           

    }

    handleInputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        const name = event.target.name;
    
        if (name === "password") {
          value = value.substring(0, 15);
        }
        // Updating the input's state
        this.setState({
          [name]: value
        });
      };
    
      handleFormSubmit = event => {
        // Preventing the default behavior of the form submit (which is to refresh the page)
        event.preventDefault();
        if (!this.state.title || !this.state.body) {
          alert("Please fill out the title and body of your review before submitting.");
        }else{
            var url = "/reviews/"+this.props.match.params.id+"/"+this.state.currentUser.id;
            console.log(url);
            axios.post(url, {
                title: this.state.title,
                body: this.state.body,
                userId: this.state.currentUser.id,
                userName: this.state.currentUser.email.substring(0, this.state.currentUser.email.indexOf('@')),
                productTitle: this.state.selectedProduct.Title,
                pID: "/"+this.state.selectedProduct._id
              })
              .then(function (response) {
                console.log(response);
                window.location.reload();
              })
              .catch(function (error) {
                console.log(error);
              });

        }
    
        this.setState({
          title: "",
          body: ""
        });
      };

      


    render() {
        const {isAuthenticated, user} = this.props.auth;

        const authProduct = (
            <div>
            <div className="container">
            <div className="jumbotron">
            <div className="productInfo">
                <h2>{this.state.selectedProduct.Title}</h2><br/>
                <img src={this.state.selectedProduct.picURL} alt={this.state.selectedProduct._id} height="160" width="160"/><br/>
                <br/><a href={this.state.selectedProduct.productLink}>Buy</a><br/></div>
            </div>
            <div className="container reviewBox"><h2>Reviews</h2><hr/>
                { this.state.productReviews.map((item, index, arr) => {
                    return <div><h3>{item.title}</h3><h4>By: {item.userName}</h4>{item.body}</div>
                })}
            </div></div>
                <br/>
            <div className="container"><h3>Add a Review... </h3>
            <form className="form">
          <input
            value={this.state.title}
            name="title"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Title"
          /><br/>
          <input
            value={this.state.body}
            name="body"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Body"
          /><br/>
          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
            </div>
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