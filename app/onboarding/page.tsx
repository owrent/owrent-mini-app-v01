"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import WelcomeScreen from "../../components/onboarding/WelcomeScreen";
import FactoringExplainer from "../../components/onboarding/FactoringExplainer";
import AttestationExplainer from "../../components/onboarding/AttestationExplainer";
import SEPAExplainer from "../../components/onboarding/SEPAExplainer";
import FeeDisclosure from "../../components/onboarding/FeeDisclosure";
import styles from "./onboarding.module.css";

const TOTAL_STEPS = 5;
const ONBOARDING_COMPLETE_KEY = "owrent_onboarding_complete";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  // Check if onboarding was already completed
  useEffect(() => {
    const isComplete = localStorage.getItem(ONBOARDING_COMPLETE_KEY);
    if (isComplete === "true") {
      router.push("/request");
    }
  }, [router]);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      // Mark onboarding as complete
      localStorage.setItem(ONBOARDING_COMPLETE_KEY, "true");
      router.push("/request");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    // Mark onboarding as complete and skip to request page
    localStorage.setItem(ONBOARDING_COMPLETE_KEY, "true");
    router.push("/request");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeScreen />;
      case 2:
        return <FactoringExplainer />;
      case 3:
        return <AttestationExplainer />;
      case 4:
        return <SEPAExplainer />;
      case 5:
        return <FeeDisclosure />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <div className={styles.container}>
      {/* Progress Indicator */}
      <div className={styles.progressContainer}>
        <div className={styles.progressText}>
          Step {currentStep} of {TOTAL_STEPS}
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>{renderStep()}</div>

      {/* Navigation */}
      <div className={styles.navigation}>
        {currentStep > 1 && (
          <button
            onClick={handlePrevious}
            className={styles.buttonSecondary}
            type="button"
          >
            Previous
          </button>
        )}

        {currentStep > 1 && currentStep < TOTAL_STEPS && (
          <button
            onClick={handleSkip}
            className={styles.buttonText}
            type="button"
          >
            Skip
          </button>
        )}

        <button
          onClick={handleNext}
          className={styles.buttonPrimary}
          type="button"
        >
          {currentStep === TOTAL_STEPS ? "Get Started" : "Next"}
        </button>
      </div>
    </div>
  );
}
