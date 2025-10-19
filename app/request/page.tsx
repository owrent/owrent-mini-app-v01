"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TypeSelector from "../../components/request/TypeSelector";
import styles from "./request.module.css";

export default function RequestPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<"factoring" | "loan" | null>(null);

  const handleTypeSelect = (type: "factoring" | "loan") => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedType) {
      // Store selected type in localStorage for next step
      localStorage.setItem("requestType", selectedType);
      // Navigate to form page (to be implemented)
      router.push(`/request/${selectedType}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Choose Your Financing Option</h1>
        <p className={styles.subtitle}>
          Select the option that best fits your needs
        </p>

        <TypeSelector
          selectedType={selectedType}
          onSelectType={handleTypeSelect}
        />

        {selectedType && (
          <button
            className={styles.continueButton}
            onClick={handleContinue}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
