"use client";

import { useState } from "react";
import { useAccount } from "@getpara/react-sdk";
import Header from "@/components/layout/Header";
import MarketsTable from "@/components/markets/MarketsTable";
import NetWorthCard from "@/components/dashboard/NetWorthCard";
import SupplyPositions from "@/components/dashboard/SupplyPositions";
import BorrowPositions from "@/components/dashboard/BorrowPositions";
import SupplyModal from "@/components/modals/SupplyModal";
import BorrowModal from "@/components/modals/BorrowModal";
import { Market, MARKETS, formatCurrency } from "@/lib/mockData";

type Tab = "markets" | "dashboard";

const totalSupply = MARKETS.reduce((s, m) => s + m.totalSupply, 0);
const totalBorrow = MARKETS.reduce((s, m) => s + m.totalBorrow, 0);
const totalAvailable = totalSupply - totalBorrow;

export default function HomePage() {
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<Tab>("markets");
  const [supplyModal, setSupplyModal] = useState<Market | null>(null);
  const [borrowModal, setBorrowModal] = useState<Market | null>(null);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--aave-bg-page)" }}>
      <Header activeTab={activeTab} onTabChange={setActiveTab} isConnected={isConnected} />

      <main style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px 64px" }}>

        {/* ── Markets view ── */}
        {activeTab === "markets" && (
          <>
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
              <p style={{ fontSize: "13px", color: "var(--aave-text-muted)", marginBottom: "32px" }}>
                Ethereum Mainnet · Supply and borrow RLUSD, PYUSD, and USDC
              </p>

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
              onSupply={(market) => setSupplyModal(market)}
              onBorrow={(market) => setBorrowModal(market)}
            />
          </>
        )}

        {/* ── Dashboard view ── */}
        {activeTab === "dashboard" && isConnected && (
          <div style={{ paddingTop: "40px" }}>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "var(--aave-text-primary)", marginBottom: "6px" }}>
              Dashboard
            </h1>
            <p style={{ fontSize: "13px", color: "var(--aave-text-muted)", marginBottom: "32px" }}>
              Your positions on Ethereum Mainnet
            </p>
            <NetWorthCard />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "24px" }}>
              <SupplyPositions />
              <BorrowPositions />
            </div>
          </div>
        )}

        {activeTab === "dashboard" && !isConnected && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
            <div style={{
              textAlign: "center",
              padding: "48px 64px",
              borderRadius: "16px",
              backgroundColor: "var(--aave-bg-card)",
              border: "1px solid var(--aave-border)",
            }}>
              <div style={{ fontSize: "42px", marginBottom: "16px" }}>🔗</div>
              <h2 style={{ fontSize: "18px", fontWeight: 600, color: "var(--aave-text-primary)", marginBottom: "8px" }}>
                Connect your wallet
              </h2>
              <p style={{ fontSize: "13px", color: "var(--aave-text-secondary)" }}>
                Connect your wallet to view your positions
              </p>
            </div>
          </div>
        )}
      </main>

      {supplyModal && <SupplyModal market={supplyModal} onClose={() => setSupplyModal(null)} />}
      {borrowModal && <BorrowModal market={borrowModal} onClose={() => setBorrowModal(null)} />}
    </div>
  );
}
