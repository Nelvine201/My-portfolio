type SectionProps = {
  id: string;
  number?: string;
  title: string;
  children: React.ReactNode;
};

export function Section({ id, number, title, children }: SectionProps) {
  return (
    <section id={id} className="section-shell" aria-labelledby={`${id}-title`}>
      <div className="section-heading">
        {number && <span className="section-number">{number}</span>}
        <h2 id={`${id}-title`} className="section-title">{title}</h2>
      </div>
      {children}
    </section>
  );
}
