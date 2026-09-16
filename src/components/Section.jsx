export default function Section({
  kicker,
  title,
  children,
  tone = 'paper',
  id,
}) {
  return (
    <section
      className={tone === 'ink' ? 'section section--ink' : 'section'}
      id={id}
    >
      <div className="wrap">
        <header className="section__header">
          {kicker ? <p className="section__kicker">{kicker}</p> : null}
          {title ? <h2 className="section__title">{title}</h2> : null}
        </header>
        {children}
      </div>
    </section>
  )
}
