import React, { useEffect, useRef } from "react";

type ConfettiProps = {
  winner: string;
};

type Particle = {
  x: number;
  y: number;
  r: number;
  d: number;
  color: string;
  tilt: number;
  tiltAngle: number;
};

const colors = ["#f94144", "#f3722c", "#f9c74f", "#90be6d", "#577590"];

const ConfettiCelebration: React.FC<ConfettiProps> = ({ winner }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (winner !== "winner") return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    let particles: Particle[] = [];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H - H,
        r: Math.random() * 6 + 4,
        d: Math.random() * 150 + 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngle: 0,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();
      }

      update();
    };

    const update = () => {
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.tiltAngle += 0.1;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(p.d);
        p.tilt = Math.sin(p.tiltAngle - i / 3) * 15;

        // reset particle
        if (p.y > H) {
          p.y = -10;
          p.x = Math.random() * W;
        }
      }
    };

    const animate = () => {
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current!);
      ctx.clearRect(0, 0, W, H);
    };
  }, [winner]);

  if (!winner) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 99,
        pointerEvents: "none",
      }}
    />
  );
};

export default ConfettiCelebration;
