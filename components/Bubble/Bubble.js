import React from 'react';
import style from './style.module.scss';

const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

class Bubble extends React.Component {
    constructor(props) {
        super(props);

        this.speed = 10;//random(1, 5);
        this.r = window.innerWidth * 0.2;
        this.loop = null;
        this.vel = [ this.speed, this.speed ];
        this.state = {
            x: 0,
            y: 0
        }
    }

    changePos() {
        if(this.state.x < 0 || this.state.x > window.innerWidth - this.r)
            this.vel[0] *= -1; 

        if(this.state.y < 0 || this.state.y > window.innerHeight - this.r)
            this.vel[1] *= -1; 

        this.setState({
            x: this.state.x + this.vel[0],
            y: this.state.y + this.vel[1]
        });
    }

    componentDidMount() {
        this.setState({
            x: random(this.r, window.innerWidth - this.r),
            y: random(this.r, window.innerHeight - this.r)
        });

        this.loop = setInterval(this.changePos.bind(this), 10);
    }

    componentWillUnmount() {
        if(this.loop != null)
            clearInterval(this.loop);
    }

    render() {
        return (
            <div className={style.bubble} style={{ width: this.r, height: this.r, left: this.state.x, top: this.state.y, background: this.props.background || 'linear-gradient(green, yellow)' }}></div>
        );
    }
}

export default Bubble;