import styles from "./OnboardingScreen.module.css";

export default function AttestationExplainer() {
  return (
    <div className={styles.screen}>
      <div className={styles.icon}>🛡️</div>
      <h1 className={styles.title}>Secure On-Chain Attestations</h1>
      <p className={styles.description}>
        Your financial data is protected with blockchain-based attestations that
        ensure privacy and security.
      </p>

      <div className={styles.benefitsContainer}>
        <div className={styles.benefit}>
          <div className={styles.benefitIcon}>🔐</div>
          <h3 className={styles.benefitTitle}>Encrypted Data</h3>
          <p className={styles.benefitText}>
            Your invoice amounts and SEPA details are encrypted on-chain. Only you
            and authorized parties can decrypt them.
          </p>
        </div>

        <div className={styles.benefit}>
          <div className={styles.benefitIcon}>✅</div>
          <h3 className={styles.benefitTitle}>Immutable Records</h3>
          <p className={styles.benefitText}>
            All transactions are recorded on the Base blockchain, creating a
            permanent and tamper-proof audit trail.
          </p>
        </div>

        <div className={styles.benefit}>
          <div className={styles.benefitIcon}>🎯</div>
          <h3 className={styles.benefitTitle}>Transparent Process</h3>
          <p className={styles.benefitText}>
            Track your request status in real-time and verify all details on the
            blockchain explorer.
          </p>
        </div>
      </div>
    </div>
  );
}
