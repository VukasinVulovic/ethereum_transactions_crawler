import React from 'react';
import style from './style.module.scss';

class TransactionList extends React.Component {
    constructor(props) {
        super(props);
        this.scrolTriggerOffset = this.props.triggerOffset || 100;
    }

    convertDate(timestamp) {
        const date = new Date(timestamp * 1000);
        return `${date.getDay()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    }

    handleScroll(e) {
        if( //if scrolled to end and function defined
            ((e.target.scrollHeight - e.target.offsetHeight) - (e.target.scrollTop + this.scrolTriggerOffset)) < 0 &&
            this.props.onScrolledToEnd
        ) {
            this.props.onScrolledToEnd();
        }
    }

    render() {
        return (
            <ul className={style.list} onScroll={this.handleScroll.bind(this)}>
                {
                    this.props.transactions.map((transaction, i) => (
                        <li className={style.item} key={transaction.hash + '_' + i}> 
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