function StatsCard({ title, value }) {
  return (
    <article className="stats-card">

      <div className="stats-card-top">
        <span className="stats-card-label">
          {title}
        </span>

        <span className="stats-card-dot" />
      </div>

      <h2>
        {value}
      </h2>

      <p className="stats-card-caption">
        ApexGear inventory
      </p>

    </article>
  );
}

export default StatsCard;