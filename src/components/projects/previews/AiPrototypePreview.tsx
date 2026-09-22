"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Sliders,
  Sparkles,
  Terminal,
  RotateCcw,
  Copy,
  Check,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  tokens?: number;
}

const mockResponses: Record<string, string> = {
  interface: `// Generated TypeScript Type Definition
export interface UserSession {
  readonly id: string;
  username: string;
  role: 'developer' | 'architect' | 'admin';
  permissions: {
    canDeploy: boolean;
    canAudit: boolean;
  };
  metrics: {
    lastLogin: Date;
    latencyMs: number;
  };
}`,
  performance: `// Performance Analysis: Time Complexity & Memory
1. Bottleneck Identified: Unindexed foreign key scan on 'records.project_id'.
2. Proposed Index:
   CREATE INDEX CONCURRENTLY idx_records_project ON records (project_id, status);
3. Impact: Execution time drops from 420ms -> 12ms (35x improvement).`,
  refactor: `// Refactored Composable Hook
import { useState, useCallback } from 'react';

export function useWorkflowState(initialState: string) {
  const [state, setState] = useState(initialState);
  const transition = useCallback((nextState: string) => {
    setState(nextState);
  }, []);
  return { state, transition };
}`,
  default: `I have analyzed your architecture request. The suggested approach is to maintain a modular separation between data entities and presentation logic, ensuring zero runtime dependencies during static export builds.`,
};

export default function AiPrototypePreview() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "System ready. Select a preset prompt or type an engineering query to simulate real-time AI reasoning.",
      tokens: 22,
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [temperature, setTemperature] = useState(0.4);
  const [maxTokens, setMaxTokens] = useState(512);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  const handleSend = (textToSend?: string) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim() || isGenerating) return;

    const userMessage: Message = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt("");
    setIsGenerating(true);

    // Determine simulated response
    const lower = prompt.toLowerCase();
    let targetResponse = mockResponses.default;
    if (lower.includes("interface") || lower.includes("typescript")) {
      targetResponse = mockResponses.interface;
    } else if (lower.includes("performance") || lower.includes("query")) {
      targetResponse = mockResponses.performance;
    } else if (lower.includes("refactor") || lower.includes("hook")) {
      targetResponse = mockResponses.refactor;
    }

    // Stream typewriter effect
    let currentLength = 0;
    const assistantMessage: Message = { role: "assistant", content: "", tokens: 0 };
    setMessages((prev) => [...prev, assistantMessage]);

    const interval = setInterval(() => {
      currentLength += Math.floor(Math.random() * 5) + 3;
      if (currentLength >= targetResponse.length) {
        clearInterval(interval);
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: "assistant",
            content: targetResponse,
            tokens: Math.round(targetResponse.length / 3.8),
          };
          return next;
        });
        setIsGenerating(false);
      } else {
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = {
            role: "assistant",
            content: targetResponse.slice(0, currentLength) + " ▋",
            tokens: Math.round(currentLength / 3.8),
          };
          return next;
        });
      }
    }, 28);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full bg-[#0a0c10] text-[#f0f3f6] rounded-xl border border-[#23272f] overflow-hidden text-xs font-sans shadow-2xl flex flex-col md:flex-row min-h-[580px]">
      {/* Parameter Sidebar */}
      <aside className="w-full md:w-60 bg-[#101218] border-b md:border-b-0 md:border-r border-[#23272f] p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
              <Bot size={13} />
            </div>
            <div>
              <p className="font-bold font-mono text-[13px] text-foreground">AI Studio Node</p>
              <p className="text-[10px] text-muted">Inference Simulation</p>
            </div>
          </div>

          {/* Model Parameters */}
          <div className="space-y-4 pt-2 border-t border-[#23272f]">
            <div className="flex items-center gap-1.5 text-muted font-mono text-[11px]">
              <Sliders size={12} className="text-accent" />
              <span>HYPERPARAMETERS</span>
            </div>

            {/* Temperature Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-mono mb-1">
                <span className="text-muted">Temperature</span>
                <span className="text-accent font-bold">{temperature}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full h-1 bg-[#23272f] rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <span className="text-[9px] text-muted block mt-0.5">0.0 Precise • 1.0 Creative</span>
            </div>

            {/* Max Tokens Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-mono mb-1">
                <span className="text-muted">Max Output Tokens</span>
                <span className="text-accent font-bold">{maxTokens}</span>
              </div>
              <input
                type="range"
                min="128"
                max="2048"
                step="128"
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                className="w-full h-1 bg-[#23272f] rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>
          </div>

          {/* Preset Prompts */}
          <div className="space-y-2 pt-2 border-t border-[#23272f]">
            <span className="text-[11px] font-mono text-muted flex items-center gap-1">
              <Sparkles size={11} className="text-accent" />
              PRESET PROMPTS
            </span>
            {[
              { label: "TypeScript Interface", query: "Generate a TypeScript interface for UserSession." },
              { label: "Query Optimization", query: "Analyze SQL performance bottleneck on unindexed records." },
              { label: "Refactor Hook", query: "Refactor state machine into a composable React hook." },
            ].map((p) => (
              <button
                key={p.label}
                onClick={() => handleSend(p.query)}
                disabled={isGenerating}
                className="w-full text-left p-2 rounded bg-[#161a22] border border-[#262c37] hover:border-accent/40 text-muted hover:text-foreground text-[11px] font-mono transition-colors cursor-pointer disabled:opacity-50"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                role: "assistant",
                content: "Session reset. Enter a prompt or select a preset.",
                tokens: 12,
              },
            ])
          }
          className="flex items-center gap-1.5 text-[11px] font-mono text-muted hover:text-foreground pt-4 border-t border-[#23272f] cursor-pointer"
        >
          <RotateCcw size={12} />
          <span>Reset Session</span>
        </button>
      </aside>

      {/* Main Chat/Inference View */}
      <main className="flex-1 flex flex-col justify-between p-4 md:p-6 space-y-4">
        {/* Messages Log */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 max-h-[440px]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 text-xs ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.role === "assistant" && (
                <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shrink-0 mt-0.5">
                  <Terminal size={12} />
                </div>
              )}

              <div
                className={`max-w-xl rounded-lg p-3.5 space-y-1.5 ${
                  m.role === "user"
                    ? "bg-foreground text-background font-medium"
                    : "bg-[#141820] border border-[#23272f] text-foreground font-mono"
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-[10px] text-muted">
                  <span className="font-bold uppercase tracking-wider font-mono">
                    {m.role === "user" ? "You" : "Inference Engine"}
                  </span>
                  {m.role === "assistant" && m.tokens ? (
                    <div className="flex items-center gap-2">
                      <span>{m.tokens} tokens</span>
                      <button
                        onClick={() => handleCopy(m.content, idx)}
                        className="hover:text-foreground transition-colors cursor-pointer"
                        aria-label="Copy code"
                      >
                        {copiedIndex === idx ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
                      </button>
                    </div>
                  ) : null}
                </div>

                <div className="whitespace-pre-wrap leading-relaxed">
                  {m.content}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 pt-3 border-t border-[#23272f]"
        >
          <input
            type="text"
            placeholder="Type prompt or ask engineering architecture question..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            disabled={isGenerating}
            className="flex-1 px-3.5 py-2.5 rounded-lg bg-[#141820] border border-[#23272f] text-xs text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent disabled:opacity-50 font-mono"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isGenerating}
            className="px-4 py-2.5 rounded-lg bg-accent text-background font-semibold hover:bg-accent-hover transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed font-mono shrink-0"
          >
            <span>Run</span>
            <Send size={12} />
          </button>
        </form>
      </main>
    </div>
  );
}
