"use client";

import { MARKETS, Market } from "@/lib/mockData";
import MarketRow from "./MarketRow";

interface MarketsTableProps {
  onSupply: (market: Market) => void;
  onBorrow: (market: Market) => void;
}

const COLUMNS = [
  { label: "Asset", width: "20%" },
  { label: "Total Supply", width: "15%" },
  { label: "Supply APY", width: "12%" },
  { label: "Total Borrow", width: "15%" },
  { label: "Borrow APY", width: "12%" },
  { label: "Utilization", width: "14%" },
  { label: "Actions", width: "12%" },
];

export default function MarketsTable({ onSupply, onBorrow }: MarketsTableProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: "var(--aave-bg-card)", border: "1px solid var(--aave-border)" }}>
      {/* Table Header */}
      <div
        className="grid px-6 py-4 text-xs font-semibold uppercase tracking-wider"
        style={{
          gridTemplateColumns: COLUMNS.map((c) => c.width).join(" "),
          color: "var(--aave-text-secondary)",
          borderBottom: "1px solid var(--aave-border)",
          backgroundColor: "var(--aave-bg-secondary)",
        }}>
        {COLUMNS.map((col) => (
          <div key={col.label}>{col.label}</div>
        ))}
      </div>

      {/* Rows */}
      <div>
        {MARKETS.map((market, i) => (
          <MarketRow
            key={market.symbol}
            market={market}
            isLast={i === MARKETS.length - 1}
            onSupply={() => onSupply(market)}
            onBorrow={() => onBorrow(market)}
          />
        ))}
      </div>
    </div>
  );
}
