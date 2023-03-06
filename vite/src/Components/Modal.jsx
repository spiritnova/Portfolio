import styles from './Modal.module.css'
import ReactDom from 'react-dom'

export default function Modal({ onClose, title , description, website, github}){

    return ReactDom.createPortal(
        <div className={styles.wrapper}>
            <div onClick={onClose} className={styles.backdrop}></div>
            <div className={styles.modal}>
                <h2>{ title }</h2>
                <p> {description} </p>
                <a href={website} target="_blank">Live link</a>
                <a href={github} target="_blank">Github repo</a>
            </div>
        </div>,
        document.getElementById('modal')
    )
}