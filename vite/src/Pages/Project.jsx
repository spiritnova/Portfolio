import styles from './Project.module.css'
import projects from '../api/projects.json'

import { Globe, ArrowLeft, ArrowRight } from 'lucide-react';
import { GitHubIcon } from '../Components/UI/BrandIcons';

import { Link, useParams } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react';
import useScrollReveal from '../Components/useScrollReveal';
import Error404 from '../Components/UI/Error404';
import Lightbox from '../Components/UI/Lightbox';
import technologies from './Technologies';

export default function Project() {
    const [lightboxIndex, setLightboxIndex] = useState(null)
    const ref = useRef(null)
    useScrollReveal(ref)

    const { id } = useParams()
    const projectIndex = projects.findIndex(project => project.id === Number(id))
    const item = projects[projectIndex]
    const previousProject = projects[projectIndex - 1]
    const nextProject = projects[projectIndex + 1]

    const closeLightbox = useCallback(() => setLightboxIndex(null), [])

    useEffect(() => {
        setLightboxIndex(null)
    }, [id])

    if(!item){
        return <Error404/>
    }

    const languages = technologies.filter(lang => item.technologies.includes(lang.title))
    const hasLinks = item.website || item.github || item.backend
    const images = item.Images || []

  return (
    <div className={styles.container} ref={ref}>
        <div className={styles.project}>
            <div className={styles.details} data-reveal>
                <Link to="/projects" className={styles.back}>
                    <ArrowLeft size="1em" aria-hidden="true" />
                    All projects
                </Link>

                {(item.type || item.subtitle) && (
                    <span className={styles.eyebrow}>{[item.type, item.subtitle].filter(Boolean).join(' · ')}</span>
                )}
                <h1>{item.title}</h1>
                <p className={styles.description}>{item.description}</p>

                {item.role && (
                    <div className={styles.section}>
                        <h2>My role</h2>
                        <p>{item.role}</p>
                    </div>
                )}

                {item.highlights && item.highlights.length > 0 && (
                    <div className={styles.section}>
                        <h2>Highlights</h2>
                        <ul>
                            {item.highlights.map(point => <li key={point}>{point}</li>)}
                        </ul>
                    </div>
                )}

                <div className={styles.section}>
                    <h2>Built with</h2>
                    <div className={styles.technologies}>
                        {languages.map(lang => (
                            <span className={styles.tech} key={lang.title}>
                                {lang.logo}
                                {lang.title}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={styles.links}>
                    {item.website && (
                        <a href={item.website} target="_blank" rel="noopener noreferrer" className={styles.primaryLink}>
                            <Globe size={20} aria-hidden="true" />
                            Visit live site
                        </a>
                    )}
                    {item.github && (
                        <a href={item.github} target="_blank" rel="noopener noreferrer" className={styles.secondaryLink}>
                            <GitHubIcon size={20} />
                            {item.backend ? 'Front-end code' : 'Source code'}
                        </a>
                    )}
                    {item.backend && (
                        <a href={item.backend} target="_blank" rel="noopener noreferrer" className={styles.secondaryLink}>
                            <GitHubIcon size={20} />
                            Back-end code
                        </a>
                    )}
                    {!hasLinks && <span className={styles.note}>Private project - no public links.</span>}
                </div>

                <div className={styles.navigation}>
                    {previousProject ? (
                        <Link to={`/projects/${previousProject.id}`} aria-label={`Previous project: ${previousProject.title}`}>
                            <ArrowLeft size="1em" aria-hidden="true" />
                            <span>
                                <small>Previous</small>
                                {previousProject.title}
                            </span>
                        </Link>
                    ) : <span />}
                    {nextProject ? (
                        <Link to={`/projects/${nextProject.id}`} className={styles.next} aria-label={`Next project: ${nextProject.title}`}>
                            <span>
                                <small>Next</small>
                                {nextProject.title}
                            </span>
                            <ArrowRight size="1em" aria-hidden="true" />
                        </Link>
                    ) : <span />}
                </div>
            </div>

            <div className={styles.images}>
                {images.map((image, index) => (
                    <button
                        className={`${styles.imageButton} ${index === 0 && images.length > 1 ? styles.hero : ''}`}
                        type="button"
                        aria-label={`View ${item.title} screenshot ${index + 1}`}
                        onClick={() => setLightboxIndex(index)}
                        key={image}
                        data-reveal
                    >
                        <img
                            src={`/assets/${image}`}
                            alt={`${item.title} screenshot ${index + 1}`}
                            loading={index === 0 ? 'eager' : 'lazy'}
                        />
                    </button>
                ))}
            </div>
        </div>

        {lightboxIndex !== null && (
            <Lightbox
                images={item.Images}
                index={lightboxIndex}
                basePath="/assets/"
                title={item.title}
                onClose={closeLightbox}
                onChange={setLightboxIndex}
            />
        )}
    </div>
  )
}
