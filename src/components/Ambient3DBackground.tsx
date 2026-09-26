"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { isWebGLAvailable } from "@/utils/webgl";

/**
 * Lightweight persistent 3D ambient layer extending beyond the Hero.
 * Implements MASTER_PRD.txt Section 6 revision (3D presence across About/Skills/Projects).
 * Fades gracefully across sections with a floor of ~18% so 3D presence never disappears.
 */
export default function Ambient3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isSupported = isWebGLAvailable();

  useEffect(() => {
    if (!isSupported) return;

    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: "low-power",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // Ambient lighting
    const ambientLight = new THREE.AmbientLight(0x8ab4ff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x8ab4ff, 1.2, 20);
    pointLight.position.set(0, 2, 5);
    scene.add(pointLight);

    // Subtle floating nodes group
    const nodesGroup = new THREE.Group();
    scene.add(nodesGroup);

    const nodeGeo = new THREE.OctahedronGeometry(0.14);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0x8ab4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });

    const nodes: {
      mesh: THREE.Mesh;
      speedX: number;
      speedY: number;
      baseX: number;
      baseY: number;
      baseScale: number;
      phase: number;
    }[] = [];
    const count = 20;

    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 14;
      const z = (Math.random() - 0.5) * 8 - 2;

      mesh.position.set(x, y, z);
      const baseScale = 0.7 + Math.random() * 0.8;
      mesh.scale.set(baseScale, baseScale, baseScale);

      nodesGroup.add(mesh);
      nodes.push({
        mesh,
        speedX: 0.3 + Math.random() * 0.4,
        speedY: 0.35 + Math.random() * 0.45,
        baseX: x,
        baseY: y,
        baseScale,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Perspective depth grid in the background
    const grid = new THREE.GridHelper(24, 20, 0x1f2937, 0x111827);
    grid.position.set(0, -6, -4);
    grid.rotation.x = Math.PI / 8;
    scene.add(grid);

    let animationFrameId: number;
    let isVisible = true;
    let scrollY = window.scrollY;
    let maxScroll = document.documentElement.scrollHeight - window.innerHeight || 2000;

    const handleScroll = () => {
      scrollY = window.scrollY;
      maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1000);

      // Section-based opacity modulation:
      // Hero (top 0-15%): ~0.20
      // About & Skills (15-55%): ~0.50
      // Projects & beyond (>55%): smoothly settles at ~0.25 floor (never 0)
      const scrollRatio = scrollY / maxScroll;
      let targetOpacity = 0.25;

      if (scrollRatio < 0.15) {
        targetOpacity = 0.20 + (scrollRatio / 0.15) * 0.30; // 0.20 -> 0.50
      } else if (scrollRatio < 0.55) {
        targetOpacity = 0.50 - ((scrollRatio - 0.15) / 0.40) * 0.25; // 0.50 -> 0.25
      } else {
        targetOpacity = 0.25; // Constant floor across later sections
      }

      if (container) {
        container.style.opacity = targetOpacity.toFixed(3);
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      handleScroll();
    };

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    handleScroll(); // Initial calculate

    let lastTime = performance.now();
    const startTime = performance.now();

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      const elapsed = (time - startTime) / 1000;

      if (!prefersReducedMotion) {
        // Continuous gentle node drift, rotation, and breathing pulse
        nodes.forEach((item) => {
          item.mesh.rotation.x += delta * (0.35 * item.speedX);
          item.mesh.rotation.y += delta * (0.45 * item.speedY);
          item.mesh.position.y = item.baseY + Math.sin(elapsed * 0.75 + item.phase) * 0.45;
          item.mesh.position.x = item.baseX + Math.cos(elapsed * 0.55 + item.phase) * 0.30;
          const pulse = item.baseScale * (1.0 + Math.sin(elapsed * 1.2 + item.phase) * 0.18);
          item.mesh.scale.set(pulse, pulse, pulse);
        });

        // Slow parallax scroll shift
        const scrollNorm = scrollY / (maxScroll || 1);
        nodesGroup.position.y = scrollNorm * 3.5;
        grid.position.y = -6 + scrollNorm * 2.0;
      }

      renderer.render(scene, camera);
    };

    animate(performance.now());

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      nodeGeo.dispose();
      nodeMat.dispose();
      grid.geometry.dispose();
      renderer.dispose();
    };
  }, [isSupported]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10 transition-opacity duration-700 ease-out"
      style={{ opacity: 0.15 }}
      aria-hidden="true"
    />
  );
}
