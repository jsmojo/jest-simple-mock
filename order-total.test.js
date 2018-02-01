const orderTotal = require('./order-total');

it('calls vatapi.com if country', () => {
    const fakeProcess = {
        env: {
            VAT_API_KEY: 'key123'
        }
    }
    
    const fakeFetch = jest.fn().mockReturnValue(Promise.resolve({
        json: () => Promise.resolve({
            rates: {
                standard: {
                    value: 19
                }
            }
        })
    }));
    return orderTotal(fakeFetch, fakeProcess, {
        country: 'DE',
        items: [
            {name: 'waffles', price: 20, quantity: 2}
        ]
    }).then(result => {
        expect(result).toBe(20*2*1.19);
        expect(fakeFetch).toBeCalledWith('https://somecoolapi.com/check?code=DE', {"headers": { "apikey": "key123" }});
    })
})


it('Quantity', () => {
    orderTotal(null, null, {
        items: [
            {name: 'candy', price: 2, quantity: 3}
        ]
    }).then(result => expect(result).toBe(6))
})

it('No quantity specified', () => {
    orderTotal(null, null, { 
        items: [
            {name: 'candy', price: 3}
        ]
    }).then( result => expect(result).toBe(3))
})

it('Happy Path (Example 1)', () => {
    orderTotal(null, null, {
        items: [
            {name: 'food', price: 8, quantity: 1},
            {name: 'cage', price: 800, quantity: 1}
        ]
    }).then(result => expect(result).toBe(808))
})

it('Happy Path (Example 2)', () => {
    orderTotal(null, null, {
        items: [
            {name: 'collar', price: 20, quantity: 1},
            {name: 'chew toy', price: 40, quantity: 1}
        ]
    }).then(result => expect(result).toBe(60))
})

