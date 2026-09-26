type SectionProps = {
  id: string;
  number?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ id, number, title, children, className }: SectionProps) {
  return (
    <section id={id} className={`section-shell ${className ?? ""}`} aria-labelledby={`${id}-title`}>
      <div className="section-heading">
        {number && <span className="section-number">{number}</span>}
        <h2 id={`${id}-title`} className="section-title">{title}</h2>
      </div>
      {children}
    </section>
  );
}
