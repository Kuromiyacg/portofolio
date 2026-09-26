"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { isWebGLAvailable } from "@/utils/webgl";
import HeroFallback from "./HeroFallback";



/**
 * Creates an offscreen high-res canvas texture for code editor window.
 * Solid surfaces + soft shadows per MASTER_PRD.txt Section 6 & 20.
 */
function createCodeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Background: Solid Deep Charcoal surface (#0d1117)
    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header Chrome: Solid Primary Surface (#161b22)
    ctx.fillStyle = "#161b22";
    ctx.fillRect(0, 0, canvas.width, 68);

    // Subtle header bottom divider
    ctx.fillStyle = "#21262d";
    ctx.fillRect(0, 66, canvas.width, 2);

    // Window controls (macOS style dots)
    ctx.fillStyle = "#ff5f56";
    ctx.beginPath();
    ctx.arc(36, 34, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffbd2e";
    ctx.beginPath();
    ctx.arc(60, 34, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#27c93f";
    ctx.beginPath();
    ctx.arc(84, 34, 7, 0, Math.PI * 2);
    ctx.fill();

    // Tab active pill
    ctx.fillStyle = "#0d1117";
    ctx.fillRect(120, 16, 170, 50);
    ctx.fillStyle = "#8ab4ff";
    ctx.fillRect(120, 16, 170, 3); // Active tab indicator

    // File name
    ctx.fillStyle = "#f0f6fc";
    ctx.font = "bold 18px monospace";
    ctx.fillText("engine.ts", 150, 46);

    ctx.fillStyle = "#6e7681";
    ctx.font = "16px monospace";
    ctx.fillText("// Production build engine", 320, 46);

    // Code lines: clean, structured syntax highlights with generous line-height
    ctx.font = "22px monospace";
    const lines = [
      { num: "01", text: "import { Ship, Engine } from '@core/system';", color: "#8b949e" },
      { num: "02", text: "", color: "#ffffff" },
      { num: "03", text: "export async function orchestrate(): Promise<Ship> {", color: "#e6edf3" },
      { num: "04", text: "  const environment = await Engine.initialize({", color: "#8b949e" },
      { num: "05", text: "    mode: 'production',", color: "#8ab4ff" },
      { num: "06", text: "    telemetry: true,", color: "#8ab4ff" },
      { num: "07", text: "    optimization: 'high-performance',", color: "#79c0ff" },
      { num: "08", text: "  });", color: "#8b949e" },
      { num: "09", text: "", color: "#ffffff" },
      { num: "10", text: "  // Pipeline verified and stable", color: "#6e7681" },
      { num: "11", text: "  return environment.deploy();", color: "#8ab4ff" },
      { num: "12", text: "}", color: "#e6edf3" },
    ];

    let y = 125;
    lines.forEach((line) => {
      ctx.fillStyle = "#484f58";
      ctx.fillText(line.num, 36, y);

      ctx.fillStyle = line.color;
      ctx.fillText(line.text, 90, y);
      y += 40;
    });

    // Status footer: Solid Primary Surface (#161b22)
    ctx.fillStyle = "#161b22";
    ctx.fillRect(0, canvas.height - 48, canvas.width, 48);

    ctx.fillStyle = "#21262d";
    ctx.fillRect(0, canvas.height - 48, canvas.width, 1);

    ctx.fillStyle = "#2ea043";
    ctx.beginPath();
    ctx.arc(36, canvas.height - 24, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#8b949e";
    ctx.font = "16px monospace";
    ctx.fillText("status: build operational (100% stable)", 54, canvas.height - 18);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

/**
 * Creates an offscreen high-res canvas texture for a floating browser UI mockup.
 * Built with SOLID surfaces + soft drop shadows per MASTER_PRD.txt Section 6 & 20.
 * Replaces thin-outline sci-fi HUD styling with a modern professional dashboard.
 */
function createBrowserMockupTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 680;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Window background: Deep solid surface (#0d1117)
    ctx.fillStyle = "#0d1117";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Browser Chrome Header: Solid Primary Surface (#161b22)
    ctx.fillStyle = "#161b22";
    ctx.fillRect(0, 0, canvas.width, 70);

    // Chrome bottom border
    ctx.fillStyle = "#21262d";
    ctx.fillRect(0, 68, canvas.width, 2);

    // Window controls
    ctx.fillStyle = "#ff5f56";
    ctx.beginPath();
    ctx.arc(32, 35, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffbd2e";
    ctx.beginPath();
    ctx.arc(56, 35, 7, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#27c93f";
    ctx.beginPath();
    ctx.arc(80, 35, 7, 0, Math.PI * 2);
    ctx.fill();

    // Browser URL bar: Solid inset surface (#0d1117) with soft border
    ctx.fillStyle = "#0d1117";
    ctx.fillRect(115, 16, canvas.width - 230, 38);
    ctx.fillStyle = "#21262d";
    ctx.fillRect(115, 16, canvas.width - 230, 1);
    ctx.fillRect(115, 53, canvas.width - 230, 1);
    ctx.fillRect(115, 16, 1, 38);
    ctx.fillRect(canvas.width - 116, 16, 1, 38);

    // SSL Lock & URL
    ctx.fillStyle = "#3fb950";
    ctx.beginPath();
    ctx.arc(135, 35, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#c9d1d9";
    ctx.font = "15px monospace";
    ctx.fillText("https://app.system.dev/overview", 155, 41);

    // Live status pill on right of URL bar (Restrained highlight)
    ctx.fillStyle = "rgba(138, 180, 255, 0.15)";
    ctx.fillRect(canvas.width - 190, 22, 60, 24);
    ctx.fillStyle = "#8ab4ff";
    ctx.font = "bold 13px monospace";
    ctx.fillText("LIVE", canvas.width - 173, 39);

    // Inner App Header: Solid banner surface (#161b22) with soft shadow
    const headerX = 28;
    const headerY = 92;
    const headerW = canvas.width - 56;
    const headerH = 54;

    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = "#161b22";
    ctx.fillRect(headerX, headerY, headerW, headerH);
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Header subtle border
    ctx.strokeStyle = "#21262d";
    ctx.lineWidth = 1;
    ctx.strokeRect(headerX, headerY, headerW, headerH);

    ctx.fillStyle = "#f0f6fc";
    ctx.font = "bold 18px monospace";
    ctx.fillText("SYSTEM PERFORMANCE OVERVIEW", 48, 126);

    ctx.fillStyle = "#8ab4ff";
    ctx.font = "14px monospace";
    ctx.fillText("Cluster: Global Edge", canvas.width - 240, 126);

    // 3 Metrics Cards Grid: Solid secondary surfaces (#161b22) with soft drop shadows
    const cards = [
      { label: "REQUEST LATENCY", val: "12 ms", sub: "p99 < 28ms", status: "#3fb950" },
      { label: "AVAILABILITY", val: "99.99%", sub: "Zero downtime", status: "#8ab4ff" },
      { label: "EDGE CACHE HIT", val: "100%", sub: "Zero cold start", status: "#79c0ff" },
    ];

    const cardW = (canvas.width - 56 - 32) / 3;
    cards.forEach((c, idx) => {
      const cx = 28 + idx * (cardW + 16);
      const cy = 162;
      const ch = 106;

      // Soft drop shadow on card
      ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 5;
      ctx.fillStyle = "#161b22";
      ctx.fillRect(cx, cy, cardW, ch);
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // Subtle border
      ctx.strokeStyle = "#21262d";
      ctx.lineWidth = 1;
      ctx.strokeRect(cx, cy, cardW, ch);

      // Card top solid indicator bar
      ctx.fillStyle = c.status;
      ctx.fillRect(cx, cy, cardW, 3);

      ctx.fillStyle = "#8b949e";
      ctx.font = "13px monospace";
      ctx.fillText(c.label, cx + 18, cy + 28);

      ctx.fillStyle = "#f0f6fc";
      ctx.font = "bold 28px monospace";
      ctx.fillText(c.val, cx + 18, cy + 68);

      ctx.fillStyle = "#6e7681";
      ctx.font = "13px monospace";
      ctx.fillText(c.sub, cx + 18, cy + 92);
    });

    // Interactive Area Chart Box: Solid Surface (#161b22) with elevation
    const chartX = 28;
    const chartY = 284;
    const chartW = canvas.width - 56;
    const chartH = 265;

    ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = "#161b22";
    ctx.fillRect(chartX, chartY, chartW, chartH);
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Subtle container border
    ctx.strokeStyle = "#21262d";
    ctx.lineWidth = 1;
    ctx.strokeRect(chartX, chartY, chartW, chartH);

    ctx.fillStyle = "#f0f6fc";
    ctx.font = "bold 16px monospace";
    ctx.fillText("THROUGHPUT DISTRIBUTION (req/sec)", chartX + 22, chartY + 34);

    ctx.fillStyle = "#3fb950";
    ctx.font = "14px monospace";
    ctx.fillText("● 14.8k ops/s nominal", chartX + chartW - 220, chartY + 34);

    // Chart Grid Lines: very subtle divider lines
    ctx.strokeStyle = "#21262d";
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      const gy = chartY + 50 + (i * 180) / 5;
      ctx.beginPath();
      ctx.moveTo(chartX + 20, gy);
      ctx.lineTo(chartX + chartW - 20, gy);
      ctx.stroke();
    }

    // Chart Data Line with smooth gradient fill
    const points = [
      { x: 0, y: 0.35 },
      { x: 0.12, y: 0.55 },
      { x: 0.25, y: 0.42 },
      { x: 0.38, y: 0.78 },
      { x: 0.5, y: 0.6 },
      { x: 0.65, y: 0.88 },
      { x: 0.8, y: 0.72 },
      { x: 0.92, y: 0.95 },
      { x: 1.0, y: 0.85 },
    ];

    const innerChartX = chartX + 30;
    const innerChartW = chartW - 60;
    const innerChartBottom = chartY + chartH - 30;
    const innerChartH = 150;

    // Soft gradient fill under line
    const grad = ctx.createLinearGradient(0, chartY + 60, 0, innerChartBottom);
    grad.addColorStop(0, "rgba(138, 180, 255, 0.28)");
    grad.addColorStop(1, "rgba(138, 180, 255, 0.0)");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(innerChartX, innerChartBottom);
    points.forEach((p) => {
      const px = innerChartX + p.x * innerChartW;
      const py = innerChartBottom - p.y * innerChartH;
      ctx.lineTo(px, py);
    });
    ctx.lineTo(innerChartX + innerChartW, innerChartBottom);
    ctx.closePath();
    ctx.fill();

    // Solid line stroke
    ctx.strokeStyle = "#8ab4ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    points.forEach((p, idx) => {
      const px = innerChartX + p.x * innerChartW;
      const py = innerChartBottom - p.y * innerChartH;
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    // Data dots with subtle glow
    points.forEach((p) => {
      const px = innerChartX + p.x * innerChartW;
      const py = innerChartBottom - p.y * innerChartH;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Bottom Footer Bar: Solid surface (#161b22)
    ctx.fillStyle = "#161b22";
    ctx.fillRect(0, canvas.height - 54, canvas.width, 54);
    ctx.fillStyle = "#21262d";
    ctx.fillRect(0, canvas.height - 54, canvas.width, 1);

    ctx.fillStyle = "#6e7681";
    ctx.font = "14px monospace";
    ctx.fillText("Architecture: React 19 • Next.js App Router • Modern Full-Stack", 28, canvas.height - 21);

    ctx.fillStyle = "#8ab4ff";
    ctx.font = "14px monospace";
    ctx.fillText("Production Ready ↗", canvas.width - 200, canvas.height - 21);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

export default function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isSupported = isWebGLAvailable();

  useEffect(() => {
    if (!isSupported) return;

    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Dimensions
    let width = container.clientWidth || 600;
    let height = container.clientHeight || 550;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    // Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // ========================================================================
    // RESTING STATE LIGHTING — Section 6 & 20
    // Soft studio lighting with signature #8AB4FF accent illumination
    // ========================================================================
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const accentLight = new THREE.PointLight(0x8ab4ff, 1.6, 14);
    accentLight.position.set(-1.2, 1.0, 2.5);
    scene.add(accentLight);

    const rimLight = new THREE.PointLight(0x64748b, 0.9, 15);
    rimLight.position.set(2.5, -1.5, 2.0);
    scene.add(rimLight);

    // Workspace Root Group
    const workspaceGroup = new THREE.Group();
    scene.add(workspaceGroup);

    // Textures
    const codeTexture = createCodeTexture();
    const browserTexture = createBrowserMockupTexture();

    // ========================================================================
    // RESTING STATE MESHES — Solid Surface Panels with Intentional Whitespace
    // ========================================================================

    // Panel 1: Code Window (Positioned with clear negative space)
    const codeGeo = new THREE.BoxGeometry(3.6, 2.25, 0.05);
    const codeMat = new THREE.MeshStandardMaterial({
      map: codeTexture,
      roughness: 0.35,
      metalness: 0.05,
    });
    const codeMesh = new THREE.Mesh(codeGeo, codeMat);
    codeMesh.position.set(-0.85, 0.32, 0.1);
    codeMesh.rotation.set(-0.04, 0.12, -0.02);
    workspaceGroup.add(codeMesh);

    // Subtle dark edge segment to ground the solid panel (not a glowing wireframe)
    const codeEdges = new THREE.EdgesGeometry(codeGeo);
    const codeLineMat = new THREE.LineBasicMaterial({
      color: 0x30363d,
      transparent: true,
      opacity: 0.4,
    });
    const codeWireframe = new THREE.LineSegments(codeEdges, codeLineMat);
    codeMesh.add(codeWireframe);

    // Panel 2: Floating Browser UI Mockup Window (Positioned with intentional offset)
    const browserGeo = new THREE.BoxGeometry(3.2, 2.12, 0.05);
    const browserMat = new THREE.MeshStandardMaterial({
      map: browserTexture,
      roughness: 0.3,
      metalness: 0.08,
    });
    const browserMesh = new THREE.Mesh(browserGeo, browserMat);
    browserMesh.position.set(1.4, -0.42, 0.38);
    browserMesh.rotation.set(0.05, -0.14, 0.03);
    workspaceGroup.add(browserMesh);

    const browserEdges = new THREE.EdgesGeometry(browserGeo);
    const browserLineMat = new THREE.LineBasicMaterial({
      color: 0x30363d,
      transparent: true,
      opacity: 0.4,
    });
    const browserWireframe = new THREE.LineSegments(browserEdges, browserLineMat);
    browserMesh.add(browserWireframe);

    // Data Nodes: Structured subtle background nodes
    const nodeGeo = new THREE.OctahedronGeometry(0.18);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x8ab4ff,
      wireframe: true,
      emissive: 0x1e293b,
    });

    const nodes: THREE.Mesh[] = [];
    const nodePositions = [
      new THREE.Vector3(-2.6, 1.7, -0.6),
      new THREE.Vector3(2.7, 1.4, -0.4),
      new THREE.Vector3(2.8, -1.7, 0.2),
      new THREE.Vector3(-2.4, -1.5, 0.5),
    ];

    nodePositions.forEach((pos) => {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.copy(pos);
      workspaceGroup.add(node);
      nodes.push(node);
    });

    // Ground technical grid
    const grid = new THREE.GridHelper(10, 16, 0x1f2937, 0x111827);
    grid.position.set(0, -2.3, -1.0);
    grid.rotation.x = Math.PI / 10;
    scene.add(grid);

    // Raycasting & Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    const interactiveMeshes = [codeMesh, browserMesh];

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let scrollProgress = 0;
    let isVisible = true;
    let animationFrameId: number;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      targetMouseX = (x - 0.5) * 2;
      targetMouseY = (y - 0.5) * 2;

      mouse.x = targetMouseX;
      mouse.y = -targetMouseY;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight || 800;
      scrollProgress = Math.min(scrollY / windowH, 1.5);
    };

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Timing
    let lastTime = performance.now();
    const startTime = performance.now();

    // ========================================================================
    // RENDER LOOP — CONTINUOUS IDLE MOTION + MOUSE PARALLAX (Section 6 & 26 Clarification)
    // Continuous perceptible organic floating motion completely independent of cursor input
    // ========================================================================
    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      const elapsed = (time - startTime) / 1000;

      if (!prefersReducedMotion) {
        // Continuous Idle Oscillations (clearly perceptible even with stationary cursor)
        const idleFloatCode = Math.sin(elapsed * 0.85) * 0.14;
        const idleFloatBrowser = Math.sin(elapsed * 0.80 + 1.8) * 0.15;
        const idleTiltCodeY = Math.sin(elapsed * 0.6) * 0.055;
        const idleTiltCodeX = Math.cos(elapsed * 0.7) * 0.035;
        const idleTiltBrowserY = Math.cos(elapsed * 0.65 + 1.2) * 0.055;
        const idleTiltBrowserX = Math.sin(elapsed * 0.75 + 0.8) * 0.035;
        const idleGroupY = Math.sin(elapsed * 0.45) * 0.07;
        const idleGroupX = Math.cos(elapsed * 0.4) * 0.045;

        // Smooth lerped mouse parallax
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        camera.position.x = currentMouseX * 0.4;
        camera.position.y = -currentMouseY * 0.3 - scrollProgress * 0.6;
        camera.lookAt(0, -scrollProgress * 0.4, 0);

        // Continuous synchronized floating + tilting
        codeMesh.position.y = 0.32 + idleFloatCode;
        codeMesh.rotation.y = 0.12 + idleTiltCodeY;
        codeMesh.rotation.x = -0.04 + idleTiltCodeX;

        browserMesh.position.y = -0.42 + idleFloatBrowser;
        browserMesh.rotation.y = -0.14 + idleTiltBrowserY;
        browserMesh.rotation.x = 0.05 + idleTiltBrowserX;

        // Tilted workspace group responsive to scroll AND continuous idle sway
        workspaceGroup.rotation.y = idleGroupY + currentMouseX * 0.12 + scrollProgress * 0.18;
        workspaceGroup.rotation.x = idleGroupX - currentMouseY * 0.08;

        // Data nodes continuous rotation, float drift + breathing scale
        nodes.forEach((node, i) => {
          node.rotation.x += delta * (0.45 + i * 0.1);
          node.rotation.y += delta * (0.55 + i * 0.1);
          node.position.y = nodePositions[i].y + Math.sin(elapsed * 0.9 + i * 1.3) * 0.14;
          node.position.x = nodePositions[i].x + Math.cos(elapsed * 0.7 + i * 1.1) * 0.08;
          const breathingScale = 1.0 + Math.sin(elapsed * 1.5 + i * 1.2) * 0.18;
          node.scale.set(breathingScale, breathingScale, breathingScale);
        });

        // Raycasting hover state
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(interactiveMeshes);

        if (intersects.length > 0) {
          const hit = intersects[0].object as THREE.Mesh;
          hit.scale.lerp(new THREE.Vector3(1.025, 1.025, 1.025), 0.1);
          container.style.cursor = "pointer";
        } else {
          codeMesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
          browserMesh.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
          container.style.cursor = "default";
        }
      }

      renderer.render(scene, camera);
    };

    animate(performance.now());

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      codeGeo.dispose();
      codeMat.dispose();
      codeTexture.dispose();
      codeEdges.dispose();
      codeLineMat.dispose();

      browserGeo.dispose();
      browserMat.dispose();
      browserTexture.dispose();
      browserEdges.dispose();
      browserLineMat.dispose();

      nodeGeo.dispose();
      nodeMat.dispose();
      grid.geometry.dispose();

      renderer.dispose();
    };
  }, [isSupported]);

  if (!isSupported) {
    return <HeroFallback />;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] sm:h-[500px] lg:h-[580px] select-none flex items-center justify-center overflow-hidden"
      aria-label="Resting Interactive Floating Workspace (Section 6)"
    >
      {/* Soft signature #8AB4FF ambient lighting glow */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-accent/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
