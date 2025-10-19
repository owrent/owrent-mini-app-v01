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
- `/request` - Request creation page (redirects here after onboarding)

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

## Learn More

For detailed step-by-step instructions, see the [Create a Mini App tutorial](https://docs.base.org/docs/mini-apps/quickstart/create-new-miniapp/) in the Base documentation.