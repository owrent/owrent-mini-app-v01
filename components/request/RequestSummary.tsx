"use client";

import React from "react";
import { InvoiceFormData } from "./InvoiceForm";
import { LoanFormData } from "./LoanForm";
import styles from "./RequestSummary.module.css";

interface FeeBreakdown {
  platformFee: { percentage: number; amount: number };
  settlementFee?: { percentage: number; amount: number };
  totalFees: number;
  netAmount: number;
  repaymentAmount: number;
}

interface RequestSummaryProps {
  requestType: "factoring" | "loan";
  formData: InvoiceFormData | LoanFormData;
  uploadedFile?: File | null;
  onConfirm: () => void;
  onBack: () => void;
}

export default function RequestSummary({
  requestType,
  formData,
  uploadedFile,
  onConfirm,
  onBack,
}: RequestSummaryProps) {
  // Calculate fees
  const calculateFees = (): FeeBreakdown => {
    const amount = requestType === "factoring"
      ? parseFloat((formData as InvoiceFormData).amount)
      : parseFloat((formData as LoanFormData).loanAmount);

    const platformFeeRate = 0.005; // 0.5%
    const platformFee = amount * platformFeeRate;

    const settlementFeeRate = requestType === "factoring" ? 0.001 : 0; // 0.1% for factoring
    const settlementFee = amount * settlementFeeRate;

    const totalFees = platformFee + settlementFee;
    const netAmount = amount - totalFees;
    const repaymentAmount = amount;

    return {
      platformFee: {
        percentage: platformFeeRate * 100,
        amount: platformFee,
      },
      settlementFee: settlementFee > 0 ? {
        percentage: settlementFeeRate * 100,
        amount: settlementFee,
      } : undefined,
      totalFees,
      netAmount,
      repaymentAmount,
    };
  };

  const fees = calculateFees();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Review Your Request</h2>
        <p className={styles.subtitle}>
          Please review all details before proceeding to SEPA authorization
        </p>
      </div>

      <div className={styles.summaryCard}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Request Type</h3>
          <div className={styles.badge}>
            {requestType === "factoring" ? "💰 Invoice Factoring" : "🏦 Short-Term Loan"}
          </div>
        </div>

        {uploadedFile && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Uploaded Document</h3>
            <div className={styles.fileInfo}>
              <span className={styles.fileIcon}>📄</span>
              <div>
                <div className={styles.fileName}>{uploadedFile.name}</div>
                <div className={styles.fileSize}>
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
            </div>
          </div>
        )}

        {requestType === "factoring" ? (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Invoice Details</h3>
            <div className={styles.detailsGrid}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Invoice Number:</span>
                <span className={styles.detailValue}>
                  {(formData as InvoiceFormData).invoiceNumber}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Amount:</span>
                <span className={styles.detailValue}>
                  €{parseFloat((formData as InvoiceFormData).amount).toFixed(2)}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Invoice Date:</span>
                <span className={styles.detailValue}>
                  {new Date((formData as InvoiceFormData).invoiceDate).toLocaleDateString()}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Due Date:</span>
                <span className={styles.detailValue}>
                  {new Date((formData as InvoiceFormData).dueDate).toLocaleDateString()}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Debtor:</span>
                <span className={styles.detailValue}>
                  {(formData as InvoiceFormData).debtorName}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Loan Details</h3>
            <div className={styles.detailsGrid}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Loan Amount:</span>
                <span className={styles.detailValue}>
                  €{parseFloat((formData as LoanFormData).loanAmount).toFixed(2)}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Duration:</span>
                <span className={styles.detailValue}>
                  {(formData as LoanFormData).duration} days
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Invoice Due Date:</span>
                <span className={styles.detailValue}>
                  {new Date((formData as LoanFormData).invoiceDueDate).toLocaleDateString()}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Purpose:</span>
                <span className={styles.detailValue}>
                  {(formData as LoanFormData).purpose}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Fee Breakdown</h3>
          <div className={styles.feeBreakdown}>
            <div className={styles.feeRow}>
              <span className={styles.feeLabel}>
                Platform Fee ({fees.platformFee.percentage}%)
              </span>
              <span className={styles.feeValue}>
                €{fees.platformFee.amount.toFixed(2)}
              </span>
            </div>
            {fees.settlementFee && (
              <div className={styles.feeRow}>
                <span className={styles.feeLabel}>
                  Settlement Fee ({fees.settlementFee.percentage}%)
                </span>
                <span className={styles.feeValue}>
                  €{fees.settlementFee.amount.toFixed(2)}
                </span>
              </div>
            )}
            <div className={`${styles.feeRow} ${styles.totalFees}`}>
              <span className={styles.feeLabel}>Total Fees</span>
              <span className={styles.feeValue}>€{fees.totalFees.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Payment Summary</h3>
          <div className={styles.paymentSummary}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>
                {requestType === "factoring" ? "Invoice Amount" : "Loan Amount"}
              </span>
              <span className={styles.summaryValue}>
                €{(requestType === "factoring"
                  ? parseFloat((formData as InvoiceFormData).amount)
                  : parseFloat((formData as LoanFormData).loanAmount)
                ).toFixed(2)}
              </span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Less: Total Fees</span>
              <span className={styles.summaryValue}>-€{fees.totalFees.toFixed(2)}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.netAmount}`}>
              <span className={styles.summaryLabel}>You Will Receive</span>
              <span className={styles.summaryValue}>€{fees.netAmount.toFixed(2)}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.repaymentAmount}`}>
              <span className={styles.summaryLabel}>Total Repayment</span>
              <span className={styles.summaryValue}>€{fees.repaymentAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className={styles.infoBox}>
          <span className={styles.infoIcon}>ℹ️</span>
          <p className={styles.infoText}>
            By continuing, you agree to proceed with SEPA authorization for automatic repayment.
            All sensitive data will be encrypted and stored securely on-chain.
          </p>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button type="button" onClick={onBack} className={styles.backButton}>
          ← Back
        </button>
        <button type="button" onClick={onConfirm} className={styles.confirmButton}>
          Confirm and Continue to SEPA →
        </button>
      </div>
    </div>
  );
}
