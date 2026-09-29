import { useEffect, useRef } from 'react'
import ReactDom from 'react-dom'
import styles from './Lightbox.module.css'

import CloseIcon from '@mui/icons-material/Close'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

export default function Lightbox({ images, index, basePath, title, onClose, onChange }) {
    const closeRef = useRef(null)
    const indexRef = useRef(index)
    indexRef.current = index

    useEffect(() => {
        const previouslyFocused = document.activeElement
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault()
                onClose()
            } else if (e.key === 'ArrowLeft' && images.length > 1) {
                e.preventDefault()
                onChange((indexRef.current - 1 + images.length) % images.length)
            } else if (e.key === 'ArrowRight' && images.length > 1) {
                e.preventDefault()
                onChange((indexRef.current + 1) % images.length)
            } else if (e.key === 'Tab') {
                const controls = document.querySelectorAll('[data-lightbox] button:not(:disabled)')
                const first = controls[0]
                const last = controls[controls.length - 1]
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault()
                    last?.focus()
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault()
                    first?.focus()
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        closeRef.current?.focus()

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = previousOverflow
            previouslyFocused?.focus?.()
        }
    }, [images.length, onChange, onClose])

    const hasMultiple = images.length > 1

    return ReactDom.createPortal(
        <div className={styles.wrapper} data-lightbox>
            <div className={styles.backdrop} aria-hidden="true" onClick={onClose}></div>

            <div className={styles.dialog} role="dialog" aria-modal="true" aria-label={`${title} screenshots`}>
                <button ref={closeRef} className={styles.close} type="button" onClick={onClose} aria-label="Close image viewer">
                    <CloseIcon />
                </button>

                {hasMultiple && (
                    <button className={`${styles.nav} ${styles.prev}`} type="button" onClick={() => onChange((index - 1 + images.length) % images.length)} aria-label="Previous image">
                        <ChevronLeftIcon fontSize="large" />
                    </button>
                )}

                <div className={styles.content}>
                    <img
                        src={`${basePath}${images[index]}`}
                        alt={`${title} screenshot ${index + 1}`}
                    />
                    {hasMultiple && (
                        <span className={styles.counter}>{index + 1} / {images.length}</span>
                    )}
                </div>

                {hasMultiple && (
                    <button className={`${styles.nav} ${styles.next}`} type="button" onClick={() => onChange((index + 1) % images.length)} aria-label="Next image">
                        <ChevronRightIcon fontSize="large" />
                    </button>
                )}
            </div>
        </div>,
        document.getElementById('modal')
    )
}
