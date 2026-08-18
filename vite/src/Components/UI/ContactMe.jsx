import styles from './ContactMe.module.css'
import SendIcon from '@mui/icons-material/Send';

import emailjs from '@emailjs/browser';

import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { LinkedIn, GitHub } from '@mui/icons-material';
import { useRef, useState } from 'react';

export const ContactMe = () => {
    const form = useRef();
    const [status, setStatus] = useState('idle') // idle | sending | success | error

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
    <div className={styles.contactform}>
        <div className={styles.header}>
            <span className={styles.heading}>Connect?</span> 
        </div>

        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.row}>
                    <div className={styles.icon}>
                        <PhoneAndroidIcon/>
                    </div>
                    <div className={styles.label}>+961 81586049</div>
                </div>
                <div className={styles.row}>
                    <div className={styles.icon}><AlternateEmailIcon/></div>
                    <div className={styles.label}>ibrahimabboud2000@gmail.com</div>
                </div>
                <div className={styles.row}>
                    <div className={styles.icon}>
                        <LinkedIn/>
                    </div>
                    <div className={styles.label}>
                        <a href='https://www.linkedin.com/in/ibrahim-abboud-9a4679209/' target='_blank' rel='noopener noreferrer'>in/ibrahim-abboud-9a4679209</a>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.icon}>
                        <GitHub/>
                    </div>
                    <div className={styles.label}>
                        <a href='https://github.com/spiritnova/' target='_blank' rel='noopener noreferrer'>spiritnova</a>
                    </div>
                </div>
            </div>


            <div className={styles.formcontainer}>
                <div className={styles.bracket}>
                    &lt;
                </div>
                <form className={styles.form} ref={form} onSubmit={sendEmail}>
                    <div className={styles.formcontrol}>
                        <label>FULL NAME</label>
                        <input type='text' name='user_name'/>
                    </div>
                    <div className={styles.formcontrol}>
                        <label>E-Mail</label>
                        <input type='email' name='user_email'/>
                    </div>
                    <div className={styles.formcontrol}>
                        <label>Message</label>
                        <textarea name='message'/>
                    </div>

                    <div className={styles.button}>
                        <button type='submit' disabled={status === 'sending'}>
                            <span>{status === 'sending' ? 'Sending...' : 'Send'}</span>
                            <SendIcon/>
                        </button>
                    </div>

                    {status === 'success' && (
                        <div className={`${styles.status} ${styles.statusSuccess}`}>Message sent — thanks for reaching out, I'll get back to you soon.</div>
                    )}
                    {status === 'error' && (
                        <div className={`${styles.status} ${styles.statusError}`}>Something went wrong sending your message. Please try again or email me directly.</div>
                    )}
                </form>

                <div className={styles.bracket2}>
                    <span className={styles.slash}>/</span>&gt;
                </div>
            </div>
        </div>
    </div>
  )
}
