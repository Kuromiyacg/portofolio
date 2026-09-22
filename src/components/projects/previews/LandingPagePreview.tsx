"use client";

import React, { useState } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  Check,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";

export default function LandingPagePreview() {
  const [deviceMode, setDeviceMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [featureTab, setFeatureTab] = useState<"speed" | "security" | "scale">("speed");
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmailInput("");
    }, 4000);
  };

  return (
    <div className="w-full bg-[#0a0c10] text-[#f5f5f5] rounded-xl border border-[#23272f] overflow-hidden text-xs font-sans shadow-2xl flex flex-col min-h-[580px]">
      {/* Viewport Control Bar */}
      <div className="bg-[#12151b] px-4 py-2.5 border-b border-[#23272f] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#333]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#333]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#333]" />
          </div>
          <span className="font-mono text-[11px] text-muted ml-2">https://apex-prototype.local</span>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-[#1a1e27] p-1 rounded-md border border-[#2c3240]">
          {[
            { id: "desktop", label: "Desktop", icon: Monitor },
            { id: "tablet", label: "Tablet", icon: Tablet },
            { id: "mobile", label: "Mobile", icon: Smartphone },
          ].map((mode) => {
            const Icon = mode.icon;
            const isActive = deviceMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setDeviceMode(mode.id as typeof deviceMode)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                  isActive ? "bg-accent text-background font-semibold" : "text-muted hover:text-foreground"
                }`}
              >
                <Icon size={12} />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Emulated Viewport Canvas */}
      <div className="flex-1 bg-[#0e1015] p-3 sm:p-6 flex items-start justify-center overflow-y-auto">
        <div
          className={`transition-all duration-300 bg-[#0a0a0a] border border-[#222] rounded-lg overflow-hidden shadow-2xl w-full ${
            deviceMode === "mobile"
              ? "max-w-[375px]"
              : deviceMode === "tablet"
              ? "max-w-[768px]"
              : "max-w-4xl"
          }`}
        >
          {/* Site Navigation */}
          <header className="px-5 py-4 border-b border-[#222] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-accent flex items-center justify-center font-black text-background text-[10px]">
                ▲
              </div>
              <span className="font-bold tracking-tight text-sm font-mono text-foreground">APEX WEB</span>
            </div>
            <nav className="hidden sm:flex items-center gap-5 text-xs text-muted">
              <span className="hover:text-foreground cursor-pointer transition-colors">Features</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Architecture</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Pricing</span>
            </nav>
            <button className="px-3 py-1.5 rounded bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors text-xs cursor-pointer font-mono">
              Get Started
            </button>
          </header>

          {/* Hero Section */}
          <section className="px-6 py-12 sm:py-16 text-center space-y-4 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2 border border-[#282828] text-[11px] font-mono text-accent">
              <Zap size={11} />
              Next-Gen Fast Delivery
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              High-Velocity Web Architecture for Scale
            </h1>
            <p className="text-xs sm:text-sm text-muted max-w-lg mx-auto leading-relaxed">
              Designed with minimal dependencies, zero-runtime overhead, and static-first
              distribution to load instantaneously on edge nodes worldwide.
            </p>

            {/* Newsletter form */}
            <form onSubmit={handleSubscribe} className="pt-3 max-w-md mx-auto flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter work email..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded bg-surface-1 border border-[#2c2c2c] text-xs text-foreground placeholder:text-muted/60 focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded bg-accent text-background font-semibold text-xs hover:bg-accent-hover transition-colors flex items-center gap-1 cursor-pointer font-mono shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight size={12} />
              </button>
            </form>

            {subscribed && (
              <div className="p-2 rounded bg-green-950/60 border border-green-800/80 text-green-300 text-xs flex items-center justify-center gap-2 font-mono">
                <CheckCircle2 size={13} />
                <span>Simulated subscription confirmed. No external API contacted.</span>
              </div>
            )}
          </section>

          {/* Interactive Feature Tabs */}
          <section className="px-6 py-8 border-t border-[#1e1e1e] bg-[#0d0d0d]">
            <div className="text-center max-w-md mx-auto mb-6">
              <h2 className="text-sm sm:text-base font-bold text-foreground font-mono">CORE CAPABILITY MATRIX</h2>
              <p className="text-[11px] text-muted">Toggle tabs to inspect architectural layers</p>
            </div>

            <div className="flex justify-center gap-2 mb-6">
              {[
                { id: "speed", label: "Speed & Core Web Vitals", icon: Zap },
                { id: "security", label: "Zero-Trust Security", icon: ShieldCheck },
                { id: "scale", label: "Global Edge Scale", icon: Monitor },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFeatureTab(tab.id as typeof featureTab)}
                  className={`px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                    featureTab === tab.id
                      ? "bg-surface-2 text-accent border border-accent/40 font-semibold"
                      : "text-muted hover:text-foreground border border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-5 rounded-lg border border-[#222] bg-[#111] max-w-xl mx-auto space-y-2">
              {featureTab === "speed" && (
                <>
                  <p className="font-bold text-foreground text-sm font-mono">100/100 Lighthouse Performance</p>
                  <p className="text-xs text-muted leading-relaxed">
                    Pre-rendered static HTML assets with zero render-blocking JavaScript. Images automatically unoptimized for direct static file serving.
                  </p>
                </>
              )}
              {featureTab === "security" && (
                <>
                  <p className="font-bold text-foreground text-sm font-mono">Strict CSP &amp; Static Immutability</p>
                  <p className="text-xs text-muted leading-relaxed">
                    No backend execution surface, no database injection vectors. All assets served statically with automated cryptographic headers.
                  </p>
                </>
              )}
              {featureTab === "scale" && (
                <>
                  <p className="font-bold text-foreground text-sm font-mono">Anycast Edge Replication</p>
                  <p className="text-xs text-muted leading-relaxed">
                    Deployable with zero configuration across global CDNs like Vercel, Netlify, and Cloudflare Pages.
                  </p>
                </>
              )}
            </div>
          </section>

          {/* Pricing Switcher */}
          <section className="px-6 py-10 border-t border-[#1e1e1e]">
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className={`text-xs font-mono ${billingCycle === "monthly" ? "text-foreground font-bold" : "text-muted"}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                className="w-11 h-6 rounded-full bg-surface-2 border border-border p-1 transition-colors cursor-pointer flex items-center"
              >
                <div
                  className={`w-4 h-4 rounded-full bg-accent transition-transform ${
                    billingCycle === "yearly" ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span className={`text-xs font-mono flex items-center gap-1.5 ${billingCycle === "yearly" ? "text-accent font-bold" : "text-muted"}`}>
                Yearly <span className="text-[10px] px-1.5 py-0.2 rounded bg-accent/20 text-accent font-mono">SAVE 20%</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              {/* Starter */}
              <div className="p-5 rounded-lg border border-[#222] bg-[#111] space-y-3">
                <div>
                  <h3 className="font-mono font-bold text-sm text-foreground">Standard</h3>
                  <p className="text-[11px] text-muted">Single developer or small site</p>
                </div>
                <p className="text-2xl font-bold font-mono text-foreground">
                  {billingCycle === "yearly" ? "$19" : "$24"}
                  <span className="text-xs text-muted font-normal">/mo</span>
                </p>
                <ul className="space-y-1.5 text-xs text-muted">
                  <li className="flex items-center gap-2"><Check size={12} className="text-accent" /> 10 Static Projects</li>
                  <li className="flex items-center gap-2"><Check size={12} className="text-accent" /> Automated Git CI/CD</li>
                  <li className="flex items-center gap-2"><Check size={12} className="text-accent" /> Custom Domain</li>
                </ul>
              </div>

              {/* Enterprise */}
              <div className="p-5 rounded-lg border border-accent/60 bg-surface-1/90 space-y-3 relative">
                <span className="absolute top-3 right-3 text-[10px] font-mono text-accent bg-accent/15 px-2 py-0.5 rounded border border-accent/30">
                  POPULAR
                </span>
                <div>
                  <h3 className="font-mono font-bold text-sm text-foreground">Production Pro</h3>
                  <p className="text-[11px] text-muted">For high-traffic applications</p>
                </div>
                <p className="text-2xl font-bold font-mono text-foreground">
                  {billingCycle === "yearly" ? "$49" : "$59"}
                  <span className="text-xs text-muted font-normal">/mo</span>
                </p>
                <ul className="space-y-1.5 text-xs text-muted">
                  <li className="flex items-center gap-2"><Check size={12} className="text-accent" /> Unlimited Static Projects</li>
                  <li className="flex items-center gap-2"><Check size={12} className="text-accent" /> 99.99% Edge SLA</li>
                  <li className="flex items-center gap-2"><Check size={12} className="text-accent" /> Priority Support</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
