import { useLocation } from 'react-router-dom'
import { FileText, Mail } from 'lucide-react'
import { LinkedInIcon, GitHubIcon } from './UI/BrandIcons'
import CopyEmail from './UI/CopyEmail'
import useBeirutTime from './useBeirutTime'
import { EMAIL, LINKEDIN, GITHUB, RESUME } from '../api/contact'
import styles from './Footer.module.css'

export default function Footer(){
    const { pathname } = useLocation()
    const time = useBeirutTime()

    return (
        <footer className={styles.footer}>
            {pathname !== '/contact' && (
                <div className={styles.signoff}>
                    <p className={styles.label}>Say hi</p>
                    <CopyEmail size="lg" />
                </div>
            )}

            <div className={styles.bottom}>
                <p className={styles.meta}>
                    © {new Date().getFullYear()} Ibrahim Abboud
                    <span className={styles.sep} aria-hidden="true">·</span>
                    Beirut, {time}
                </p>
                <ul className={styles.links}>
                    <li>
                        <a href={`mailto:${EMAIL}`} aria-label="Email">
                            <Mail size={20} aria-hidden="true" />
                        </a>
                    </li>
                    <li>
                        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <LinkedInIcon size={20} />
                        </a>
                    </li>
                    <li>
                        <a href={GITHUB} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <GitHubIcon size={20} />
                        </a>
                    </li>
                    <li>
                        <a href={RESUME} target="_blank" rel="noopener noreferrer" aria-label="Resume (PDF)">
                            <FileText size={20} aria-hidden="true" />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
