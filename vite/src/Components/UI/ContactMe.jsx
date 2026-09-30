import styles from './ContactMe.module.css'

import emailjs from '@emailjs/browser';

import { Send, Phone, ArrowUpRight } from 'lucide-react';
import { LinkedInIcon, GitHubIcon, WhatsAppIcon, DiscordIcon } from './BrandIcons';
import CopyEmail from './CopyEmail';
import { useRef, useState } from 'react';
import useScrollReveal from '../useScrollReveal';
import useBeirutTime from '../useBeirutTime';
import { EMAIL, LINKEDIN, GITHUB } from '../../api/contact';

const DISCORD_USERNAME = 'spirit_nova'
const PHONE = '+961 81 586 049'
const TOPICS = ['Freelance project', 'Full-time role', 'Just saying hi']

export const ContactMe = () => {
    const form = useRef();
    const pageRef = useRef(null)
    useScrollReveal(pageRef)
    const time = useBeirutTime()
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
        <header className={styles.hero} data-reveal>
            <h1 className={styles.eyebrow}>Get In Touch</h1>
            <CopyEmail size="xl" />
            <a className={styles.mailto} href={`mailto:${EMAIL}`}>
                Open in mail app
                <ArrowUpRight size={16} aria-hidden="true" />
            </a>
        </header>

        <div className={styles.container}>
            <div className={styles.info} data-reveal>
                <p className={styles.infoIntro}>Have a project in mind, an opportunity, or just want to say hi? Reach out through any of these.</p>

                <p className={styles.presence}>
                    <span className={styles.dot} aria-hidden="true"></span>
                    Available for new projects
                    <span className={styles.sep} aria-hidden="true">·</span>
                    {time} in Beirut
                </p>

                <ul className={styles.channels}>
                    <li>
                        <a className={styles.channel} href='https://wa.me/96181586049' target='_blank' rel='noopener noreferrer'>
                            <WhatsAppIcon size={18} />
                            WhatsApp
                        </a>
                    </li>
                    <li>
                        <a className={styles.channel} href={LINKEDIN} target='_blank' rel='noopener noreferrer'>
                            <LinkedInIcon size={18} />
                            LinkedIn
                        </a>
                    </li>
                    <li>
                        <a className={styles.channel} href={GITHUB} target='_blank' rel='noopener noreferrer'>
                            <GitHubIcon size={18} />
                            GitHub
                        </a>
                    </li>
                    <li>
                        <button type='button' className={styles.channel} onClick={copyDiscord} aria-label={`Copy Discord username ${DISCORD_USERNAME}`}>
                            <DiscordIcon size={18} />
                            <span aria-live="polite">{discordCopied ? 'Copied!' : DISCORD_USERNAME}</span>
                        </button>
                    </li>
                    <li>
                        <a className={styles.channel} href='tel:+96181586049' aria-label={`Call ${PHONE}`}>
                            <Phone size={18} aria-hidden="true" />
                            {PHONE}
                        </a>
                    </li>
                </ul>
            </div>

            <form className={styles.form} data-reveal ref={form} onSubmit={sendEmail} aria-busy={status === 'sending'}>
                <h2 className={styles.formTitle}>Or send a message</h2>

                <fieldset className={styles.topics}>
                    <legend>What's it about?</legend>
                    <div className={styles.topicList}>
                        {TOPICS.map(topic => (
                            <label className={styles.topic} key={topic}>
                                <input type='radio' name='topic' value={topic} />
                                <span>{topic}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                <div className={styles.row}>
                    <div className={styles.formcontrol}>
                        <label htmlFor="user-name">Name</label>
                        <input id="user-name" type='text' name='user_name' autoComplete="name" required />
                    </div>
                    <div className={styles.formcontrol}>
                        <label htmlFor="user-email">Email</label>
                        <input id="user-email" type='email' name='user_email' autoComplete="email" required />
                    </div>
                </div>
                <div className={styles.formcontrol}>
                    <label htmlFor="user-message">Message</label>
                    <textarea id="user-message" name='message' rows={4} required />
                </div>

                <button type='submit' className={styles.submit} disabled={status === 'sending'}>
                    <span aria-live="polite">{status === 'sending' ? 'Sending...' : 'Send message'}</span>
                    <Send size={18} aria-hidden="true" />
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
