"use client";

import { useState } from "react";
import styles from "./help.module.css";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Help Center</h1>
        <p className={styles.subtitle}>
          Learn about invoice factoring, loans, and how Owrent works
        </p>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.sections}>
          {/* Factoring Section */}
          <div className={styles.section} id="factoring">
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("factoring")}
            >
              <h2>💰 What is Invoice Factoring?</h2>
              <span className={styles.expandIcon}>
                {expandedSection === "factoring" ? "−" : "+"}
              </span>
            </button>
            {expandedSection === "factoring" && (
              <div className={styles.sectionContent}>
                <p>
                  Invoice factoring is a financial transaction where you sell your accounts
                  receivable (invoices) to a third party at a discount in exchange for
                  immediate cash.
                </p>
                <h3>How It Works:</h3>
                <ol>
                  <li>You upload your invoice to Owrent</li>
                  <li>Bidders compete to purchase your invoice at the best rate</li>
                  <li>You receive immediate payment (invoice amount minus discount)</li>
                  <li>The buyer collects payment from your customer when due</li>
                </ol>
                <h3>Typical Discount Rates:</h3>
                <p>
                  Discount rates typically range from <strong>2-10%</strong> depending on:
                </p>
                <ul>
                  <li>Invoice amount</li>
                  <li>Payment terms (30, 60, 90 days)</li>
                  <li>Customer creditworthiness</li>
                  <li>Industry risk profile</li>
                </ul>
                <h3>Example:</h3>
                <div className={styles.example}>
                  <p><strong>Invoice Amount:</strong> €10,000</p>
                  <p><strong>Discount Rate:</strong> 5%</p>
                  <p><strong>You Receive:</strong> €9,500</p>
                  <p><strong>Platform Fee (0.5%):</strong> €50</p>
                  <p><strong>Net Amount:</strong> €9,450</p>
                </div>
              </div>
            )}
          </div>

          {/* Loans Section */}
          <div className={styles.section} id="loans">
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("loans")}
            >
              <h2>🏦 What are Short-Term Loans?</h2>
              <span className={styles.expandIcon}>
                {expandedSection === "loans" ? "−" : "+"}
              </span>
            </button>
            {expandedSection === "loans" && (
              <div className={styles.sectionContent}>
                <p>
                  A short-term loan allows you to borrow money against your invoice while
                  maintaining ownership. You repay the loan when your customer pays the invoice.
                </p>
                <h3>How It Works:</h3>
                <ol>
                  <li>You request a loan amount (up to invoice value)</li>
                  <li>Lenders compete to offer the best interest rate</li>
                  <li>You receive the loan amount immediately</li>
                  <li>You repay the loan + interest when your customer pays</li>
                </ol>
                <h3>Interest Rates:</h3>
                <p>
                  Interest rates are calculated based on loan duration (maximum 30 days):
                </p>
                <ul>
                  <li>7 days: ~1-2% interest</li>
                  <li>14 days: ~2-4% interest</li>
                  <li>30 days: ~4-8% interest</li>
                </ul>
                <h3>Example:</h3>
                <div className={styles.example}>
                  <p><strong>Loan Amount:</strong> €8,000</p>
                  <p><strong>Duration:</strong> 14 days</p>
                  <p><strong>Interest Rate:</strong> 3%</p>
                  <p><strong>Interest:</strong> €240</p>
                  <p><strong>Platform Fee (0.5%):</strong> €40</p>
                  <p><strong>Total Repayment:</strong> €8,280</p>
                </div>
              </div>
            )}
          </div>

          {/* Attestations Section */}
          <div className={styles.section} id="attestations">
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("attestations")}
            >
              <h2>🔒 Understanding Attestations</h2>
              <span className={styles.expandIcon}>
                {expandedSection === "attestations" ? "−" : "+"}
              </span>
            </button>
            {expandedSection === "attestations" && (
              <div className={styles.sectionContent}>
                <p>
                  An attestation is a cryptographic proof of your financing agreement stored
                  securely on the blockchain.
                </p>
                <h3>Why Attestations?</h3>
                <ul>
                  <li><strong>Security:</strong> Encrypted data that only you can access</li>
                  <li><strong>Transparency:</strong> Immutable record of agreement terms</li>
                  <li><strong>Privacy:</strong> Sensitive details remain confidential</li>
                  <li><strong>Proof:</strong> Verifiable record for accounting and compliance</li>
                </ul>
                <h3>What&apos;s Stored:</h3>
                <ul>
                  <li>Agreement type (factoring or loan)</li>
                  <li>Encrypted amount and terms</li>
                  <li>SEPA authorization details</li>
                  <li>Repayment schedule</li>
                  <li>Status updates</li>
                </ul>
              </div>
            )}
          </div>

          {/* SEPA Section */}
          <div className={styles.section} id="sepa">
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("sepa")}
            >
              <h2>💳 SEPA Authorization Explained</h2>
              <span className={styles.expandIcon}>
                {expandedSection === "sepa" ? "−" : "+"}
              </span>
            </button>
            {expandedSection === "sepa" && (
              <div className={styles.sectionContent}>
                <p>
                  SEPA (Single Euro Payments Area) authorization allows automatic repayment
                  collection from your bank account.
                </p>
                <h3>Why SEPA?</h3>
                <ul>
                  <li><strong>Automatic:</strong> No manual payment required</li>
                  <li><strong>Secure:</strong> Protected by EU banking regulations</li>
                  <li><strong>Transparent:</strong> You know exact amount and date</li>
                  <li><strong>Revocable:</strong> You can cancel if needed</li>
                </ul>
                <h3>How It Works:</h3>
                <ol>
                  <li>You provide your IBAN and authorize repayment</li>
                  <li>Authorization is encrypted and stored on-chain</li>
                  <li>On repayment date, amount is automatically collected</li>
                  <li>You receive confirmation of payment</li>
                </ol>
                <h3>Your Protection:</h3>
                <ul>
                  <li>Fixed repayment amount (no surprises)</li>
                  <li>Fixed repayment date</li>
                  <li>8-week refund right under SEPA rules</li>
                  <li>Encrypted bank details</li>
                </ul>
              </div>
            )}
          </div>

          {/* Fees Section */}
          <div className={styles.section} id="fees">
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("fees")}
            >
              <h2>💵 Fee Structure</h2>
              <span className={styles.expandIcon}>
                {expandedSection === "fees" ? "−" : "+"}
              </span>
            </button>
            {expandedSection === "fees" && (
              <div className={styles.sectionContent}>
                <p>
                  Owrent charges transparent, competitive fees for our services.
                </p>
                <h3>Platform Fee:</h3>
                <p>
                  <strong>0.5%</strong> of the transaction amount
                </p>
                <p>
                  This covers platform operations, security, and support.
                </p>
                <h3>Settlement Fee (Factoring Only):</h3>
                <p>
                  <strong>0.1%</strong> for cross-chain settlements
                </p>
                <p>
                  Only applies when settling in a different currency (e.g., Litecoin).
                </p>
                <h3>No Hidden Fees:</h3>
                <ul>
                  <li>No application fees</li>
                  <li>No monthly fees</li>
                  <li>No early repayment penalties</li>
                  <li>No cancellation fees</li>
                </ul>
                <h3>Fee Calculation Example:</h3>
                <div className={styles.example}>
                  <p><strong>Transaction Amount:</strong> €10,000</p>
                  <p><strong>Platform Fee (0.5%):</strong> €50</p>
                  <p><strong>Settlement Fee (0.1%):</strong> €10</p>
                  <p><strong>Total Fees:</strong> €60</p>
                  <p><strong>Net Amount:</strong> €9,940</p>
                </div>
              </div>
            )}
          </div>

          {/* FAQs Section */}
          <div className={styles.section} id="faqs">
            <button
              className={styles.sectionHeader}
              onClick={() => toggleSection("faqs")}
            >
              <h2>❓ Frequently Asked Questions</h2>
              <span className={styles.expandIcon}>
                {expandedSection === "faqs" ? "−" : "+"}
              </span>
            </button>
            {expandedSection === "faqs" && (
              <div className={styles.sectionContent}>
                <h3>How long does approval take?</h3>
                <p>
                  Most requests are approved within 24 hours. Complex cases may take up to
                  48 hours.
                </p>

                <h3>What if my customer doesn&apos;t pay?</h3>
                <p>
                  For factoring: The buyer assumes the payment risk. For loans: You remain
                  responsible for repayment regardless of customer payment.
                </p>

                <h3>Can I cancel after submitting?</h3>
                <p>
                  Yes, you can cancel before approval at no cost. After approval, cancellation
                  may incur fees.
                </p>

                <h3>Is my data secure?</h3>
                <p>
                  Yes. All sensitive data is encrypted using industry-leading encryption
                  (ZAMA FHEVM) and stored securely on the blockchain.
                </p>

                <h3>What currencies are supported?</h3>
                <p>
                  We support EUR for invoices. Settlement can be in EUR or cryptocurrency
                  (ETH, Litecoin).
                </p>

                <h3>Do I need a crypto wallet?</h3>
                <p>
                  Yes, you need a Web3 wallet (like Coinbase Wallet or MetaMask) to sign
                  transactions and receive payments.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.contactSection}>
          <h2>Still have questions?</h2>
          <p>Our support team is here to help</p>
          <button className={styles.contactButton}>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
