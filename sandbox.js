const fetch = require('node-fetch');
const orderTotal = require('./order-total');

const result = orderTotal(fetch, process, {
    country: 'DE',
    items: [
        {'name': 'waffles', price: 20, quantity: 2}
    ]
})
    
result