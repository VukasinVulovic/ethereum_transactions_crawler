import { NextApiRequest, NextApiResponse } from 'next';

type ConvertResponse = {
    error: string | false,
    result: number
}

const typeAbbr = {
    'etherium': 'ETH',
    'bitcoin': 'BTH'
}

export default function handle(req:NextApiRequest, res:NextApiResponse<ConvertResponse>) {
    if(req.method?.toUpperCase() != 'GET') { //check method, only GET is allowed
        res.status(405).end();
        return;
    }

    if(!typeAbbr[req.query.type]) { //crypto not supported
        res.status(404).end();
        return;
    }

    if(req.query.ammount <= 0 || req.query.ammount > 9999999999 || !req.query.date) { //check ammount and date
        res.status(400).end();
        return;
    }

    const date = new Date(req.query.date); //convert to date object

    if(!date.valueOf()) { //check if date i valid
        res.status(400).end();
        return;
    }

    const timestamp = date.getTime() / 1000; //convert Epoch to timestamp

    fetch(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${typeAbbr[req.query.type]}&tsym=USD&limit=1&toTs=${timestamp}`)
    .then(async response => {
        const apiResult = await response.json();
        
        if(apiResult['Response'] !== 'Success') { //api returns error
            res.status(500).json({ error: apiResult['Message'], result: 0 });
            return;
        }
        
        if(!apiResult['Data']['Data'][0]) { //no data
            res.status(404).json({ error: 'No price for date.', result: 0 });
            return; 
        }
        
        res.status(200).json({ error: false, result: apiResult['Data']['Data'][0]['close'] });
    })
    .catch(error => res.status(500).json({ error: error.message, transactions: 0 })); //request error
}