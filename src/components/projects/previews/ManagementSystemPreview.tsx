"use client";

import React, { useState } from "react";
import {
  FolderKanban,
  Search,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
} from "lucide-react";

interface WorkflowItem {
  id: string;
  title: string;
  owner: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  status: "Active" | "Pending" | "Completed";
  updatedAt: string;
}

const initialWorkflows: WorkflowItem[] = [
  { id: "TASK-101", title: "API Gateway Rate Limiter", owner: "Alex M.", category: "Backend Infrastructure", priority: "High", status: "Active", updatedAt: "10 mins ago" },
  { id: "TASK-102", title: "OAuth 2.0 Token Revocation", owner: "Jordan L.", category: "Security & Auth", priority: "Medium", status: "Completed", updatedAt: "2 hours ago" },
  { id: "TASK-103", title: "Telemetry Schema Migration", owner: "Sam T.", category: "Database Core", priority: "Low", status: "Pending", updatedAt: "1 day ago" },
  { id: "TASK-104", title: "Responsive Grid Layout Refactor", owner: "Casey Q.", category: "Frontend UI", priority: "High", status: "Active", updatedAt: "3 hours ago" },
  { id: "TASK-105", title: "Static Edge Caching Policy", owner: "Taylor R.", category: "DevOps / CDN", priority: "Medium", status: "Completed", updatedAt: "Yesterday" },
];

export default function ManagementSystemPreview() {
  const [items, setItems] = useState<WorkflowItem[]>(initialWorkflows);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Frontend UI");
  const [newPriority, setNewPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [toast, setToast] = useState<string | null>(null);

  const filtered = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.owner.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: WorkflowItem = {
      id: `TASK-${items.length + 101}`,
      title: newTitle,
      owner: "Active User",
      category: newCategory,
      priority: newPriority,
      status: "Active",
      updatedAt: "Just now",
    };

    setItems([newItem, ...items]);
    setNewTitle("");
    setIsModalOpen(false);
    setToast(`Resource ${newItem.id} initialized in memory.`);
    setTimeout(() => setToast(null), 3500);
  };

  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) return;
    setItems((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
    setToast("Selected workflow tasks archived.");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="w-full bg-[#0d0f14] text-[#f0f3f6] rounded-xl border border-[#23272f] overflow-hidden text-xs font-sans shadow-2xl flex flex-col min-h-[580px]">
      {/* Top Header */}
      <header className="p-4 bg-[#13161d] border-b border-[#23272f] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
            <FolderKanban size={13} />
          </div>
          <div>
            <span className="font-bold font-mono text-sm text-foreground">WORKFLOW ENGINE</span>
            <span className="text-[10px] text-muted block">Internal Resource &amp; Task Dispatcher</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-red-950/60 border border-red-800 text-red-300 hover:bg-red-900/60 text-xs font-mono transition-colors cursor-pointer"
            >
              <Trash2 size={12} />
              <span>Archive ({selectedIds.length})</span>
            </button>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-accent text-background font-semibold hover:bg-accent-hover text-xs font-mono transition-colors cursor-pointer"
          >
            <Plus size={13} />
            <span>Create Task</span>
          </button>
        </div>
      </header>

      {/* Toast */}
      {toast && (
        <div className="mx-4 mt-3 p-2 rounded bg-green-950/60 border border-green-800 text-green-300 text-xs flex items-center gap-2 font-mono">
          <CheckCircle2 size={13} />
          <span>{toast}</span>
        </div>
      )}

      {/* Controls: Search & Status Filters */}
      <div className="p-4 bg-[#101217] border-b border-[#23272f] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search task ID, title, or owner..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded bg-[#161a22] border border-[#262c37] text-xs text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["All", "Active", "Pending", "Completed"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                statusFilter === status
                  ? "bg-foreground text-background font-semibold shadow-sm"
                  : "bg-[#161a22] border border-[#23272f] text-muted hover:text-foreground"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table List */}
      <div className="flex-1 overflow-x-auto p-4">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#23272f] text-[10px] font-mono text-muted bg-[#12151b]">
              <th className="p-3 w-8">
                <input
                  type="checkbox"
                  checked={selectedIds.length === filtered.length && filtered.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds(filtered.map((i) => i.id));
                    } else {
                      setSelectedIds([]);
                    }
                  }}
                  className="rounded border-border accent-accent cursor-pointer"
                />
              </th>
              <th className="p-3">TASK</th>
              <th className="p-3">CATEGORY</th>
              <th className="p-3">OWNER</th>
              <th className="p-3">PRIORITY</th>
              <th className="p-3">STATUS</th>
              <th className="p-3">UPDATED</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#23272f]/60 font-mono text-[11px]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-muted">
                  No workflow tasks found matching the filter criteria.
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <tr
                    key={item.id}
                    className={`transition-colors hover:bg-[#161a22] cursor-pointer ${
                      isSelected ? "bg-accent/5" : ""
                    }`}
                    onClick={() => toggleSelect(item.id)}
                  >
                    <td className="p-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(item.id)}
                        className="rounded border-border accent-accent cursor-pointer"
                      />
                    </td>
                    <td className="p-3">
                      <span className="text-muted block text-[10px]">{item.id}</span>
                      <span className="text-foreground font-medium font-sans text-xs">{item.title}</span>
                    </td>
                    <td className="p-3 text-muted">{item.category}</td>
                    <td className="p-3 text-foreground">{item.owner}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] ${
                          item.priority === "High"
                            ? "bg-red-950/60 text-red-400 border border-red-900/40"
                            : item.priority === "Medium"
                            ? "bg-amber-950/60 text-amber-400 border border-amber-900/40"
                            : "bg-blue-950/60 text-blue-400 border border-blue-900/40"
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="flex items-center gap-1.5">
                        {item.status === "Active" && <Clock size={11} className="text-accent animate-pulse" />}
                        {item.status === "Completed" && <CheckCircle2 size={11} className="text-green-400" />}
                        {item.status === "Pending" && <AlertCircle size={11} className="text-muted" />}
                        <span>{item.status}</span>
                      </span>
                    </td>
                    <td className="p-3 text-muted/80">{item.updatedAt}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <footer className="p-3 bg-[#101217] border-t border-[#23272f] text-[11px] font-mono text-muted flex items-center justify-between">
        <span>Showing {filtered.length} of {items.length} items</span>
        <span className="text-accent/80">Local State Synchronized</span>
      </footer>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-lg bg-[#141820] border border-[#2c3240] p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#23272f]">
              <h3 className="text-sm font-bold text-foreground font-mono">Create Workflow Item</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-foreground cursor-pointer">
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono text-muted mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Audit Dependency Tree"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-[#101217] border border-[#23272f] text-foreground text-xs focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-muted mb-1">
                  Domain Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-[#101217] border border-[#23272f] text-foreground text-xs focus:outline-none focus:border-accent"
                >
                  <option value="Frontend UI">Frontend UI</option>
                  <option value="Backend Infrastructure">Backend Infrastructure</option>
                  <option value="Security & Auth">Security &amp; Auth</option>
                  <option value="Database Core">Database Core</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-muted mb-1">
                  Priority
                </label>
                <div className="flex gap-2">
                  {(["Low", "Medium", "High"] as const).map((p) => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setNewPriority(p)}
                      className={`flex-1 py-1 rounded text-xs font-mono border transition-colors cursor-pointer ${
                        newPriority === p
                          ? "bg-accent text-background border-accent font-bold"
                          : "border-[#23272f] text-muted hover:text-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
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
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
