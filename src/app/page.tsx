import Link from "next/link";
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
          <h2>1. Master Profile</h2>
          <p>Manage your core details, predefined skills, and full experience bullet bank manually.</p>
          <Link href="/profile" className={styles.btn}>Edit Profile</Link>
        </div>
        <div className={styles.card}>
          <h2>2. Job Matcher</h2>
          <p>Extract ATS keywords from job descriptions and generate the optimized JSON mapping locally.</p>
          <Link href="/match" className={styles.btnPrimary}>Analyze Job</Link>
        </div>
        <div className={styles.card} style={{ transform: "rotate(1deg)", background: "var(--bg-paper)" }}>
          <h2>3. Export PDF</h2>
          <p>Paste the optimized JSON to render and print the pixel-perfect minimalist PDF document.</p>
          <Link href="/generate" className={styles.btn}>Render Resume</Link>
        </div>
      </main>
    </div>
  );
}
