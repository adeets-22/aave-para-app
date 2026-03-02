"use client";

import { MOCK_NET_WORTH, formatCurrency, formatAPY } from "@/lib/mockData";

export default function NetWorthCard() {
  const { netWorth, netAPY, healthFactor, totalSupplied, totalBorrowed } = MOCK_NET_WORTH;
  const healthColor =
    healthFactor >= 2 ? "var(--aave-green)" : healthFactor >= 1.2 ? "var(--aave-yellow)" : "var(--aave-red)";

  const stats = [
    { label: "Net APY", value: formatAPY(netAPY), color: "var(--aave-green)" },
    { label: "Health factor", value: healthFactor.toFixed(2), color: healthColor },
    { label: "Total supplied", value: formatCurrency(totalSupplied), color: "var(--aave-text-primary)" },
    { label: "Total borrowed", value: formatCurrency(totalBorrowed), color: "var(--aave-yellow)" },
  ];

  return (
    <div style={{
      borderRadius: "12px",
      backgroundColor: "var(--aave-bg-card)",
      border: "1px solid var(--aave-border)",
      padding: "24px 28px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <span style={{ fontSize: "16px", fontWeight: 600, color: "var(--aave-text-primary)" }}>Net Worth</span>
        <span style={{
          fontSize: "28px",
          fontWeight: 700,
          color: "var(--aave-text-primary)",
          letterSpacing: "-0.5px",
        }}>
          {formatCurrency(netWorth)}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {stats.map(({ label, value, color }) => (
          <div key={label} style={{
            padding: "16px 20px",
            borderRadius: "10px",
            backgroundColor: "var(--aave-bg-row)",
            border: "1px solid var(--aave-border-subtle)",
          }}>
            <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--aave-text-muted)", marginBottom: "8px" }}>
              {label}
            </div>
            <div style={{ fontSize: "20px", fontWeight: 700, color, letterSpacing: "-0.3px" }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
