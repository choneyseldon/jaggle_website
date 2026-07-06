"use client";

import { useEffect, useRef } from "react";

export function DottedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cleanup = () => {};
    let cancelled = false;

    import("three").then((THREE) => {
      if (cancelled || !container) return;
      const html = document.documentElement;
      const SEPARATION = 150,
        AMOUNTX = 40,
        AMOUNTY = 60;
      const COUNT = AMOUNTX * AMOUNTY;
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x0a0a12, 2000, 10000);
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.set(0, 355, 1220);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const positions = new Float32Array(COUNT * 3);
      const colors = new Float32Array(COUNT * 3);
      let p = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          positions[p * 3] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          positions[p * 3 + 1] = 0;
          positions[p * 3 + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
          p++;
        }
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const material = new THREE.PointsMaterial({
        size: 8,
        vertexColors: true,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      });
      const mesh = new THREE.Points(geometry, material);
      scene.add(mesh);

      function applyTheme() {
        const day = html.getAttribute("data-theme") === "day";
        const c = day ? [0.32, 0.22, 0.58] : [0.64, 0.58, 0.9];
        material.opacity = day ? 0.42 : 0.55;
        const col = geometry.attributes.color.array as Float32Array;
        for (let i = 0; i < COUNT; i++) {
          col[i * 3] = c[0];
          col[i * 3 + 1] = c[1];
          col[i * 3 + 2] = c[2];
        }
        geometry.attributes.color.needsUpdate = true;
      }
      applyTheme();

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let count = 0;
      let raf = 0;
      function render() {
        const pos = geometry.attributes.position.array as Float32Array;
        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            pos[i * 3 + 1] = Math.sin((ix + count) * 0.3) * 50 + Math.sin((iy + count) * 0.5) * 50;
            i++;
          }
        }
        geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
        count += 0.04;
      }
      function animate() {
        raf = requestAnimationFrame(animate);
        render();
      }
      if (reduce) {
        render();
      } else {
        animate();
      }

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize, { passive: true });

      const observer = new MutationObserver(applyTheme);
      observer.observe(html, { attributes: true, attributeFilter: ["data-theme"] });

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        observer.disconnect();
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <div className="dotted-surface" id="dottedSurface" ref={containerRef} aria-hidden="true" />;
}
