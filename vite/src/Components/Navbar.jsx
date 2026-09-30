import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css'

import { LinkedInIcon, GitHubIcon } from './UI/BrandIcons';

export default function Navbar(){
    return (
        <nav className={styles.nav}>
            <Link to="/" className={styles.brand}>Ibrahim <span>Abboud</span></Link>

            <div className={styles.right}>
                <ul className={styles['nav-links']}>
                    <li className = {styles['nav-link']}>
                        <NavLink to="/" className= {({ isActive }) => `${isActive ? styles.active : ''} ${styles['nav-items']}`}>Home</NavLink>
                    </li>
                    <li className = {styles['nav-link']}>
                        <NavLink to="/projects" className = {({ isActive }) => `${isActive ? styles.active : ''} ${styles['nav-items']}`}>
                            Projects
                        </NavLink>
                    </li>
                    <li className = {styles['nav-link']}>
                        <NavLink to="/about" className= {({ isActive }) => `${isActive ? styles.active : ''} ${styles['nav-items']}`}>About</NavLink>
                    </li>
                    <li className = {styles['nav-link']}>
                        <NavLink to="/contact" className= {({ isActive }) => `${isActive ? styles.active : ''} ${styles['nav-items']}`}>Contact</NavLink>
                    </li>
                </ul>

                <ul className={styles.quicklinks}>
                    <li>
                        <a href='https://www.linkedin.com/in/ibrahim-abboud-9a4679209/' target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <LinkedInIcon/>
                        </a>
                    </li>
                    <li>
                        <a href='https://github.com/spiritnova' target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <GitHubIcon/>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
