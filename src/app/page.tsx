"use client";

import { useState } from "react";
import { useAccount } from "@getpara/react-sdk";
import Header from "@/components/layout/Header";
import MarketsTable from "@/components/markets/MarketsTable";
import SupplyModal from "@/components/modals/SupplyModal";
import BorrowModal from "@/components/modals/BorrowModal";
import { Market, MARKETS, formatCurrency } from "@/lib/mockData";

type Network = "mainnet" | "testnet";

const totalSupply = MARKETS.reduce((s, m) => s + m.totalSupply, 0);
const totalBorrow = MARKETS.reduce((s, m) => s + m.totalBorrow, 0);
const totalAvailable = totalSupply - totalBorrow;

export default function HomePage() {
  const { isConnected } = useAccount();
  const [network, setNetwork] = useState<Network>("mainnet");
  const [supplyModal, setSupplyModal] = useState<Market | null>(null);
  const [borrowModal, setBorrowModal] = useState<Market | null>(null);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--aave-bg-page)" }}>
      <Header isConnected={isConnected} />

      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px 64px" }}>

        {/* Hero stats */}
        <div style={{ padding: "40px 0 36px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "linear-gradient(135deg, #b6509e, #2ebac6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 800, fontSize: "15px", color: "#fff",
            }}>A</div>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "var(--aave-text-primary)", letterSpacing: "-0.4px" }}>
              Stablecoin Markets
            </h1>
            <span style={{
              padding: "2px 8px", borderRadius: "4px", fontSize: "11px",
              fontWeight: 700, background: "rgba(46,186,198,0.15)",
              color: "var(--aave-teal)", letterSpacing: "0.5px",
            }}>V3</span>
          </div>
          {/* Network toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "32px" }}>
            {(["mainnet", "testnet"] as Network[]).map((n) => {
              const active = network === n;
              const label = n === "mainnet" ? "Mainnet" : "Testnet (Sepolia)";
              return (
                <button
                  key={n}
                  onClick={() => setNetwork(n)}
                  style={{
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: active ? "none" : "1px solid var(--aave-border)",
                    background: active ? "rgba(46,186,198,0.15)" : "transparent",
                    color: active ? "var(--aave-teal)" : "var(--aave-text-muted)",
                    transition: "all 0.15s",
                  }}>
                  {active ? "● " : "◌ "}{label}
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: "48px" }}>
            {[
              { label: "Total market size", value: formatCurrency(totalSupply) },
              { label: "Total available", value: formatCurrency(totalAvailable) },
              { label: "Total borrows", value: formatCurrency(totalBorrow) },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontSize: "12px", color: "var(--aave-text-muted)", marginBottom: "6px", letterSpacing: "0.3px" }}>
                  {label}
                </div>
                <div style={{ fontSize: "26px", fontWeight: 700, color: "var(--aave-text-primary)", letterSpacing: "-0.5px" }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <MarketsTable
          network={network}
          onSupply={(market) => setSupplyModal(market)}
          onBorrow={(market) => setBorrowModal(market)}
        />
      </main>

      {supplyModal && <SupplyModal market={supplyModal} network={network} onClose={() => setSupplyModal(null)} />}
      {borrowModal && <BorrowModal market={borrowModal} onClose={() => setBorrowModal(null)} />}
    </div>
  );
}
