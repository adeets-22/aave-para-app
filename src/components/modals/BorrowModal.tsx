"use client";

import { useState } from "react";
import { Market, formatAPY } from "@/lib/mockData";

interface BorrowModalProps {
  market: Market;
  onClose: () => void;
}

export default function BorrowModal({ market, onClose }: BorrowModalProps) {
  const [amount, setAmount] = useState("");
  const parsed = parseFloat(amount) || 0;
  const isValid = parsed > 0;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        backgroundColor: "rgba(0,0,0,0.65)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
      }}>
      <div style={{
        width: "100%", maxWidth: "440px",
        borderRadius: "16px",
        backgroundColor: "var(--aave-bg-card)",
        border: "1px solid var(--aave-border)",
        padding: "28px",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "50%",
              backgroundColor: market.iconColor,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "13px", fontWeight: 700, color: "#fff",
            }}>
              {market.symbol.slice(0, 2)}
            </div>
            <div>
              <div style={{ fontSize: "17px", fontWeight: 700, color: "var(--aave-text-primary)" }}>
                Borrow {market.symbol}
              </div>
              <div style={{ fontSize: "12px", color: "var(--aave-text-muted)" }}>{market.name}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "32px", height: "32px", borderRadius: "50%",
              border: "none", background: "var(--aave-bg-hover)",
              color: "var(--aave-text-secondary)", fontSize: "18px",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
            ×
          </button>
        </div>

        {/* APY pill */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 18px", borderRadius: "10px",
          backgroundColor: "var(--aave-bg-row)",
          border: "1px solid var(--aave-border-subtle)",
          marginBottom: "16px",
        }}>
          <span style={{ fontSize: "13px", color: "var(--aave-text-secondary)" }}>Borrow APY</span>
          <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--aave-yellow)" }}>{formatAPY(market.borrowAPY)}</span>
        </div>

        {/* Amount input */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--aave-text-muted)", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Amount
          </label>
          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "14px 18px", borderRadius: "10px",
            backgroundColor: "var(--aave-bg-row)",
            border: "1px solid var(--aave-border)",
          }}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                fontSize: "18px", fontWeight: 600, color: "var(--aave-text-primary)",
              }}
            />
            <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--aave-text-secondary)" }}>
              {market.symbol}
            </span>
          </div>
        </div>

        {/* Summary + warning */}
        {isValid && (
          <>
            <div style={{
              padding: "14px 18px", borderRadius: "10px",
              backgroundColor: "var(--aave-bg-row)",
              border: "1px solid var(--aave-border-subtle)",
              marginBottom: "12px",
            }}>
              {[
                { label: "Borrow amount", value: `${parsed.toLocaleString()} ${market.symbol}`, color: "var(--aave-text-primary)" },
                { label: "Est. yearly interest", value: `-$${((parsed * market.borrowAPY) / 100).toFixed(2)}`, color: "var(--aave-yellow)" },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                  <span style={{ fontSize: "13px", color: "var(--aave-text-secondary)" }}>{label}</span>
                  <span style={{ fontSize: "13px", fontWeight: 600, color }}>{value}</span>
                </div>
              ))}
            </div>
            <div style={{
              padding: "12px 16px", borderRadius: "10px", marginBottom: "16px",
              backgroundColor: "rgba(244,186,83,0.08)",
              border: "1px solid rgba(244,186,83,0.25)",
              display: "flex", gap: "10px",
            }}>
              <span style={{ fontSize: "14px" }}>⚠</span>
              <p style={{ fontSize: "12px", color: "var(--aave-yellow)", lineHeight: "1.5" }}>
                Borrowing reduces your health factor. Ensure you have sufficient collateral.
              </p>
            </div>
          </>
        )}

        <button
          disabled={!isValid}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            background: isValid ? "var(--aave-yellow)" : "var(--aave-bg-hover)",
            color: isValid ? "#1a1b2e" : "var(--aave-text-muted)",
            fontSize: "15px",
            fontWeight: 700,
            cursor: isValid ? "pointer" : "not-allowed",
          }}>
          {isValid ? `Borrow ${parsed.toLocaleString()} ${market.symbol}` : "Enter an amount"}
        </button>
        <p style={{ textAlign: "center", marginTop: "12px", fontSize: "11px", color: "var(--aave-text-muted)" }}>
          Demo only — no real transactions
        </p>
      </div>
    </div>
  );
}
