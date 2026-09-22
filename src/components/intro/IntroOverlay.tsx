"use client";

import React, { useEffect, useRef, useState, useCallback, useSyncExternalStore } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { isWebGLAvailable } from "@/utils/webgl";
import portfolio from "@/data/portfolio";
import IntroFallback from "./IntroFallback";

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function useLockedBeat(): "a" | "b" | "c" | "d" | null {
  return useSyncExternalStore(
    emptySubscribe,
    () => {
      const params = new URLSearchParams(window.location.search);
      const beatParam = (params.get("beat") || params.get("scene") || "").toLowerCase();
      if (beatParam === "a" || beatParam === "glimpse") return "a";
      if (beatParam === "b" || beatParam === "1" || beatParam === "crash") return "b";
      if (beatParam === "c" || beatParam === "2" || beatParam === "reveal") return "c";
      if (beatParam === "d" || beatParam === "3" || beatParam === "load") return "d";
      return null;
    },
    () => null
  );
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

function useWebGLSupported(): boolean | null {
  return useSyncExternalStore(
    emptySubscribe,
    () => isWebGLAvailable(),
    () => null
  );
}

/**
 * Creates high-res canvas texture for the focused Hero Panel in Beat B & C:
 * File: build.pipeline.ts
 * Code:
 *   async function deployRelease() {
 *     const artifact = await pipeline.run();
 *     return artifact.output.hash;
 *   }
 * Visual diagnostic markers (Beat B):
 *   - SOLID FULL-LINE RED HIGHLIGHT on line 05 (`return artifact.output.hash;`)
 *   - Small solid red dot in left gutter next to line 05
 *   - Red squiggly underline on `artifact.output.hash;`
 *   - Normal syntax palette for the rest of the code (localized precision)
 */
type PipelineDiagnosticMode = "error" | "clean" | "fixed_step1" | "fixed_step2" | "fixed_all";

/**
 * Creates high-res canvas texture for the focused Hero Panel:
 * File: build.pipeline.ts
 * Code:
 *   async function deployRelease() {
 *     const artifact = await pipeline.run();
 *     const signature = await sign(artifact.output.hash);
 *     const target = await resolveEdgeRegion(artifact.meta.region);
 *     return deploy(artifact, signature, target);
 *   }
 * Visual diagnostic markers:
 *   - Beat B ("error"): 3-line cascading problem (lines 05, 06, 07) highlighted in SOLID RED
 *     with gutter red dots and connecting gutter bracket.
 *   - Beat D ("fixed_*"): 3-line cascading resolution payoff sweep highlighted in GREEN.
 *   - Clean state: localized precision, standard syntax highlighting.
 */
function createBuildPipelineTexture(
  diagnosticMode: PipelineDiagnosticMode = "error"
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 760;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Window background: Deep editor slate
    ctx.fillStyle = "#0c1017";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Window perimeter border
    ctx.strokeStyle = "#1e2638";
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

    // Title bar
    ctx.fillStyle = "#111622";
    ctx.fillRect(0, 0, canvas.width, 74);
    ctx.strokeStyle = "#1e2638";
    ctx.beginPath();
    ctx.moveTo(0, 74);
    ctx.lineTo(canvas.width, 74);
    ctx.stroke();

    // Window control buttons
    ctx.fillStyle = "#ff5f56";
    ctx.beginPath();
    ctx.arc(36, 37, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffbd2e";
    ctx.beginPath();
    ctx.arc(64, 37, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#27c93f";
    ctx.beginPath();
    ctx.arc(92, 37, 8, 0, Math.PI * 2);
    ctx.fill();

    // Active Editor Tab
    ctx.fillStyle = "#0c1017";
    ctx.fillRect(128, 16, 280, 58);
    ctx.strokeStyle = "#1e2638";
    ctx.strokeRect(128, 16, 280, 58);

    // Tab accent top border
    ctx.fillStyle =
      diagnosticMode === "error"
        ? "#ef4444"
        : diagnosticMode.startsWith("fixed")
        ? "#22c55e"
        : "#8ab4ff";
    ctx.fillRect(128, 16, 280, 3);

    // Tab title
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "bold 20px monospace";
    ctx.fillText("build.pipeline.ts", 154, 50);

    // Breadcrumb path
    ctx.fillStyle = "#475569";
    ctx.font = "18px monospace";
    ctx.fillText("src / core / pipeline / build.pipeline.ts", 440, 50);

    // Gutter background
    const gutterWidth = 96;
    ctx.fillStyle = "#0f131d";
    ctx.fillRect(0, 75, gutterWidth, canvas.height - 125);
    ctx.strokeStyle = "#1a2130";
    ctx.beginPath();
    ctx.moveTo(gutterWidth, 75);
    ctx.lineTo(gutterWidth, canvas.height - 50);
    ctx.stroke();

    // Code lines configuration
    const lines = [
      { num: "01", key: "comment", text: "// Release deployment orchestration" },
      { num: "02", key: "empty", text: "" },
      { num: "03", key: "func", text: "async function deployRelease() {" },
      { num: "04", key: "run", text: "  const artifact = await pipeline.run();" },
      { num: "05", key: "line1", text: "  const signature = await sign(artifact.output.hash);" },
      { num: "06", key: "line2", text: "  const target = await resolveEdgeRegion(artifact.meta.region);" },
      { num: "07", key: "line3", text: "  return deploy(artifact, signature, target);" },
      { num: "08", key: "close", text: "}" },
    ];

    let y = 135;
    const startX = 130;
    const lineYMap: Record<string, number> = {};

    lines.forEach((line) => {
      lineYMap[line.key] = y;

      // Determine status of current line
      let lineStatus: "error" | "fixed" | "normal" = "normal";
      if (diagnosticMode === "error") {
        if (line.key === "line1" || line.key === "line2" || line.key === "line3") {
          lineStatus = "error";
        }
      } else if (diagnosticMode === "fixed_step1") {
        if (line.key === "line1") lineStatus = "fixed";
      } else if (diagnosticMode === "fixed_step2") {
        if (line.key === "line1" || line.key === "line2") lineStatus = "fixed";
      } else if (diagnosticMode === "fixed_all") {
        if (line.key === "line1" || line.key === "line2" || line.key === "line3") {
          lineStatus = "fixed";
        }
      }

      const lineTop = y - 36;
      const lineHeight = 50;

      if (lineStatus === "error") {
        // SOLID FULL-LINE RED HIGHLIGHT
        ctx.fillStyle = "rgba(239, 68, 68, 0.26)";
        ctx.fillRect(gutterWidth, lineTop, canvas.width - gutterWidth - 20, lineHeight);

        // Solid red left border marker
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(gutterWidth, lineTop, 5, lineHeight);

        // Gutter line number highlighted in red
        ctx.fillStyle = "#fca5a5";
        ctx.font = "bold 25px monospace";
        ctx.fillText(line.num, 38, y);

        // Gutter diagnostic red dot
        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.arc(18, y - 9, 6.5, 0, Math.PI * 2);
        ctx.fill();

        // Outer dot glow ring
        ctx.strokeStyle = "rgba(239, 68, 68, 0.55)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(18, y - 9, 10.5, 0, Math.PI * 2);
        ctx.stroke();
      } else if (lineStatus === "fixed") {
        // SOLID FULL-LINE GREEN HIGHLIGHT (Beat D Fix payoff)
        ctx.fillStyle = "rgba(34, 197, 94, 0.22)";
        ctx.fillRect(gutterWidth, lineTop, canvas.width - gutterWidth - 20, lineHeight);

        // Solid green left border marker
        ctx.fillStyle = "#22c55e";
        ctx.fillRect(gutterWidth, lineTop, 5, lineHeight);

        // Gutter line number highlighted in green
        ctx.fillStyle = "#86efac";
        ctx.font = "bold 25px monospace";
        ctx.fillText(line.num, 38, y);

        // Gutter diagnostic green dot
        ctx.fillStyle = "#22c55e";
        ctx.beginPath();
        ctx.arc(18, y - 9, 6.5, 0, Math.PI * 2);
        ctx.fill();

        // Outer dot glow ring
        ctx.strokeStyle = "rgba(34, 197, 94, 0.55)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(18, y - 9, 10.5, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // Normal gutter number
        ctx.fillStyle = "#3d485e";
        ctx.font = "25px monospace";
        ctx.fillText(line.num, 38, y);
      }

      ctx.font = "25px monospace";

      // Precise Syntax Tokens
      if (line.key === "comment") {
        ctx.fillStyle = "#52627a";
        ctx.fillText(line.text, startX, y);
      } else if (line.key === "func") {
        ctx.fillStyle = "#8ab4ff";
        ctx.fillText("async function ", startX, y);
        const w1 = ctx.measureText("async function ").width;
        ctx.fillStyle = "#f8fafc";
        ctx.fillText("deployRelease", startX + w1, y);
        const w2 = ctx.measureText("deployRelease").width;
        ctx.fillStyle = "#94a3b8";
        ctx.fillText("() {", startX + w1 + w2, y);
      } else if (line.key === "run") {
        ctx.fillStyle = "#8ab4ff";
        ctx.fillText("  const ", startX, y);
        const w1 = ctx.measureText("  const ").width;
        ctx.fillStyle = "#f8fafc";
        ctx.fillText("artifact", startX + w1, y);
        const w2 = ctx.measureText("artifact").width;
        ctx.fillStyle = "#94a3b8";
        ctx.fillText(" = ", startX + w1 + w2, y);
        const w3 = ctx.measureText(" = ").width;
        ctx.fillStyle = "#8ab4ff";
        ctx.fillText("await ", startX + w1 + w2 + w3, y);
        const w4 = ctx.measureText("await ").width;
        ctx.fillStyle = "#60a5fa";
        ctx.fillText("pipeline", startX + w1 + w2 + w3 + w4, y);
        const w5 = ctx.measureText("pipeline").width;
        ctx.fillStyle = "#94a3b8";
        ctx.fillText(".", startX + w1 + w2 + w3 + w4 + w5, y);
        const w6 = ctx.measureText(".").width;
        ctx.fillStyle = "#93c5fd";
        ctx.fillText("run();", startX + w1 + w2 + w3 + w4 + w5 + w6, y);
      } else if (line.key === "line1") {
        ctx.fillStyle = "#8ab4ff";
        ctx.fillText("  const ", startX, y);
        let curX = startX + ctx.measureText("  const ").width;
        ctx.fillStyle = "#f8fafc";
        ctx.fillText("signature", curX, y);
        curX += ctx.measureText("signature").width;
        ctx.fillStyle = "#94a3b8";
        ctx.fillText(" = ", curX, y);
        curX += ctx.measureText(" = ").width;
        ctx.fillStyle = "#8ab4ff";
        ctx.fillText("await ", curX, y);
        curX += ctx.measureText("await ").width;
        ctx.fillStyle = "#60a5fa";
        ctx.fillText("sign", curX, y);
        curX += ctx.measureText("sign").width;
        ctx.fillStyle = "#94a3b8";
        ctx.fillText("(", curX, y);
        curX += ctx.measureText("(").width;
        ctx.fillStyle =
          lineStatus === "error" ? "#ffffff" : lineStatus === "fixed" ? "#ffffff" : "#f8fafc";
        ctx.fillText("artifact.output.hash", curX, y);
        curX += ctx.measureText("artifact.output.hash").width;
        ctx.fillStyle = "#94a3b8";
        ctx.fillText(");", curX, y);
      } else if (line.key === "line2") {
        ctx.fillStyle = "#8ab4ff";
        ctx.fillText("  const ", startX, y);
        let curX = startX + ctx.measureText("  const ").width;
        ctx.fillStyle = "#f8fafc";
        ctx.fillText("target", curX, y);
        curX += ctx.measureText("target").width;
        ctx.fillStyle = "#94a3b8";
        ctx.fillText(" = ", curX, y);
        curX += ctx.measureText(" = ").width;
        ctx.fillStyle = "#8ab4ff";
        ctx.fillText("await ", curX, y);
        curX += ctx.measureText("await ").width;
        ctx.fillStyle = "#60a5fa";
        ctx.fillText("resolveEdgeRegion", curX, y);
        curX += ctx.measureText("resolveEdgeRegion").width;
        ctx.fillStyle = "#94a3b8";
        ctx.fillText("(", curX, y);
        curX += ctx.measureText("(").width;
        ctx.fillStyle =
          lineStatus === "error" ? "#ffffff" : lineStatus === "fixed" ? "#ffffff" : "#f8fafc";
        ctx.fillText("artifact.meta.region", curX, y);
        curX += ctx.measureText("artifact.meta.region").width;
        ctx.fillStyle = "#94a3b8";
        ctx.fillText(");", curX, y);
      } else if (line.key === "line3") {
        ctx.fillStyle = "#8ab4ff";
        ctx.fillText("  return ", startX, y);
        let curX = startX + ctx.measureText("  return ").width;
        ctx.fillStyle = "#60a5fa";
        ctx.fillText("deploy", curX, y);
        curX += ctx.measureText("deploy").width;
        ctx.fillStyle = "#94a3b8";
        ctx.fillText("(", curX, y);
        curX += ctx.measureText("(").width;
        ctx.fillStyle =
          lineStatus === "error" ? "#ffffff" : lineStatus === "fixed" ? "#ffffff" : "#f8fafc";
        ctx.fillText("artifact, signature, target", curX, y);
        curX += ctx.measureText("artifact, signature, target").width;
        ctx.fillStyle = "#94a3b8";
        ctx.fillText(");", curX, y);
      } else if (line.key === "close") {
        ctx.fillStyle = "#94a3b8";
        ctx.fillText("}", startX, y);
      }

      y += 50;
    });

    // Connecting vertical gutter line linking the cascading problem lines
    if (diagnosticMode === "error" && lineYMap.line1 && lineYMap.line3) {
      ctx.strokeStyle = "rgba(239, 68, 68, 0.45)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(18, lineYMap.line1 - 9);
      ctx.lineTo(18, lineYMap.line3 - 9);
      ctx.stroke();
    } else if (diagnosticMode === "fixed_all" && lineYMap.line1 && lineYMap.line3) {
      ctx.strokeStyle = "rgba(34, 197, 94, 0.45)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(18, lineYMap.line1 - 9);
      ctx.lineTo(18, lineYMap.line3 - 9);
      ctx.stroke();
    } else if (diagnosticMode === "fixed_step2" && lineYMap.line1 && lineYMap.line2) {
      ctx.strokeStyle = "rgba(34, 197, 94, 0.45)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(18, lineYMap.line1 - 9);
      ctx.lineTo(18, lineYMap.line2 - 9);
      ctx.stroke();
    }

    // Footer status bar
    ctx.fillStyle = "#10141e";
    ctx.fillRect(0, canvas.height - 52, canvas.width, 52);
    ctx.strokeStyle = "#1a2130";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 52);
    ctx.lineTo(canvas.width, canvas.height - 52);
    ctx.stroke();

    // Diagnostic notice in status line
    if (diagnosticMode === "error") {
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(36, canvas.height - 26, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#fca5a5";
      ctx.font = "bold 17px monospace";
      ctx.fillText(
        "3 diagnostics • Cascading type and deployment signature mismatch",
        56,
        canvas.height - 20
      );
    } else if (diagnosticMode.startsWith("fixed")) {
      ctx.fillStyle = "#22c55e";
      ctx.beginPath();
      ctx.arc(36, canvas.height - 26, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#86efac";
      ctx.font = "bold 17px monospace";
      ctx.fillText(
        "0 errors • Fix verified: All 3 dependencies resolved",
        56,
        canvas.height - 20
      );
    } else {
      ctx.fillStyle = "#8ab4ff";
      ctx.beginPath();
      ctx.arc(36, canvas.height - 26, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#94a3b8";
      ctx.font = "17px monospace";
      ctx.fillText("0 errors • Pipeline verified and stable", 56, canvas.height - 20);
    }

    ctx.fillStyle = "#52627a";
    ctx.font = "17px monospace";
    ctx.fillText("TypeScript 5.8 • UTF-8 • Ln 5, Col 19", canvas.width - 390, canvas.height - 20);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

/**
 * Creates out-of-focus background bokeh panel to suggest spatial depth
 */
function createBackgroundBokehTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 400;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = "#0a0d13";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#1a2130";
    ctx.lineWidth = 3;
    ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

    ctx.fillStyle = "#10141d";
    ctx.fillRect(0, 0, canvas.width, 45);

    ctx.fillStyle = "#3e4c63";
    ctx.font = "16px monospace";
    ctx.fillText("config.pipeline.json", 20, 28);

    ctx.fillStyle = "#273142";
    ctx.font = "16px monospace";
    ctx.fillText('{ "target": "production", "reconcile": true }', 25, 90);
    ctx.fillText('{ "environment": "global-edge" }', 25, 130);
    ctx.fillText('{ "verify": "pending" }', 25, 170);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

/**
 * Creates high-res canvas texture for telemetry panel (held for Beat D)
 */
function createTelemetryTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 500;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = "#101217";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#252b36";
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

    ctx.fillStyle = "#161922";
    ctx.fillRect(0, 0, canvas.width, 60);

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "bold 22px monospace";
    ctx.fillText("LIFECYCLE PIPELINE", 30, 38);

    ctx.fillStyle = "#8ab4ff";
    ctx.font = "18px monospace";
    ctx.fillText("STAGE ACTIVE", canvas.width - 160, 38);

    const steps = [
      { step: "01", name: "CODE", desc: "Diagnostic Resolution" },
      { step: "02", name: "BUILD", desc: "Static Zero-Runtime Export" },
      { step: "03", name: "ITERATE", desc: "Pipeline Stabilization" },
      { step: "04", name: "SHIP", desc: "Autonomous Edge Ready" },
    ];

    let boxY = 90;
    steps.forEach((s) => {
      ctx.fillStyle = "#151820";
      ctx.fillRect(30, boxY, canvas.width - 60, 75);
      ctx.strokeStyle = "#252c38";
      ctx.strokeRect(30, boxY, canvas.width - 60, 75);

      ctx.fillStyle = "#8ab4ff";
      ctx.font = "bold 24px monospace";
      ctx.fillText(s.step, 50, boxY + 45);

      ctx.fillStyle = "#e2e8f0";
      ctx.font = "bold 22px monospace";
      ctx.fillText(s.name, 120, boxY + 45);

      ctx.fillStyle = "#64748b";
      ctx.font = "18px monospace";
      ctx.fillText(s.desc, 280, boxY + 45);

      boxY += 92;
    });
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

export default function IntroOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glimpseRef = useRef<HTMLDivElement>(null);

  // Staggered text reveal refs for Beat C
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  // Caption refs for Beat B and Beat D
  const beatBCaptionRef = useRef<HTMLDivElement>(null);
  const beatDCaptionRef = useRef<HTMLDivElement>(null);

  // Lifecycle states
  const mounted = useIsMounted();
  const lockedBeat = useLockedBeat();
  const isReducedMotion = usePrefersReducedMotion();
  const isSupported = useWebGLSupported();
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDissolved, setIsDissolved] = useState(false);

  // Complete and unmount handler
  const handleComplete = useCallback(() => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsDissolved(true);
    }, 600);
  }, []);

  // Keyboard skip handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleComplete]);

  // Main 3D Storyboard Sequence (~8.0s total across Beats A–D)
  useEffect(() => {
    if (!mounted || isSupported === null) return;
    if (!isSupported || isReducedMotion || isDissolved) return;

    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080b10);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch {
      setTimeout(handleComplete, 0);
      return;
    }

    // ========================================================================
    // LIGHTING SETUP
    // ========================================================================
    const ambientLight = new THREE.AmbientLight(
      0x94a3b8,
      lockedBeat === "c" || lockedBeat === "d" ? 0.65 : 0.45
    );
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.05);
    dirLight.position.set(2, 6, 5);
    scene.add(dirLight);

    // Localized tension light near broken code lines in Beat B
    const frictionLight = new THREE.PointLight(
      0xef4444,
      lockedBeat === "b" || lockedBeat === null ? 0.85 : 0.0,
      8
    );
    frictionLight.position.set(-1.8, -0.4, 2.0);
    scene.add(frictionLight);

    // Resolution blue accent light (activated in Beat C & D)
    const accentLight = new THREE.PointLight(
      0x8ab4ff,
      lockedBeat === "c" || lockedBeat === "d" ? 1.8 : 0.0,
      12
    );
    accentLight.position.set(1.5, 0.8, 2.5);
    scene.add(accentLight);

    // Workspace Root Group
    const workspaceGroup = new THREE.Group();
    scene.add(workspaceGroup);

    // Textures
    const heroTextureProblem = createBuildPipelineTexture("error");
    const heroTextureResolved = createBuildPipelineTexture("clean");
    const heroTextureFixed1 = createBuildPipelineTexture("fixed_step1");
    const heroTextureFixed2 = createBuildPipelineTexture("fixed_step2");
    const heroTextureFixedAll = createBuildPipelineTexture("fixed_all");
    const bokehTexture = createBackgroundBokehTexture();
    const telemTexture = createTelemetryTexture();

    // ========================================================================
    // MESHES SETUP
    // ========================================================================

    // 1. HERO PANEL
    const isHeroResolved = lockedBeat === "c";
    const isHeroFixed = lockedBeat === "d";
    const heroGeo = new THREE.BoxGeometry(4.0, 2.53, 0.05);
    const heroMat = new THREE.MeshStandardMaterial({
      map: isHeroFixed
        ? heroTextureFixedAll
        : isHeroResolved
        ? heroTextureResolved
        : heroTextureProblem,
      roughness: 0.25,
      metalness: 0.1,
      transparent: true,
      opacity: lockedBeat === "a" ? 0.0 : 1.0,
    });
    const heroMesh = new THREE.Mesh(heroGeo, heroMat);

    // Initial position depends on locked beat
    if (lockedBeat === "c" || lockedBeat === "d") {
      heroMesh.position.set(-0.55, 0.25, 0.1);
      heroMesh.rotation.set(-0.06, 0.12, -0.02);
    } else {
      heroMesh.position.set(0, 0.05, 0);
      heroMesh.rotation.set(-0.04, 0.06, -0.015);
    }
    heroMesh.visible = lockedBeat !== "a";
    workspaceGroup.add(heroMesh);

    // Border line segments
    const heroEdges = new THREE.EdgesGeometry(heroGeo);
    const heroLineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(0x2a3346),
      transparent: true,
      opacity: lockedBeat === "a" ? 0.0 : 0.7,
    });
    const heroWireframe = new THREE.LineSegments(heroEdges, heroLineMat);
    heroMesh.add(heroWireframe);

    // 2. BACKGROUND BOKEH PANEL (Depth suggestion)
    const bokehGeo = new THREE.BoxGeometry(2.4, 1.6, 0.03);
    const bokehMat = new THREE.MeshStandardMaterial({
      map: bokehTexture,
      roughness: 0.8,
      metalness: 0.05,
      transparent: true,
      opacity: lockedBeat === "a" ? 0.0 : 0.18,
    });
    const bokehMesh = new THREE.Mesh(bokehGeo, bokehMat);
    bokehMesh.position.set(2.0, 0.9, -1.8);
    bokehMesh.rotation.set(-0.08, -0.22, 0.04);
    bokehMesh.visible = lockedBeat !== "a";
    workspaceGroup.add(bokehMesh);

    // 3. LIFECYCLE PIPELINE PANEL (Beat D only)
    const telemGeo = new THREE.BoxGeometry(3.0, 1.88, 0.05);
    const telemMat = new THREE.MeshStandardMaterial({
      map: telemTexture,
      roughness: 0.25,
      metalness: 0.15,
      transparent: true,
      opacity: lockedBeat === "d" ? 1.0 : 0.0,
    });
    const telemMesh = new THREE.Mesh(telemGeo, telemMat);
    telemMesh.position.set(1.4, -0.45, 0.35);
    telemMesh.rotation.set(0.08, -0.16, 0.04);
    telemMesh.visible = lockedBeat === "d";
    workspaceGroup.add(telemMesh);

    // Ground perspective grid
    const grid = new THREE.GridHelper(10, 14, 0x141a26, 0x090d14);
    grid.position.set(0, -2.2, -1.0);
    grid.rotation.x = Math.PI / 10;
    scene.add(grid);

    // Camera jitter controller
    const cameraState = {
      jitterFactor: lockedBeat === "b" ? 1.0 : 0.0,
    };

    // ========================================================================
    // MASTER GSAP TIMELINE: BEATS A (0-1.2s) → B (1.2-3.0s) → C (3.0-6.0s) → D (6.0-8.0s)
    // Exactly ~8.0s duration per updated PRD Section 1
    // ========================================================================
    const masterTimeline = gsap.timeline({
      paused: lockedBeat !== null,
      onComplete: () => {
        handleComplete();
      },
    });

    if (lockedBeat === null) {
      // ----------------------------------------------------------------------
      // BEAT A (0.0s – 1.2s): "The Glimpse"
      // Faint homepage silhouette renders; 3D panel hidden
      // ----------------------------------------------------------------------
      masterTimeline.set(heroMesh, { visible: false });
      masterTimeline.set(bokehMesh, { visible: false });

      // ----------------------------------------------------------------------
      // BEAT B (1.2s – 3.0s): "The Crash" (~1.8s hold for clear absorption)
      // Glitch fracture -> 3D Hero Panel snaps in with 3-LINE SOLID RED HIGHLIGHT
      // ----------------------------------------------------------------------
      // Glitch transition on Glimpse DOM layer (1.1s – 1.25s)
      if (glimpseRef.current) {
        masterTimeline.to(
          glimpseRef.current,
          {
            x: 6,
            filter: "drop-shadow(-2px 0 rgba(239,68,68,0.6)) drop-shadow(2px 0 rgba(138,180,255,0.6))",
            duration: 0.1,
            ease: "power1.inOut",
          },
          1.1
        );
        masterTimeline.to(
          glimpseRef.current,
          {
            opacity: 0,
            duration: 0.15,
            ease: "power2.out",
          },
          1.2
        );
      }

      // Hero panel snaps into center view
      masterTimeline.call(
        () => {
          heroMesh.visible = true;
          bokehMesh.visible = true;
          heroMat.opacity = 1;
          heroLineMat.opacity = 0.7;
          bokehMat.opacity = 0.18;
          cameraState.jitterFactor = 1.0;
        },
        undefined,
        1.25
      );

      masterTimeline.fromTo(
        heroMesh.scale,
        { x: 0.92, y: 0.92, z: 0.92 },
        { x: 1.0, y: 1.0, z: 1.0, duration: 0.35, ease: "power2.out" },
        1.25
      );

      // Beat B caption ("Every build breaks somewhere.") fades in shortly after panel settles (~1.65s)
      if (beatBCaptionRef.current) {
        masterTimeline.to(
          beatBCaptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          1.65
        );
        // Fades out as Beat C approaches (~2.75s – 3.0s)
        masterTimeline.to(
          beatBCaptionRef.current,
          {
            opacity: 0,
            y: -6,
            duration: 0.25,
            ease: "power2.in",
          },
          2.75
        );
      }

      // Hold in Beat B until 3.0s so viewer easily digests the 3-line broken cascade
      masterTimeline.to({}, { duration: 1.75 }, 1.25);

      // ----------------------------------------------------------------------
      // BEAT C (3.0s – 6.0s): "The Reveal" (~3.0s — emotional payoff & hold)
      // Red highlights resolve -> Staggered line-by-line copy reveal with glow
      // ----------------------------------------------------------------------
      // Resolve error line highlight
      masterTimeline.call(
        () => {
          heroMat.map = heroTextureResolved;
          heroMat.needsUpdate = true;
        },
        undefined,
        3.0
      );

      // Camera stabilizes; jitter decays to zero
      masterTimeline.to(
        cameraState,
        { jitterFactor: 0.0, duration: 1.0, ease: "power2.out" },
        3.0
      );

      // Lighting transition: red fades, signature #8AB4FF accent blooms
      masterTimeline.to(frictionLight, { intensity: 0.0, duration: 1.0 }, 3.0);
      masterTimeline.to(accentLight, { intensity: 1.8, duration: 1.2 }, 3.0);
      masterTimeline.to(ambientLight, { intensity: 0.65, duration: 1.2 }, 3.0);

      // Hero panel shifts gently to left
      masterTimeline.to(
        heroMesh.position,
        { x: -0.55, y: 0.25, z: 0.1, duration: 1.4, ease: "power2.inOut" },
        3.0
      );
      masterTimeline.to(
        heroMesh.rotation,
        { x: -0.06, y: 0.12, z: -0.02, duration: 1.4, ease: "power2.inOut" },
        3.0
      );

      // STAGGERED LINE-BY-LINE REVEAL (Name with glow → Title → Personal line)
      // Line 1: Name with accent glow at 3.2s
      if (nameRef.current) {
        masterTimeline.to(
          nameRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
          },
          3.2
        );
      }

      // Line 2: Title at 3.45s (~0.25s offset)
      if (titleRef.current) {
        masterTimeline.to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          3.45
        );
      }

      // Line 3: Personal line at 3.7s (~0.25s offset)
      if (taglineRef.current) {
        masterTimeline.to(
          taglineRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
          },
          3.7
        );
      }

      // HOLD FULLY REVEALED COPY: Comfortable reading hold (4.4s – 6.0s)
      masterTimeline.to({}, { duration: 1.6 }, 4.4);

      // ----------------------------------------------------------------------
      // BEAT D (6.0s – 8.0s): "The Load" (~2.0s workspace settle & dissolve)
      // Fix animation: green full-line highlight sweeps across all 3 lines in succession (~6.0s – 6.75s)
      // Telemetry panel fades & scales in -> Closing caption -> Overlay dissolves
      // ----------------------------------------------------------------------
      // Step 1: Line 05 turns green (6.0s)
      masterTimeline.call(
        () => {
          heroMat.map = heroTextureFixed1;
          heroMat.needsUpdate = true;
          telemMesh.visible = true;
        },
        undefined,
        6.0
      );

      // Step 2: Line 06 turns green (6.12s)
      masterTimeline.call(
        () => {
          heroMat.map = heroTextureFixed2;
          heroMat.needsUpdate = true;
        },
        undefined,
        6.12
      );

      // Step 3: Line 07 turns green — all 3 resolved! (6.24s)
      masterTimeline.call(
        () => {
          heroMat.map = heroTextureFixedAll;
          heroMat.needsUpdate = true;
        },
        undefined,
        6.24
      );

      masterTimeline.fromTo(
        telemMesh.scale,
        { x: 0.9, y: 0.9, z: 0.9 },
        { x: 1.0, y: 1.0, z: 1.0, duration: 0.8, ease: "power2.out" },
        6.0
      );

      masterTimeline.to(telemMat, { opacity: 1.0, duration: 0.8, ease: "power2.out" }, 6.0);

      // Green fix highlight resolves back to clean texture after ~0.7s as rest of workspace settles
      masterTimeline.call(
        () => {
          heroMat.map = heroTextureResolved;
          heroMat.needsUpdate = true;
        },
        undefined,
        6.85
      );

      // Closing caption ("This is what I do — turn broken into shipped.") fades in alongside green highlight
      if (beatDCaptionRef.current) {
        masterTimeline.to(
          beatDCaptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          6.05
        );
        // Fades out before overlay dissolves (7.25s)
        masterTimeline.to(
          beatDCaptionRef.current,
          {
            opacity: 0,
            y: -6,
            duration: 0.3,
            ease: "power2.in",
          },
          7.25
        );
      }

      // Settle hold in workspace composition
      masterTimeline.to({}, { duration: 1.4 }, 6.0);

      // Crossfade out at 7.4s – 8.0s
      masterTimeline.call(
        () => {
          setIsFadingOut(true);
        },
        undefined,
        7.4
      );

      masterTimeline.to({}, { duration: 0.6 }, 7.4);
    }

    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Render loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = (time - startTime) / 1000;

      // Restrained camera micro-jitter focused on hero panel
      if (cameraState.jitterFactor > 0.001) {
        const jx =
          (Math.sin(time * 0.024) * 0.016 + Math.cos(time * 0.041) * 0.008) *
          cameraState.jitterFactor;
        const jy =
          (Math.cos(time * 0.028) * 0.012 + Math.sin(time * 0.035) * 0.006) *
          cameraState.jitterFactor;
        camera.position.x = jx;
        camera.position.y = jy;
      } else {
        camera.position.x = 0;
        camera.position.y = 0;
      }
      camera.lookAt(0, 0, 0);

      // Gentle floating in Beat D
      if ((elapsed > 6.0 || lockedBeat === "d") && lockedBeat !== "a" && lockedBeat !== "b") {
        heroMesh.position.y = 0.25 + Math.sin(elapsed * 0.8) * 0.02;
        telemMesh.position.y = -0.45 + Math.sin(elapsed * 0.8 + 1.0) * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate(performance.now());

    // Safety timeout (8.8s) guarantees overlay never hangs indefinitely
    let safetyTimer: NodeJS.Timeout | null = null;
    if (lockedBeat === null) {
      safetyTimer = setTimeout(() => {
        handleComplete();
      }, 8800);
    }

    // Cleanup and WebGL context disposal
    return () => {
      if (safetyTimer) clearTimeout(safetyTimer);
      cancelAnimationFrame(animationFrameId);
      masterTimeline.kill();
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      heroGeo.dispose();
      heroMat.dispose();
      heroTextureProblem.dispose();
      heroTextureResolved.dispose();
      heroTextureFixed1.dispose();
      heroTextureFixed2.dispose();
      heroTextureFixedAll.dispose();
      heroEdges.dispose();
      heroLineMat.dispose();

      bokehGeo.dispose();
      bokehMat.dispose();
      bokehTexture.dispose();

      telemGeo.dispose();
      telemMat.dispose();
      telemTexture.dispose();

      grid.geometry.dispose();

      renderer.forceContextLoss();
      renderer.dispose();
    };
  }, [mounted, isSupported, isReducedMotion, isDissolved, lockedBeat, handleComplete]);

  // If preferences say reduced motion, skip overlay completely and immediately
  if (isReducedMotion || isDissolved) {
    return null;
  }

  // Graceful 2D non-crashing fallback if WebGL is unavailable
  if (isSupported === false) {
    return <IntroFallback onComplete={handleComplete} isReducedMotion={isReducedMotion} />;
  }

  if (!mounted || isSupported === null) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#080B10] overflow-hidden select-none transition-opacity duration-600 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Developer Workspace Loading Experience"
      role="dialog"
      aria-modal="true"
    >
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />

      {/* Atmospheric radial vignette overlay */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-[#080B10]/30 to-[#080B10] pointer-events-none" />

      {/* ================================================================== */}
      {/* BEAT A: "The Glimpse" Layer                                        */}
      {/* Dim, low-opacity silhouette of the real homepage attempting to load   */}
      {/* ================================================================== */}
      {(lockedBeat === "a" || lockedBeat === null) && (
        <div
          ref={glimpseRef}
          className={`absolute inset-0 pointer-events-none z-20 transition-opacity flex flex-col justify-between p-6 sm:p-10 ${
            lockedBeat === "a" ? "opacity-80" : "opacity-60"
          }`}
        >
          {/* Faint Navbar silhouette */}
          <div className="w-full flex items-center justify-between border-b border-white/5 pb-4">
            <div className="font-mono text-sm font-bold tracking-wider text-white/50">
              PORTFOLIO
            </div>
            <div className="hidden md:flex items-center gap-6 text-xs font-mono text-white/30">
              <span>{"// ABOUT"}</span>
              <span>{"// SKILLS"}</span>
              <span>{"// PROJECTS"}</span>
              <span>{"// CONTACT"}</span>
            </div>
            <div className="w-6 h-6 border border-white/10 rounded" />
          </div>

          {/* Faint Hero layout attempt (No invented badges per Section 5) */}
          <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-auto">
            <div className="space-y-5">
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white/40 font-mono">
                  {portfolio.personal.name || "[YOUR NAME]"}
                </h1>
                <p className="text-lg font-mono text-accent/50 tracking-wider">
                  {portfolio.personal.title || "FULL-STACK DEVELOPER"}
                </p>
              </div>
              <p className="text-xs sm:text-sm text-white/30 max-w-md leading-relaxed">
                Building functional digital experiences, websites, and software products.
              </p>
              <div className="flex gap-3 pt-2">
                <div className="px-4 py-2 rounded bg-white/10 text-white/40 font-mono text-xs border border-white/10">
                  Explore Work
                </div>
                <div className="px-4 py-2 rounded border border-white/10 text-white/30 font-mono text-xs">
                  Contact Me
                </div>
              </div>
            </div>

            {/* Wireframe box representing false start 3D viewport */}
            <div className="h-64 rounded border border-white/5 bg-white/[0.02] flex items-center justify-center p-4">
              <div className="font-mono text-xs text-white/20 tracking-widest animate-pulse">
                INITIALIZING VIEWPORT...
              </div>
            </div>
          </div>

          {/* Bottom subtle status */}
          <div className="w-full flex items-center justify-between text-[11px] font-mono text-white/25 border-t border-white/5 pt-3">
            <span>READY STATE: AWAITING HYDRATION</span>
            <span>01 / 04</span>
          </div>
        </div>
      )}

      {/* ================================================================== */}
      {/* BEAT B: "The Crash" Caption                                        */}
      {/* "Every build breaks somewhere." (verbatim per PRD Section 1)       */}
      {/* ================================================================== */}
      <div
        ref={beatBCaptionRef}
        style={{
          opacity: lockedBeat === "b" ? 1 : 0,
          transform: lockedBeat === "b" ? "translateY(0)" : "translateY(8px)",
        }}
        className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 pointer-events-none z-20 text-center px-4"
      >
        <p className="font-mono text-xs sm:text-sm text-slate-400 tracking-wider">
          &ldquo;Every build breaks somewhere.&rdquo;
        </p>
      </div>

      {/* ================================================================== */}
      {/* BEAT C: "The Reveal" Staggered Line-by-Line Typographic Entrance   */}
      {/* (Name with glow → Title → Personal line → Hold)                    */}
      {/* ================================================================== */}
      <div className="absolute top-16 left-6 sm:left-12 max-w-xl pointer-events-none z-10 space-y-4">
        {/* Line 1: Name with soft accent glow */}
        <h1
          ref={nameRef}
          style={{
            opacity: lockedBeat === "c" || lockedBeat === "d" ? 1 : 0,
            transform: lockedBeat === "c" || lockedBeat === "d" ? "translateY(0)" : "translateY(16px)",
            textShadow: "0 0 24px rgba(138, 180, 255, 0.65), 0 0 48px rgba(138, 180, 255, 0.25)",
          }}
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground font-mono"
        >
          {portfolio.personal.name || "[YOUR NAME]"}
        </h1>

        {/* Line 2: Title */}
        <p
          ref={titleRef}
          style={{
            opacity: lockedBeat === "c" || lockedBeat === "d" ? 1 : 0,
            transform: lockedBeat === "c" || lockedBeat === "d" ? "translateY(0)" : "translateY(12px)",
          }}
          className="text-base sm:text-lg font-mono text-accent uppercase tracking-wider font-semibold"
        >
          {portfolio.personal.title || "FULL-STACK DEVELOPER"}
        </p>

        {/* Line 3: Personal Line (replaces standard tagline per PRD Beat C) */}
        <p
          ref={taglineRef}
          style={{
            opacity: lockedBeat === "c" || lockedBeat === "d" ? 1 : 0,
            transform: lockedBeat === "c" || lockedBeat === "d" ? "translateY(0)" : "translateY(12px)",
          }}
          className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed tracking-wide"
        >
          &ldquo;I don&#39;t just design interfaces — I fix what&#39;s underneath.&rdquo;
        </p>
      </div>

      {/* ================================================================== */}
      {/* BEAT D: "The Load" Closing Caption                                 */}
      {/* "This is what I do — turn broken into shipped." (verbatim per PRD) */}
      {/* ================================================================== */}
      <div
        ref={beatDCaptionRef}
        style={{
          opacity: lockedBeat === "d" ? 1 : 0,
          transform: lockedBeat === "d" ? "translateY(0)" : "translateY(8px)",
        }}
        className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 pointer-events-none z-20 text-center px-4"
      >
        <p className="font-mono text-xs sm:text-sm text-slate-300 tracking-wider">
          &ldquo;This is what I do — turn broken into shipped.&rdquo;
        </p>
      </div>

      {/* Accessible skip trigger */}
      <button
        onClick={handleComplete}
        className="absolute bottom-6 right-6 z-30 px-3 py-1.5 rounded border border-surface-2 bg-surface-1/80 backdrop-blur text-xs font-mono text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
        aria-label="Skip intro sequence"
      >
        [Skip Intro <span className="opacity-60">Esc</span>]
      </button>
    </div>
  );
}
