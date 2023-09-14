import styles from './ContactMe.module.css'
import SendIcon from '@mui/icons-material/Send';

import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { LinkedIn, GitHub } from '@mui/icons-material';

export const ContactMe = () => {
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
                <form className={styles.form}>
                    <div className={styles.formcontrol}>
                        <label>FULL NAME</label>
                        <input type='text'/>
                    </div>
                    <div className={styles.formcontrol}>
                        <label>E-Mail</label>
                        <input type='text'/>
                    </div>
                    <div className={styles.formcontrol}>
                        <label>Message</label>
                        <textarea/>
                    </div>

                    <div className={styles.button}>
                        <button>
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
