# SEPA Authorization Flow

## Overview

The SEPA (Single Euro Payments Area) authorization flow enables users to set up automatic repayment for their invoice factoring or loan requests. This feature provides a secure, transparent, and user-friendly way to authorize bank account debits for repayment purposes.

## User Flow

### Step 1: Explanation Screen

**Purpose**: Educate users about SEPA authorization and build trust

**Content**:
- Why SEPA authorization is needed for automatic repayment
- How SEPA protects both the user and the lender
- Visual flow diagram showing the 3-step process
- Security features and user rights

**Key Messages**:
- **Fixed Amount**: Only the exact repayment amount can be collected
- **Fixed Date**: Collection only happens on the agreed repayment date
- **Transparent**: Users know exactly when and how much will be collected
- **Secure**: Bank details are encrypted using ZAMA FHEVM
- **Refund Rights**: 8-week refund right under SEPA regulations

**Actions**:
- Continue to Authorization → (proceeds to form)
- ← Back (returns to previous page)

### Step 2: Form Screen

**Purpose**: Collect bank account details with validation

**Fields**:
1. **Account Holder Name** (required)
   - Minimum 2 characters
   - Name as it appears on bank account

2. **IBAN** (required)
   - Automatic formatting with spaces (every 4 characters)
   - Real-time validation:
     - Length check (15-34 characters)
     - Format validation (2 letters, 2 digits, alphanumeric)
     - Mod-97 checksum verification
   - Example: DE89 3704 0044 0532 0130 00

3. **BIC/SWIFT Code** (optional)
   - Format validation (8 or 11 characters)
   - Pattern: 4 letters + 2 letters + 2 alphanumeric + optional 3 alphanumeric
   - Example: COBADEFFXXX

**Validation**:
- Real-time error display as user types
- Clear error messages for each field
- Form submission blocked until all validations pass

**Security Information**:
- Prominent display of encryption information
- Explanation that data is encrypted using ZAMA FHEVM
- Reassurance that only authorized parties can decrypt

**Actions**:
- Continue to Confirmation → (proceeds to confirmation)
- ← Back (returns to explanation)

### Step 3: Confirmation Screen

**Purpose**: Review details and obtain explicit consent

**Display Information**:

1. **Bank Account** (with security masking)
   - Account Holder: Full name displayed
   - IBAN: Masked (shows first 4 and last 4 characters)
     - Example: DE89 **** **** **** **** 0130 00
   - BIC: Full code displayed (if provided)

2. **Repayment Details**
   - Amount to be collected: €9,500.00 (example)
   - Collection date: Formatted date (e.g., "15 February 2025")
   - Mandate reference: Unique identifier (e.g., "OWR-ABC123XYZ")

3. **User Rights**
   - 8-week refund right after debit
   - Ability to cancel mandate before collection
   - Only exact amount will be collected
   - Collection only on specified date

**Consent Mechanism**:
- Checkbox with legal consent text
- Must be checked to enable confirmation button
- Clear statement of what user is authorizing

**Wallet Signature**:
- Explanation that wallet signature is required
- Creates cryptographic proof of consent
- Simulated signature process (2-second delay)

**Actions**:
- Sign and Confirm → (processes authorization and redirects to success)
- ← Back (returns to form)

## Technical Implementation

### Component Structure

```
app/sepa/page.tsx (Main page with step management)
├── components/sepa/SEPAExplanation.tsx
├── components/sepa/SEPAForm.tsx
└── components/sepa/SEPAConfirmation.tsx
```

### State Management

**Page-level state** (`app/sepa/page.tsx`):
```typescript
const [step, setStep] = useState<"explanation" | "form" | "confirmation">("explanation");
const [sepaData, setSEPAData] = useState<any>(null);
```

**Form state** (`SEPAForm.tsx`):
```typescript
const [formData, setFormData] = useState<SEPAFormData>({
  accountHolder: "",
  iban: "",
  bic: "",
});
const [errors, setErrors] = useState<Partial<Record<keyof SEPAFormData, string>>>({});
```

**Confirmation state** (`SEPAConfirmation.tsx`):
```typescript
const [consentChecked, setConsentChecked] = useState(false);
const [isProcessing, setIsProcessing] = useState(false);
```

### Data Flow

1. **Explanation → Form**:
   - User clicks "Continue to Authorization"
   - Step changes to "form"

2. **Form → Confirmation**:
   - User fills in bank details
   - Form validates all fields
   - On submit, data passed to confirmation
   - Step changes to "confirmation"

3. **Confirmation → Success**:
   - User checks consent checkbox
   - User clicks "Sign and Confirm"
   - Wallet signature simulated (2-second delay)
   - Redirects to `/success` page

### Validation Logic

#### IBAN Validation

```typescript
const validateIBAN = (iban: string): boolean => {
  // 1. Remove spaces
  const cleanIBAN = iban.replace(/\s/g, "");
  
  // 2. Check length (15-34 characters)
  if (cleanIBAN.length < 15 || cleanIBAN.length > 34) {
    return false;
  }
  
  // 3. Check format (2 letters, 2 digits, alphanumeric)
  const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/;
  if (!ibanRegex.test(cleanIBAN)) {
    return false;
  }
  
  // 4. Perform mod-97 checksum validation
  const rearranged = cleanIBAN.slice(4) + cleanIBAN.slice(0, 4);
  const numericIBAN = rearranged.replace(/[A-Z]/g, (char) => 
    (char.charCodeAt(0) - 55).toString()
  );
  
  let remainder = numericIBAN;
  while (remainder.length > 2) {
    const block = remainder.slice(0, 9);
    remainder = (parseInt(block, 10) % 97).toString() + remainder.slice(9);
  }
  
  return parseInt(remainder, 10) % 97 === 1;
};
```

#### BIC Validation

```typescript
const validateBIC = (bic: string): boolean => {
  // Format: 8 or 11 characters
  // Pattern: 4 letters + 2 letters + 2 alphanumeric + optional 3 alphanumeric
  const bicRegex = /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
  return bicRegex.test(bic.toUpperCase());
};
```

### Security Features

#### IBAN Masking

```typescript
const maskIBAN = (iban: string): string => {
  const clean = iban.replace(/\s/g, "");
  if (clean.length <= 8) return iban;
  
  const start = clean.slice(0, 4);
  const end = clean.slice(-4);
  const masked = "*".repeat(clean.length - 8);
  
  return `${start} ${masked.match(/.{1,4}/g)?.join(" ")} ${end}`;
};
```

#### Encryption Service (Mock)

Located at `services/encryption/sepaService.ts`:

```typescript
export const encryptSEPA = async (sepaData: SEPAFormData): Promise<string> => {
  // TODO: Implement actual FHEVM encryption
  // For now, return mock encrypted data
  return `encrypted_${Date.now()}`;
};
```

**Integration Points**:
- Replace mock with actual ZAMA FHEVM encryption
- Store encrypted data on-chain
- Implement decryption for authorized parties only

### Mandate Reference Generation

```typescript
const mandateReference = `OWR-${Date.now().toString(36).toUpperCase()}`;
```

Format: `OWR-` prefix + timestamp in base-36 (uppercase)
Example: `OWR-ABC123XYZ`

## Styling

### Design System

**Color Scheme**:
- Primary gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Card background: White with glassmorphism effect
- Success color: `#10b981` (green)
- Error color: `#ef4444` (red)
- Text: Dark gray on light backgrounds

**Typography**:
- Title: 2rem, bold
- Section titles: 1.25rem, semi-bold
- Body text: 1rem, regular
- Help text: 0.875rem, gray

**Spacing**:
- Container padding: 2rem (desktop), 1rem (mobile)
- Card padding: 2rem
- Section spacing: 1.5rem
- Form field spacing: 1rem

**Responsive Breakpoints**:
- Mobile: < 768px
- Desktop: ≥ 768px

### Component-Specific Styles

**SEPAExplanation**:
- Flow diagram with horizontal steps
- Icon headers for each section
- Info box with light blue background

**SEPAForm**:
- Full-width form fields
- Error states with red border and text
- Help text below each field
- Security box with lock icon

**SEPAConfirmation**:
- Grid layout for details
- Highlighted repayment box
- Consent checkbox with custom styling
- Disabled state for buttons

## User Experience Considerations

### Progressive Disclosure

- Start with education (explanation screen)
- Gradually introduce complexity (form, then confirmation)
- Each step builds on previous understanding

### Error Prevention

- Real-time validation feedback
- Clear error messages
- Disabled submit until valid
- Confirmation step to review before committing

### Trust Building

- Transparent about data usage
- Clear security messaging
- Display user rights prominently
- Professional, polished design

### Accessibility

- Keyboard navigation support
- Clear focus states
- Semantic HTML structure
- ARIA labels where needed
- High contrast text

### Mobile Optimization

- Responsive layout
- Touch-friendly button sizes (min 44x44px)
- Readable text sizes
- Simplified navigation

## Integration Points

### Previous Step

Users arrive at SEPA authorization from:
- Request summary page (after reviewing their factoring/loan request)
- Direct navigation to `/sepa`

### Next Step

After successful authorization:
- Redirect to `/success` page
- Display confirmation message
- Show next steps (e.g., "Your request is being processed")

### Data Persistence

**Current Implementation**:
- Data stored in component state only
- Lost on page refresh

**Future Enhancement**:
- Store in localStorage for recovery
- Sync with backend API
- Create attestation on-chain

## Future Enhancements

### Smart Contract Integration

1. **Create Attestation**:
   - Store encrypted SEPA data on-chain
   - Link to factoring/loan request
   - Generate unique attestation ID

2. **FHEVM Encryption**:
   - Replace mock encryption with actual FHEVM
   - Encrypt IBAN, BIC, and account holder name
   - Store encrypted data in smart contract

3. **Wallet Signature**:
   - Replace simulation with actual wallet signature
   - Use EIP-712 typed data signing
   - Store signature proof on-chain

### Enhanced Validation

1. **Bank Verification**:
   - Optional bank account verification
   - Small test transaction
   - Confirm account ownership

2. **Real-time IBAN Lookup**:
   - Validate bank exists
   - Auto-fill BIC from IBAN
   - Display bank name

### User Experience

1. **Save for Later**:
   - Store partial form data
   - Resume from any step
   - Email reminder to complete

2. **Multiple Accounts**:
   - Save multiple bank accounts
   - Select from saved accounts
   - Set default account

3. **Mandate Management**:
   - View active mandates
   - Cancel mandates
   - Update bank details

## Testing Checklist

### Functional Testing

- [ ] Explanation screen displays correctly
- [ ] Navigation between steps works
- [ ] Form validation catches invalid IBANs
- [ ] Form validation catches invalid BICs
- [ ] IBAN formatting adds spaces automatically
- [ ] Error messages display correctly
- [ ] Confirmation shows masked IBAN
- [ ] Consent checkbox enables/disables button
- [ ] Wallet signature simulation works
- [ ] Redirect to success page works

### Edge Cases

- [ ] Very long account holder names
- [ ] IBANs from different countries
- [ ] Invalid checksum IBANs
- [ ] Empty form submission
- [ ] Back navigation preserves data
- [ ] Page refresh handling

### Browser Compatibility

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Accessibility

- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Focus indicators visible
- [ ] Error messages announced
- [ ] Form labels associated correctly

### Mobile Responsiveness

- [ ] Layout adapts to small screens
- [ ] Buttons are touch-friendly
- [ ] Text is readable
- [ ] No horizontal scrolling
- [ ] Flow diagram displays correctly

## Troubleshooting

### Common Issues

**Issue**: IBAN validation fails for valid IBAN
- **Solution**: Check that IBAN is from a supported country
- Verify checksum calculation is correct
- Test with known valid IBANs

**Issue**: Form doesn't submit
- **Solution**: Check all required fields are filled
- Verify validation passes for all fields
- Check console for JavaScript errors

**Issue**: Confirmation doesn't show data
- **Solution**: Verify data is passed from form to confirmation
- Check state management in parent component
- Inspect React DevTools for state

**Issue**: Wallet signature doesn't trigger
- **Solution**: Check consent checkbox is checked
- Verify button is not disabled
- Check for JavaScript errors in console

## Resources

- [SEPA Direct Debit Scheme](https://www.europeanpaymentscouncil.eu/what-we-do/sepa-direct-debit)
- [IBAN Validation Algorithm](https://en.wikipedia.org/wiki/International_Bank_Account_Number#Validating_the_IBAN)
- [BIC/SWIFT Code Format](https://www.swift.com/standards/data-standards/bic-business-identifier-code)
- [ZAMA FHEVM Documentation](https://docs.zama.ai/fhevm)
