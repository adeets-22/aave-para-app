"use client";

import { useState } from "react";
import { Market, formatAPY } from "@/lib/mockData";

interface SupplyModalProps {
  market: Market;
  onClose: () => void;
}

export default function SupplyModal({ market, onClose }: SupplyModalProps) {
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
                Supply {market.symbol}
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
            Supply APY
          </span>
          <span className="text-sm font-bold" style={{ color: "var(--aave-green)" }}>
            {formatAPY(market.supplyAPY)}
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
              <span style={{ color: "var(--aave-text-secondary)" }}>Supply amount</span>
              <span style={{ color: "var(--aave-text-primary)" }}>
                {parsed.toLocaleString()} {market.symbol}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--aave-text-secondary)" }}>Estimated yearly earnings</span>
              <span style={{ color: "var(--aave-green)" }}>
                +${((parsed * market.supplyAPY) / 100).toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity"
          style={{
            background: isValid
              ? "linear-gradient(135deg, var(--aave-gradient-start), var(--aave-gradient-end))"
              : "var(--aave-bg-hover)",
            color: isValid ? "white" : "var(--aave-text-muted)",
            cursor: isValid ? "pointer" : "not-allowed",
            border: "none",
            opacity: isValid ? 1 : 0.7,
          }}
          disabled={!isValid}>
          {isValid ? `Supply ${parsed.toLocaleString()} ${market.symbol}` : "Enter an amount"}
        </button>

        <p className="text-xs text-center mt-3" style={{ color: "var(--aave-text-muted)" }}>
          This is a demo — no real transactions will occur
        </p>
      </div>
    </div>
  );
}
