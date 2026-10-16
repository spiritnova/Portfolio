import styles from './ContactMe.module.css'

import emailjs from '@emailjs/browser';

import { Send, Phone, ArrowUpRight, Copy, Check, Moon, Sun } from 'lucide-react';
import { LinkedInIcon, WhatsAppIcon, DiscordIcon } from './BrandIcons';
import CopyEmail from './CopyEmail';
import { useRef, useState } from 'react';
import useScrollReveal from '../useScrollReveal';
import useBeirutTime from '../useBeirutTime';
import { EMAIL, LINKEDIN } from '../../api/contact';
import Nebula from './Nebula';

const DISCORD_USERNAME = 'spirit_nova'
const PHONE = '+961 81 586 049'
const TOPICS = ['Freelance project', 'Full-time role', 'Just saying hi']

const hourFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hourCycle: 'h23', timeZone: 'Asia/Beirut' })

export const ContactMe = () => {
    const form = useRef();
    const pageRef = useRef(null)
    useScrollReveal(pageRef)
    const time = useBeirutTime()
    // `time` refreshes every few seconds, so this re-checks along with it
    const hour = Number(hourFormatter.format(new Date()))
    const daytime = hour >= 7 && hour < 19
    const [status, setStatus] = useState('idle') // idle | sending | launching | success | error
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
            form.current.reset();
            // the send button fires off a comet, then the form gives way to the confirmation
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches){
                setStatus('success');
                return;
            }
            setStatus('launching');
            setTimeout(() => setStatus('success'), 1000);
        }, () => {
            setStatus('error');
        });
    };

    // like a mail app: Ctrl/Cmd + Enter sends
    const sendShortcut = (e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) form.current.requestSubmit()
    }

  return (
    <div className={styles.page}>
    <Nebula quiet />
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
            <aside className={styles.side} data-reveal>
                <p className={styles.infoIntro}>Have a project in mind, an opportunity, or just want to say hi? Reach out through any of these.</p>

                <ul className={styles.channels}>
                    <li className={styles.wide}>
                        <a className={`${styles.channel} ${styles.whatsapp}`} href='https://wa.me/96181586049' target='_blank' rel='noopener noreferrer'>
                            <span className={styles.channelIcon}><WhatsAppIcon size={20} /></span>
                            <span className={styles.channelText}>
                                <span className={styles.channelName}>WhatsApp</span>
                                <span className={styles.handle}>{PHONE}</span>
                            </span>
                            <ArrowUpRight className={styles.channelAction} size={18} aria-hidden="true" />
                        </a>
                        <a className={styles.call} href='tel:+96181586049' aria-label={`Call ${PHONE}`}>
                            <Phone size={16} aria-hidden="true" />
                        </a>
                    </li>
                    <li>
                        <a className={styles.channel} href={LINKEDIN} target='_blank' rel='noopener noreferrer'>
                            <span className={styles.channelIcon}><LinkedInIcon size={18} /></span>
                            <span className={styles.channelText}>
                                <span className={styles.channelName}>LinkedIn</span>
                                <span className={styles.handle}>Ibrahim Abboud</span>
                            </span>
                            <ArrowUpRight className={styles.channelAction} size={18} aria-hidden="true" />
                        </a>
                    </li>
                    <li>
                        <button type='button' className={styles.channel} onClick={copyDiscord} aria-label={`Copy Discord username ${DISCORD_USERNAME}`}>
                            <span className={styles.channelIcon}><DiscordIcon size={18} /></span>
                            <span className={styles.channelText}>
                                <span className={styles.channelName}>Discord</span>
                                <span className={styles.handle} aria-live="polite">{discordCopied ? 'Copied!' : DISCORD_USERNAME}</span>
                            </span>
                            {discordCopied
                                ? <Check className={styles.channelAction} size={18} aria-hidden="true" />
                                : <Copy className={styles.channelAction} size={18} aria-hidden="true" />}
                        </button>
                    </li>
                </ul>

                {/* the sky over Beirut right now, so people know when to expect a reply */}
                <div className={`${styles.clock} ${daytime ? styles.day : styles.night}`}>
                    <span className={styles.sky} aria-hidden="true">
                        {daytime ? <Sun size={22} /> : <Moon size={22} />}
                    </span>
                    <div>
                        <p className={styles.time}>{time}</p>
                        <p className={styles.place}>in Beirut, Lebanon</p>
                    </div>
                    <div className={styles.clockNotes}>
                        <p className={styles.presence}>
                            <span className={styles.dot} aria-hidden="true"></span>
                            Available for new projects
                        </p>
                        <p className={styles.reply}>I usually reply within a day.</p>
                    </div>
                </div>
            </aside>

            {/* the form is a "New message" window, in the same browser-window style as the projects */}
            <section className={styles.window} data-reveal aria-labelledby="compose-title">
                <div className={styles.titlebar}>
                    <span className={styles.lights} aria-hidden="true"><i></i><i></i><i></i></span>
                    <h2 id="compose-title" className={styles.windowTitle}>New message</h2>
                </div>

                {status === 'success' ? (
                    <div className={styles.sent} role="status">
                        <span className={styles.newStar} aria-hidden="true"></span>
                        <p className={styles.sentText}>Message sent - thanks for reaching out, I'll get back to you soon.</p>
                        <button type='button' className={styles.again} onClick={() => setStatus('idle')}>Send another message</button>
                    </div>
                ) : (
                <form className={styles.form} ref={form} onSubmit={sendEmail} aria-busy={status === 'sending'}>
                    <div className={styles.field}>
                        <span className={styles.fieldLabel}>To</span>
                        <span className={styles.recipient}>
                            <span className={styles.avatar} aria-hidden="true">IA</span>
                            Ibrahim Abboud
                            <span className={styles.recipientEmail}>{EMAIL}</span>
                        </span>
                    </div>
                    <div className={styles.field}>
                        <label className={styles.fieldLabel} htmlFor="user-name">Name</label>
                        <input id="user-name" type='text' name='user_name' autoComplete="name" placeholder="Your name" required />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.fieldLabel} htmlFor="user-email">Email</label>
                        <input id="user-email" type='email' name='user_email' autoComplete="email" placeholder="you@example.com" required />
                    </div>
                    <fieldset className={`${styles.field} ${styles.topics}`}>
                        <legend className={styles.fieldLabel}>Subject</legend>
                        <div className={styles.topicList}>
                            {TOPICS.map(topic => (
                                <label className={styles.topic} key={topic}>
                                    <input type='radio' name='topic' value={topic} />
                                    <span>{topic}</span>
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <label className={styles.srOnly} htmlFor="user-message">Message</label>
                    <textarea id="user-message" className={styles.message} name='message' rows={7} placeholder="Write your message..." onKeyDown={sendShortcut} required />

                    <div className={styles.toolbar}>
                        {status === 'error'
                            ? <p className={styles.statusError} role="alert">Something went wrong sending your message. Please try again or email me directly.</p>
                            : <p className={styles.hint} aria-hidden="true"><kbd>Ctrl</kbd> + <kbd>Enter</kbd> to send</p>}
                        <button type='submit' className={`${styles.submit} ${status === 'launching' ? styles.launched : ''}`} disabled={status === 'sending' || status === 'launching'}>
                            <span className={styles.submitLabel} aria-live="polite">{status === 'sending' ? 'Sending...' : 'Send message'}</span>
                            <Send className={styles.submitIcon} size={18} aria-hidden="true" />
                            <span className={styles.comet} aria-hidden="true"></span>
                        </button>
                    </div>
                </form>
                )}
            </section>
        </div>
    </div>
    </div>
  )
}
