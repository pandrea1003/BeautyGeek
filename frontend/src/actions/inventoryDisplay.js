// inventoryDisplay.js

import axios from 'axios';


export const foundationDisplay = result => {
    axios.get('/products/Foundation')

            .then(function(response) {
                return result.json(response);
            })
            .catch(err => {
                console.log(err);
            });
}

export const lipstickDisplay = result => {
    axios.get('/products/Lipstick')
            .then(function(response) {
                return result.json(response);
            })
            .catch(err => {
                console.log(err);
            });
}
