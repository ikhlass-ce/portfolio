import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// 3D R3F Particle Field
const R3FParticleField: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  
  // Create random points in spherical structure
  const [positions] = useState(() => {
    const count = 1200;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Create random points inside a sphere of radius 15
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);
      const r = THREE.MathUtils.randFloat(4, 18);
      
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  });

  useFrame((state) => {
    if (!ref.current) return;
    
    // Auto drift
    const time = state.clock.getElapsedTime();
    ref.current.rotation.y = time * 0.03;
    ref.current.rotation.x = time * 0.015;
    
    // Cursor Parallax
    const mouseX = state.pointer.x * 0.5;
    const mouseY = state.pointer.y * 0.5;
    
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouseX * 2, 0.05);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouseY * 2, 0.05);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#7E9D6E"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <Points positions={positions.map(val => val * 1.2)} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#4F6D44"
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

// Canvas 2D Fallback Particle System
const Canvas2DFallback: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        
        // Match accent palette
        const r = Math.random();
        if (r < 0.4) {
          this.color = "rgba(79, 109, 68, 0.4)"; // army green
        } else if (r < 0.8) {
          this.color = "rgba(126, 157, 110, 0.4)"; // sage green
        } else {
          this.color = "rgba(181, 201, 154, 0.4)"; // tactical green
        }
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around borders
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(c: CanvasRenderingContext2D) {
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
      }
    }

    const particlesArray: Particle[] = [];
    const particleCount = 150;
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }

    // Parallax factor
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX - width / 2) * 0.05;
      targetMouseY = (e.clientY - height / 2) * 0.05;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Interpolate mouse movements
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      ctx.save();
      ctx.translate(currentMouseX, currentMouseY);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw(ctx);
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

export const Background3D: React.FC = () => {
  const [webGLSupported, setWebGLSupported] = useState(true);

  // Detect WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const isSupported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setWebGLSupported(isSupported);
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-[1] select-none">
      {/* Aurora glowing backdrop blobs (CSS gradients) */}
      <div className="glow-spot w-[600px] h-[600px] bg-accent-purple/10 top-[-10%] left-[-10%] animate-pulse-slow" />
      <div className="glow-spot w-[650px] h-[650px] bg-accent-blue/8 bottom-[-10%] right-[-10%] animate-pulse-slow" style={{ animationDelay: "3s" }} />
      <div className="glow-spot w-[500px] h-[500px] bg-accent-cyan/6 top-[30%] right-[10%] animate-pulse-slow" style={{ animationDelay: "6s" }} />

      {/* Render 3D if supported, otherwise fall back to 2D canvas */}
      {webGLSupported ? (
        <div className="absolute inset-0 w-full h-full opacity-60">
          <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]}>
            <ambientLight intensity={0.5} />
            <R3FParticleField />
          </Canvas>
        </div>
      ) : (
        <Canvas2DFallback />
      )}
    </div>
  );
};
