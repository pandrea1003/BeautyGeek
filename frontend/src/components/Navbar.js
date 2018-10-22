// Navbar.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';




//import { Navbar } from 'react-bootstrap';
//import { MenuItem } from 'react-bootstrap';
import './Navbar.css';


class Navbar extends Component {

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <a href="#" className="nav-link" onClick={this.onLogout.bind(this)}>
                    <img src={user.avatar} alt={user.name} title={user.name}
                        className="rounded-circle"
                        style={{ width: '25px', marginRight: '5px' }} />
                    Logout

                </a>
            </ul>
        )
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
              
            </ul>
        )

       
        return (
            <nav className="navbar navbar-expand-lg">
  <div class="collapse navbar-collapse" >
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
      <Link className="navbar-brand" id="logo" to="/">BeautyGeek</Link>
      </li> 
      
      <li class="nav-item active">
        <Link class="navbar-brand dropdown-toggle" id="other" to="/Eyeshadow"  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Eyeshadow
        </Link>
      </li>
      <li class="nav-item active">
        <Link class="navbar-brand dropdown-toggle" id="other" to="/Foundation"  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Foundation
        </Link>
      </li>
      <li class="nav-item active">
        <Link class="navbar-brand dropdown-toggle" id="other" to="/Lipstick"  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Lipstick
        </Link>
      </li><li class="nav-item active">
        <Link class="navbar-brand dropdown-toggle"id="other" to="/selectedProducts/:id"  role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Review
        </Link>
      </li>
      <li class="nav-item active">
      <Link className="navbar-brand" id="sign" to="/login">Sign In</Link>
      </li>
      <li class="nav-item active">
      <Link className="navbar-brand" id="sign" to="/register">Sign Up</Link>
      </li>
{isAuthenticated ? authLinks : guestLinks}
    </ul>

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

export default connect(mapStateToProps, { logoutUser, })(withRouter(Navbar));

