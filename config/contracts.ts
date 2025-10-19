/**
 * Contract Configuration
 * 
 * IMPORTANT: These are placeholder addresses and ABIs.
 * Update these values when actual contracts are deployed to Base Sepolia/Mainnet.
 */

// Placeholder contract addresses
export const CONTRACTS = {
  ATTESTATION_REGISTRY: "0x0000000000000000000000000000000000000000",
} as const;

// Placeholder ABI for AttestationRegistry
export const ATTESTATION_REGISTRY_ABI = [
  {
    type: "function",
    name: "createAttestation",
    stateMutability: "nonpayable",
    inputs: [
      { name: "documentHash", type: "bytes32" },
      { name: "encryptedAmount", type: "bytes" },
      { name: "encryptedRepaymentAmount", type: "bytes" },
      { name: "dueDate", type: "uint256" },
      { name: "encryptedSEPA", type: "bytes" },
      { name: "attestationType", type: "uint8" },
    ],
    outputs: [{ name: "attestationId", type: "uint256" }],
  },
  {
    type: "function",
    name: "getAttestation",
    stateMutability: "view",
    inputs: [{ name: "attestationId", type: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "user", type: "address" },
          { name: "documentHash", type: "bytes32" },
          { name: "amount", type: "uint256" },
          { name: "repaymentAmount", type: "uint256" },
          { name: "dueDate", type: "uint256" },
          { name: "encryptedSEPA", type: "bytes" },
          { name: "attestationType", type: "uint8" },
          { name: "status", type: "uint8" },
          { name: "createdAt", type: "uint256" },
        ],
      },
    ],
  },
  {
    type: "function",
    name: "updateStatus",
    stateMutability: "nonpayable",
    inputs: [
      { name: "attestationId", type: "uint256" },
      { name: "newStatus", type: "uint8" },
    ],
    outputs: [],
  },
  {
    type: "event",
    name: "AttestationCreated",
    inputs: [
      { name: "attestationId", type: "uint256", indexed: true },
      { name: "user", type: "address", indexed: true },
      { name: "attestationType", type: "uint8", indexed: false },
    ],
  },
  {
    type: "event",
    name: "AttestationStatusUpdated",
    inputs: [
      { name: "attestationId", type: "uint256", indexed: true },
      { name: "newStatus", type: "uint8", indexed: false },
    ],
  },
] as const;

// Attestation types enum
export enum AttestationType {
  FACTORING = 0,
  LOAN = 1,
}

// Attestation status enum
export enum AttestationStatus {
  PENDING = 0,
  ACTIVE = 1,
  COMPLETED = 2,
  CANCELLED = 3,
}

// Network configuration
export const NETWORKS = {
  BASE_SEPOLIA: {
    id: 84532,
    name: "Base Sepolia",
    rpcUrl: "https://sepolia.base.org",
    blockExplorer: "https://sepolia.basescan.org",
  },
  BASE_MAINNET: {
    id: 8453,
    name: "Base",
    rpcUrl: "https://mainnet.base.org",
    blockExplorer: "https://basescan.org",
  },
} as const;

// TODO: Update contract addresses when deployed
// TODO: Update ABIs to match actual contract implementation
// TODO: Add additional contract configurations as needed
