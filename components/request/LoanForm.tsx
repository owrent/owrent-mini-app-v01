"use client";

import React, { useState, useEffect } from "react";
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
  const [calculatedInterest, setCalculatedInterest] = useState<number>(0);

  // Calculate interest based on duration
  useEffect(() => {
    const amount = parseFloat(formData.loanAmount);
    const days = parseInt(formData.duration);
    
    if (!isNaN(amount) && !isNaN(days) && amount > 0 && days > 0) {
      // Simple interest calculation: 0.2% per day (example rate)
      const dailyRate = 0.002;
      const interest = amount * dailyRate * days;
      setCalculatedInterest(interest);
    } else {
      setCalculatedInterest(0);
    }
  }, [formData.loanAmount, formData.duration]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof LoanFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
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

        {calculatedInterest > 0 && (
          <div className={styles.interestBox}>
            <div className={styles.interestRow}>
              <span className={styles.interestLabel}>Loan Amount:</span>
              <span className={styles.interestValue}>€{parseFloat(formData.loanAmount).toFixed(2)}</span>
            </div>
            <div className={styles.interestRow}>
              <span className={styles.interestLabel}>Duration:</span>
              <span className={styles.interestValue}>{formData.duration} days</span>
            </div>
            <div className={styles.interestRow}>
              <span className={styles.interestLabel}>Estimated Interest:</span>
              <span className={styles.interestValue}>€{calculatedInterest.toFixed(2)}</span>
            </div>
            <div className={`${styles.interestRow} ${styles.totalRow}`}>
              <span className={styles.interestLabel}>Total Repayment:</span>
              <span className={styles.interestValue}>
                €{(parseFloat(formData.loanAmount) + calculatedInterest).toFixed(2)}
              </span>
            </div>
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
