export default function Beat({ title, copy }) {
  return (
    <article className="beat">
      <h3 className="beat__title">{title}</h3>
      <p className="beat__copy">{copy}</p>
    </article>
  )
}

export function BeatList({ beats }) {
  return (
    <div className="beats">
      {beats.map((beat) => (
        <Beat key={beat.title} title={beat.title} copy={beat.copy} />
      ))}
    </div>
  )
}
