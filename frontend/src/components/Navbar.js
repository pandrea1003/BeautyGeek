// Navbar.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
import "./Navbar.css";

class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            
            <ul className="navbar-nav ml-auto">
            <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#"  role="button" data-toggle="dropdown" >
          Makeup
        </a>
        <div class="dropdown-menu" >
          <a class="dropdown-item" href="/Foundation">Foundation</a>
          <a class="dropdown-item" href="/Eyeshadow">Eyeshadow</a>
          <a class="dropdown-item" href="/Lipstick">Lipstick</a>
       
        </div>
      </li>
             <li> <a href="#" className="nav-link" onClick={this.onLogout.bind(this)}>
                    <img src={user.avatar} alt={user.name} title={user.name}
                        className="rounded-circle"
                        style={{ width: '25px', marginRight: '5px'}} />
                            Logout
                </a>
                </li>
      
            </ul>
           
            
        )
        
      const guestLinks = (
        <ul className="navbar-nav ml-auto navbar-light">
            <li className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Sign In</Link>
            </li>
        </ul>
        
      )
        return(
           
            <nav className="navbar navbar-expand-lg sticky-top">
                <Link className="navbar-brand" to="/">BeautyGeek</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            
            </nav>
           
            
        )
   

    }
   
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));