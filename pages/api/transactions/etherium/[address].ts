import { NextApiRequest, NextApiResponse } from 'next';

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

    if(!new RegExp(/^0x[a-fA-F0-9]{40}$/).test(req.query.address?.toString() || '')) {//check if inputs are right
        res.status(400).end();
        return;
    }

    const startBlock = req.query.block || 0; //if start block not provided, assume start block is 0
    const walletAddr = req.query.address;
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddr}&startblock=${startBlock}&sort=asc&apikey=${process.env['ETHERIUM_API_KEY']}`;

    fetch(url, {
        method: 'GET'
    })
    .then(async response => {
        const apiResult = await response.json();
        
        if(apiResult.status != 1) { //api returns error
            res.status(500).json({ error: apiResult['message'], transactions: [] });
            return;
        }
        
        const transactions = apiResult['result'].map(r => {
            return {
                'timestamp': r['timeStamp'],
                'block': r['blockNumber'],
                'hash': r['hash'],
                'receiver': r['to'] != walletAddr ? r['to'] : null
            }
        });
        
        res.status(200).json({ error: false, transactions });
    })
    .catch(error => res.status(500).json({ error, transactions: [] })); //request error
}