import React from 'react';
import style from './style.module.scss';

class TransactionList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={style.loader}>
                <div className={style.circle}>
                    <h3 className={style.title}> Loading... </h3>
                </div>
            </div>
        );
    }
}

export default TransactionList;