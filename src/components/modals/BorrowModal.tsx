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
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}>
      <div
        className="w-full max-w-md rounded-2xl p-6"
        style={{ backgroundColor: "var(--aave-bg-card)", border: "1px solid var(--aave-border)" }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ backgroundColor: market.iconColor }}>
              {market.symbol.slice(0, 2)}
            </div>
            <div>
              <h2 className="text-lg font-bold" style={{ color: "var(--aave-text-primary)" }}>
                Borrow {market.symbol}
              </h2>
              <p className="text-xs" style={{ color: "var(--aave-text-secondary)" }}>
                {market.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
            style={{
              backgroundColor: "var(--aave-bg-hover)",
              color: "var(--aave-text-secondary)",
              cursor: "pointer",
              border: "none",
            }}>
            ×
          </button>
        </div>

        {/* APY Info */}
        <div
          className="flex items-center justify-between p-4 rounded-xl mb-4"
          style={{ backgroundColor: "var(--aave-bg-secondary)" }}>
          <span className="text-sm" style={{ color: "var(--aave-text-secondary)" }}>
            Borrow APY
          </span>
          <span className="text-sm font-bold" style={{ color: "var(--aave-yellow)" }}>
            {formatAPY(market.borrowAPY)}
          </span>
        </div>

        {/* Amount Input */}
        <div className="mb-4">
          <label className="text-xs font-medium mb-2 block" style={{ color: "var(--aave-text-secondary)" }}>
            Amount
          </label>
          <div
            className="flex items-center gap-3 p-4 rounded-xl"
            style={{ backgroundColor: "var(--aave-bg-secondary)", border: "1px solid var(--aave-border)" }}>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-transparent text-lg font-semibold outline-none"
              style={{ color: "var(--aave-text-primary)" }}
            />
            <span className="text-sm font-medium" style={{ color: "var(--aave-text-secondary)" }}>
              {market.symbol}
            </span>
          </div>
        </div>

        {/* Transaction Summary */}
        {isValid && (
          <div
            className="p-4 rounded-xl mb-4 space-y-2"
            style={{ backgroundColor: "var(--aave-bg-secondary)", border: "1px solid var(--aave-border)" }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--aave-text-secondary)" }}>Borrow amount</span>
              <span style={{ color: "var(--aave-text-primary)" }}>
                {parsed.toLocaleString()} {market.symbol}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--aave-text-secondary)" }}>Estimated yearly interest</span>
              <span style={{ color: "var(--aave-yellow)" }}>
                -${((parsed * market.borrowAPY) / 100).toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* Health Factor Warning */}
        {isValid && (
          <div
            className="flex items-start gap-2 p-3 rounded-xl mb-4"
            style={{ backgroundColor: "rgba(244, 186, 83, 0.1)", border: "1px solid rgba(244, 186, 83, 0.3)" }}>
            <span className="text-base">⚠️</span>
            <p className="text-xs" style={{ color: "var(--aave-yellow)" }}>
              Borrowing assets will reduce your health factor. Make sure you have enough collateral.
            </p>
          </div>
        )}

        {/* Action Button */}
        <button
          className="w-full py-3 rounded-xl text-sm font-semibold transition-opacity"
          style={{
            background: isValid ? "var(--aave-yellow)" : "var(--aave-bg-hover)",
            color: isValid ? "#1a1b2e" : "var(--aave-text-muted)",
            cursor: isValid ? "pointer" : "not-allowed",
            border: "none",
            opacity: isValid ? 1 : 0.7,
          }}
          disabled={!isValid}>
          {isValid ? `Borrow ${parsed.toLocaleString()} ${market.symbol}` : "Enter an amount"}
        </button>

        <p className="text-xs text-center mt-3" style={{ color: "var(--aave-text-muted)" }}>
          This is a demo — no real transactions will occur
        </p>
      </div>
    </div>
  );
}
