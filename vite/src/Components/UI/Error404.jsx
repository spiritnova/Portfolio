import { useState } from 'react'
import styles from './Error404.module.css'
import { Link } from 'react-router-dom'

export default function Error404() {
  const [trapped, setIsTrapped] = useState(false)
  const [safe, setIsSafe] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.shape}>
        <div className={styles.spooky}>
          <div className={`${styles.eyes} ${safe ? styles.sadeyes : ''}`}>
            <span className={trapped ? styles.trapped : ''}></span>
            <span className={trapped ? styles.trapped : ''}></span>
          </div>

          <div className={`${styles.mouth} ${trapped && styles.happy} ${safe && styles.sad}`}></div>
        </div>
      </div>
      <div className={styles.error}>
        <div className={styles.title}>404</div>
        <div className={styles.subtitle}>Hey, don't be spooked</div>
        <div className={styles.message}>The page you are looking for is on the righ.. d..down there on the left.</div>
        <div className={styles.buttons}>
          <button onMouseOver={() => setIsTrapped(true)} onMouseOut={() => setIsTrapped(false)}>Go Home</button>
          <Link to={'/'}><button onMouseOver={() => setIsSafe(true)} onMouseOut={() => setIsSafe(false)}>Go Home</button></Link>
        </div>
      </div>
    </div>
  )
}
