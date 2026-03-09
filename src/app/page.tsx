import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>ATS Resume Generator</h1>
        <p>Your Master Profile is the single source of truth.</p>
      </header>
      <main className={styles.main}>
        <div className={styles.card}>
          <h2>Master Profile</h2>
          <p>Manage your core details, skills, and experience bullet bank.</p>
          <a href="/profile" className={styles.btn}>Edit Profile</a>
        </div>
        <div className={styles.card}>
          <h2>Generate Resume</h2>
          <p>Paste a job description and let AI tailor your resume instantly.</p>
          <a href="/generate" className={styles.btnPrimary}>New Resume</a>
        </div>
      </main>
    </div>
  );
}
