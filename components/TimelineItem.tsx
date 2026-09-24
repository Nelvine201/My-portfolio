type TimelineItemProps = {
  period: string;
  title: string;
  organization: string;
  description: string;
};

export function TimelineItem({ period, title, organization, description }: TimelineItemProps) {
  return (
    <article className="timeline-item">
      <span className="timeline-period">{period}</span>
      <div>
        <h3>{title}</h3>
        <p className="timeline-org">{organization}</p>
        <p>{description}</p>
      </div>
    </article>
  );
}
