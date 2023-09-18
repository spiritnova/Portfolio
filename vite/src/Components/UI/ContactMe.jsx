import styles from './ContactMe.module.css'
import SendIcon from '@mui/icons-material/Send';

import emailjs from '@emailjs/browser';

import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { LinkedIn, GitHub } from '@mui/icons-material';
import { useRef } from 'react';

export const ContactMe = () => {
    const form = useRef();

    let service_id = import.meta.env.VITE_SERVICE_ID
    let template_id = import.meta.env.VITE_TEMPLATE_ID
    let public_key = import.meta.env.VITE_PUBLIC_KEY

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm("service_jxfsfyl", "template_sxd8hqh", form.current, 'wL6VorCzQwYCMSEvi')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
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
                        <a href='https://www.linkedin.com/in/ibrahim-abboud-9a4679209/' target='_blank'>in/ibrahim-abboud-9a4679209</a>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.icon}>
                        <GitHub/>
                    </div>
                    <div className={styles.label}>
                        <a href='https://github.com/spiritnova/' target='_blank'>spiritnova</a>
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
                        <button type='submit'>
                            <span>Send</span>
                            <SendIcon/>
                        </button>
                    </div>
                </form>

                <div className={styles.bracket2}>
                    <span className={styles.slash}>/</span>&gt;
                </div>
            </div>
        </div>
    </div>
  )
}
