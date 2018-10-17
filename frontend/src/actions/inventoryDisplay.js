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

