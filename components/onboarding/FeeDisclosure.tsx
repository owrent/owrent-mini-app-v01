import styles from "./OnboardingScreen.module.css";

export default function FeeDisclosure() {
  return (
    <div className={styles.screen}>
      <div className={styles.icon}>💵</div>
      <h1 className={styles.title}>Transparent Fee Structure</h1>
      <p className={styles.description}>
        No hidden fees. Here&apos;s exactly what you&apos;ll pay for our service.
      </p>

      <div className={styles.feeTable}>
        <div className={styles.feeRow}>
          <div className={styles.feeLabel}>
            <strong>Platform Fee</strong>
            <span className={styles.feeDescription}>
              For processing and attestation
            </span>
          </div>
          <div className={styles.feeValue}>0.5%</div>
        </div>

        <div className={styles.feeRow}>
          <div className={styles.feeLabel}>
            <strong>Settlement Fee</strong>
            <span className={styles.feeDescription}>
              For factoring transactions only
            </span>
          </div>
          <div className={styles.feeValue}>0.1%</div>
        </div>

        <div className={styles.feeDivider} />

        <div className={styles.feeRow}>
          <div className={styles.feeLabel}>
            <strong>Total Fees</strong>
            <span className={styles.feeDescription}>Maximum you&apos;ll pay</span>
          </div>
          <div className={styles.feeValue}>
            <strong>0.6%</strong>
          </div>
        </div>
      </div>

      <div className={styles.exampleBox}>
        <h3 className={styles.exampleTitle}>Example</h3>
        <p className={styles.exampleText}>
          For a €10,000 invoice with 5% discount:
        </p>
        <ul className={styles.exampleList}>
          <li>Invoice amount: €10,000</li>
          <li>Discount (5%): -€500</li>
          <li>Platform fee (0.5%): -€50</li>
          <li>Settlement fee (0.1%): -€10</li>
          <li className={styles.exampleTotal}>
            <strong>You receive: €9,440</strong>
          </li>
        </ul>
      </div>

      <div className={styles.guaranteeNote}>
        ✨ <strong>Our guarantee:</strong> You&apos;ll see the exact fees before
        confirming any transaction.
      </div>
    </div>
  );
}
