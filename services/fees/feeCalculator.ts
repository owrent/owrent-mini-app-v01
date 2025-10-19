/**
 * Fee Calculator Service
 * 
 * Calculates platform fees, settlement fees, and net amounts
 * for invoice factoring and loan requests.
 */

export interface FeeBreakdown {
  platformFee: {
    percentage: number;
    amount: number;
  };
  settlementFee?: {
    percentage: number;
    amount: number;
  };
  totalFees: number;
  netAmount: number;
  repaymentAmount: number;
  interestAmount?: number;
}

export type RequestType = "factoring" | "loan";

/**
 * Platform fee rate (0.5% of transaction amount)
 */
const PLATFORM_FEE_RATE = 0.005; // 0.5%

/**
 * Settlement fee rate for cross-chain transactions (0.1% for factoring)
 */
const SETTLEMENT_FEE_RATE = 0.001; // 0.1%

/**
 * Daily interest rate for loans (0.2% per day)
 */
const DAILY_INTEREST_RATE = 0.002; // 0.2%

/**
 * Calculate all fees for a factoring or loan request
 * 
 * @param amount - The invoice or loan amount
 * @param type - The request type ("factoring" or "loan")
 * @param duration - Optional loan duration in days (required for loans)
 * @returns FeeBreakdown object with all calculated fees
 */
export function calculateFees(
  amount: number,
  type: RequestType,
  duration?: number
): FeeBreakdown {
  // Validate inputs
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  if (type === "loan" && (!duration || duration <= 0)) {
    throw new Error("Duration is required for loan requests and must be greater than 0");
  }

  if (type === "loan" && duration && duration > 30) {
    throw new Error("Loan duration cannot exceed 30 days");
  }

  // Calculate platform fee (applies to both factoring and loans)
  const platformFeeAmount = amount * PLATFORM_FEE_RATE;

  // Calculate settlement fee (only for factoring)
  const settlementFeeAmount = type === "factoring" ? amount * SETTLEMENT_FEE_RATE : 0;

  // Calculate interest (only for loans)
  const interestAmount = type === "loan" && duration
    ? amount * DAILY_INTEREST_RATE * duration
    : 0;

  // Calculate total fees
  const totalFees = platformFeeAmount + settlementFeeAmount;

  // Calculate net amount (what user receives)
  const netAmount = amount - totalFees;

  // Calculate repayment amount (what user must repay)
  const repaymentAmount = type === "loan"
    ? amount + interestAmount
    : amount;

  return {
    platformFee: {
      percentage: PLATFORM_FEE_RATE * 100,
      amount: platformFeeAmount,
    },
    settlementFee: settlementFeeAmount > 0 ? {
      percentage: SETTLEMENT_FEE_RATE * 100,
      amount: settlementFeeAmount,
    } : undefined,
    totalFees,
    netAmount,
    repaymentAmount,
    interestAmount: type === "loan" ? interestAmount : undefined,
  };
}

/**
 * Calculate only platform fee
 * 
 * @param amount - The transaction amount
 * @returns Platform fee amount
 */
export function calculatePlatformFee(amount: number): number {
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }
  return amount * PLATFORM_FEE_RATE;
}

/**
 * Calculate only settlement fee
 * 
 * @param amount - The transaction amount
 * @returns Settlement fee amount
 */
export function calculateSettlementFee(amount: number): number {
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }
  return amount * SETTLEMENT_FEE_RATE;
}

/**
 * Calculate loan interest
 * 
 * @param amount - The loan amount
 * @param duration - Loan duration in days
 * @returns Interest amount
 */
export function calculateInterest(amount: number, duration: number): number {
  if (amount <= 0) {
    throw new Error("Amount must be greater than 0");
  }
  if (duration <= 0) {
    throw new Error("Duration must be greater than 0");
  }
  if (duration > 30) {
    throw new Error("Duration cannot exceed 30 days");
  }
  return amount * DAILY_INTEREST_RATE * duration;
}

/**
 * Get fee rates
 * 
 * @returns Object with all fee rates
 */
export function getFeeRates() {
  return {
    platformFeeRate: PLATFORM_FEE_RATE,
    platformFeePercentage: PLATFORM_FEE_RATE * 100,
    settlementFeeRate: SETTLEMENT_FEE_RATE,
    settlementFeePercentage: SETTLEMENT_FEE_RATE * 100,
    dailyInterestRate: DAILY_INTEREST_RATE,
    dailyInterestPercentage: DAILY_INTEREST_RATE * 100,
  };
}

/**
 * Format currency amount
 * 
 * @param amount - The amount to format
 * @param currency - Currency symbol (default: "€")
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string = "€"): string {
  return `${currency}${amount.toFixed(2)}`;
}

/**
 * Calculate effective annual rate (EAR) for a loan
 * 
 * @param duration - Loan duration in days
 * @returns Effective annual rate as percentage
 */
export function calculateEffectiveAnnualRate(duration: number): number {
  if (duration <= 0 || duration > 30) {
    throw new Error("Duration must be between 1 and 30 days");
  }
  
  // EAR = (1 + daily rate)^365 - 1
  const ear = Math.pow(1 + DAILY_INTEREST_RATE, 365) - 1;
  return ear * 100;
}
