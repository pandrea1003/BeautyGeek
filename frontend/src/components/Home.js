// Home.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Home extends Component {
    state = {
        userReviews: [],
        currentUserName: ""
    }

    componentDidMount(){

        const {isAuthenticated, user} = this.props.auth;
        if (isAuthenticated){

            axios.get('/api/users/me').then(response => {
                console.log(response.data.email.substring(0, response.data.email.indexOf("@")));
                this.setState({
                    currentUserName: response.data.email.substring(0, response.data.email.indexOf("@"))
                  }); 
            }).catch(err => {
                console.log("We got error for current user: " + err);
            });


        axios.get('/reviews/userPage/'+user.id)
            .then(response => {
                console.log(response.data[0].Review);
                this.setState({
                    userReviews: response.data[0].Review
                  }); 
            })
            .catch(err => {
                console.log("We got error: " + err);
            });

    }
}


handleClick(reviewID){
    console.log(reviewID);
    axios.delete('/reviews/delete/'+reviewID)
            .then(response => {
                console.log("Delete was succesfull!");
                window.location.reload();
            })
            .catch(err => {
                console.log("We got error while deleting: " + err);
            });
}

    render() {
        
            const {isAuthenticated, user} = this.props.auth;

        const authHome = (
            <div>
                Hello {user.name} ! Welcome back to Beauty Geek!
                ID: {user.id}

                <div><h2>Reviews by {this.state.currentUserName}</h2>
                { this.state.userReviews.map((item, index, arr) => {
                    return <div><h3>{item.title}</h3>{item.body}<br/>
                    <button type="button" onClick={()=> this.handleClick(item._id)}>Delete</button>
                    <br/></div>

                })}
            </div>
            </div>
             
        )
        const guestHome = (
            <div>
            Welcome to Beauty Geek!
            </div>
          )
        return(
            <div>
                {isAuthenticated ? authHome : guestHome}
            </div>
           
        )
            
        
    }
}

    Home.propTypes = {
        auth: PropTypes.object.isRequired
    }
    
    const mapStateToProps = (state) => ({
        auth: state.auth
    })
    
    export default connect(mapStateToProps, { logoutUser })(withRouter(Home));
