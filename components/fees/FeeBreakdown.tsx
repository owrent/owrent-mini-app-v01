"use client";

import React, { useState } from "react";
import { FeeBreakdown as FeeBreakdownType } from "../../services/fees/feeCalculator";
import styles from "./FeeBreakdown.module.css";

interface FeeBreakdownProps {
  fees: FeeBreakdownType;
  requestType: "factoring" | "loan";
  showTooltips?: boolean;
}

export default function FeeBreakdown({
  fees,
  requestType,
  showTooltips = true,
}: FeeBreakdownProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const toggleTooltip = (tooltipId: string) => {
    setActiveTooltip(activeTooltip === tooltipId ? null : tooltipId);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Fee Breakdown</h3>
      
      <div className={styles.feeTable}>
        {/* Platform Fee */}
        <div className={styles.feeRow}>
          <div className={styles.feeLabel}>
            <span>Platform Fee</span>
            {showTooltips && (
              <button
                className={styles.tooltipButton}
                onClick={() => toggleTooltip("platform")}
                aria-label="Platform fee information"
                type="button"
              >
                ℹ️
              </button>
            )}
          </div>
          <div className={styles.feeValue}>
            <span className={styles.percentage}>
              {fees.platformFee.percentage}%
            </span>
            <span className={styles.amount}>
              €{fees.platformFee.amount.toFixed(2)}
            </span>
          </div>
        </div>
        {activeTooltip === "platform" && (
          <div className={styles.tooltip}>
            <p>
              The platform fee covers operational costs, security infrastructure,
              and customer support. This fee is charged once per transaction.
            </p>
          </div>
        )}

        {/* Settlement Fee (Factoring only) */}
        {fees.settlementFee && (
          <>
            <div className={styles.feeRow}>
              <div className={styles.feeLabel}>
                <span>Settlement Fee</span>
                {showTooltips && (
                  <button
                    className={styles.tooltipButton}
                    onClick={() => toggleTooltip("settlement")}
                    aria-label="Settlement fee information"
                    type="button"
                  >
                    ℹ️
                  </button>
                )}
              </div>
              <div className={styles.feeValue}>
                <span className={styles.percentage}>
                  {fees.settlementFee.percentage}%
                </span>
                <span className={styles.amount}>
                  €{fees.settlementFee.amount.toFixed(2)}
                </span>
              </div>
            </div>
            {activeTooltip === "settlement" && (
              <div className={styles.tooltip}>
                <p>
                  The settlement fee applies to cross-chain transactions (e.g., settling
                  in Litecoin). This covers blockchain transaction costs and ensures
                  secure atomic swaps.
                </p>
              </div>
            )}
          </>
        )}

        {/* Interest (Loan only) */}
        {fees.interestAmount !== undefined && fees.interestAmount > 0 && (
          <>
            <div className={styles.feeRow}>
              <div className={styles.feeLabel}>
                <span>Interest</span>
                {showTooltips && (
                  <button
                    className={styles.tooltipButton}
                    onClick={() => toggleTooltip("interest")}
                    aria-label="Interest information"
                    type="button"
                  >
                    ℹ️
                  </button>
                )}
              </div>
              <div className={styles.feeValue}>
                <span className={styles.amount}>
                  €{fees.interestAmount.toFixed(2)}
                </span>
              </div>
            </div>
            {activeTooltip === "interest" && (
              <div className={styles.tooltip}>
                <p>
                  Interest is calculated at 0.2% per day based on your loan duration.
                  This is competitive with traditional short-term lending rates.
                </p>
              </div>
            )}
          </>
        )}

        {/* Total Fees */}
        <div className={`${styles.feeRow} ${styles.totalRow}`}>
          <div className={styles.feeLabel}>
            <span>Total Fees</span>
          </div>
          <div className={styles.feeValue}>
            <span className={styles.amount}>
              €{fees.totalFees.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>
            {requestType === "factoring" ? "Invoice Amount" : "Loan Amount"}
          </span>
          <span className={styles.summaryValue}>
            €{(fees.netAmount + fees.totalFees).toFixed(2)}
          </span>
        </div>

        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Less: Total Fees</span>
          <span className={styles.summaryValue}>
            -€{fees.totalFees.toFixed(2)}
          </span>
        </div>

        <div className={`${styles.summaryRow} ${styles.netAmountRow}`}>
          <span className={styles.summaryLabel}>You Will Receive</span>
          <span className={styles.summaryValue}>
            €{fees.netAmount.toFixed(2)}
          </span>
        </div>

        <div className={`${styles.summaryRow} ${styles.repaymentRow}`}>
          <span className={styles.summaryLabel}>Total Repayment</span>
          <span className={styles.summaryValue}>
            €{fees.repaymentAmount.toFixed(2)}
          </span>
        </div>
      </div>

      <div className={styles.infoBox}>
        <span className={styles.infoIcon}>💡</span>
        <p className={styles.infoText}>
          {requestType === "factoring"
            ? "You receive the net amount immediately. The buyer will collect the full invoice amount from your customer."
            : "You receive the net amount immediately. You must repay the total repayment amount when your invoice is paid."}
        </p>
      </div>
    </div>
  );
}
