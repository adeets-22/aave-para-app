"use client";

import { Market, formatCurrency, formatAPY, formatUtilization } from "@/lib/mockData";

interface MarketRowProps {
  market: Market;
  isLast: boolean;
  onSupply: () => void;
  onBorrow: () => void;
}

function TokenIcon({ symbol, color }: { symbol: string; color: string }) {
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
      style={{ backgroundColor: color }}>
      {symbol.slice(0, 2)}
    </div>
  );
}

function UtilizationBar({ value }: { value: number }) {
  const barColor =
    value > 80 ? "var(--aave-red)" : value > 60 ? "var(--aave-yellow)" : "var(--aave-teal)";

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium" style={{ color: "var(--aave-text-primary)" }}>
        {formatUtilization(value)}
      </span>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: "var(--aave-border)", width: "80px" }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.min(value, 100)}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  );
}

export default function MarketRow({ market, isLast, onSupply, onBorrow }: MarketRowProps) {
  return (
    <div
      className="grid px-6 py-4 items-center hover:opacity-90 transition-opacity"
      style={{
        gridTemplateColumns: "20% 15% 12% 15% 12% 14% 12%",
        borderBottom: isLast ? "none" : "1px solid var(--aave-border)",
        backgroundColor: "var(--aave-bg-card)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor = "var(--aave-bg-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor = "var(--aave-bg-card)";
      }}>
      {/* Asset */}
      <div className="flex items-center gap-3">
        <TokenIcon symbol={market.symbol} color={market.iconColor} />
        <div>
          <div className="text-sm font-semibold" style={{ color: "var(--aave-text-primary)" }}>
            {market.symbol}
          </div>
          <div className="text-xs" style={{ color: "var(--aave-text-secondary)" }}>
            {market.name}
          </div>
        </div>
      </div>

      {/* Total Supply */}
      <div className="text-sm font-medium" style={{ color: "var(--aave-text-primary)" }}>
        {formatCurrency(market.totalSupply)}
      </div>

      {/* Supply APY */}
      <div className="text-sm font-semibold" style={{ color: "var(--aave-green)" }}>
        {formatAPY(market.supplyAPY)}
      </div>

      {/* Total Borrow */}
      <div className="text-sm font-medium" style={{ color: "var(--aave-text-primary)" }}>
        {formatCurrency(market.totalBorrow)}
      </div>

      {/* Borrow APY */}
      <div className="text-sm font-semibold" style={{ color: "var(--aave-yellow)" }}>
        {formatAPY(market.borrowAPY)}
      </div>

      {/* Utilization */}
      <UtilizationBar value={market.utilizationRate} />

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onSupply}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-80"
          style={{
            background: "linear-gradient(135deg, var(--aave-gradient-start), var(--aave-gradient-end))",
            cursor: "pointer",
          }}>
          Supply
        </button>
        <button
          onClick={onBorrow}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
          style={{
            backgroundColor: "var(--aave-bg-hover)",
            color: "var(--aave-text-primary)",
            border: "1px solid var(--aave-border)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--aave-teal)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--aave-teal)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--aave-border)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--aave-text-primary)";
          }}>
          Borrow
        </button>
      </div>
    </div>
  );
}
