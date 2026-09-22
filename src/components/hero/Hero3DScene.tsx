"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { isWebGLAvailable } from "@/utils/webgl";
import HeroFallback from "./HeroFallback";

/**
 * Creates an offscreen high-res canvas texture for code editor window.
 * Resting State per MASTER_PRD.txt Section 6: Clean, organized developer syntax.
 */
function createCodeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Background: Dark editorial surface
    ctx.fillStyle = "#11141a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = "#252b36";
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

    // Title bar
    ctx.fillStyle = "#161b24";
    ctx.fillRect(0, 0, canvas.width, 70);
    ctx.strokeStyle = "#252b36";
    ctx.beginPath();
    ctx.moveTo(0, 70);
    ctx.lineTo(canvas.width, 70);
    ctx.stroke();

    // Window controls
    ctx.fillStyle = "#333b47";
    ctx.beginPath();
    ctx.arc(36, 35, 10, 0, Math.PI * 2);
    ctx.arc(68, 35, 10, 0, Math.PI * 2);
    ctx.arc(100, 35, 10, 0, Math.PI * 2);
    ctx.fill();

    // File name
    ctx.fillStyle = "#8ab4ff";
    ctx.font = "bold 24px monospace";
    ctx.fillText("engine.ts", 136, 43);

    ctx.fillStyle = "#64748b";
    ctx.font = "20px monospace";
    ctx.fillText("// Production build engine", 300, 43);

    // Code lines: clean, structured syntax highlights
    ctx.font = "24px monospace";
    const lines = [
      { num: "01", text: "import { Ship, Engine } from '@core/system';", color: "#94a3b8" },
      { num: "02", text: "", color: "#ffffff" },
      { num: "03", text: "export async function orchestrate(): Promise<Ship> {", color: "#e2e8f0" },
      { num: "04", text: "  const environment = await Engine.initialize({", color: "#94a3b8" },
      { num: "05", text: "    mode: 'production',", color: "#8ab4ff" },
      { num: "06", text: "    telemetry: true,", color: "#8ab4ff" },
      { num: "07", text: "    optimization: 'high-performance',", color: "#60a5fa" },
      { num: "08", text: "  });", color: "#94a3b8" },
      { num: "09", text: "", color: "#ffffff" },
      { num: "10", text: "  // Pipeline verified and stable", color: "#64748b" },
      { num: "11", text: "  return environment.deploy();", color: "#8ab4ff" },
      { num: "12", text: "}", color: "#e2e8f0" },
    ];

    let y = 125;
    lines.forEach((line) => {
      ctx.fillStyle = "#475569";
      ctx.fillText(line.num, 36, y);

      ctx.fillStyle = line.color;
      ctx.fillText(line.text, 90, y);
      y += 40;
    });

    // Status footer
    ctx.fillStyle = "#161b24";
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

    ctx.fillStyle = "#8ab4ff";
    ctx.beginPath();
    ctx.arc(36, canvas.height - 25, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#94a3b8";
    ctx.font = "20px monospace";
    ctx.fillText("status: build operational (100% stable)", 56, canvas.height - 18);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

/**
 * Creates an offscreen high-res canvas texture for a floating browser UI mockup.
 * Adds non-code visual diversity per MASTER_PRD.txt Section 6 revision.
 */
function createBrowserMockupTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 680;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // Window background: Deep rich surface
    ctx.fillStyle = "#0c1017";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = "#1e2638";
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

    // Browser Chrome Header
    ctx.fillStyle = "#111622";
    ctx.fillRect(0, 0, canvas.width, 70);
    ctx.strokeStyle = "#1e2638";
    ctx.beginPath();
    ctx.moveTo(0, 70);
    ctx.lineTo(canvas.width, 70);
    ctx.stroke();

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

    // Browser URL bar
    ctx.fillStyle = "#0c1017";
    ctx.fillRect(115, 16, canvas.width - 230, 38);
    ctx.strokeStyle = "#1e2638";
    ctx.strokeRect(115, 16, canvas.width - 230, 38);

    // SSL Lock & URL
    ctx.fillStyle = "#22c55e";
    ctx.beginPath();
    ctx.arc(135, 35, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "16px monospace";
    ctx.fillText("https://app.system.dev/overview", 155, 41);

    // Live status pill on right of URL bar
    ctx.fillStyle = "#8ab4ff";
    ctx.font = "bold 14px monospace";
    ctx.fillText("LIVE", canvas.width - 170, 41);

    // Inner App Header
    ctx.fillStyle = "#111622";
    ctx.fillRect(30, 95, canvas.width - 60, 56);
    ctx.strokeStyle = "#1e2638";
    ctx.strokeRect(30, 95, canvas.width - 60, 56);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 20px monospace";
    ctx.fillText("SYSTEM PERFORMANCE OVERVIEW", 50, 131);

    ctx.fillStyle = "#8ab4ff";
    ctx.font = "15px monospace";
    ctx.fillText("Cluster: Global Edge", canvas.width - 300, 131);

    // 3 Metrics Cards Grid
    const cards = [
      { label: "REQUEST LATENCY", val: "12 ms", sub: "p99 < 28ms", status: "#22c55e" },
      { label: "AVAILABILITY", val: "99.99%", sub: "Zero downtime", status: "#60a5fa" },
      { label: "EDGE CACHE HIT", val: "100%", sub: "Zero cold start", status: "#8ab4ff" },
    ];

    const cardW = (canvas.width - 60 - 32) / 3;
    cards.forEach((c, idx) => {
      const cx = 30 + idx * (cardW + 16);
      const cy = 168;
      const ch = 105;

      ctx.fillStyle = "#111622";
      ctx.fillRect(cx, cy, cardW, ch);
      ctx.strokeStyle = "#1e2638";
      ctx.strokeRect(cx, cy, cardW, ch);

      // Card top indicator bar
      ctx.fillStyle = c.status;
      ctx.fillRect(cx, cy, cardW, 3);

      ctx.fillStyle = "#94a3b8";
      ctx.font = "13px monospace";
      ctx.fillText(c.label, cx + 18, cy + 30);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 28px monospace";
      ctx.fillText(c.val, cx + 18, cy + 68);

      ctx.fillStyle = "#64748b";
      ctx.font = "13px monospace";
      ctx.fillText(c.sub, cx + 18, cy + 92);
    });

    // Interactive Area Chart Box
    const chartX = 30;
    const chartY = 290;
    const chartW = canvas.width - 60;
    const chartH = 260;

    ctx.fillStyle = "#111622";
    ctx.fillRect(chartX, chartY, chartW, chartH);
    ctx.strokeStyle = "#1e2638";
    ctx.strokeRect(chartX, chartY, chartW, chartH);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 16px monospace";
    ctx.fillText("THROUGHPUT DISTRIBUTION (req/sec)", chartX + 20, chartY + 35);

    ctx.fillStyle = "#22c55e";
    ctx.font = "14px monospace";
    ctx.fillText("● 14.8k ops/s nominal", chartX + chartW - 210, chartY + 35);

    // Chart Grid Lines
    ctx.strokeStyle = "#1a2130";
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

    // Gradient fill under line
    const grad = ctx.createLinearGradient(0, chartY + 60, 0, innerChartBottom);
    grad.addColorStop(0, "rgba(138, 180, 255, 0.35)");
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

    // Line stroke
    ctx.strokeStyle = "#8ab4ff";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    points.forEach((p, idx) => {
      const px = innerChartX + p.x * innerChartW;
      const py = innerChartBottom - p.y * innerChartH;
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    // Data dots
    points.forEach((p) => {
      const px = innerChartX + p.x * innerChartW;
      const py = innerChartBottom - p.y * innerChartH;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Bottom Footer Bar
    ctx.fillStyle = "#111622";
    ctx.fillRect(0, canvas.height - 54, canvas.width, 54);
    ctx.strokeStyle = "#1e2638";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 54);
    ctx.lineTo(canvas.width, canvas.height - 54);
    ctx.stroke();

    ctx.fillStyle = "#64748b";
    ctx.font = "14px monospace";
    ctx.fillText("Architecture: React 19 • Next.js App Router • Modern Full-Stack", 30, canvas.height - 21);

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
    camera.position.set(0, 0, 7.0);

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
    // Soft, crisp studio lighting with signature #8AB4FF accent illumination
    // ========================================================================
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.65);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.15);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const accentLight = new THREE.PointLight(0x8ab4ff, 1.8, 12);
    accentLight.position.set(-1.0, 1.0, 2.5);
    scene.add(accentLight);

    const rimLight = new THREE.PointLight(0x64748b, 0.8, 15);
    rimLight.position.set(2.5, -1.5, 2.0);
    scene.add(rimLight);

    // Workspace Root Group
    const workspaceGroup = new THREE.Group();
    scene.add(workspaceGroup);

    // Textures
    const codeTexture = createCodeTexture();
    const browserTexture = createBrowserMockupTexture();

    // ========================================================================
    // RESTING STATE MESHES — Diversified Section 6 Composition
    // Code Window + Floating Browser UI Mockup Window
    // ========================================================================

    // Panel 1: Code Window
    const codeGeo = new THREE.BoxGeometry(3.6, 2.25, 0.05);
    const codeMat = new THREE.MeshStandardMaterial({
      map: codeTexture,
      roughness: 0.3,
      metalness: 0.1,
    });
    const codeMesh = new THREE.Mesh(codeGeo, codeMat);
    codeMesh.position.set(-0.65, 0.28, 0.15);
    codeMesh.rotation.set(-0.05, 0.12, -0.02);
    workspaceGroup.add(codeMesh);

    const codeEdges = new THREE.EdgesGeometry(codeGeo);
    const codeLineMat = new THREE.LineBasicMaterial({
      color: 0x8ab4ff,
      transparent: true,
      opacity: 0.5,
    });
    const codeWireframe = new THREE.LineSegments(codeEdges, codeLineMat);
    codeMesh.add(codeWireframe);

    // Panel 2: Floating Browser UI Mockup Window (Diversified Non-Code Element)
    const browserGeo = new THREE.BoxGeometry(3.2, 2.12, 0.05);
    const browserMat = new THREE.MeshStandardMaterial({
      map: browserTexture,
      roughness: 0.25,
      metalness: 0.15,
    });
    const browserMesh = new THREE.Mesh(browserGeo, browserMat);
    browserMesh.position.set(1.35, -0.38, 0.35);
    browserMesh.rotation.set(0.06, -0.15, 0.03);
    workspaceGroup.add(browserMesh);

    const browserEdges = new THREE.EdgesGeometry(browserGeo);
    const browserLineMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
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
      new THREE.Vector3(-2.4, 1.6, -0.6),
      new THREE.Vector3(2.5, 1.3, -0.4),
      new THREE.Vector3(2.6, -1.6, 0.2),
      new THREE.Vector3(-2.2, -1.4, 0.5),
    ];

    nodePositions.forEach((pos) => {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.copy(pos);
      workspaceGroup.add(node);
      nodes.push(node);
    });

    // Ground technical grid
    const grid = new THREE.GridHelper(10, 16, 0x1f2937, 0x111827);
    grid.position.set(0, -2.2, -1.0);
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
    // RENDER LOOP — RESTING STATE IDLE INTERACTION
    // ========================================================================
    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      const elapsed = (time - startTime) / 1000;

      if (!prefersReducedMotion) {
        // Smooth lerped mouse parallax
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        camera.position.x = currentMouseX * 0.4;
        camera.position.y = -currentMouseY * 0.3 - scrollProgress * 0.6;
        camera.lookAt(0, -scrollProgress * 0.4, 0);

        // Gentle synchronized floating
        codeMesh.position.y = 0.28 + Math.sin(elapsed * 0.8) * 0.03;
        browserMesh.position.y = -0.38 + Math.sin(elapsed * 0.8 + 1.0) * 0.03;

        // Tilted workspace group responsive to scroll
        workspaceGroup.rotation.y = currentMouseX * 0.12 + scrollProgress * 0.18;
        workspaceGroup.rotation.x = -currentMouseY * 0.08;

        // Data nodes rotation
        nodes.forEach((node, i) => {
          node.rotation.x += delta * (0.25 + i * 0.08);
          node.rotation.y += delta * (0.35 + i * 0.08);
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
