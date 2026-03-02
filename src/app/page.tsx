"use client";

import { useState } from "react";
import { useAccount } from "@getpara/react-sdk";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import MarketsTable from "@/components/markets/MarketsTable";
import NetWorthCard from "@/components/dashboard/NetWorthCard";
import SupplyPositions from "@/components/dashboard/SupplyPositions";
import BorrowPositions from "@/components/dashboard/BorrowPositions";
import SupplyModal from "@/components/modals/SupplyModal";
import BorrowModal from "@/components/modals/BorrowModal";
import { Market } from "@/lib/mockData";

type Tab = "markets" | "dashboard";

export default function HomePage() {
  const { isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<Tab>("markets");
  const [supplyModal, setSupplyModal] = useState<Market | null>(null);
  const [borrowModal, setBorrowModal] = useState<Market | null>(null);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "var(--aave-bg-primary)" }}>
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} isConnected={isConnected} />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6 lg:p-8">
          {activeTab === "markets" && (
            <div>
              <div className="mb-8">
                <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--aave-text-primary)" }}>
                  Markets
                </h1>
                <p className="text-sm" style={{ color: "var(--aave-text-secondary)" }}>
                  Supply or borrow stablecoins and earn interest
                </p>
              </div>

              <MarketsTable
                onSupply={(market) => setSupplyModal(market)}
                onBorrow={(market) => setBorrowModal(market)}
              />
            </div>
          )}

          {activeTab === "dashboard" && isConnected && (
            <div>
              <div className="mb-8">
                <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--aave-text-primary)" }}>
                  Dashboard
                </h1>
                <p className="text-sm" style={{ color: "var(--aave-text-secondary)" }}>
                  Your supply and borrow positions
                </p>
              </div>

              <NetWorthCard />
              <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
                <SupplyPositions />
                <BorrowPositions />
              </div>
            </div>
          )}

          {activeTab === "dashboard" && !isConnected && (
            <div className="flex flex-col items-center justify-center h-96">
              <div
                className="text-center p-8 rounded-2xl"
                style={{ backgroundColor: "var(--aave-bg-card)", border: "1px solid var(--aave-border)" }}>
                <div className="text-5xl mb-4">🔗</div>
                <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--aave-text-primary)" }}>
                  Connect your wallet
                </h2>
                <p className="text-sm" style={{ color: "var(--aave-text-secondary)" }}>
                  Connect your wallet to view your supply and borrow positions
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {supplyModal && (
        <SupplyModal market={supplyModal} onClose={() => setSupplyModal(null)} />
      )}
      {borrowModal && (
        <BorrowModal market={borrowModal} onClose={() => setBorrowModal(null)} />
      )}
    </div>
  );
}
