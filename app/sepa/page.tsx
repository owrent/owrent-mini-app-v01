"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SEPAExplanation from "../../components/sepa/SEPAExplanation";
import SEPAForm, { SEPAFormData } from "../../components/sepa/SEPAForm";
import SEPAConfirmation from "../../components/sepa/SEPAConfirmation";
import styles from "./sepa.module.css";

export default function SEPAPage() {
  const router = useRouter();
  const [step, setStep] = useState<"explanation" | "form" | "confirmation">("explanation");
  const [sepaData, setSEPAData] = useState<SEPAFormData | null>(null);

  const handleExplanationContinue = () => {
    setStep("form");
  };

  const handleFormSubmit = (data: SEPAFormData) => {
    setSEPAData(data);
    setStep("confirmation");
  };

  const handleConfirm = async () => {
    // TODO: Process SEPA authorization and create attestation
    // For now, redirect to success page
    router.push("/success");
  };

  const handleBack = () => {
    if (step === "form") {
      setStep("explanation");
    } else if (step === "confirmation") {
      setStep("form");
    } else {
      router.back();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {step === "explanation" && (
          <SEPAExplanation
            onContinue={handleExplanationContinue}
            onBack={handleBack}
          />
        )}

        {step === "form" && (
          <SEPAForm
            onSubmit={handleFormSubmit}
            onBack={handleBack}
          />
        )}

        {step === "confirmation" && sepaData && (
          <SEPAConfirmation
            sepaData={sepaData}
            onConfirm={handleConfirm}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
