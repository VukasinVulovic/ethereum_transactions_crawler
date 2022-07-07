import React from 'react';
import style from './style.module.scss';

class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bgPos: -50,
            blockOffset: 0
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

    setBlock(b) {
        this.setState({ blockOffset: b.target.value });
    }

    render() {
        return (
            <div className={style.input_form}>
                <h3 className={style.caption}> Crawl Etherium wallet </h3>

                <section className={style.inputs}>
                    <div className={style.input_box}>
                        <label> Wallet Adress: </label>
                        <input type='text' placeholder='Etherium address'></input>
                    </div>

                    <div className={style.input_box}>
                        <label> Block offset ({this.state.blockOffset + '-current'}): </label>
                        <input type='text' placeholder='From block' onInput={this.setBlock.bind(this)} pattern='[0-9]{1,10}'></input>
                    </div>
                </section>

                <button className={style.view_button} 
                    onMouseEnter={this.startAnimation.bind(this)} 
                    onMouseLeave={this.stopAnimation.bind(this)}
                    onClick={this.props.onProcessed}
                    style={{background: `linear-gradient(30deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.539) ${this.state.bgPos}%, rgba(255,255,255,0) 100%)`}}
                > 
                    View Transactions
                </button>
            </div>
        );
    }
}

export default InputForm;