import styles from "./OnboardingScreen.module.css";

export default function FactoringExplainer() {
  return (
    <div className={styles.screen}>
      <div className={styles.icon}>📊</div>
      <h1 className={styles.title}>Two Ways to Get Liquidity</h1>
      <p className={styles.description}>
        Choose the option that works best for your business needs.
      </p>

      <div className={styles.comparisonContainer}>
        <div className={styles.comparisonCard}>
          <h3 className={styles.comparisonTitle}>Invoice Factoring</h3>
          <p className={styles.comparisonDescription}>
            Sell your invoice at a discount and get paid immediately. You transfer
            ownership of the invoice to the buyer.
          </p>
          <div className={styles.comparisonHighlight}>
            <strong>Typical discount:</strong> 2-10%
          </div>
          <ul className={styles.comparisonList}>
            <li>✓ No repayment needed</li>
            <li>✓ Buyer assumes collection risk</li>
            <li>✓ Best for immediate cash needs</li>
          </ul>
        </div>

        <div className={styles.comparisonCard}>
          <h3 className={styles.comparisonTitle}>Short-Term Loan</h3>
          <p className={styles.comparisonDescription}>
            Borrow against your invoice and repay when your customer pays. You
            retain ownership of the invoice.
          </p>
          <div className={styles.comparisonHighlight}>
            <strong>Duration:</strong> Up to 30 days
          </div>
          <ul className={styles.comparisonList}>
            <li>✓ Keep invoice ownership</li>
            <li>✓ Flexible repayment</li>
            <li>✓ Build credit history</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
