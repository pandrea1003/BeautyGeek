// Lipstick.js

import React, { Component } from 'react';
import axios from 'axios';
import './Lipstick.css';


class Lipstick extends Component {

    state = {
        lipstick: []
      }

    componentDidMount(){
        axios.get('/products/Lipstick')
            .then(response => {
                this.setState({
                    lipstick: response.data
                  }); 
            })
            .catch(err => {
                console.log("We got error: " + err);
            });
            console.log(this.state.lipstick);

    }
    render() {
        
        var counter = 0;
        var counter1 = 1;
        var counter2 = 2;
        
        return(
            
            <div className="LipstickBox">
            <h1>Lipsticks</h1>
                   { this.state.lipstick.map((item, index, arr) => {
                       
                       console.log(counter+ " " + counter1+ " " + counter2);
                       if (counter2 < this.state.lipstick.length){
                       
                      var first = arr[counter]
                      var second = arr[counter1];
                      var third = arr[counter2];
                      counter= counter +3;
                       counter1= counter1 +3;
                       counter2= counter2 +3;
                      
                       var url1="/selectedProducts/" + first._id;
                      var url2="/selectedProducts/" + second._id;
                      var url3="/selectedProducts/" + third._id;

                                return <div className="row"><div className="col-md-3" id="uno"><img src={first.picURL} alt={first.id} height="100" width="100"/><br/>
                                                        <a href={url1} id={first._id} >{item.Title}</a><br/></div><div className="col-md-3"><img src={second.picURL} alt={second._id} height="100" width="100"/><br/>
                                                        <a href={url2} id={second._id}>{second.Title}</a><br/></div><div className="col-md-3"><img src={third.picURL} alt={third._id} height="100" width="100"/><br/>
                                                        <a href={url3} id={third._id}>{third.Title}</a><br/></div></div> }
                     
                      
                      
                  
                }
                
                )}
            </div>
           
        )
            
        
    }
}


export default Lipstick;