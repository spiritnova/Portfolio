import { useState } from 'react'
import styles from './Error404.module.css'
import { Link } from 'react-router-dom'

export default function Error404() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.shape}>
        <div className={styles.spooky}>
          <div className={`${styles.eyes} ${hovered ? styles.sadeyes : ''}`}>
            <span></span>
            <span></span>
          </div>

          <div className={`${styles.mouth} ${hovered ? styles.sad : ''}`}></div>
        </div>
      </div>
      <div className={styles.error}>
        <div className={styles.title}>404</div>
        <div className={styles.subtitle}>Hey, don't be spooked</div>
        <div className={styles.message}>The page you're looking for doesn't exist. Let's get you back home.</div>
        <div className={styles.buttons}>
          <Link to={'/'}><button onMouseOver={() => setHovered(true)} onMouseOut={() => setHovered(false)}>Go Home</button></Link>
        </div>
      </div>
    </div>
  )
}
