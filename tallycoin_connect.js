const setup = process.env.APIKEY
const LightningClient = require( './lightning-client')
const client = new LightningClient(process.env.LNDIR, true);
const WebSocket = require('ws')
ws = new WebSocket('wss://ws.tallycoin.app:8123/')
ws.on('open', () => { 
	let init = { setup }
	console.log('do we get to open send?', init)
	ws.send(JSON.stringify(init))

	wstimer = setInterval(() => {
		console.log('interval', ws.readyState)
		if (ws.readyState == 1) {
        		ws.send(JSON.stringify({ ping: setup }))
      		}
	}, 20000)
})

ws.on('message', d => {
    const msg = JSON.parse(d)
    console.log(msg)
    switch (msg.type){
        case 'payment_create': 
            client.invoice(msg.amount * 1000, msg.unique_id,msg.description)
                .then(result => {
                    const paymentData = {
                        type: 'payment_data',
                        id: result.payment_hash,
                        payment_request: result.bolt11,
                        api_key: setup,
                        unique_id:msg.unique_id 
                    }
                    console.log({paymentData})
                    ws.send(JSON.stringify(paymentData))
                })
            break
        case 'payment_verify': 
            client.listinvoices(msg.inv_id).then(result => {
                const verify = {
                    type: 'payment_verify',
                    id: result.label,
                    status: result.status,
                    amount: parseInt(result.amount_received_msat / 1000),
                    api_key: setup,
                    unique_id: msg.unique_id
                }
                console.log({verify})
                ws.send(JSON.stringify(verify))
            })
            break
    }
})
ws.on('close', console.log)
ws.on('error', console.log)
