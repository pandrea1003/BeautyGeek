// Home.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import logo from './BR.jpg'

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


            <div className= "container">
            <div className = "welcome">
            <h1 class= "mainHeadline">

            Hello <b className="userName">{user.name} </b>!
<br></br>
             Welcome back 
             <br></br>
             to <p className="beautyGeekFont">Beauty Geek!</p>
            
            </h1>
            <p>
                ID: {user.id}
                </p>
                </div>
                <div className="reviewBox"><h2 className="reviewBoxHeader">Reviews made by <b>{this.state.currentUserName}</b> (you)</h2><hr/>
                { this.state.userReviews.map((item, index, arr) => {
                    var plink = "/selectedProducts"+item.pID;
                    console.log(plink);
                    return <div className="miniReviewBox"><h4><u><a href={plink} className="linkProdHome"> {item.productTitle}</a></u></h4><h3 className="homeProductTitle">{item.title}</h3><p className="homeProductBody">{item.body}</p><br/>

                    <button className="btn btn-danger deleteButton" type="button" onClick={()=> this.handleClick(item._id)}>Delete</button>
                    <br/></div>

                })}
            </div>
            
            </div>
            
            
            
        )
        const guestHome = (
            <div className="container">
            
              <div class="thumbnail text-center">
            <img src={logo} alt="beautygeekwelcome" className="img-responsive welcomeImg"/>
            <div class="caption"><p>Welcome to <p className="beautyGeekFont">Beauty Geek!</p></p>
            
          
           </div>
           </div>
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
