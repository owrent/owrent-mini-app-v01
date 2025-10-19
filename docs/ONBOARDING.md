# Onboarding Flow Documentation

## Overview

The Owrent mini app includes a multi-step onboarding flow that educates users about invoice factoring, attestations, SEPA payments, and fee structures before they create their first request.

## Architecture

### File Structure

```
owrent-mini-app-v01/
├── app/
│   └── onboarding/
│       ├── page.tsx                    # Main onboarding page with state management
│       └── onboarding.module.css       # Styling for onboarding flow
├── components/
│   └── onboarding/
│       ├── WelcomeScreen.tsx           # Step 1: Platform introduction
│       ├── FactoringExplainer.tsx      # Step 2: Factoring vs loans
│       ├── AttestationExplainer.tsx    # Step 3: Security benefits
│       ├── SEPAExplainer.tsx           # Step 4: Repayment explanation
│       └── FeeDisclosure.tsx           # Step 5: Fee structure
```

### State Management

The onboarding flow uses React's `useState` hook for managing the current step:

```typescript
const [currentStep, setCurrentStep] = useState(1);
const TOTAL_STEPS = 5;
```

### Persistence

Completion status is stored in `localStorage`:

```typescript
const ONBOARDING_COMPLETE_KEY = "owrent_onboarding_complete";

// Mark as complete
localStorage.setItem(ONBOARDING_COMPLETE_KEY, "true");

// Check if completed
const isComplete = localStorage.getItem(ONBOARDING_COMPLETE_KEY);
```

### Navigation Flow

```
┌─────────────┐
│   Welcome   │
│  (Step 1)   │
└──────┬──────┘
       │ Next
       ▼
┌─────────────┐
│  Factoring  │
│  (Step 2)   │◄─── Previous
└──────┬──────┘
       │ Next / Skip
       ▼
┌─────────────┐
│ Attestation │
│  (Step 3)   │◄─── Previous
└──────┬──────┘
       │ Next / Skip
       ▼
┌─────────────┐
│    SEPA     │
│  (Step 4)   │◄─── Previous
└──────┬──────┘
       │ Next / Skip
       ▼
┌─────────────┐
│    Fees     │
│  (Step 5)   │◄─── Previous
└──────┬──────┘
       │ Get Started
       ▼
┌─────────────┐
│   Request   │
│    Page     │
└─────────────┘
```

## Features

### Progress Indicator

Visual progress bar showing current step:

```tsx
<div className={styles.progressBar}>
  <div
    className={styles.progressFill}
    style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
  />
</div>
```

### Navigation Controls

- **Next Button**: Advances to next step or completes onboarding
- **Previous Button**: Returns to previous step (hidden on step 1)
- **Skip Button**: Completes onboarding immediately (hidden on steps 1 and 5)
- **Get Started Button**: Final step button that completes onboarding

### Auto-Redirect

Users who have completed onboarding are automatically redirected:

```typescript
useEffect(() => {
  const isComplete = localStorage.getItem(ONBOARDING_COMPLETE_KEY);
  if (isComplete === "true") {
    router.push("/request");
  }
}, [router]);
```

## Styling

The onboarding flow uses CSS modules with a gradient background:

```css
.container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Responsive Design

Mobile-optimized with breakpoints:

```css
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  /* Adjusted button sizes and layout */
}
```

## Component Interface

Each onboarding screen component follows a simple interface:

```typescript
export default function WelcomeScreen() {
  return (
    <div className={styles.screen}>
      {/* Screen content */}
    </div>
  );
}
```

Components are self-contained and don't receive props, making them easy to modify independently.

## Customization Guide

### Adding a New Step

1. Create new component in `components/onboarding/`:
   ```typescript
   export default function NewStep() {
     return <div>New content</div>;
   }
   ```

2. Update `TOTAL_STEPS` in `app/onboarding/page.tsx`:
   ```typescript
   const TOTAL_STEPS = 6; // Increased from 5
   ```

3. Add case to `renderStep()`:
   ```typescript
   case 6:
     return <NewStep />;
   ```

### Removing a Step

1. Update `TOTAL_STEPS` constant
2. Remove case from `renderStep()` switch statement
3. Optionally delete unused component file

### Changing Redirect Destination

Modify the redirect URL in both locations:

```typescript
// Initial check
router.push("/your-destination");

// After completion
router.push("/your-destination");
```

### Customizing Progress Indicator

Modify the progress bar styling in `onboarding.module.css`:

```css
.progressBar {
  height: 8px; /* Change height */
  background-color: rgba(255, 255, 255, 0.2); /* Change background */
}

.progressFill {
  background-color: white; /* Change fill color */
}
```

## Testing

### Manual Testing Checklist

- [ ] Navigate through all 5 steps using Next button
- [ ] Use Previous button to go back
- [ ] Test Skip button on steps 2-4
- [ ] Verify "Get Started" button on step 5
- [ ] Confirm redirect to /request after completion
- [ ] Verify localStorage stores completion status
- [ ] Test auto-redirect when revisiting /onboarding
- [ ] Check mobile responsiveness
- [ ] Verify progress bar updates correctly

### Resetting Onboarding

To test the flow again, clear localStorage:

```javascript
// In browser console
localStorage.removeItem("owrent_onboarding_complete");
```

Or programmatically:

```typescript
localStorage.clear();
```

## Future Enhancements

Potential improvements for the onboarding flow:

1. **Analytics Tracking**: Track which steps users skip or spend most time on
2. **A/B Testing**: Test different content variations
3. **Video Integration**: Add explainer videos to steps
4. **Interactive Demos**: Include interactive examples
5. **Personalization**: Customize content based on user type
6. **Progress Persistence**: Save current step to resume later
7. **Tooltips**: Add contextual help tooltips
8. **Animations**: Enhance transitions between steps

## Related Documentation

- [Mini App Integration Guide](../../.kiro/steering/mini-app-integration.md)
- [Tasks Specification](../../.kiro/specs/mini-app-onboarding-factoring/tasks.md)
- [Requirements](../../.kiro/specs/mini-app-onboarding-factoring/requirements.md)
- [Design Document](../../.kiro/specs/mini-app-onboarding-factoring/design.md)
