# Request Type Selection Documentation

## Overview

The request type selection page allows users to choose between two financing options: Invoice Factoring or Short-Term Loan. This is the first step after completing onboarding.

## Architecture

### File Structure

```
owrent-mini-app-v01/
├── app/
│   └── request/
│       ├── page.tsx                    # Main request page with type selection
│       └── request.module.css          # Styling for request page
├── components/
│   └── request/
│       ├── TypeSelector.tsx            # Reusable type selector component
│       └── TypeSelector.module.css     # Styling for type selector cards
```

## Features

### Two Financing Options

#### 1. Invoice Factoring
- **Description**: Sell your invoice at a discount for immediate cash
- **Typical Discount Rate**: 2-10%
- **Key Benefits**:
  - ✓ Immediate payment
  - ✓ No debt on your books
  - ✓ Transfer payment risk
  - ✓ Simple one-time transaction

#### 2. Short-Term Loan
- **Description**: Borrow against your invoice until payment is received
- **Interest Rate**: Based on duration ≤30 days
- **Key Benefits**:
  - ✓ Keep invoice ownership
  - ✓ Flexible repayment
  - ✓ Maintain customer relationships
  - ✓ Short-term financing

### User Interaction

1. User views both option cards side-by-side
2. User clicks on preferred option (card highlights)
3. "Continue" button appears after selection
4. Selected type is stored in localStorage
5. User clicks "Continue" to proceed to form page

### State Management

```typescript
const [selectedType, setSelectedType] = useState<"factoring" | "loan" | null>(null);

const handleTypeSelect = (type: "factoring" | "loan") => {
  setSelectedType(type);
};
```

### Persistence

Selected type is stored in localStorage for use in subsequent steps:

```typescript
localStorage.setItem("requestType", selectedType);
```

### Navigation

After selection, user is routed to the appropriate form:

```typescript
router.push(`/request/${selectedType}`);
```

## Component Interface

### TypeSelector Component

```typescript
interface TypeSelectorProps {
  selectedType: "factoring" | "loan" | null;
  onSelectType: (type: "factoring" | "loan") => void;
}
```

**Props:**
- `selectedType`: Currently selected financing type (or null)
- `onSelectType`: Callback function when user selects a type

**Features:**
- Keyboard accessible (Enter/Space to select)
- Visual feedback on selection
- Responsive card layout
- "Learn More" links for additional information

## Styling

### Card Layout

Cards are displayed side-by-side on desktop, stacked on mobile:

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

### Selection State

Selected cards have a distinct visual style:

```css
.card.selected {
  border: 3px solid #667eea;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
  transform: translateY(-4px);
}
```

### Responsive Design

Mobile-optimized with breakpoints:

```css
@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}
```

## Accessibility

### Keyboard Navigation

- Cards are keyboard accessible with `tabIndex={0}`
- Enter and Space keys trigger selection
- Visual focus indicators for keyboard users

```typescript
onKeyDown={(e) => {
  if (e.key === "Enter" || e.key === " ") {
    onSelectType("factoring");
  }
}}
```

### ARIA Attributes

- `role="button"` for clickable cards
- Semantic HTML structure
- Clear visual feedback for all states

## Customization Guide

### Modifying Option Details

Edit `components/request/TypeSelector.tsx`:

```typescript
// Change discount rate
<div className={styles.rateValue}>2-10%</div>

// Update features
<ul className={styles.features}>
  <li>✓ Your custom feature</li>
</ul>
```

### Adding a Third Option

1. Update type definition:
   ```typescript
   type FinancingType = "factoring" | "loan" | "newOption";
   ```

2. Add new card in TypeSelector component

3. Update grid layout in CSS if needed

### Changing Navigation Destination

Modify the router push in `app/request/page.tsx`:

```typescript
// Current: routes to /request/factoring or /request/loan
router.push(`/request/${selectedType}`);

// Custom: route to different pages
if (selectedType === "factoring") {
  router.push("/factoring-form");
} else {
  router.push("/loan-form");
}
```

### Customizing Rate Information

Update rate displays in TypeSelector:

```typescript
<div className={styles.rateInfo}>
  <div className={styles.rateLabel}>Your Custom Label</div>
  <div className={styles.rateValue}>Your Custom Value</div>
</div>
```

## Integration with Onboarding

The request page is the default destination after completing onboarding:

```typescript
// In app/onboarding/page.tsx
const handleComplete = () => {
  localStorage.setItem(ONBOARDING_COMPLETE_KEY, "true");
  router.push("/request"); // Redirects here
};
```

## Next Steps

After type selection, the user will proceed to:

1. **File Upload** - Upload invoice or supporting documents
2. **Form Completion** - Fill in request details
3. **Review** - Review and confirm request
4. **Submission** - Submit request to blockchain

## Testing

### Manual Testing Checklist

- [ ] Both cards display correctly
- [ ] Clicking a card selects it (visual feedback)
- [ ] Only one card can be selected at a time
- [ ] Continue button appears after selection
- [ ] Continue button navigates to correct route
- [ ] Selected type is stored in localStorage
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Mobile responsive layout works
- [ ] "Learn More" links work (when implemented)
- [ ] Cards are accessible with screen readers

### Testing Selection Persistence

Check localStorage in browser console:

```javascript
// After selecting a type
localStorage.getItem("requestType"); // Should return "factoring" or "loan"
```

### Resetting Selection

Clear localStorage to test again:

```javascript
localStorage.removeItem("requestType");
```

## Future Enhancements

Potential improvements:

1. **Comparison Table**: Add side-by-side feature comparison
2. **Calculator**: Interactive calculator for estimated costs
3. **Tooltips**: Contextual help for each feature
4. **Video Explainers**: Embedded video explanations
5. **Recommendations**: AI-powered recommendation based on user profile
6. **Analytics**: Track which option is selected more frequently
7. **A/B Testing**: Test different descriptions and layouts
8. **Help Integration**: Link to detailed help articles

## Related Documentation

- [Onboarding Flow](./ONBOARDING.md)
- [Mini App Integration Guide](../../.kiro/steering/mini-app-integration.md)
- [Tasks Specification](../../.kiro/specs/mini-app-onboarding-factoring/tasks.md)
- [Requirements](../../.kiro/specs/mini-app-onboarding-factoring/requirements.md)

## API Reference

### localStorage Keys

- `requestType`: Stores selected financing type ("factoring" | "loan")
- `owrent_onboarding_complete`: Tracks onboarding completion status

### Route Structure

- `/request` - Type selection page
- `/request/factoring` - Factoring form (to be implemented)
- `/request/loan` - Loan form (to be implemented)
