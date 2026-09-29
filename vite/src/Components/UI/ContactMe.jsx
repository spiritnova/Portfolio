import styles from './ContactMe.module.css'
import SendIcon from '@mui/icons-material/Send';

import emailjs from '@emailjs/browser';

import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LinkedIn from '@mui/icons-material/LinkedIn';
import GitHub from '@mui/icons-material/GitHub';
import { useRef, useState } from 'react';
import useScrollReveal from '../useScrollReveal';

const DISCORD_USERNAME = 'spirit_nova'

function DiscordIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" {...props}>
            <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.07.07 0 0 0-.032.027C.533 9.045-.32 13.579.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.83 19.83 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.673-3.548-13.66a.06.06 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.946 2.419-2.157 2.419z" />
        </svg>
    )
}

export const ContactMe = () => {
    const form = useRef();
    const pageRef = useRef(null)
    useScrollReveal(pageRef)
    const [status, setStatus] = useState('idle') // idle | sending | success | error
    const [discordCopied, setDiscordCopied] = useState(false)

    const copyDiscord = () => {
        navigator.clipboard.writeText(DISCORD_USERNAME).then(() => {
            setDiscordCopied(true)
            setTimeout(() => setDiscordCopied(false), 1500)
        })
    }

    let service_id = import.meta.env.VITE_SERVICE_ID
    let template_id = import.meta.env.VITE_TEMPLATE_ID
    let public_key = import.meta.env.VITE_PUBLIC_KEY

    const sendEmail = (e) => {
        e.preventDefault();
        setStatus('sending');

        emailjs.sendForm(service_id, template_id, form.current, public_key)
        .then(() => {
            setStatus('success');
            form.current.reset();
        }, () => {
            setStatus('error');
        });
    };

  return (
    <div className={styles.wrapper} ref={pageRef}>
        <p className={styles.eyebrow}>let's talk</p>
        <h1 className={styles.heading}>Get In Touch</h1>

        <div className={styles.container}>
            <div className={styles.info} data-reveal>
                <p className={styles.infoIntro}>Have a project in mind, an opportunity, or just want to say hi? Reach out through any of these.</p>

                <div className={styles.rows}>
                    <a className={styles.row} href='tel:+96181586049'>
                        <span className={styles.rowIcon}><PhoneAndroidIcon /></span>
                        <span className={styles.rowLabel}>+961 81 586 049</span>
                    </a>
                    <a className={styles.row} href='mailto:ibrahimabboud2000@gmail.com'>
                        <span className={styles.rowIcon}><AlternateEmailIcon /></span>
                        <span className={styles.rowLabel}>ibrahimabboud2000@gmail.com</span>
                    </a>
                    <a className={styles.row} href='https://www.linkedin.com/in/ibrahim-abboud-9a4679209/' target='_blank' rel='noopener noreferrer'>
                        <span className={styles.rowIcon}><LinkedIn /></span>
                        <span className={styles.rowLabel}>in/ibrahim-abboud-9a4679209</span>
                    </a>
                    <a className={styles.row} href='https://github.com/spiritnova/' target='_blank' rel='noopener noreferrer'>
                        <span className={styles.rowIcon}><GitHub /></span>
                        <span className={styles.rowLabel}>spiritnova</span>
                    </a>
                    <button type='button' className={styles.row} onClick={copyDiscord}>
                        <span className={styles.rowIcon}><DiscordIcon /></span>
                        <span className={styles.rowLabel}>{discordCopied ? 'Copied!' : DISCORD_USERNAME}</span>
                    </button>
                </div>
            </div>

            <form className={styles.form} data-reveal ref={form} onSubmit={sendEmail} aria-busy={status === 'sending'}>
                <div className={styles.formcontrol}>
                    <label htmlFor="user-name">Full name</label>
                    <input id="user-name" type='text' name='user_name' autoComplete="name" required />
                </div>
                <div className={styles.formcontrol}>
                    <label htmlFor="user-email">Email</label>
                    <input id="user-email" type='email' name='user_email' autoComplete="email" required />
                </div>
                <div className={styles.formcontrol}>
                    <label htmlFor="user-message">Message</label>
                    <textarea id="user-message" name='message' required />
                </div>

                <button type='submit' className={styles.submit} disabled={status === 'sending'}>
                    <span aria-live="polite">{status === 'sending' ? 'Sending...' : 'Send message'}</span>
                    <SendIcon fontSize="small" />
                </button>

                {status === 'success' && (
                    <div className={`${styles.status} ${styles.statusSuccess}`} role="status" aria-live="polite">Message sent - thanks for reaching out, I'll get back to you soon.</div>
                )}
                {status === 'error' && (
                    <div className={`${styles.status} ${styles.statusError}`} role="alert">Something went wrong sending your message. Please try again or email me directly.</div>
                )}
            </form>
        </div>
    </div>
  )
}
