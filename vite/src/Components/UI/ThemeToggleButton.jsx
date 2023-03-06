import { useEffect, useState } from 'react'
import styles from './ThemeToggleButton.module.css'

export default function ThemeToggleButton({ onToggle }){
    const [isChecked, setIsChecked] = useState()

    useEffect(() => {
        const theme = JSON.parse(localStorage.getItem('theme'))
        if(theme === 'dark'){
            setIsChecked(true)
        }
        else{
            setIsChecked(false)
        }
    }, [])

    return (
        <section className={styles['model-2']}>
            <div className={styles.checkbox}>
                <input defaultChecked={isChecked} onClick={onToggle} type="checkbox"/>
                <label></label>
            </div>
        </section>
    )
}