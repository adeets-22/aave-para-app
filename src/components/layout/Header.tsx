"use client";

import { useModal, useAccount, useWallet } from "@getpara/react-sdk";

interface HeaderProps {
  isConnected: boolean;
}

export default function Header({ isConnected }: HeaderProps) {
  const { openModal } = useModal();
  const { data: wallet } = useWallet();

  const address = wallet?.address;
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null;

  return (
    <header
      style={{
        backgroundColor: "var(--aave-bg-nav)",
        borderBottom: "1px solid var(--aave-border)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
      }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 32px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "32px",
        }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #b6509e, #2ebac6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "14px",
            color: "#fff",
          }}>
            A
          </div>
          <span style={{ fontWeight: 700, fontSize: "17px", color: "var(--aave-text-primary)", letterSpacing: "-0.3px" }}>
            Aave
          </span>
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          {isConnected && shortAddress && (
            <div style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid var(--aave-border)",
              background: "var(--aave-bg-card)",
              color: "var(--aave-text-secondary)",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
              <span style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "var(--aave-green)",
                display: "inline-block",
              }} />
              {shortAddress}
            </div>
          )}

          <button
            onClick={() => openModal()}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: isConnected ? "1px solid var(--aave-border)" : "none",
              background: isConnected
                ? "var(--aave-bg-card)"
                : "linear-gradient(135deg, #b6509e, #2ebac6)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              transition: "opacity 0.15s",
              whiteSpace: "nowrap",
            } as React.CSSProperties}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}>
            {isConnected ? "Connected" : "Connect wallet"}
          </button>
        </div>
      </div>
    </header>
  );
}
