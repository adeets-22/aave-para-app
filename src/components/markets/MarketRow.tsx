"use client";

import { useState } from "react";
import { Market, formatCurrency, formatAPY } from "@/lib/mockData";

interface MarketRowProps {
  market: Market;
  network: "mainnet" | "testnet";
  isLast: boolean;
  onSupply: () => void;
  onBorrow: () => void;
}

function UtilizationBar({ value }: { value: number }) {
  const barColor =
    value > 80 ? "var(--aave-red)" : value > 60 ? "var(--aave-yellow)" : "var(--aave-teal)";
  return (
    <div>
      <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--aave-text-primary)", marginBottom: "6px" }}>
        {value.toFixed(1)}%
      </div>
      <div style={{
        height: "4px",
        borderRadius: "4px",
        backgroundColor: "var(--aave-border)",
        width: "72px",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          borderRadius: "4px",
          backgroundColor: barColor,
          width: `${Math.min(value, 100)}%`,
          transition: "width 0.3s",
        }} />
      </div>
    </div>
  );
}

export default function MarketRow({ market, network, isLast, onSupply, onBorrow }: MarketRowProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "20px 24px",
        gap: "16px",
        borderBottom: isLast ? "none" : "1px solid var(--aave-border-subtle)",
        backgroundColor: hovered ? "var(--aave-bg-hover)" : "transparent",
        transition: "background-color 0.1s",
        cursor: "default",
      }}>

      {/* Asset — flex 2 */}
      <div style={{ flex: "2", display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: market.iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: 700,
          color: "#fff",
          flexShrink: 0,
        }}>
          {market.symbol.slice(0, 2)}
        </div>
        <div>
          <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--aave-text-primary)", marginBottom: "2px" }}>
            {market.name}
          </div>
          <div style={{ fontSize: "12px", color: "var(--aave-text-muted)" }}>
            {market.symbol}
          </div>
        </div>
      </div>

      {/* Total supplied — flex 1.5 */}
      <div style={{ flex: "1.5" }}>
        <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--aave-text-primary)", marginBottom: "2px" }}>
          {formatCurrency(market.totalSupply)}
        </div>
        <div style={{ fontSize: "12px", color: "var(--aave-text-muted)" }}>
          {(market.totalSupply / 1_000_000).toFixed(2)}M {market.symbol}
        </div>
      </div>

      {/* Supply APY — flex 1 */}
      <div style={{ flex: "1" }}>
        <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--aave-green)" }}>
          {formatAPY(market.supplyAPY)}
        </div>
      </div>

      {/* Total borrowed — flex 1.5 */}
      <div style={{ flex: "1.5" }}>
        <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--aave-text-primary)", marginBottom: "2px" }}>
          {formatCurrency(market.totalBorrow)}
        </div>
        <div style={{ fontSize: "12px", color: "var(--aave-text-muted)" }}>
          {(market.totalBorrow / 1_000_000).toFixed(2)}M {market.symbol}
        </div>
      </div>

      {/* Borrow APY — flex 1 */}
      <div style={{ flex: "1" }}>
        <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--aave-yellow)" }}>
          {formatAPY(market.borrowAPY)}
        </div>
      </div>

      {/* Utilization — flex 1.2 */}
      <div style={{ flex: "1.2" }}>
        <UtilizationBar value={market.utilizationRate} />
      </div>

      {/* Actions — flex 1.2 */}
      <div style={{ flex: "1.2", display: "flex", gap: "8px", alignItems: "center" }}>
        {network === "testnet" && !market.isNative ? (
          <span style={{ fontSize: "11px", color: "var(--aave-text-muted)", whiteSpace: "nowrap" }}>
            ETH only on testnet
          </span>
        ) : (
          <button
            onClick={onSupply}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              background: "linear-gradient(135deg, #b6509e, #2ebac6)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}>
            Supply
          </button>
        )}
        <button
          onClick={onBorrow}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid var(--aave-border)",
            background: "transparent",
            color: "var(--aave-text-secondary)",
            fontWeight: 600,
            fontSize: "13px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "border-color 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--aave-teal)";
            e.currentTarget.style.color = "var(--aave-teal)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--aave-border)";
            e.currentTarget.style.color = "var(--aave-text-secondary)";
          }}>
          Borrow
        </button>
      </div>
    </div>
  );
}
