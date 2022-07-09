import React from 'react';
import style from './style.module.scss';
import EtheriumIcon from './crypto_icons/Ethereum.svg';
import BitcoinIcon from './crypto_icons/Bitcoin.svg';

const walletAddressRegex = {
    etherium: /^0x[a-fA-F0-9]{40}$/,
    bitcoin: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/
}

class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bgPos: -50,
            blockOffset: 0,
            walletAddress: null,
            walletType: 'etherium'
        }

        this.loop = null;
    }

    startAnimation() {
        if(this.loop !== null)
            clearInterval(this.loop);

        this.loop = setInterval(() => {
            if(this.state.bgPos >= 100) {
                clearInterval(this.loop);
                this.loop = null;
            }

            this.setState({
                bgPos: this.state.bgPos + 5
            });
        }, 5);
    }

    stopAnimation() {
        if(this.loop !== null)
            clearInterval(this.loop);
        
        this.loop = setInterval(() => {
            if(this.state.bgPos <= 0) {
                clearInterval(this.loop);
                this.loop = null;
            }

            this.setState({
                bgPos: this.state.bgPos - 5
            });
        }, 5);
    }

    processData() {
        if(!this.props.onProcessed || !this.props.onError)
            return;

        if(!new RegExp(/^[0-9]{1,10}$/).test(this.state.blockOffset)) {
            this.props.onError('Invalid block offset');
            return;
        }
    
        if(!walletAddressRegex[this.state.walletType] || !new RegExp(walletAddressRegex[this.state.walletType]).test(this.state.walletAddress)) {
            this.props.onError('Invalid wallet address');
            return;
        }

        this.props.onProcessed(this.state.walletType, this.state.walletAddress, this.state.blockOffset);
    }

    getWalletName() {
        return this.state.walletType.charAt(0).toUpperCase() + this.state.walletType.slice(1);
    }

    setBlockOffset(value) {
        if(value.length <= 0)
            value = 0;

        this.setState({ blockOffset: value });
    }

    render() {
        return (
            <div className={style.input_form}>
                <h3 className={style.caption}> Crypto transactions crawler </h3>

                <nav className={style.type_selector}>
                    <h3 className={style.selector_title}> Select crypto: </h3>
                    <section className={style.selector_items}>
                        <a 
                            className={style.type_item + ' ' + (this.state.walletType === 'etherium' ? style.type_item_seleced : '')}
                            onClick={() => this.setState({ walletType: 'etherium' })}
                        >
                            <img src={EtheriumIcon}/>
                        </a>

                        <a 
                            className={style.type_item + ' ' + (this.state.walletType === 'bitcoin' ? style.type_item_seleced : '')}
                            onClick={() => this.setState({ walletType: 'bitcoin' })}
                        >
                            <img src={BitcoinIcon}/>
                        </a>
                    </section>
                </nav>

                <section className={style.inputs}>
                    <div className={style.input_box}>
                        <label> Wallet Adress: </label>
                        <input type='text' placeholder={this.getWalletName() + ' address'} onInput={e => this.setState({ walletAddress: e.target.value })}/>
                    </div>

                    <div className={style.input_box}>
                        {/* <label> Block offset ({this.state.blockOffset + '-current'}): </label> */}
                        <label> Start Block: </label>
                        <input type='text' placeholder='From block' onInput={e => this.setBlockOffset(e.target.value)}/>
                    </div>
                </section>

                <button 
                    className={style.view_button} 
                    onMouseEnter={this.startAnimation.bind(this)} 
                    onMouseLeave={this.stopAnimation.bind(this)}
                    onClick={this.processData.bind(this)}
                    style={{background: `linear-gradient(30deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.539) ${this.state.bgPos}%, rgba(255,255,255,0) 100%)`}}
                > 
                    View Transactions
                </button>
            </div>
        );
    }
}

export default InputForm;