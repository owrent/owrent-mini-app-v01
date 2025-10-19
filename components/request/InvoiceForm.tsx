"use client";

import React, { useState, useEffect } from "react";
import styles from "./InvoiceForm.module.css";

export interface InvoiceFormData {
  invoiceNumber: string;
  amount: string;
  invoiceDate: string;
  dueDate: string;
  debtorName: string;
  debtorAddress: string;
}

interface InvoiceFormProps {
  onSubmit: (data: InvoiceFormData) => void;
  onBack?: () => void;
  uploadedFile?: File | null;
}

export default function InvoiceForm({ onSubmit, onBack, uploadedFile }: InvoiceFormProps) {
  const [formData, setFormData] = useState<InvoiceFormData>({
    invoiceNumber: "",
    amount: "",
    invoiceDate: "",
    dueDate: "",
    debtorName: "",
    debtorAddress: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InvoiceFormData, string>>>({});
  const [isOCRProcessing, setIsOCRProcessing] = useState(false);

  // Mock OCR extraction when file is uploaded
  useEffect(() => {
    if (uploadedFile) {
      setIsOCRProcessing(true);
      
      // Simulate OCR processing
      setTimeout(() => {
        // Mock extracted data
        const mockData: InvoiceFormData = {
          invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
          amount: (Math.random() * 50000 + 5000).toFixed(2),
          invoiceDate: new Date().toISOString().split("T")[0],
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          debtorName: "Sample Customer Ltd.",
          debtorAddress: "123 Business Street, City, Country",
        };
        
        setFormData(mockData);
        setIsOCRProcessing(false);
      }, 1500);
    }
  }, [uploadedFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof InvoiceFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof InvoiceFormData, string>> = {};

    if (!formData.invoiceNumber.trim()) {
      newErrors.invoiceNumber = "Invoice number is required";
    }

    if (!formData.amount.trim()) {
      newErrors.amount = "Amount is required";
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    } else if (isNaN(parseFloat(formData.amount))) {
      newErrors.amount = "Amount must be a valid number";
    }

    if (!formData.invoiceDate) {
      newErrors.invoiceDate = "Invoice date is required";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    } else if (new Date(formData.dueDate) <= new Date(formData.invoiceDate)) {
      newErrors.dueDate = "Due date must be after invoice date";
    }

    if (!formData.debtorName.trim()) {
      newErrors.debtorName = "Debtor name is required";
    }

    if (!formData.debtorAddress.trim()) {
      newErrors.debtorAddress = "Debtor address is required";
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
        <h2 className={styles.title}>Invoice Details</h2>
        <p className={styles.subtitle}>
          {isOCRProcessing
            ? "Extracting information from your invoice..."
            : "Review and correct the extracted information"}
        </p>
      </div>

      {isOCRProcessing && (
        <div className={styles.ocrLoader}>
          <div className={styles.spinner}></div>
          <p>Processing invoice with OCR...</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          {/* Invoice Number */}
          <div className={styles.formGroup}>
            <label htmlFor="invoiceNumber" className={styles.label}>
              Invoice Number *
            </label>
            <input
              type="text"
              id="invoiceNumber"
              name="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={handleChange}
              className={`${styles.input} ${errors.invoiceNumber ? styles.inputError : ""}`}
              placeholder="INV-12345"
              disabled={isOCRProcessing}
            />
            {errors.invoiceNumber && (
              <span className={styles.errorText}>{errors.invoiceNumber}</span>
            )}
          </div>

          {/* Amount */}
          <div className={styles.formGroup}>
            <label htmlFor="amount" className={styles.label}>
              Invoice Amount (€) *
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={`${styles.input} ${errors.amount ? styles.inputError : ""}`}
              placeholder="10000.00"
              step="0.01"
              min="0"
              disabled={isOCRProcessing}
            />
            {errors.amount && (
              <span className={styles.errorText}>{errors.amount}</span>
            )}
          </div>

          {/* Invoice Date */}
          <div className={styles.formGroup}>
            <label htmlFor="invoiceDate" className={styles.label}>
              Invoice Date *
            </label>
            <input
              type="date"
              id="invoiceDate"
              name="invoiceDate"
              value={formData.invoiceDate}
              onChange={handleChange}
              className={`${styles.input} ${errors.invoiceDate ? styles.inputError : ""}`}
              disabled={isOCRProcessing}
            />
            {errors.invoiceDate && (
              <span className={styles.errorText}>{errors.invoiceDate}</span>
            )}
          </div>

          {/* Due Date */}
          <div className={styles.formGroup}>
            <label htmlFor="dueDate" className={styles.label}>
              Due Date *
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={`${styles.input} ${errors.dueDate ? styles.inputError : ""}`}
              disabled={isOCRProcessing}
            />
            {errors.dueDate && (
              <span className={styles.errorText}>{errors.dueDate}</span>
            )}
          </div>

          {/* Debtor Name */}
          <div className={styles.formGroup}>
            <label htmlFor="debtorName" className={styles.label}>
              Debtor Name *
            </label>
            <input
              type="text"
              id="debtorName"
              name="debtorName"
              value={formData.debtorName}
              onChange={handleChange}
              className={`${styles.input} ${errors.debtorName ? styles.inputError : ""}`}
              placeholder="Customer Company Ltd."
              disabled={isOCRProcessing}
            />
            {errors.debtorName && (
              <span className={styles.errorText}>{errors.debtorName}</span>
            )}
          </div>

          {/* Debtor Address */}
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="debtorAddress" className={styles.label}>
              Debtor Address *
            </label>
            <textarea
              id="debtorAddress"
              name="debtorAddress"
              value={formData.debtorAddress}
              onChange={handleChange}
              className={`${styles.textarea} ${errors.debtorAddress ? styles.inputError : ""}`}
              placeholder="123 Business Street, City, Postal Code, Country"
              rows={3}
              disabled={isOCRProcessing}
            />
            {errors.debtorAddress && (
              <span className={styles.errorText}>{errors.debtorAddress}</span>
            )}
          </div>
        </div>

        <div className={styles.infoBox}>
          <span className={styles.infoIcon}>ℹ️</span>
          <p className={styles.infoText}>
            All information has been extracted automatically. Please review and correct any
            errors before proceeding.
          </p>
        </div>

        <div className={styles.buttonGroup}>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className={styles.backButton}
              disabled={isOCRProcessing}
            >
              ← Back
            </button>
          )}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isOCRProcessing}
          >
            Continue to Summary →
          </button>
        </div>
      </form>
    </div>
  );
}
