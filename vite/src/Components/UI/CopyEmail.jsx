import { useEffect, useRef, useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { EMAIL } from '../../api/contact'
import styles from './CopyEmail.module.css'

// The email address in large type; clicking copies it (falls back to mailto if the clipboard is unavailable).
export default function CopyEmail({ size = 'lg' }){
    const [copied, setCopied] = useState(false)
    const timer = useRef(null)

    useEffect(() => () => clearTimeout(timer.current), [])

    function copy(){
        navigator.clipboard.writeText(EMAIL).then(() => {
            setCopied(true)
            clearTimeout(timer.current)
            timer.current = setTimeout(() => setCopied(false), 2000)
        }, () => {
            window.location.href = `mailto:${EMAIL}`
        })
    }

    return (
        <button type="button" className={`${styles.email} ${styles[size]}`} onClick={copy} aria-label={`Copy email address ${EMAIL}`}>
            <span className={styles.address}>{EMAIL}</span>
            <span className={`${styles.icon} ${copied ? styles.done : ''}`} aria-hidden="true">
                {copied ? <Check size="0.6em" /> : <Copy size="0.6em" />}
            </span>
            <span className={styles.toast} role="status">{copied ? 'Copied!' : ''}</span>
        </button>
    )
}
