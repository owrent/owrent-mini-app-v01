"use client";

import React, { useState } from "react";
import { SEPAFormData } from "./SEPAForm";
import styles from "./SEPAConfirmation.module.css";

interface SEPAConfirmationProps {
  sepaData: SEPAFormData;
  onConfirm: () => void;
  onBack: () => void;
}

export default function SEPAConfirmation({
  sepaData,
  onConfirm,
  onBack,
}: SEPAConfirmationProps) {
  const [consentChecked, setConsentChecked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock repayment data (in real app, this would come from previous steps)
  const repaymentAmount = 9500.00;
  const repaymentDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  const mandateReference = `OWR-${Date.now().toString(36).toUpperCase()}`;

  const handleConfirm = async () => {
    if (!consentChecked) {
      return;
    }

    setIsProcessing(true);
    
    // Simulate wallet signature request
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onConfirm();
  };

  const maskIBAN = (iban: string): string => {
    const clean = iban.replace(/\s/g, "");
    if (clean.length <= 8) return iban;
    
    const start = clean.slice(0, 4);
    const end = clean.slice(-4);
    const masked = "*".repeat(clean.length - 8);
    
    return `${start} ${masked.match(/.{1,4}/g)?.join(" ")} ${end}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Confirm SEPA Authorization</h2>
        <p className={styles.subtitle}>
          Review and confirm your automatic repayment authorization
        </p>
      </div>

      <div className={styles.card}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Bank Account</h3>
          <div className={styles.detailsGrid}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Account Holder:</span>
              <span className={styles.detailValue}>{sepaData.accountHolder}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>IBAN:</span>
              <span className={styles.detailValue}>{maskIBAN(sepaData.iban)}</span>
            </div>
            {sepaData.bic && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>BIC:</span>
                <span className={styles.detailValue}>{sepaData.bic}</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Repayment Details</h3>
          <div className={styles.repaymentBox}>
            <div className={styles.repaymentRow}>
              <span className={styles.repaymentLabel}>Amount to be collected:</span>
              <span className={styles.repaymentValue}>
                €{repaymentAmount.toFixed(2)}
              </span>
            </div>
            <div className={styles.repaymentRow}>
              <span className={styles.repaymentLabel}>Collection date:</span>
              <span className={styles.repaymentValue}>
                {repaymentDate.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className={styles.repaymentRow}>
              <span className={styles.repaymentLabel}>Mandate reference:</span>
              <span className={styles.repaymentValue}>{mandateReference}</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Your Rights</h3>
          <ul className={styles.rightsList}>
            <li>You can request a refund within 8 weeks of the debit</li>
            <li>You can cancel this mandate at any time before the collection date</li>
            <li>Only the exact amount shown will be collected</li>
            <li>Collection will only occur on the specified date</li>
          </ul>
        </div>

        <div className={styles.consentBox}>
          <label className={styles.consentLabel}>
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              className={styles.checkbox}
            />
            <span className={styles.consentText}>
              I authorize Owrent to collect €{repaymentAmount.toFixed(2)} from my bank account
              on {repaymentDate.toLocaleDateString("en-GB")}. I understand my rights under SEPA
              regulations and confirm that all information provided is accurate.
            </span>
          </label>
        </div>

        <div className={styles.signatureBox}>
          <span className={styles.signatureIcon}>✍️</span>
          <div>
            <h4 className={styles.signatureTitle}>Wallet Signature Required</h4>
            <p className={styles.signatureText}>
              You will be asked to sign this authorization with your wallet to confirm.
              This creates a cryptographic proof of your consent.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={onBack}
          className={styles.backButton}
          disabled={isProcessing}
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className={styles.confirmButton}
          disabled={!consentChecked || isProcessing}
        >
          {isProcessing ? (
            <>
              <span className={styles.spinner}></span>
              Processing...
            </>
          ) : (
            "Sign and Confirm →"
          )}
        </button>
      </div>
    </div>
  );
}
