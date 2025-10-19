const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
  accountAssociation: {
    header: "",
    payload: "",
    signature: ""
  },
  miniapp: {
    version: "1",
    name: "Owrent", 
    subtitle: "Invoice Factoring & Short-Term Loans", 
    description: "Get instant liquidity for your invoices with transparent fees and secure attestations",
    screenshotUrls: [`${ROOT_URL}/screenshot-portrait.png`],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/hero.png`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "finance",
    tags: ["finance", "factoring", "loans", "invoices", "defi"],
    heroImageUrl: `${ROOT_URL}/hero.png`, 
    tagline: "Instant liquidity for your invoices",
    ogTitle: "Owrent - Invoice Factoring Made Simple",
    ogDescription: "Get instant liquidity for your invoices with transparent fees and secure attestations on Base",
    ogImageUrl: `${ROOT_URL}/hero.png`,
  },
} as const;

