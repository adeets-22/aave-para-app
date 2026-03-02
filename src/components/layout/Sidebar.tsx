"use client";

type Tab = "markets" | "dashboard";

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  isConnected: boolean;
}

const NAV_ITEMS: { id: Tab | "stake" | "governance"; label: string; icon: string; requiresAuth?: boolean }[] = [
  { id: "markets", label: "Markets", icon: "📊" },
  { id: "dashboard", label: "Dashboard", icon: "🏠", requiresAuth: true },
  { id: "stake", label: "Stake", icon: "💎" },
  { id: "governance", label: "Governance", icon: "🗳️" },
];

export default function Sidebar({ activeTab, onTabChange, isConnected }: SidebarProps) {
  return (
    <aside
      className="w-64 min-h-screen flex flex-col py-6"
      style={{
        backgroundColor: "var(--aave-bg-secondary)",
        borderRight: "1px solid var(--aave-border)",
      }}>
      {/* Brand */}
      <div className="px-6 mb-8">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white"
            style={{
              background: "linear-gradient(135deg, var(--aave-gradient-start), var(--aave-gradient-end))",
            }}>
            A
          </div>
          <div>
            <div className="font-bold text-base gradient-text">Aave</div>
            <div className="text-xs" style={{ color: "var(--aave-text-muted)" }}>
              Powered by Para
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activeTab;
            const isDisabled = item.requiresAuth && !isConnected && item.id !== "markets";
            const isClickable = item.id === "markets" || item.id === "dashboard";

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (isClickable && !isDisabled) {
                    onTabChange(item.id as Tab);
                  }
                }}
                disabled={isDisabled && item.id === "dashboard"}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left"
                style={{
                  backgroundColor: isActive ? "var(--aave-bg-hover)" : "transparent",
                  color: isActive
                    ? "var(--aave-text-primary)"
                    : isDisabled
                    ? "var(--aave-text-muted)"
                    : "var(--aave-text-secondary)",
                  cursor: isClickable && !isDisabled ? "pointer" : "default",
                  borderLeft: isActive
                    ? "3px solid var(--aave-purple)"
                    : "3px solid transparent",
                }}>
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
                {item.requiresAuth && !isConnected && (
                  <span
                    className="ml-auto text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "var(--aave-bg-card)",
                      color: "var(--aave-text-muted)",
                    }}>
                    Connect
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-6 pt-6 border-t" style={{ borderColor: "var(--aave-border)" }}>
        <div className="text-xs" style={{ color: "var(--aave-text-muted)" }}>
          <div className="font-medium mb-1" style={{ color: "var(--aave-text-secondary)" }}>
            Aave V3
          </div>
          <div>Ethereum Mainnet</div>
        </div>
      </div>
    </aside>
  );
}
