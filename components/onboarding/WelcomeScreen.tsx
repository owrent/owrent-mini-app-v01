import styles from "./OnboardingScreen.module.css";

export default function WelcomeScreen() {
  return (
    <div className={styles.screen}>
      <div className={styles.icon}>💰</div>
      <h1 className={styles.title}>Welcome to Owrent</h1>
      <p className={styles.description}>
        Get instant liquidity for your invoices with transparent fees and secure
        on-chain attestations.
      </p>
      <div className={styles.features}>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>⚡</span>
          <span className={styles.featureText}>Instant liquidity</span>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>🔒</span>
          <span className={styles.featureText}>Secure attestations</span>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>💎</span>
          <span className={styles.featureText}>Transparent fees</span>
        </div>
      </div>
    </div>
  );
}
