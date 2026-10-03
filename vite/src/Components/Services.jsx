import data from '../api/services.json'
import styles from './Services.module.css'

// colours for each planet's atmosphere, lit edge, orbit line and moon labels
const LOOKS = {
    violet: { atmo: 'rgba(139, 92, 246, 0.45)', rim: 'rgba(221, 214, 254, 0.9)', line: 'rgba(196, 181, 253, 0.22)', label: '#ede9fe', border: 'rgba(196, 181, 253, 0.3)', spin: '70s' },
    teal: { atmo: 'rgba(45, 212, 191, 0.4)', rim: 'rgba(204, 251, 241, 0.85)', line: 'rgba(153, 246, 228, 0.2)', label: '#ccfbf1', border: 'rgba(153, 246, 228, 0.3)', spin: '90s' },
    rose: { atmo: 'rgba(236, 72, 153, 0.38)', rim: 'rgba(252, 231, 243, 0.85)', line: 'rgba(249, 168, 212, 0.2)', label: '#fce7f3', border: 'rgba(249, 168, 212, 0.3)', spin: '80s' },
}

const ORBIT_SECONDS = 26

// the moons' orbit: a 300x80 ellipse tilted by `deg`. The tilt lives in the path itself
// (not a CSS rotate) so the moons can still slip behind and in front of the planet.
function orbitPath(deg){
    const r = deg * Math.PI / 180
    const dx = Math.cos(r) * 150
    const dy = Math.sin(r) * 150
    const a = `${(150 - dx).toFixed(1)} ${(40 - dy).toFixed(1)}`
    const b = `${(150 + dx).toFixed(1)} ${(40 + dy).toFixed(1)}`
    return `path('M ${a} A 150 40 ${deg} 1 1 ${b} A 150 40 ${deg} 1 1 ${a}')`
}

export default function Services(){
    return (
        <section className={styles.services} aria-labelledby="services-heading">
            <div className={styles.header} data-rise>
                <h2 id="services-heading" className={styles.eyebrow}>Services</h2>
                <p className={styles.intro}>{data.intro}</p>
            </div>

            <div className={styles.grid}>
                {data.services.map((service, s) => {
                    const look = LOOKS[service.planet]
                    const vars = {
                        '--atmo': look.atmo,
                        '--rim': look.rim,
                        '--line': look.line,
                        '--tilt': `${service.tilt}deg`,
                        '--path': orbitPath(service.tilt),
                    }
                    return (
                        <article className={styles.service} key={service.title} data-reveal>
                            <div className={styles.system} style={vars} aria-hidden="true">
                                {service.ring && <span className={`${styles.ring} ${styles.back}`}></span>}
                                <span className={`${styles.orbit} ${styles.back}`}></span>

                                <span className={styles.globe}>
                                    <span className={styles.surface}>
                                        <span className={styles.map} style={{ backgroundImage: `url(/planets/${service.planet}.webp)`, animationDuration: look.spin }}></span>
                                    </span>
                                    <span className={styles.shade}></span>
                                </span>

                                {service.ring && <span className={`${styles.ring} ${styles.front}`}></span>}
                                <span className={`${styles.orbit} ${styles.front}`}></span>

                                <span className={styles.moons}>
                                    {service.projects.map((project, i) => {
                                        // spread the moons evenly, and stagger each planet so they don't move in sync
                                        const delay = -((i / service.projects.length) + s * 0.3) * ORBIT_SECONDS
                                        return (
                                            <span className={styles.moon} key={project} style={{ animationDelay: `${delay}s, ${delay}s` }}>
                                                <span className={styles.moonDot}></span>
                                                <span className={styles.moonLabel} style={{ color: look.label, borderColor: look.border }}>{project}</span>
                                            </span>
                                        )
                                    })}
                                </span>
                            </div>

                            <div className={styles.text}>
                                <h3 className={styles.title}>{service.title}</h3>
                                <p className={styles.description}>{service.description}</p>
                                <p className={styles.srOnly}>Built for: {service.projects.join(', ')}</p>
                            </div>
                        </article>
                    )
                })}
            </div>
        </section>
    )
}
