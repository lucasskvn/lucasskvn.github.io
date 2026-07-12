const skills = [
  { name: 'Rust', level: 90, color: '#dea584' },
  { name: 'C', level: 85, color: '#a8b9cc' },
  { name: 'C++', level: 70, color: '#f34b7d' },
  { name: 'Python', level: 80, color: '#3572a5' },
  { name: 'TypeScript', level: 75, color: '#3178c6' },
  { name: 'Bash', level: 70, color: '#4eaa25' },
  { name: 'Docker', level: 75, color: '#2496ed' },
  { name: 'Nix', level: 65, color: '#7ebae4' },
  { name: 'Git', level: 85, color: '#f05032' },
  { name: 'React', level: 70, color: '#61dafb' },
  { name: 'SQL', level: 65, color: '#e38c00' },
  { name: 'Linux', level: 85, color: '#fcc624' },
];

export default function Skills() {
  return (
    <div className="skills-section">
      <div className="skills-grid">
        {skills.map(skill => (
          <div key={skill.name} className="skill-item">
            <div className="skill-header">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-level">{skill.level}%</span>
            </div>
            <div className="skill-bar-bg">
              <div
                className="skill-bar-fill"
                style={{
                  width: `${skill.level}%`,
                  background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
