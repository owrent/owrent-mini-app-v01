# Owrent Mini App

This is the Owrent invoice factoring mini app built using OnchainKit and the Farcaster SDK. The app provides a streamlined onboarding experience for users to understand invoice factoring and create factoring requests.

## Prerequisites

Before getting started, make sure you have:

* Base app account
* A [Farcaster](https://farcaster.xyz/) account
* [Vercel](https://vercel.com/) account for hosting the application
* [Coinbase Developer Platform](https://portal.cdp.coinbase.com/) Client API Key

## Getting Started

### 1. Clone this repository 

```bash
git clone https://github.com/base/demos.git
```

### 2. Install dependencies:

```bash
cd demos/minikit/waitlist-mini-app-qs
npm install
```

### 3. Configure environment variables

Create a `.env.local` file and add your environment variables:

```bash
NEXT_PUBLIC_PROJECT_NAME="Your App Name"
NEXT_PUBLIC_ONCHAINKIT_API_KEY=<Replace-WITH-YOUR-CDP-API-KEY>
NEXT_PUBLIC_URL=
```

### 4. Run locally:

```bash
npm run dev
```

## Features

### Onboarding Flow

The app includes a comprehensive 5-step onboarding experience:

1. **Welcome Screen** - Introduction to Owrent platform
2. **Factoring Explainer** - Understanding factoring vs traditional loans
3. **Attestation Explainer** - Security benefits of blockchain attestations
4. **SEPA Explainer** - How automatic repayment works
5. **Fee Disclosure** - Transparent fee structure

**Key Features:**
- Progress indicator showing current step
- Previous/Next navigation
- Skip option (available after first screen)
- Completion status stored in localStorage
- Automatic redirect to request page after completion

**Routes:**
- `/onboarding` - Multi-step onboarding flow
- `/request` - Request type selection page (redirects here after onboarding)

### Request Type Selection

After completing onboarding, users are presented with two financing options:

1. **Invoice Factoring** - Sell invoice at a discount for immediate cash
   - Typical discount rate: 2-10%
   - Features: Immediate payment, no debt, transfer payment risk, simple transaction

2. **Short-Term Loan** - Borrow against invoice until payment received
   - Interest rate based on duration (≤30 days)
   - Features: Keep ownership, flexible repayment, maintain customer relationships

**Key Features:**
- Visual card-based selection interface
- Detailed rate information for each option
- Feature comparison lists
- "Learn More" links to help page
- Selected type stored in localStorage
- Continue button appears after selection
- Keyboard accessible (Enter/Space to select)

**Implementation:**
- `app/request/page.tsx` - Main request page with type selection
- `components/request/TypeSelector.tsx` - Reusable type selector component
- `app/request/request.module.css` - Styling for request page
- `components/request/TypeSelector.module.css` - Styling for type selector

### File Upload

The app includes a drag-and-drop file upload component for invoice documents:

**Features:**
- Drag-and-drop interface with visual feedback
- Click to browse file selection
- File type validation (PDF, CSV, PNG, JPG)
- File size validation (max 10MB configurable)
- Upload progress indicator
- Image preview for uploaded images
- File type icons for PDF/CSV
- Remove uploaded file option
- Keyboard accessible
- Mobile responsive

**Supported File Types:**
- PDF documents
- CSV files
- PNG images
- JPG/JPEG images

**Implementation:**
- `components/request/FileUpload.tsx` - File upload component
- `components/request/FileUpload.module.css` - Styling for file upload

**Usage:**
```tsx
import FileUpload from "~~/components/request/FileUpload";

<FileUpload
  onFileSelect={(file) => console.log("File selected:", file)}
  acceptedTypes={["application/pdf", "text/csv", "image/png", "image/jpeg"]}
  maxSizeMB={10}
/>
```

### Fee Calculator

The app includes a comprehensive fee calculation service for both invoice factoring and loan requests:

**Features:**
- Platform fee calculation (0.5% of transaction amount)
- Settlement fee calculation (0.1% for factoring transactions)
- Loan interest calculation (0.2% per day, max 30 days)
- Net amount calculation (what user receives)
- Repayment amount calculation (what user must repay)
- Effective annual rate (EAR) calculation for loans
- Currency formatting utilities

**Fee Structure:**
- **Platform Fee**: 0.5% of transaction amount (applies to both factoring and loans)
- **Settlement Fee**: 0.1% for cross-chain factoring transactions
- **Loan Interest**: 0.2% per day (duration ≤30 days)

**Implementation:**
- `services/fees/feeCalculator.ts` - Fee calculation service
- `components/fees/FeeBreakdown.tsx` - Fee breakdown display component
- `components/fees/FeeBreakdown.module.css` - Styling for fee breakdown

**Usage:**
```tsx
import { calculateFees, formatCurrency } from "~~/services/fees/feeCalculator";

// Calculate fees for invoice factoring
const factoringFees = calculateFees(10000, "factoring");
console.log("Net amount:", formatCurrency(factoringFees.netAmount));
console.log("Total fees:", formatCurrency(factoringFees.totalFees));

// Calculate fees for loan
const loanFees = calculateFees(10000, "loan", 15); // 15 days
console.log("Interest:", formatCurrency(loanFees.interestAmount));
console.log("Repayment:", formatCurrency(loanFees.repaymentAmount));
```

**API Reference:**

```typescript
// Main fee calculation function
calculateFees(amount: number, type: "factoring" | "loan", duration?: number): FeeBreakdown

// Individual fee calculations
calculatePlatformFee(amount: number): number
calculateSettlementFee(amount: number): number
calculateInterest(amount: number, duration: number): number

// Utility functions
getFeeRates(): object
formatCurrency(amount: number, currency?: string): string
calculateEffectiveAnnualRate(duration: number): number
```

### SEPA Authorization

The app includes a comprehensive SEPA (Single Euro Payments Area) authorization flow for automatic repayment:

**Features:**
- Multi-step authorization process (explanation → form → confirmation)
- IBAN validation with mod-97 checksum verification
- BIC/SWIFT code validation (optional)
- Real-time form validation with error messages
- IBAN masking for security in confirmation view
- Consent checkbox with legal text
- Wallet signature simulation for authorization
- Unique mandate reference generation
- Mock encryption service for FHEVM integration

**SEPA Flow Steps:**

1. **Explanation Screen** - Educates users about:
   - Why SEPA authorization is needed
   - How SEPA protects both parties
   - Visual flow diagram of the repayment process
   - Security features (encryption, fixed amounts, refund rights)

2. **Form Screen** - Collects bank details:
   - Account holder name (required)
   - IBAN with automatic formatting and validation (required)
   - BIC/SWIFT code with format validation (optional)
   - Real-time validation feedback
   - Security information about encryption

3. **Confirmation Screen** - Reviews and confirms:
   - Masked IBAN display for security
   - Exact repayment amount and date
   - Unique mandate reference
   - User rights under SEPA regulations
   - Consent checkbox
   - Wallet signature request

**Implementation:**
- `app/sepa/page.tsx` - Main SEPA page with step management
- `components/sepa/SEPAExplanation.tsx` - Educational explanation component
- `components/sepa/SEPAForm.tsx` - Bank details form with validation
- `components/sepa/SEPAConfirmation.tsx` - Confirmation and consent component
- `services/encryption/sepaService.ts` - Mock encryption service (FHEVM placeholder)
- `app/sepa/sepa.module.css` - Page styling

**IBAN Validation:**
- Length check (15-34 characters)
- Format validation (2 letters, 2 digits, alphanumeric)
- Mod-97 checksum verification
- Automatic formatting with spaces

**BIC Validation:**
- Format: 8 or 11 characters
- Pattern: 4 letters (bank code) + 2 letters (country) + 2 alphanumeric (location) + optional 3 alphanumeric (branch)

**Security Features:**
- IBAN masking in confirmation (shows first 4 and last 4 characters)
- Mock FHEVM encryption service (ready for integration)
- Wallet signature for cryptographic proof of consent
- Clear display of user rights and refund options

**Usage:**
```tsx
// Navigate to SEPA authorization
router.push("/sepa");

// SEPA data structure
interface SEPAFormData {
  accountHolder: string;
  iban: string;
  bic: string;
}
```

**Routes:**
- `/sepa` - SEPA authorization flow
- Redirects to `/success` after completion

## Customization

### Update Manifest Configuration

The `minikit.config.ts` file configures your manifest located at `app/.well-known/farcaster.json`.

**Skip the `accountAssociation` object for now.**

To personalize your app, change the `name`, `subtitle`, and `description` fields and add images to your `/public` folder. Then update their URLs in the file.

### Customize Onboarding

To modify the onboarding experience:

1. **Edit Components** - Update content in `components/onboarding/`:
   - `WelcomeScreen.tsx`
   - `FactoringExplainer.tsx`
   - `AttestationExplainer.tsx`
   - `SEPAExplainer.tsx`
   - `FeeDisclosure.tsx`

2. **Styling** - Modify `app/onboarding/onboarding.module.css` for visual customization

3. **Flow Logic** - Adjust `app/onboarding/page.tsx` to:
   - Change number of steps (update `TOTAL_STEPS`)
   - Modify navigation behavior
   - Change redirect destination

### Customize Request Type Selection

To modify the request type selection:

1. **Edit Component** - Update `components/request/TypeSelector.tsx`:
   - Modify card content and descriptions
   - Update rate information
   - Change feature lists
   - Customize icons

2. **Styling** - Modify styling files:
   - `app/request/request.module.css` - Page layout
   - `components/request/TypeSelector.module.css` - Card styling

3. **Flow Logic** - Adjust `app/request/page.tsx` to:
   - Change navigation destination after selection
   - Modify localStorage key for selected type
   - Add additional validation or logic

### Customize SEPA Authorization

To modify the SEPA authorization flow:

1. **Edit Components** - Update components in `components/sepa/`:
   - `SEPAExplanation.tsx` - Modify educational content and flow diagram
   - `SEPAForm.tsx` - Adjust form fields, validation rules, or add new fields
   - `SEPAConfirmation.tsx` - Customize confirmation display and consent text

2. **Styling** - Modify styling files:
   - `app/sepa/sepa.module.css` - Page layout
   - `components/sepa/SEPAExplanation.module.css` - Explanation styling
   - `components/sepa/SEPAForm.module.css` - Form styling
   - `components/sepa/SEPAConfirmation.module.css` - Confirmation styling

3. **Validation** - Adjust validation in `SEPAForm.tsx`:
   - Modify IBAN validation rules
   - Change BIC validation requirements
   - Add custom validation logic
   - Update error messages

4. **Flow Logic** - Adjust `app/sepa/page.tsx` to:
   - Add or remove steps
   - Change navigation behavior
   - Modify data handling
   - Update redirect destination

5. **Encryption Service** - Update `services/encryption/sepaService.ts`:
   - Replace mock encryption with actual FHEVM integration
   - Add real encryption logic
   - Implement secure storage

## Deployment

### 1. Deploy to Vercel

```bash
vercel --prod
```

You should have a URL deployed to a domain similar to: `https://your-vercel-project-name.vercel.app/`

### 2. Update environment variables

Add your production URL to your local `.env` file:

```bash
NEXT_PUBLIC_PROJECT_NAME="Your App Name"
NEXT_PUBLIC_ONCHAINKIT_API_KEY=<Replace-WITH-YOUR-CDP-API-KEY>
NEXT_PUBLIC_URL=https://your-vercel-project-name.vercel.app/
```

### 3. Upload environment variables to Vercel

Add environment variables to your production environment:

```bash
vercel env add NEXT_PUBLIC_PROJECT_NAME production
vercel env add NEXT_PUBLIC_ONCHAINKIT_API_KEY production
vercel env add NEXT_PUBLIC_URL production
```

## Account Association

### 1. Sign Your Manifest

1. Navigate to [Farcaster Manifest tool](https://farcaster.xyz/~/developers/mini-apps/manifest)
2. Paste your domain in the form field (ex: your-vercel-project-name.vercel.app)
3. Click the `Generate account association` button and follow the on-screen instructions for signing with your Farcaster wallet
4. Copy the `accountAssociation` object

### 2. Update Configuration

Update your `minikit.config.ts` file to include the `accountAssociation` object:

```ts
export const minikitConfig = {
    accountAssociation: {
        "header": "your-header-here",
        "payload": "your-payload-here",
        "signature": "your-signature-here"
    },
    frame: {
        // ... rest of your frame configuration
    },
}
```

### 3. Deploy Updates

```bash
vercel --prod
```

## Testing and Publishing

### 1. Preview Your App

Go to [base.dev/preview](https://base.dev/preview) to validate your app:

1. Add your app URL to view the embeds and click the launch button to verify the app launches as expected
2. Use the "Account association" tab to verify the association credentials were created correctly
3. Use the "Metadata" tab to see the metadata added from the manifest and identify any missing fields

### 2. Publish to Base App

To publish your app, create a post in the Base app with your app's URL.

## Documentation

- **[Onboarding Flow](docs/ONBOARDING.md)** - Detailed documentation of the onboarding implementation
- **[Request Type Selection](docs/REQUEST_TYPE_SELECTION.md)** - Documentation of the financing option selection
- **[SEPA Authorization](docs/SEPA_AUTHORIZATION.md)** - Complete guide to the SEPA authorization flow
- **[Contract Configuration](config/contracts.ts)** - Smart contract addresses and ABIs

## Services

### Fee Calculator Service

The fee calculator service (`services/fees/feeCalculator.ts`) provides comprehensive fee calculations for the Owrent platform:

**Core Functions:**

- `calculateFees(amount, type, duration?)` - Calculate all fees for a request
  - Returns: `FeeBreakdown` object with platform fee, settlement fee, interest, net amount, and repayment amount
  - Validates inputs and throws errors for invalid parameters
  - Supports both "factoring" and "loan" request types

- `calculatePlatformFee(amount)` - Calculate only the platform fee (0.5%)
- `calculateSettlementFee(amount)` - Calculate only the settlement fee (0.1%)
- `calculateInterest(amount, duration)` - Calculate loan interest (0.2% per day)
- `getFeeRates()` - Get all fee rates as percentages
- `formatCurrency(amount, currency?)` - Format amounts as currency strings
- `calculateEffectiveAnnualRate(duration)` - Calculate EAR for loans

**Fee Breakdown Interface:**

```typescript
interface FeeBreakdown {
  platformFee: {
    percentage: number;  // 0.5
    amount: number;      // Calculated amount
  };
  settlementFee?: {      // Only for factoring
    percentage: number;  // 0.1
    amount: number;      // Calculated amount
  };
  totalFees: number;           // Sum of all fees
  netAmount: number;           // Amount user receives
  repaymentAmount: number;     // Amount user must repay
  interestAmount?: number;     // Only for loans
}
```

**Validation:**
- Amount must be greater than 0
- Loan duration is required and must be 1-30 days
- All calculations use precise decimal arithmetic
- Throws descriptive errors for invalid inputs

## Learn More

- [Create a Mini App tutorial](https://docs.base.org/docs/mini-apps/quickstart/create-new-miniapp/) - Base documentation
- [OnchainKit Documentation](https://onchainkit.xyz) - OnchainKit reference
- [Farcaster SDK](https://docs.farcaster.xyz) - Farcaster integration guide