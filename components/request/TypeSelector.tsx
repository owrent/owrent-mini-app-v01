import React from "react";
import styles from "./TypeSelector.module.css";

interface TypeSelectorProps {
  selectedType: "factoring" | "loan" | null;
  onSelectType: (type: "factoring" | "loan") => void;
}

export default function TypeSelector({ selectedType, onSelectType }: TypeSelectorProps) {
  return (
    <div className={styles.container}>
      {/* Factoring Card */}
      <div
        className={`${styles.card} ${selectedType === "factoring" ? styles.selected : ""}`}
        onClick={() => onSelectType("factoring")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onSelectType("factoring");
          }
        }}
      >
        <div className={styles.cardHeader}>
          <div className={styles.icon}>💰</div>
          <h2 className={styles.cardTitle}>Invoice Factoring</h2>
        </div>
        
        <p className={styles.cardDescription}>
          Sell your invoice at a discount for immediate cash
        </p>

        <div className={styles.rateInfo}>
          <div className={styles.rateLabel}>Typical Discount Rate</div>
          <div className={styles.rateValue}>2-10%</div>
        </div>

        <ul className={styles.features}>
          <li>✓ Immediate payment</li>
          <li>✓ No debt on your books</li>
          <li>✓ Transfer payment risk</li>
          <li>✓ Simple one-time transaction</li>
        </ul>

        <div className={styles.learnMore}>
          Learn More →
        </div>
      </div>

      {/* Loan Card */}
      <div
        className={`${styles.card} ${selectedType === "loan" ? styles.selected : ""}`}
        onClick={() => onSelectType("loan")}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onSelectType("loan");
          }
        }}
      >
        <div className={styles.cardHeader}>
          <div className={styles.icon}>🏦</div>
          <h2 className={styles.cardTitle}>Short-Term Loan</h2>
        </div>
        
        <p className={styles.cardDescription}>
          Borrow against your invoice until payment is received
        </p>

        <div className={styles.rateInfo}>
          <div className={styles.rateLabel}>Typical Interest Rate</div>
          <div className={styles.rateValue}>Based on duration ≤30 days</div>
        </div>

        <ul className={styles.features}>
          <li>✓ Keep invoice ownership</li>
          <li>✓ Flexible repayment</li>
          <li>✓ Maintain customer relationships</li>
          <li>✓ Short-term financing</li>
        </ul>

        <div className={styles.learnMore}>
          Learn More →
        </div>
      </div>
    </div>
  );
}
