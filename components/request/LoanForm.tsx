"use client";

import React, { useState } from "react";
// import React, { useState, useEffect } from "react";
import { calculateFees } from "../../services/fees/feeCalculator";
import FeeBreakdown from "../fees/FeeBreakdown";
import styles from "./LoanForm.module.css";

export interface LoanFormData {
  loanAmount: string;
  duration: string;
  invoiceDueDate: string;
  purpose: string;
  collateralDescription: string;
}

interface LoanFormProps {
  onSubmit: (data: LoanFormData) => void;
  onBack?: () => void;
}

export default function LoanForm({ onSubmit, onBack }: LoanFormProps) {
  const [formData, setFormData] = useState<LoanFormData>({
    loanAmount: "",
    duration: "",
    invoiceDueDate: "",
    purpose: "",
    collateralDescription: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LoanFormData, string>>>({});
  const [showFees, setShowFees] = useState(false);

  // Calculate fees in real-time
  const fees = formData.loanAmount && formData.duration && 
    parseFloat(formData.loanAmount) > 0 && parseInt(formData.duration) > 0
    ? calculateFees(parseFloat(formData.loanAmount), "loan", parseInt(formData.duration))
    : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof LoanFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Show fees when amount and duration are entered
    if ((name === "loanAmount" || name === "duration") && 
        parseFloat(formData.loanAmount || value) > 0 && 
        parseInt(formData.duration || value) > 0) {
      setShowFees(true);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LoanFormData, string>> = {};

    if (!formData.loanAmount.trim()) {
      newErrors.loanAmount = "Loan amount is required";
    } else if (parseFloat(formData.loanAmount) <= 0) {
      newErrors.loanAmount = "Amount must be greater than 0";
    } else if (isNaN(parseFloat(formData.loanAmount))) {
      newErrors.loanAmount = "Amount must be a valid number";
    }

    if (!formData.duration.trim()) {
      newErrors.duration = "Duration is required";
    } else if (parseInt(formData.duration) <= 0) {
      newErrors.duration = "Duration must be greater than 0";
    } else if (parseInt(formData.duration) > 30) {
      newErrors.duration = "Duration cannot exceed 30 days";
    } else if (isNaN(parseInt(formData.duration))) {
      newErrors.duration = "Duration must be a valid number";
    }

    if (!formData.invoiceDueDate) {
      newErrors.invoiceDueDate = "Invoice due date is required";
    } else if (new Date(formData.invoiceDueDate) <= new Date()) {
      newErrors.invoiceDueDate = "Due date must be in the future";
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = "Purpose is required";
    }

    if (!formData.collateralDescription.trim()) {
      newErrors.collateralDescription = "Collateral description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Loan Request Details</h2>
        <p className={styles.subtitle}>
          Provide information about your short-term loan request
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="loanAmount" className={styles.label}>
              Loan Amount (€) *
            </label>
            <input
              type="number"
              id="loanAmount"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              className={`${styles.input} ${errors.loanAmount ? styles.inputError : ""}`}
              placeholder="8000.00"
              step="0.01"
              min="0"
            />
            {errors.loanAmount && (
              <span className={styles.errorText}>{errors.loanAmount}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="duration" className={styles.label}>
              Duration (days) *
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className={`${styles.input} ${errors.duration ? styles.inputError : ""}`}
              placeholder="14"
              min="1"
              max="30"
            />
            {errors.duration && (
              <span className={styles.errorText}>{errors.duration}</span>
            )}
            <span className={styles.helpText}>Maximum 30 days</span>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="invoiceDueDate" className={styles.label}>
              Invoice Due Date *
            </label>
            <input
              type="date"
              id="invoiceDueDate"
              name="invoiceDueDate"
              value={formData.invoiceDueDate}
              onChange={handleChange}
              className={`${styles.input} ${errors.invoiceDueDate ? styles.inputError : ""}`}
            />
            {errors.invoiceDueDate && (
              <span className={styles.errorText}>{errors.invoiceDueDate}</span>
            )}
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="purpose" className={styles.label}>
              Loan Purpose *
            </label>
            <textarea
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className={`${styles.textarea} ${errors.purpose ? styles.inputError : ""}`}
              placeholder="Describe why you need this loan..."
              rows={3}
            />
            {errors.purpose && (
              <span className={styles.errorText}>{errors.purpose}</span>
            )}
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="collateralDescription" className={styles.label}>
              Collateral Description *
            </label>
            <textarea
              id="collateralDescription"
              name="collateralDescription"
              value={formData.collateralDescription}
              onChange={handleChange}
              className={`${styles.textarea} ${errors.collateralDescription ? styles.inputError : ""}`}
              placeholder="Describe the invoice or asset backing this loan..."
              rows={3}
            />
            {errors.collateralDescription && (
              <span className={styles.errorText}>{errors.collateralDescription}</span>
            )}
          </div>
        </div>

        {showFees && fees && (
          <div className={styles.feeSection}>
            <FeeBreakdown fees={fees} requestType="loan" />
          </div>
        )}

        <div className={styles.buttonGroup}>
          {onBack && (
            <button type="button" onClick={onBack} className={styles.backButton}>
              ← Back
            </button>
          )}
          <button type="submit" className={styles.submitButton}>
            Continue to Summary →
          </button>
        </div>
      </form>
    </div>
  );
}
