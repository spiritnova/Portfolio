import Wrapper from '../Components/UI/Wrapper'
import styles from './Projects.module.css'

import cards from '../api/projects.json'
import { Link } from 'react-router-dom'

export default function Projects(){
    return (
        <div className={styles.wrapper}>
            <p>view my work</p>
            <h1>Portfolio</h1>
            <div className={styles.cards}>
                {cards.map(card => (
                <Wrapper key={card.id}>
                    <div className={styles.card}>
                        <div className={styles.content}>
                            <p>{card.subtitle}</p>
                            <h3>{card.title}</h3>
                        </div>
                        <div className={styles.links}>
                            <a href={card.github}>Github Repository</a>
                            <a href={card.website}>Live link</a>
                            <Link to={`/projects/${card.id}`}>More details</Link>
                        </div>
                    </div>
                </Wrapper>
                ))}
            </div>
        </div>
    )
}