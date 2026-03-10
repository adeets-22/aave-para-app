"use client";

import { useState } from "react";
import { Market, formatAPY, AAVE_POOL } from "@/lib/mockData";
import { useClient, useWallet } from "@getpara/react-sdk";
import { createParaViemClient } from "@getpara/viem-v2-integration";
import { http } from "viem";
import { mainnet, sepolia } from "viem/chains";

// Aave V3 WrappedTokenGatewayV3 — Sepolia
const WETH_GATEWAY_SEPOLIA = "0x387d311e47e80b498169e6fb51d3193167d89F7D" as const;

const WETH_GATEWAY_ABI = [
  {
    name: "depositETH",
    type: "function",
    inputs: [
      { name: "pool", type: "address" },
      { name: "onBehalfOf", type: "address" },
      { name: "referralCode", type: "uint16" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
] as const;

const ERC20_ABI = [
  {
    name: "approve",
    type: "function",
    inputs: [
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
  },
] as const;

interface SupplyModalProps {
  market: Market;
  network: "mainnet" | "testnet";
  onClose: () => void;
}

export default function SupplyModal({ market, network, onClose }: SupplyModalProps) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const para = useClient();
  const { data: wallet } = useWallet();

  const parsed = parseFloat(amount) || 0;
  const isValid = parsed > 0;

  const chain = network === "mainnet" ? mainnet : sepolia;
  const pool = network === "mainnet" ? AAVE_POOL.mainnet : AAVE_POOL.sepolia;
  const tokenAddress = network === "mainnet"
    ? (market.mainnetTokenAddress ?? market.tokenAddress)
    : market.tokenAddress;
  const etherscanBase = network === "mainnet" ? "https://etherscan.io" : "https://sepolia.etherscan.io";
  const networkLabel = network === "mainnet" ? "Ethereum Mainnet" : "Sepolia Testnet";

  const handleSupply = async () => {
    if (!para || !isValid) return;
    setLoading(true);
    setError(null);
    try {
      const client = createParaViemClient(para, {
        chain,
        transport: http(),
      });
      const value = BigInt(Math.round(parsed * 1e18));
      const hash = market.isNative
        ? network === "testnet"
          ? await client.writeContract({
              address: WETH_GATEWAY_SEPOLIA,
              abi: WETH_GATEWAY_ABI,
              functionName: "depositETH",
              args: [pool, wallet?.address as `0x${string}`, 0],
              value,
              chain,
            })
          : await client.sendTransaction({
              to: pool,
              value,
              chain,
            })
        : await client.writeContract({
            address: tokenAddress as `0x${string}`,
            abi: ERC20_ABI,
            functionName: "approve",
            args: [pool, BigInt(Math.round(parsed * 1e6))],
            chain,
          });

      setTxHash(hash);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        backgroundColor: "rgba(0,0,0,0.65)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px",
      }}>
      <div style={{
        width: "100%", maxWidth: "440px",
        borderRadius: "16px",
        backgroundColor: "var(--aave-bg-card)",
        border: "1px solid var(--aave-border)",
        padding: "28px",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "50%",
              backgroundColor: market.iconColor,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "13px", fontWeight: 700, color: "#fff",
            }}>
              {market.symbol.slice(0, 2)}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ fontSize: "17px", fontWeight: 700, color: "var(--aave-text-primary)" }}>
                  Supply {market.symbol}
                </div>
                <span style={{
                  padding: "2px 8px",
                  borderRadius: "20px",
                  fontSize: "10px",
                  fontWeight: 600,
                  background: network === "mainnet" ? "rgba(46,186,198,0.15)" : "rgba(234,179,8,0.15)",
                  color: network === "mainnet" ? "var(--aave-teal)" : "#d97706",
                }}>
                  {networkLabel}
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "var(--aave-text-muted)" }}>{market.name}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "32px", height: "32px", borderRadius: "50%",
              border: "none", background: "var(--aave-bg-hover)",
              color: "var(--aave-text-secondary)", fontSize: "18px",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
            ×
          </button>
        </div>

        {/* APY pill */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 18px", borderRadius: "10px",
          backgroundColor: "var(--aave-bg-row)",
          border: "1px solid var(--aave-border-subtle)",
          marginBottom: "16px",
        }}>
          <span style={{ fontSize: "13px", color: "var(--aave-text-secondary)" }}>Supply APY</span>
          <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--aave-green)" }}>{formatAPY(market.supplyAPY)}</span>
        </div>

        {/* Amount input */}
        <div style={{ marginBottom: "16px" }}>
          <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--aave-text-muted)", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Amount
          </label>
          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "14px 18px", borderRadius: "10px",
            backgroundColor: "var(--aave-bg-row)",
            border: "1px solid var(--aave-border)",
          }}>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*\.?\d*$/.test(val)) setAmount(val);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && isValid && !loading) handleSupply();
              }}
              placeholder="0.00"
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                fontSize: "18px", fontWeight: 600, color: "var(--aave-text-primary)",
              }}
            />
            <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--aave-text-secondary)" }}>
              {market.symbol}
            </span>
          </div>
        </div>

        {/* Summary */}
        {isValid && !txHash && (
          <div style={{
            padding: "14px 18px", borderRadius: "10px",
            backgroundColor: "var(--aave-bg-row)",
            border: "1px solid var(--aave-border-subtle)",
            marginBottom: "16px",
          }}>
            {[
              { label: "Supply amount", value: `${parsed.toLocaleString()} ${market.symbol}`, color: "var(--aave-text-primary)" },
              { label: "Est. yearly earnings", value: `+$${((parsed * market.supplyAPY) / 100).toFixed(2)}`, color: "var(--aave-green)" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                <span style={{ fontSize: "13px", color: "var(--aave-text-secondary)" }}>{label}</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color }}>{value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Success */}
        {txHash && (
          <div style={{
            padding: "14px 18px", borderRadius: "10px", marginBottom: "16px",
            backgroundColor: "rgba(50,200,120,0.08)",
            border: "1px solid rgba(50,200,120,0.25)",
          }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--aave-green)", marginBottom: "6px" }}>
              Transaction submitted
            </div>
            <a
              href={`${etherscanBase}/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
              style={{ fontSize: "12px", color: "var(--aave-green)", wordBreak: "break-all" }}>
              {txHash}
            </a>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            padding: "12px 16px", borderRadius: "10px", marginBottom: "16px",
            backgroundColor: "rgba(255,80,80,0.08)",
            border: "1px solid rgba(255,80,80,0.25)",
            fontSize: "12px", color: "#ff6b6b",
          }}>
            {error}
          </div>
        )}

        <button
          disabled={!isValid || loading}
          onClick={handleSupply}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            background: isValid && !loading ? "linear-gradient(135deg, #b6509e, #2ebac6)" : "var(--aave-bg-hover)",
            color: isValid && !loading ? "#fff" : "var(--aave-text-muted)",
            fontSize: "15px",
            fontWeight: 700,
            cursor: isValid && !loading ? "pointer" : "not-allowed",
          }}>
          {loading ? "Submitting…" : isValid ? `Supply ${parsed.toLocaleString()} ${market.symbol}` : "Enter an amount"}
        </button>
      </div>
    </div>
  );
}
