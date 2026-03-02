"use client";

import { MOCK_BORROW_POSITIONS, formatCurrency, formatAPY } from "@/lib/mockData";

export default function BorrowPositions() {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: "var(--aave-bg-card)", border: "1px solid var(--aave-border)" }}>
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid var(--aave-border)", backgroundColor: "var(--aave-bg-secondary)" }}>
        <h3 className="font-semibold" style={{ color: "var(--aave-text-primary)" }}>
          Your Borrows
        </h3>
        <span
          className="text-xs px-2 py-1 rounded-full font-medium"
          style={{ backgroundColor: "var(--aave-bg-hover)", color: "var(--aave-yellow)" }}>
          {MOCK_BORROW_POSITIONS.length} positions
        </span>
      </div>

      {/* Column headers */}
      <div
        className="grid px-6 py-3 text-xs font-semibold uppercase tracking-wider"
        style={{
          gridTemplateColumns: "40% 25% 20% 15%",
          color: "var(--aave-text-secondary)",
          borderBottom: "1px solid var(--aave-border)",
        }}>
        <div>Asset</div>
        <div>Balance</div>
        <div>APY</div>
        <div>Actions</div>
      </div>

      {/* Rows */}
      {MOCK_BORROW_POSITIONS.map((pos, i) => (
        <div
          key={pos.symbol}
          className="grid px-6 py-4 items-center"
          style={{
            gridTemplateColumns: "40% 25% 20% 15%",
            borderBottom: i < MOCK_BORROW_POSITIONS.length - 1 ? "1px solid var(--aave-border)" : "none",
          }}>
          {/* Asset */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: pos.iconColor }}>
              {pos.symbol.slice(0, 2)}
            </div>
            <div>
              <div className="text-sm font-semibold" style={{ color: "var(--aave-text-primary)" }}>
                {pos.symbol}
              </div>
              <div className="text-xs" style={{ color: "var(--aave-text-secondary)" }}>
                {pos.name}
              </div>
            </div>
          </div>

          {/* Balance */}
          <div>
            <div className="text-sm font-medium" style={{ color: "var(--aave-text-primary)" }}>
              {pos.amount.toLocaleString()} {pos.symbol}
            </div>
            <div className="text-xs" style={{ color: "var(--aave-text-secondary)" }}>
              {formatCurrency(pos.valueUSD)}
            </div>
          </div>

          {/* APY */}
          <div className="text-sm font-semibold" style={{ color: "var(--aave-yellow)" }}>
            {formatAPY(pos.apy)}
          </div>

          {/* Actions */}
          <button
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{
              backgroundColor: "var(--aave-bg-hover)",
              color: "var(--aave-text-secondary)",
              border: "1px solid var(--aave-border)",
              cursor: "pointer",
            }}>
            Repay
          </button>
        </div>
      ))}
    </div>
  );
}
