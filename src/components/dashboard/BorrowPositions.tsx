"use client";

import { MOCK_BORROW_POSITIONS, formatCurrency, formatAPY } from "@/lib/mockData";

export default function BorrowPositions() {
  return (
    <div style={{
      borderRadius: "12px",
      backgroundColor: "var(--aave-bg-card)",
      border: "1px solid var(--aave-border)",
      overflow: "hidden",
    }}>
      <div style={{
        padding: "18px 24px",
        borderBottom: "1px solid var(--aave-border-subtle)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{ fontWeight: 600, fontSize: "15px", color: "var(--aave-text-primary)" }}>
          Your borrows
        </span>
        <span style={{
          padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600,
          backgroundColor: "rgba(244,186,83,0.15)", color: "var(--aave-yellow)",
        }}>
          {MOCK_BORROW_POSITIONS.length} active
        </span>
      </div>

      {/* Column headers */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1.5fr 1fr 1fr",
        padding: "10px 24px",
        borderBottom: "1px solid var(--aave-border-subtle)",
        gap: "16px",
      }}>
        {["Asset", "Balance", "APY", ""].map((col) => (
          <div key={col} style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--aave-text-muted)" }}>
            {col}
          </div>
        ))}
      </div>

      {MOCK_BORROW_POSITIONS.map((pos, i) => (
        <div key={pos.symbol} style={{
          display: "grid",
          gridTemplateColumns: "2fr 1.5fr 1fr 1fr",
          padding: "18px 24px",
          gap: "16px",
          alignItems: "center",
          borderBottom: i < MOCK_BORROW_POSITIONS.length - 1 ? "1px solid var(--aave-border-subtle)" : "none",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              backgroundColor: pos.iconColor,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px", fontWeight: 700, color: "#fff", flexShrink: 0,
            }}>
              {pos.symbol.slice(0, 2)}
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--aave-text-primary)", marginBottom: "2px" }}>{pos.symbol}</div>
              <div style={{ fontSize: "11px", color: "var(--aave-text-muted)" }}>{pos.name}</div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--aave-text-primary)", marginBottom: "2px" }}>
              {pos.amount.toLocaleString()}
            </div>
            <div style={{ fontSize: "11px", color: "var(--aave-text-muted)" }}>{formatCurrency(pos.valueUSD)}</div>
          </div>

          <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--aave-yellow)" }}>
            {formatAPY(pos.apy)}
          </div>

          <button style={{
            padding: "7px 14px",
            borderRadius: "6px",
            border: "1px solid var(--aave-border)",
            background: "transparent",
            color: "var(--aave-text-secondary)",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
          }}>
            Repay
          </button>
        </div>
      ))}
    </div>
  );
}
