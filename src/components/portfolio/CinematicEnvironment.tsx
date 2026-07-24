import { useEffect, useRef } from "react";

export function CinematicEnvironment() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Canvas dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Mouse position
    let mouse = { x: -1000, y: -1000 };

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    window.addEventListener("resize", setSize);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      baseX: number;
      baseY: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.5; 
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.2 + 0.4; // smaller dots
      }

      update() {
        // Normal drift
        this.baseX += this.vx;
        this.baseY += this.vy;

        // Bounce base coordinates off edges
        if (this.baseX < 0 || this.baseX > width) this.vx = -this.vx;
        if (this.baseY < 0 || this.baseY > height) this.vy = -this.vy;

        // Interactive Repulsion
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;
        
        if (distance < maxDist && distance > 0) {
          const force = (maxDist - distance) / maxDist;
          const directionX = dx / distance;
          const directionY = dy / distance;
          
          // Push away from mouse
          this.x -= directionX * force * 5;
          this.y -= directionY * force * 5;
          // Update base to allow permanent scattering like real particles
          this.baseX = this.x;
          this.baseY = this.y;
        } else {
          // Smooth return to base (optional, but real ones just drift)
          this.x += (this.baseX - this.x) * 0.05;
          this.y += (this.baseY - this.y) * 0.05;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        // Check if dark mode is active (based on tailwind 'dark' class on HTML)
        const isDark = document.documentElement.classList.contains('dark');
        const baseColor = isDark ? '255, 255, 255' : '0, 0, 0';
        
        ctx.fillStyle = `rgba(${baseColor}, 0.6)`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      // Higher density of particles
      const numberOfParticles = Math.floor((width * height) / 9000);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDist = 140; 
          if (distance < maxDist) {
            ctx.beginPath();
            const isDark = document.documentElement.classList.contains('dark');
            const baseColor = isDark ? '255, 255, 255' : '0, 0, 0';
            
            ctx.strokeStyle = `rgba(${baseColor}, ${0.35 * (1 - distance / maxDist)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Connect to mouse
        const dxMouse = particles[i].x - mouse.x;
        const dyMouse = particles[i].y - mouse.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        const maxMouseDist = 150;
        if (distanceMouse < maxMouseDist) {
          ctx.beginPath();
          const isDark = document.documentElement.classList.contains('dark');
          const baseColor = isDark ? '255, 255, 255' : '0, 0, 0';
            
          ctx.strokeStyle = `rgba(${baseColor}, ${0.5 * (1 - distanceMouse / maxMouseDist)})`;
          ctx.lineWidth = 1.0;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    setSize();
    animate();

    return () => {
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[var(--background)] transition-colors duration-1000">
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full opacity-100"
      />
      {/* Optional: Add a very subtle radial gradient over it to mimic the center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_150%)] pointer-events-none" />
    </div>
  );
}
