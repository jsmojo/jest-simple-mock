
function orderTotal(fetched, process, order) {

    const sumOrderItems = order => 
        order.items.reduce((sum, el) =>  
            el.price * (el.quantity || 1)  + sum, 0)
    

    if(order.country) {
        return fetched('https://somecoolapi.com/check?code=' + order.country, {
            headers: {
                apikey: process.env.VAT_API_KEY
            }
        })
        .then(response => response.json())
        .then(data => data.rates.standard.value)
        .then(vat => sumOrderItems(order) * (1 + vat/100));
    }
    return Promise.resolve( sumOrderItems(order));
}

module.exports = orderTotal;