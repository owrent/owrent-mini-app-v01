"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import styles from "./FileUpload.module.css";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes?: string[];
  maxSizeMB?: number;
}

export default function FileUpload({
  onFileSelect,
  acceptedTypes = ["application/pdf", "text/csv", "image/png", "image/jpeg", "image/jpg"],
  maxSizeMB = 10,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!acceptedTypes.includes(file.type)) {
      return `Invalid file type. Please upload PDF, CSV, PNG, or JPG files.`;
    }

    // Check file size
    if (file.size > maxSizeBytes) {
      return `File size exceeds ${maxSizeMB}MB limit. Please upload a smaller file.`;
    }

    return null;
  };

  const handleFile = (file: File) => {
    setError(null);
    
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSelectedFile(file);
    
    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Generate preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else if (file.type === "application/pdf") {
      setPreview("pdf");
    } else if (file.type === "text/csv") {
      setPreview("csv");
    }

    onFileSelect(file);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreview(null);
    setUploadProgress(0);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className={styles.container}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(",")}
        onChange={handleFileInputChange}
        className={styles.hiddenInput}
        aria-label="Upload invoice file"
      />

      {!selectedFile ? (
        <div
          className={`${styles.dropzone} ${isDragging ? styles.dragging : ""}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleClick();
            }
          }}
        >
          <div className={styles.uploadIcon}>📄</div>
          <h3 className={styles.uploadTitle}>
            {isDragging ? "Drop your file here" : "Upload Invoice"}
          </h3>
          <p className={styles.uploadText}>
            Drag and drop your invoice file here, or click to browse
          </p>
          <p className={styles.uploadHint}>
            Supported formats: PDF, CSV, PNG, JPG (max {maxSizeMB}MB)
          </p>
        </div>
      ) : (
        <div className={styles.filePreview}>
          <div className={styles.previewHeader}>
            <h3 className={styles.previewTitle}>Uploaded File</h3>
            <button
              className={styles.removeButton}
              onClick={handleRemove}
              type="button"
            >
              ✕
            </button>
          </div>

          {uploadProgress < 100 && (
            <div className={styles.progressContainer}>
              <div 
                className={styles.progressBar}
                role="progressbar"
                aria-label="Upload progress"
                aria-valuenow={uploadProgress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className={styles.progressFill}
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <span className={styles.progressText}>{uploadProgress}%</span>
            </div>
          )}

          {uploadProgress === 100 && (
            <>
              <div className={styles.previewContent}>
                {preview && preview.startsWith("data:image") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={preview}
                    alt="Invoice preview"
                    className={styles.previewImage}
                  />
                ) : preview === "pdf" ? (
                  <div className={styles.fileIcon}>📄 PDF</div>
                ) : preview === "csv" ? (
                  <div className={styles.fileIcon}>📊 CSV</div>
                ) : null}
              </div>

              <div className={styles.fileInfo}>
                <div className={styles.fileName}>{selectedFile.name}</div>
                <div className={styles.fileSize}>
                  {formatFileSize(selectedFile.size)}
                </div>
              </div>

              <div className={styles.successMessage}>
                ✓ File uploaded successfully
              </div>
            </>
          )}
        </div>
      )}

      {error && (
        <div className={styles.errorMessage}>
          <span className={styles.errorIcon}>⚠️</span>
          {error}
        </div>
      )}
    </div>
  );
}
