import { useCallback, useEffect } from 'react'
import ReactDom from 'react-dom'
import styles from './Lightbox.module.css'

import CloseIcon from '@mui/icons-material/Close'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

export default function Lightbox({ images, index, basePath, title, onClose, onChange }) {
    const goPrev = useCallback(() => {
        onChange((index - 1 + images.length) % images.length)
    }, [index, images.length, onChange])

    const goNext = useCallback(() => {
        onChange((index + 1) % images.length)
    }, [index, images.length, onChange])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose()
            else if (e.key === 'ArrowLeft') goPrev()
            else if (e.key === 'ArrowRight') goNext()
        }

        document.addEventListener('keydown', handleKeyDown)
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = previousOverflow
        }
    }, [goPrev, goNext, onClose])

    const hasMultiple = images.length > 1

    return ReactDom.createPortal(
        <div className={styles.wrapper}>
            <div className={styles.backdrop} onClick={onClose}></div>

            <button className={styles.close} onClick={onClose} aria-label="Close">
                <CloseIcon />
            </button>

            {hasMultiple && (
                <button className={`${styles.nav} ${styles.prev}`} onClick={goPrev} aria-label="Previous image">
                    <ChevronLeftIcon fontSize="large" />
                </button>
            )}

            <div className={styles.content}>
                <img
                    src={`${basePath}${images[index]}`}
                    alt={`${title} screenshot ${index + 1}`}
                    onClick={(e) => e.stopPropagation()}
                />
                {hasMultiple && (
                    <span className={styles.counter}>{index + 1} / {images.length}</span>
                )}
            </div>

            {hasMultiple && (
                <button className={`${styles.nav} ${styles.next}`} onClick={goNext} aria-label="Next image">
                    <ChevronRightIcon fontSize="large" />
                </button>
            )}
        </div>,
        document.getElementById('modal')
    )
}
