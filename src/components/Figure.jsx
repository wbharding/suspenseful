export default function Figure({ src, alt, caption }) {
  return (
    <figure className="figure">
      <div className="figure__frame">
        <img src={src} alt={alt} />
      </div>
      {caption ? <figcaption className="figure__caption">{caption}</figcaption> : null}
    </figure>
  )
}
