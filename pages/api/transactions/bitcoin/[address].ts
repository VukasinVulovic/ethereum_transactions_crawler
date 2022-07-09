import { NextApiRequest, NextApiResponse } from 'next';

// const walletAddressRegex = {
//     ethereum: ,
//     bitcoin: ,
//     dogecoin: /^D[a-zA-Z0-9]{33}$/
// }

type Transaction = {
    timestamp: number,
    block: number,
    hash: string,
    receiver: string | null
}

type TransactionsResponse = {
    error: string | false,
    transactions: Array<Transaction>
}

export default function handle(req:NextApiRequest, res:NextApiResponse<TransactionsResponse>) {
    if(req.method?.toUpperCase() != 'GET') {//check method, only GET is allowed
        res.status(405).end();
        return;
    }

    if(!new RegExp(/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/).test(req.query.address?.toString() || '')) {//check if inputs are right
        res.status(400).end();
        return;
    }

    const [ pageSize, pageOffset ] = [ req.query.pageSize || 10, req.query.pageOffset || 0 ]; //get query params or use default
    const [ startBlock, walletAddr ] = [ req.query.block || 0, req.query.address ]; //if start block not provided, assume start block is 0
    
    fetch(`https://blockchain.info/rawaddr/${walletAddr}?limit=${pageSize}&offset=${pageOffset}`) //create get request to api
    .then(async response => {        
        if(response.status != 200) { //api response error
            res.status(500).json({ error: response.statusText, transactions: [] });
            return;
        }

        const apiResult = await response.json();
        
        if(apiResult['error']) { //api returns error
            res.status(500).json({ error: apiResult['message'], transactions: [] });
            return;
        }
        
        let transactions = apiResult['txs'].map(r => {
            let receiver = r['out'][0] || null; //select first output argument

            if(receiver)
                receiver = receiver.spent ? receiver.addr : null; //if argument, wallet spent in transaction, get receiver address
            
            return {
                'timestamp': r['time'],
                'block': r['block_index'],
                'hash': r['hash'],
                'receiver': receiver
            }
        });
        
        if(startBlock)
            transactions = transactions.filter(transaction => transaction.block > startBlock); //get transactions after starting block

        res.status(200).json({ error: false, transactions });
    })
    .catch(error => res.status(500).json({ error: error.message, transactions: [] })); //request error
}