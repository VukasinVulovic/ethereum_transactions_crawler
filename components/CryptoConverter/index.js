import React from 'react';
import EtheriumIcon from './crypto_icons/Ethereum.svg';
import BitcoinIcon from './crypto_icons/Bitcoin.svg';
import style from './style.module.scss';
import Loader from '../Loader';

class CryptoConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      date: (new Date()).toISOString().slice(0, 10),
      walletType: 'etherium',
      ammount: 0,
      result: 0,
      bgPos: -50
    }

    this.loop = null;
    this.currency = 'USD';
  }

  getWalletName() {
    return this.state.walletType.charAt(0).toUpperCase() + this.state.walletType.slice(1);
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

  convert() {
    if(!this.state.walletType)
      return;
    
    if(!this.props.onError)
      return;
    
    if(this.state.ammount <= 0 || this.state.ammount > 9999999999) {
      this.props.onError('Input valid ammount of crypto.');
      return;
    }

    this.setState({ loading: true });

    fetch(`/api/convert/${this.state.walletType}?ammount=${this.state.ammount}&date=${this.state.date}`)
    .then(async res => {
      const json = await res.json();

      if(json['error']) {
        this.props.onError(json['error']);
        this.setState({ loading: false });
        return;
      }

      this.props.onError(null);
      this.setState({ loading: false, result: json['result'] + ' USD' }); //remove loading overlay
    })
    .catch(error => {
      this.props.onError(error);
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <>
        { this.state.loading ? <Loader/> : null }

        <div className={style.calculator}>
          <h3 className={style.caption}> Crypto to USD Converter </h3>

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
              <label> {this.getWalletName()} ammount: </label>
              <input type='text' onInput={e => this.setState({ ammount: e.target.value })} placeholder='1234'/>
            </div>

            <div className={style.input_box}>
              <label> Date: </label>
              <input type='date' onInput={e => this.setState({ date: e.target.value })} defaultValue={new Date().toISOString().slice(0, 10)}/>
            </div>
          </section>

          {this.state.result ? (
            <section className={style.result_box}>
              <h4 className={style.caption}> Result </h4>
              <p className={style.result}> {this.state.result} </p>
            </section>
          ) : null}

          <button 
            className={style.view_button} 
            onMouseEnter={this.startAnimation.bind(this)} 
            onMouseLeave={this.stopAnimation.bind(this)}
            onClick={this.convert.bind(this)}
            style={{background: `linear-gradient(30deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.539) ${this.state.bgPos}%, rgba(255,255,255,0) 100%)`}}
          >
            Calculate
          </button>
        </div>
      </>
    );
  }
}

export default CryptoConverter;