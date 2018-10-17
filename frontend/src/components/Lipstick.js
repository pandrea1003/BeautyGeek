// Lipstick.js

import React, { Component } from 'react';
import axios from 'axios';


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
            
            <div className="container">
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
                      
                                return <div className="row"><div className="col-md-3"><img src={first.picURL} alt={first.id} height="100" width="100"/><br/>
                                                        <a href="#" id={first.id}>{item.Title}</a><br/></div><div className="col-md-3"><img src={second.picURL} alt={second.id} height="100" width="100"/><br/>
                                                        <a href="#" id={second.id}>{second.Title}</a><br/></div><div className="col-md-3"><img src={third.picURL} alt={third.id} height="100" width="100"/><br/>
                                                        <a href="#" id={third.id}>{third.Title}</a><br/></div></div> }
                        else{ console.log("lol");
                       
                  }
                      
                  
                }
                
                )}
            </div>
           
        )
            
        
    }
}


export default Lipstick;