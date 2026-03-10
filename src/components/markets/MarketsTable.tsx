"use client";

import { MARKETS, Market } from "@/lib/mockData";
import MarketRow from "./MarketRow";

interface MarketsTableProps {
  network: "mainnet" | "testnet";
  onSupply: (market: Market) => void;
  onBorrow: (market: Market) => void;
}

const COLUMNS = [
  { label: "Asset", flex: "2" },
  { label: "Total supplied", flex: "1.5" },
  { label: "Supply APY", flex: "1" },
  { label: "Total borrowed", flex: "1.5" },
  { label: "Borrow APY", flex: "1" },
  { label: "Utilization", flex: "1.2" },
  { label: "", flex: "1.2" },
];

export default function MarketsTable({ network, onSupply, onBorrow }: MarketsTableProps) {
  return (
    <div style={{
      borderRadius: "12px",
      backgroundColor: "var(--aave-bg-card)",
      border: "1px solid var(--aave-border)",
      overflow: "hidden",
    }}>
      {/* Section header */}
      <div style={{
        padding: "20px 24px 18px",
        borderBottom: "1px solid var(--aave-border-subtle)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{ fontWeight: 600, fontSize: "16px", color: "var(--aave-text-primary)" }}>
          Assets
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "12px", color: "var(--aave-text-muted)" }}>
            {MARKETS.length} assets
          </span>
          <span style={{
            padding: "2px 10px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: 600,
            background: network === "mainnet" ? "rgba(46,186,198,0.15)" : "rgba(234,179,8,0.15)",
            color: network === "mainnet" ? "var(--aave-teal)" : "#d97706",
          }}>
            {network === "mainnet" ? "Ethereum Mainnet" : "Sepolia Testnet"}
          </span>
        </div>
      </div>

      {/* Column headers */}
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 24px",
        borderBottom: "1px solid var(--aave-border-subtle)",
        gap: "16px",
      }}>
        {COLUMNS.map((col, i) => (
          <div
            key={i}
            style={{
              flex: col.flex,
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.6px",
              color: "var(--aave-text-muted)",
            }}>
            {col.label}
          </div>
        ))}
      </div>

      {/* Rows */}
      {MARKETS.map((market, i) => (
        <MarketRow
          key={market.symbol}
          market={market}
          network={network}
          isLast={i === MARKETS.length - 1}
          onSupply={() => onSupply(market)}
          onBorrow={() => onBorrow(market)}
        />
      ))}
    </div>
  );
}
