"use client";

import React from "react";
import styles from "./SEPAExplanation.module.css";

interface SEPAExplanationProps {
  onContinue: () => void;
  onBack: () => void;
}

export default function SEPAExplanation({ onContinue, onBack }: SEPAExplanationProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>SEPA Authorization</h1>
        <p className={styles.subtitle}>
          Secure automatic repayment for your financing
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.section}>
          <div className={styles.iconHeader}>
            <span className={styles.icon}>🔒</span>
            <h2 className={styles.sectionTitle}>Why SEPA Authorization?</h2>
          </div>
          <p className={styles.text}>
            SEPA (Single Euro Payments Area) authorization allows us to automatically collect
            repayment from your bank account when your invoice is paid or your loan matures.
            This ensures timely repayment and protects both you and the lender.
          </p>
        </div>

        <div className={styles.section}>
          <div className={styles.iconHeader}>
            <span className={styles.icon}>✓</span>
            <h2 className={styles.sectionTitle}>How SEPA Protects You</h2>
          </div>
          <ul className={styles.list}>
            <li>
              <strong>Fixed Amount:</strong> Only the exact repayment amount can be collected
            </li>
            <li>
              <strong>Fixed Date:</strong> Collection only happens on the agreed repayment date
            </li>
            <li>
              <strong>Transparent:</strong> You know exactly when and how much will be collected
            </li>
            <li>
              <strong>Secure:</strong> Your bank details are encrypted and stored securely
            </li>
            <li>
              <strong>Refund Rights:</strong> 8-week refund right under SEPA regulations
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <div className={styles.iconHeader}>
            <span className={styles.icon}>🔄</span>
            <h2 className={styles.sectionTitle}>How It Works</h2>
          </div>
          <div className={styles.flowDiagram}>
            <div className={styles.flowStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3>Provide Bank Details</h3>
                <p>Enter your IBAN and account holder name</p>
              </div>
            </div>
            <div className={styles.flowArrow}>→</div>
            <div className={styles.flowStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3>Sign Authorization</h3>
                <p>Confirm with your wallet signature</p>
              </div>
            </div>
            <div className={styles.flowArrow}>→</div>
            <div className={styles.flowStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3>Automatic Collection</h3>
                <p>Repayment collected on due date</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.infoBox}>
          <span className={styles.infoIcon}>ℹ️</span>
          <p className={styles.infoText}>
            Your bank details are encrypted using industry-leading encryption (ZAMA FHEVM)
            and stored securely on the blockchain. Only authorized parties can access them.
          </p>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={onBack}
          className={styles.backButton}
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onContinue}
          className={styles.continueButton}
        >
          Continue to Authorization →
        </button>
      </div>
    </div>
  );
}
