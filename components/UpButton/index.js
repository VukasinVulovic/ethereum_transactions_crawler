import style from './style.module.scss';

export default function UpButton(props) {
    return (
        props.visible ? <button className={style.button} onClick={() => document.body.scrollTo(0, 0)}>
            <span className='material-icons'> download </span>
        </button> : null
    );
}