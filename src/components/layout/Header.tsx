"use client";

import { useModal, useAccount, useWallet } from "@getpara/react-sdk";

export default function Header() {
  const { openModal } = useModal();
  const { data: wallet } = useWallet();
  const { isConnected } = useAccount();

  const address = wallet?.address;
  const buttonLabel = isConnected && address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "Connect Wallet";

  return (
    <header
      className="flex items-center justify-between px-6 py-4 border-b"
      style={{
        backgroundColor: "var(--aave-bg-secondary)",
        borderColor: "var(--aave-border)",
      }}>
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white"
          style={{
            background: "linear-gradient(135deg, var(--aave-gradient-start), var(--aave-gradient-end))",
          }}>
          A
        </div>
        <span className="text-lg font-bold gradient-text">Aave Para</span>
      </div>

      {/* Connect Wallet */}
      <button
        onClick={() => openModal()}
        className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
        style={{
          background: isConnected
            ? "var(--aave-bg-card)"
            : "linear-gradient(135deg, var(--aave-gradient-start), var(--aave-gradient-end))",
          border: isConnected ? "1px solid var(--aave-border)" : "none",
          cursor: "pointer",
        }}>
        {isConnected && (
          <span
            className="inline-block w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: "var(--aave-green)" }}
          />
        )}
        {buttonLabel}
      </button>
    </header>
  );
}
