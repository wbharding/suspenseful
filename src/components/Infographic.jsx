import arcDiagram from '../assets/arc.svg'
import { content } from '../data/content.js'
import { BeatList } from './Beat.jsx'
import Callout from './Callout.jsx'
import Figure from './Figure.jsx'
import Section from './Section.jsx'
import { StatRow } from './Stat.jsx'

export default function Infographic() {
  const { sections } = content

  return (
    <article className="page">
      <header className="masthead">
        <div className="wrap">
          <p className="masthead__kicker">
            <span>{content.kicker}</span>
            <span>{content.issue}</span>
          </p>
          <h1 className="masthead__title">{content.title}</h1>
          <p className="masthead__lede">{content.lede}</p>
        </div>
      </header>

      <Section
        id="form"
        kicker={sections.build.kicker}
        title={sections.build.title}
      >
        <div className="stack">
          <p className="section__body">{sections.build.body}</p>
          <StatRow stats={content.stats} />
        </div>
      </Section>

      <Section
        id="shape"
        tone="ink"
        kicker={sections.arc.kicker}
        title={sections.arc.title}
      >
        <div className="stack">
          <p className="section__body">{sections.arc.body}</p>
          <Figure
            src={arcDiagram}
            alt="A rising tension curve that climbs slowly, spikes at a climax, then falls."
            caption="Sample diagram. Replace src/assets/arc.svg with your own illustration."
          />
          <Callout>{content.callout}</Callout>
        </div>
      </Section>

      <Section
        id="sequence"
        kicker={sections.beats.kicker}
        title={sections.beats.title}
      >
        <div className="stack">
          <p className="section__body">{sections.beats.body}</p>
          <BeatList beats={content.beats} />
        </div>
      </Section>

      <footer className="colophon">
        <div className="wrap">
          Built as static HTML, CSS, and JavaScript. Preview with{' '}
          <code>npm run preview</code>, deploy with <code>npm run deploy</code>.
        </div>
      </footer>
    </article>
  )
}
