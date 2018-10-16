// Home.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';

class Home extends Component {
    render() {
        
            const {isAuthenticated, user} = this.props.auth;

        const authHome = (
            <div>
                Hello {user.name} ! Welcome back to Beauty Geek!
                ID: {user.id}
                
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
