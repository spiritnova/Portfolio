import { Link, NavLink } from 'react-router-dom';
import styles from './Navbar.module.css'

import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Navbar(){
    return (
        <nav className={styles.nav}>
            <ul className={styles.quicklinks}>
                <li>
                    <a href='https://www.linkedin.com/in/ibrahim-abboud-9a4679209/' target="_blank">
                        <LinkedInIcon/>
                    </a>
                </li>
                <li>
                    <a href='https://github.com/spiritnova' target="_blank">
                        <GitHubIcon/>
                    </a>
                </li>
            </ul>
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
            </ul>
        </nav>
    )
}