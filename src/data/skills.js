export const skillGroups = [
  {
    category: 'Languages',
    accent: 'cyan',
    items: [
      { name: 'Java', level: 'Advanced' },
      { name: 'Python', level: 'Intermediate' },
      { name: 'SQL', level: 'Intermediate' },
      { name: 'Kotlin', level: 'Intermediate' },
      { name: 'JavaScript', level: 'Basics' },
    ],
  },
  {
    category: 'Backend',
    accent: 'violet',
    items: [
      { name: 'Spring Boot', level: 'Intermediate' },
      { name: 'REST APIs', level: 'Advanced' },
      { name: 'JDBC', level: 'Advanced' },
      { name: 'Hibernate', level: 'Basics' },
      { name: 'Spring Data JPA', level: 'Intermediate' },
      { name: 'Microservices', level: 'Learning' },
    ],
  },
  {
    category: 'AI / ML',
    accent: 'amber',
    items: [
      { name: 'Python', level: 'Intermediate' },
      { name: 'NumPy', level: 'Intermediate' },
      { name: 'Pandas', level: 'Intermediate' },
      { name: 'Scikit-learn', level: 'Basics' },
      { name: 'TensorFlow', level: 'Basics' },
      { name: 'Model Integration', level: 'Learning' },
    ],
  },
  {
    category: 'Frontend',
    accent: 'cyan',
    items: [
      { name: 'HTML', level: 'Intermediate' },
      { name: 'CSS', level: 'Intermediate' },
      { name: 'Tailwind CSS', level: 'Intermediate' },
      { name: 'JavaScript', level: 'Basics' },
    ],
  },
  {
    category: 'Database',
    accent: 'violet',
    items: [
      { name: 'MySQL', level: 'Advanced' },
      { name: 'PostgreSQL', level: 'Intermediate' },
      { name: 'MongoDB', level: 'Basics' },
      { name: 'Redis', level: 'Basics' },
    ],
  },
  {
    category: 'DevOps & Cloud',
    accent: 'amber',
    items: [
      { name: 'Git', level: 'Advanced' },
      { name: 'Linux Basics', level: 'Learning' },
      { name: 'Docker', level: 'Exploring' },
      { name: 'CI/CD', level: 'Exploring' },
      { name: 'AWS Fundamentals', level: 'Exploring' },
    ],
  },
  {
    category: 'Tools',
    accent: 'cyan',
    items: [
      { name: 'GitHub', level: 'Advanced' },
      { name: 'Maven', level: 'Intermediate' },
      { name: 'IntelliJ IDEA', level: 'Advanced' },
      { name: 'Eclipse', level: 'Intermediate' },
      { name: 'Postman', level: 'Intermediate' },
      { name: 'VS Code', level: 'Advanced' },
    ],
  },
  {
    category: 'Concepts',
    accent: 'violet',
    items: [
      { name: 'OOP', level: 'Advanced' },
      { name: 'DSA', level: 'Intermediate' },
      { name: 'System Design', level: 'Learning' },
      { name: 'Backend Architecture', level: 'Intermediate' },
      { name: 'Debugging', level: 'Advanced' },
      { name: 'Unit Testing', level: 'Intermediate' },
    ],
  },
];

// Group descriptions for the redesigned skills section
export const groupDescriptions = {
  Languages: 'Core toolset for everything I build — backend services, scripts, and quick prototypes.',
  Backend: 'Where I spend most of my time. Designing clean, secure APIs and persistence layers.',
  'AI / ML': 'Exposure to ML fundamentals — actively learning to integrate intelligent features into backend services.',
  Frontend: 'Enough to ship full-stack work end-to-end. Comfortable with utility-first CSS.',
  Database: 'Relational by default, NoSQL where it fits. Care about indexing, schema, and query performance.',
  'DevOps & Cloud': 'Curious and just getting started — exploring cloud fundamentals, containers, and CI/CD basics alongside my backend work.',
  Tools: 'Daily drivers that keep my workflow fast and focused.',
  Concepts: 'The fundamentals I keep sharpening — they pay back compound interest over a career.',
};
