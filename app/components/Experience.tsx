import { data } from "../utils/data/work";

export default function Experience() {
  return (
    <section className="flex flex-col gap-y-6">
      <h2 className="font-semibold text-sm">Experience</h2>
      {data.map(({ company, role, startYear, endYear, description }, index) => (
        <div className="text-sm " key={index + 1}>
          <div>
            <span className="text-xs">{role}</span>
          </div>
          <span className="font-medium">{company}</span>
          <span className="ml-2 opacity-65 text-xs">
            {startYear} - {endYear}
          </span>
          <p className="opacity-65">{description}</p>
        </div>
      ))}
    </section>
  );
}
