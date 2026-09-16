export default function Stat({ value, label }) {
  return (
    <div className="stat">
      <p className="stat__value">{value}</p>
      <p className="stat__label">{label}</p>
    </div>
  )
}

export function StatRow({ stats }) {
  return (
    <div className="stat-row">
      {stats.map((stat) => (
        <Stat key={stat.label} value={stat.value} label={stat.label} />
      ))}
    </div>
  )
}
