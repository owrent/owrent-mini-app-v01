import styles from "./OnboardingScreen.module.css";

export default function SEPAExplainer() {
  return (
    <div className={styles.screen}>
      <div className={styles.icon}>🏦</div>
      <h1 className={styles.title}>SEPA Authorization</h1>
      <p className={styles.description}>
        Automatic repayment via SEPA ensures smooth transactions and protects both
        parties.
      </p>

      <div className={styles.flowContainer}>
        <div className={styles.flowStep}>
          <div className={styles.flowNumber}>1</div>
          <div className={styles.flowContent}>
            <h3 className={styles.flowTitle}>You Authorize</h3>
            <p className={styles.flowText}>
              Provide your IBAN and authorize automatic repayment on the due date.
            </p>
          </div>
        </div>

        <div className={styles.flowArrow}>↓</div>

        <div className={styles.flowStep}>
          <div className={styles.flowNumber}>2</div>
          <div className={styles.flowContent}>
            <h3 className={styles.flowTitle}>Encrypted Storage</h3>
            <p className={styles.flowText}>
              Your SEPA details are encrypted and stored securely on-chain.
            </p>
          </div>
        </div>

        <div className={styles.flowArrow}>↓</div>

        <div className={styles.flowStep}>
          <div className={styles.flowNumber}>3</div>
          <div className={styles.flowContent}>
            <h3 className={styles.flowTitle}>Automatic Repayment</h3>
            <p className={styles.flowText}>
              On the due date, the exact amount is automatically debited from your
              account.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.securityNote}>
        <strong>🔒 Your protection:</strong> SEPA mandates are regulated by EU law
        and can be cancelled at any time through your bank.
      </div>
    </div>
  );
}
