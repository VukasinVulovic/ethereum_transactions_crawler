import React from 'react';
import style from './style.module.scss';

class ErroModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={style.error_modal}>
                <span className={'material-icons ' + style.icon}> warning </span>
                <h2 className={style.title}> An error occured! </h2>

                <p className={style.info}> {this.props.message} </p>
            </div>
        );
    }
}

export default ErroModal;