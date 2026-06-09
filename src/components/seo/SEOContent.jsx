/**
 * Visually-hidden but crawler-readable content.
 * Helps search engines understand the page even though most copy
 * is inside heavily-animated components.
 *
 * Uses the standard "sr-only" pattern so screen readers also benefit.
 */
export default function SEOContent() {
  return (
    <div
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0,0,0,0)',
        whiteSpace: 'nowrap',
        border: 0,
      }}
      aria-hidden="false"
    >
      <h1>Gurupada Nayak</h1>
      <p>Java Developer · MCA Graduate · Backend Engineer</p>
      <h2>About Gurupada Nayak</h2>
      <p>
        Gurupada Nayak is a Java Developer currently pursuing Master of
        Computer Applications (MCA) at Berhampur University, Odisha, India,
        with a CGPA of 8.6 and ranked among the top 10% of his batch.
      </p>
      <p>
        He specializes in backend development with Java, Spring Boot, Spring
        Data JPA, REST APIs, Hibernate, JDBC, MySQL, PostgreSQL, and has
        exposure to MongoDB and Redis. He is also actively learning AI/ML
        with Python, NumPy, Pandas, Scikit-learn, and TensorFlow.
      </p>
      <h3>Projects by Gurupada Nayak</h3>
      <ul>
        <li>
          <strong>Suraag</strong> — A secure, offline-first music streaming
          platform built with Kotlin, Spring Boot, JWT authentication, and AES
          encryption. Available on Android at suraagmusic.in.
        </li>
        <li>
          <strong>CBCT Allocation System</strong> — A first-come, first-served
          student seat allocation engine built with Java, Spring Boot, Spring
          Data JPA, MySQL, and Apache POI.
        </li>
        <li>
          <strong>Text-to-Speech Engine</strong> — A Java application that reads
          smart commands from Excel files and synthesizes natural voice output
          via the Google Cloud Text-to-Speech API.
        </li>
      </ul>
      <h3>Education</h3>
      <ul>
        <li>
          Master of Computer Applications (MCA) — Berhampur University,
          Berhampur, Odisha, India (2024–Present)
        </li>
        <li>
          Graduation, General Legal Studies — FM Autonomous College, Balasore,
          Odisha, India (2019–2022)
        </li>
      </ul>
      <h3>Certifications</h3>
      <ul>
        <li>Fundamentals of Object-Oriented Programming — NPTEL (2025)</li>
        <li>Java with DSA and System Design 2.0 — PW Skills (2024)</li>
        <li>100% Job Ready Java Full Stack Live Course — Code for Success (2024)</li>
      </ul>
      <h3>Contact</h3>
      <p>
        Email: gurupadanayak@hotmail.com · Phone: +91 7735287196 ·
        GitHub: github.com/Guru1817 ·
        LinkedIn: linkedin.com/in/gurupada-nayak-71724b25b
      </p>
    </div>
  );
}
