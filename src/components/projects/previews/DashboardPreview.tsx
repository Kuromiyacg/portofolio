"use client";

import React, { useState, useMemo } from "react";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  Settings,
  Search,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Download,
  X,
  CheckCircle2,
  DollarSign,
} from "lucide-react";

interface RecordItem {
  id: string;
  user: string;
  project: string;
  amount: string;
  status: "Completed" | "Pending" | "In Review";
  date: string;
}

const initialRecords: RecordItem[] = [
  { id: "REC-01", user: "Alex Morgan", project: "Alpha Platform", amount: "$8,450", status: "Completed", date: "2026-04-12" },
  { id: "REC-02", user: "Jordan Lee", project: "E-Commerce Core", amount: "$3,200", status: "Completed", date: "2026-04-11" },
  { id: "REC-03", user: "Taylor Reed", project: "Telemetry API", amount: "$6,180", status: "Pending", date: "2026-04-10" },
  { id: "REC-04", user: "Casey Quinn", project: "Design System", amount: "$2,990", status: "In Review", date: "2026-04-09" },
  { id: "REC-05", user: "Riley Smith", project: "Mobile App V2", amount: "$4,000", status: "Completed", date: "2026-04-08" },
];

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<"overview" | "analytics" | "transactions" | "settings">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [records, setRecords] = useState<RecordItem[]>(initialRecords);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Filtered records
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const matchesSearch =
        r.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.project.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [records, searchQuery, statusFilter]);

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    const newRecord: RecordItem = {
      id: `REC-0${records.length + 1}`,
      user: "Demo Administrator",
      project: newProjectName,
      amount: newAmount.startsWith("$") ? newAmount : `$${newAmount || "1,500"}`,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };

    setRecords([newRecord, ...records]);
    setNewProjectName("");
    setNewAmount("");
    setIsModalOpen(false);

    setFeedbackMessage("Record created successfully in local demo state.");
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  return (
    <div className="w-full bg-[#0d0f12] text-[#f0f3f6] rounded-xl border border-[#23272f] overflow-hidden text-xs font-sans shadow-2xl flex flex-col md:flex-row min-h-[580px]">
      {/* Sidebar */}
      <aside className="w-full md:w-56 bg-[#12151a] border-b md:border-b-0 md:border-r border-[#23272f] p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="w-6 h-6 rounded bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-bold">
              ⚡
            </div>
            <div>
              <p className="font-bold font-mono text-[13px] text-foreground tracking-tight">CoreApp OS</p>
              <p className="text-[10px] text-muted">v2.4 Demo Environment</p>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: "overview", label: "Overview", icon: LayoutDashboard },
              { id: "analytics", label: "Analytics", icon: BarChart3 },
              { id: "transactions", label: "Transactions", icon: Users },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors cursor-pointer text-left ${
                    isActive
                      ? "bg-accent/15 text-accent font-medium border border-accent/30"
                      : "text-muted hover:text-foreground hover:bg-[#181c24]"
                  }`}
                >
                  <Icon size={14} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-[#23272f] px-2 text-[11px] text-muted">
          <p className="text-foreground font-medium">Demo State: Active</p>
          <p className="text-[10px] text-muted/70">Client memory storage</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-5 md:p-6 flex flex-col justify-between overflow-x-auto space-y-6">
        <div>
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#23272f]">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                {activeTab === "overview" && "Executive Dashboard Overview"}
                {activeTab === "analytics" && "System Analytics & Traffic"}
                {activeTab === "transactions" && "Financial Operations"}
                {activeTab === "settings" && "Workspace Preferences"}
              </h2>
              <p className="text-[11px] text-muted">
                Simulated real-time operations telemetry (Fictional mock data)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setFeedbackMessage("Exported simulated telemetry report.");
                  setTimeout(() => setFeedbackMessage(null), 3000);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#181c24] border border-[#2a303c] hover:bg-[#222733] text-foreground text-xs font-mono transition-colors cursor-pointer"
              >
                <Download size={12} />
                <span>Export</span>
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent text-background font-medium hover:bg-accent-hover text-xs font-mono transition-colors cursor-pointer"
              >
                <Plus size={13} />
                <span>New Item</span>
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {feedbackMessage && (
            <div className="mt-3 p-2.5 rounded bg-green-950/60 border border-green-800/80 text-green-300 text-xs flex items-center gap-2">
              <CheckCircle2 size={14} className="shrink-0 text-green-400" />
              <span>{feedbackMessage}</span>
            </div>
          )}

          {/* Metric Cards (PRD §11 exact example values) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
            {[
              { label: "Revenue", value: "$24,820", change: "+14.2%", icon: DollarSign, positive: true },
              { label: "Active Users", value: "1,284", change: "+8.4%", icon: Users, positive: true },
              { label: "Active Projects", value: "24", change: "4 New", icon: LayoutDashboard, positive: true },
              { label: "Completion", value: "78%", change: "+2.5%", icon: TrendingUp, positive: true },
            ].map((metric) => (
              <div
                key={metric.label}
                className="p-3.5 rounded-lg bg-[#141820] border border-[#23272f] space-y-1"
              >
                <div className="flex items-center justify-between text-muted">
                  <span className="text-[11px] font-mono">{metric.label}</span>
                  <metric.icon size={13} className="text-accent" />
                </div>
                <p className="text-xl font-bold font-mono text-foreground">{metric.value}</p>
                <div className="flex items-center gap-1 text-[10px] text-green-400 font-mono">
                  <ArrowUpRight size={11} />
                  <span>{metric.change} vs last cycle</span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Chart Preview Area */}
          <div className="mt-5 p-4 rounded-lg bg-[#141820] border border-[#23272f] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-foreground font-mono">ACTIVITY THROUGHPUT</span>
                <span className="text-[10px] text-muted block">Simulated 7-Day Performance Load</span>
              </div>
              <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                LIVE SAMPLING
              </span>
            </div>

            {/* SVG Visual Chart */}
            <div className="h-28 w-full flex items-end gap-2 pt-4">
              {[45, 68, 52, 85, 92, 74, 98].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div
                    style={{ height: `${height}%` }}
                    className="w-full rounded-t bg-accent/40 border-t border-accent group-hover:bg-accent transition-colors"
                  />
                  <span className="text-[9px] font-mono text-muted">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Search & Filter Table */}
          <div className="mt-5 space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              {/* Search input */}
              <div className="relative flex-1 max-w-xs">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  placeholder="Filter records..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded bg-[#141820] border border-[#23272f] text-xs text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent"
                />
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {["All", "Completed", "Pending", "In Review"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                      statusFilter === status
                        ? "bg-foreground text-background font-semibold"
                        : "bg-[#141820] border border-[#23272f] text-muted hover:text-foreground"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-[#23272f] overflow-x-auto bg-[#12151a]">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#23272f] text-[10px] font-mono text-muted bg-[#161a22]">
                    <th className="p-3">ID</th>
                    <th className="p-3">USER</th>
                    <th className="p-3">PROJECT</th>
                    <th className="p-3">AMOUNT</th>
                    <th className="p-3">STATUS</th>
                    <th className="p-3">DATE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#23272f]/60 font-mono text-[11px]">
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-4 text-center text-muted">
                        No records match the current filter query.
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map((item) => (
                      <tr key={item.id} className="hover:bg-[#181c24] transition-colors">
                        <td className="p-3 text-muted">{item.id}</td>
                        <td className="p-3 text-foreground font-medium">{item.user}</td>
                        <td className="p-3 text-muted">{item.project}</td>
                        <td className="p-3 text-accent font-bold">{item.amount}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] ${
                              item.status === "Completed"
                                ? "bg-green-950/60 text-green-400 border border-green-800/60"
                                : item.status === "Pending"
                                ? "bg-amber-950/60 text-amber-400 border border-amber-800/60"
                                : "bg-blue-950/60 text-blue-400 border border-blue-800/60"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3 text-muted">{item.date}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-sm rounded-lg bg-[#141820] border border-[#2c3240] p-5 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#23272f]">
                <h3 className="text-sm font-bold text-foreground font-mono">Create New Record</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-muted hover:text-foreground cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              <form onSubmit={handleAddRecord} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-muted mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Analytics Portal"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded bg-[#101217] border border-[#23272f] text-foreground text-xs focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-muted mb-1">
                    Allocated Amount ($)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. $4,500"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full px-3 py-1.5 rounded bg-[#101217] border border-[#23272f] text-foreground text-xs focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-3 py-1.5 rounded border border-[#23272f] text-muted hover:text-foreground text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded bg-accent text-background font-semibold text-xs hover:bg-accent-hover cursor-pointer"
                  >
                    Save Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
