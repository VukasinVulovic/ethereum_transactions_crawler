import React from 'react';
import style from './style.module.scss';

class TransactionList extends React.Component {
    constructor(props) {
        super(props);
    }

    convertDate(timestamp) {
        const date = new Date(timestamp * 1000);
        return `${date.getDay()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    }

    render() {
        return (
            <ul className={style.list}>
                {
                    this.props.transactions.map(transaction => (
                        <li className={style.item} key={transaction.hash}>
                            <span className={style.timestamp}> {this.convertDate(transaction.timestamp)} </span>
                            <span className={style.hash}> <h6 className={style.label}> Hash: </h6> {transaction.hash} </span>
                            <span className={style.info}> <h6 className={style.label}> Block: </h6>  {transaction.block} </span>
                            {transaction.receiver ? <span className={style.info}> <h6 className={style.label}> Receiver: </h6> {transaction.receiver} </span> : null}
                        </li>
                    ))
                }
            </ul>
        );
    }
}

export default TransactionList;