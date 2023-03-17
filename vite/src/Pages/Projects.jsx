import { useEffect, useState } from 'react'
import Modal from '../Components/Modal'
import Wrapper from '../Components/UI/Wrapper'
import styles from './Projects.module.css'

export default function Projects(){
    const [showModal, setShowModal] = useState(false)

    const cards = [
        {
            "id": 1,
            "title": "Novagram",
            "subtitle": "Social media app",
            "description": "Novagram is a social media Instagram clone app built using React and CSS for the front-end and Flask for the backend",
            "website": "https://novagram.vercel.app/",
            "github": "https://github.com/spiritnova/Novagram",
            "technologies": ["React", "Flask", "SQLAlchemy"],
        },
    ]
    return (
        <div className={styles.wrapper}>
            <p>view my work</p>
            <h1>Portfolio</h1>
            <div className={styles.cards}>
                {cards.map(card => (
                <Wrapper key={card.id}>
                    <div onClick={() => setShowModal(true)} className={styles.card}>
                        <div className={styles.slide}>
                            <div className={styles.content}>
                                <p>{card.subtitle}</p>
                                <h3>{card.title}</h3>
                            </div>
                        </div>

                        <div className={styles.slide2}>
                            <div className={styles.content2}>
                                <div className={styles.header}>
                                    <h2>Technologies used</h2>
                                </div>
                                <div className={styles.techs}>
                                    {card.technologies.map(tech => (
                                        <p key={tech}>{tech}</p>
                                    ))}
                                </div>
                                <div className={styles.view}>
                                    <button>View</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {showModal && 
                        <Modal 
                            onClose={() => setShowModal(false)}
                            title = {card.title}
                            description = {card.description}
                            website={card.website}
                            github={card.github}
                        />
                    }
                </Wrapper>
                ))}
            </div>
        </div>
    )
}