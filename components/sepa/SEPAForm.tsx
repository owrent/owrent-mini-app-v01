"use client";

import React, { useState } from "react";
import styles from "./SEPAForm.module.css";

export interface SEPAFormData {
  accountHolder: string;
  iban: string;
  bic: string;
}

interface SEPAFormProps {
  onSubmit: (data: SEPAFormData) => void;
  onBack: () => void;
}

export default function SEPAForm({ onSubmit, onBack }: SEPAFormProps) {
  const [formData, setFormData] = useState<SEPAFormData>({
    accountHolder: "",
    iban: "",
    bic: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SEPAFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format IBAN with spaces
    let formattedValue = value;
    if (name === "iban") {
      formattedValue = value.replace(/\s/g, "").toUpperCase();
      formattedValue = formattedValue.match(/.{1,4}/g)?.join(" ") || formattedValue;
    }
    
    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[name as keyof SEPAFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateIBAN = (iban: string): boolean => {
    // Remove spaces
    const cleanIBAN = iban.replace(/\s/g, "");
    
    // Check length (15-34 characters)
    if (cleanIBAN.length < 15 || cleanIBAN.length > 34) {
      return false;
    }
    
    // Check format (2 letters, 2 digits, then alphanumeric)
    const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/;
    if (!ibanRegex.test(cleanIBAN)) {
      return false;
    }
    
    // Perform checksum validation (mod 97)
    const rearranged = cleanIBAN.slice(4) + cleanIBAN.slice(0, 4);
    const numericIBAN = rearranged.replace(/[A-Z]/g, (char) => 
      (char.charCodeAt(0) - 55).toString()
    );
    
    // Calculate mod 97
    let remainder = numericIBAN;
    while (remainder.length > 2) {
      const block = remainder.slice(0, 9);
      remainder = (parseInt(block, 10) % 97).toString() + remainder.slice(9);
    }
    
    return parseInt(remainder, 10) % 97 === 1;
  };

  const validateBIC = (bic: string): boolean => {
    // BIC format: 8 or 11 characters (4 letters, 2 letters, 2 alphanumeric, optional 3 alphanumeric)
    const bicRegex = /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
    return bicRegex.test(bic.toUpperCase());
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SEPAFormData, string>> = {};

    if (!formData.accountHolder.trim()) {
      newErrors.accountHolder = "Account holder name is required";
    } else if (formData.accountHolder.trim().length < 2) {
      newErrors.accountHolder = "Account holder name must be at least 2 characters";
    }

    if (!formData.iban.trim()) {
      newErrors.iban = "IBAN is required";
    } else if (!validateIBAN(formData.iban)) {
      newErrors.iban = "Invalid IBAN format or checksum";
    }

    if (formData.bic.trim() && !validateBIC(formData.bic)) {
      newErrors.bic = "Invalid BIC format";
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
        <h2 className={styles.title}>Bank Account Details</h2>
        <p className={styles.subtitle}>
          Enter your bank account information for automatic repayment
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="accountHolder" className={styles.label}>
            Account Holder Name *
          </label>
          <input
            type="text"
            id="accountHolder"
            name="accountHolder"
            value={formData.accountHolder}
            onChange={handleChange}
            className={`${styles.input} ${errors.accountHolder ? styles.inputError : ""}`}
            placeholder="John Doe"
          />
          {errors.accountHolder && (
            <span className={styles.errorText}>{errors.accountHolder}</span>
          )}
          <span className={styles.helpText}>
            Name as it appears on your bank account
          </span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="iban" className={styles.label}>
            IBAN *
          </label>
          <input
            type="text"
            id="iban"
            name="iban"
            value={formData.iban}
            onChange={handleChange}
            className={`${styles.input} ${errors.iban ? styles.inputError : ""}`}
            placeholder="DE89 3704 0044 0532 0130 00"
            maxLength={34 + 8} // 34 chars + 8 spaces
          />
          {errors.iban && (
            <span className={styles.errorText}>{errors.iban}</span>
          )}
          <span className={styles.helpText}>
            International Bank Account Number (with country code)
          </span>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="bic" className={styles.label}>
            BIC / SWIFT Code (Optional)
          </label>
          <input
            type="text"
            id="bic"
            name="bic"
            value={formData.bic}
            onChange={handleChange}
            className={`${styles.input} ${errors.bic ? styles.inputError : ""}`}
            placeholder="COBADEFFXXX"
            maxLength={11}
          />
          {errors.bic && (
            <span className={styles.errorText}>{errors.bic}</span>
          )}
          <span className={styles.helpText}>
            Bank Identifier Code (optional for most EU banks)
          </span>
        </div>

        <div className={styles.securityBox}>
          <span className={styles.securityIcon}>🔒</span>
          <div>
            <h3 className={styles.securityTitle}>Your Data is Secure</h3>
            <p className={styles.securityText}>
              Your bank details are encrypted using ZAMA FHEVM before being stored on-chain.
              Only authorized parties can decrypt this information.
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
            type="submit"
            className={styles.submitButton}
          >
            Continue to Confirmation →
          </button>
        </div>
      </form>
    </div>
  );
}
