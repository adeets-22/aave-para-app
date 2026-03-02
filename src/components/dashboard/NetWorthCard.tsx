"use client";

import { MOCK_NET_WORTH, formatCurrency, formatAPY } from "@/lib/mockData";

function StatCard({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div
      className="flex flex-col gap-1 px-6 py-4 rounded-xl"
      style={{ backgroundColor: "var(--aave-bg-secondary)" }}>
      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--aave-text-secondary)" }}>
        {label}
      </span>
      <span
        className="text-xl font-bold"
        style={{ color: valueColor ?? "var(--aave-text-primary)" }}>
        {value}
      </span>
    </div>
  );
}

export default function NetWorthCard() {
  const { netWorth, netAPY, healthFactor, totalSupplied, totalBorrowed } = MOCK_NET_WORTH;

  const healthColor =
    healthFactor >= 2 ? "var(--aave-green)" : healthFactor >= 1.2 ? "var(--aave-yellow)" : "var(--aave-red)";

  return (
    <div
      className="rounded-2xl p-6"
      style={{ backgroundColor: "var(--aave-bg-card)", border: "1px solid var(--aave-border)" }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold" style={{ color: "var(--aave-text-primary)" }}>
          Net Worth
        </h2>
        <span className="text-2xl font-bold gradient-text">{formatCurrency(netWorth)}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Net APY" value={formatAPY(netAPY)} valueColor="var(--aave-green)" />
        <StatCard
          label="Health Factor"
          value={healthFactor.toFixed(2)}
          valueColor={healthColor}
        />
        <StatCard label="Total Supplied" value={formatCurrency(totalSupplied)} />
        <StatCard label="Total Borrowed" value={formatCurrency(totalBorrowed)} valueColor="var(--aave-yellow)" />
      </div>
    </div>
  );
}
