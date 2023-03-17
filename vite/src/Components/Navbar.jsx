import { Link } from 'react-router-dom';
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
                    <Link to="/" className= {styles['nav-items']}>Home</Link>
                </li>
                <li className = {styles['nav-link']}>
                    <Link to="/projects" className= {styles['nav-items']}>Projects</Link>
                </li>
                <li className = {styles['nav-link']}>
                    <Link to="/about" className= {styles['nav-items']}>About</Link>
                </li>
            </ul>
        </nav>
    )
}