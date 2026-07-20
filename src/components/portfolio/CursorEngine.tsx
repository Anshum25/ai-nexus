import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CursorEngine() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [cursorState, setCursorState] = useState<string | null>(null); // "explore", "inspect", "launch", etc.

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check for custom cursor states via data attribute
      const target = e.target as HTMLElement;
      
      // Bubble up to find data-cursor
      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        setCursorState(cursorTarget.getAttribute('data-cursor'));
      } else {
        setCursorState(null);
      }

      // Check standard pointer
      const computedStyle = window.getComputedStyle(target);
      setIsPointer(
        computedStyle.cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button"
      );
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  if (isTouch) return null;

  const variants = {
    default: {
      width: 16,
      height: 16,
      backgroundColor: "var(--foreground)",
      mixBlendMode: "difference" as const,
    },
    pointer: {
      width: 48,
      height: 48,
      backgroundColor: "transparent",
      border: "1px solid var(--electric)",
      mixBlendMode: "normal" as const,
    },
    explore: {
      width: 80,
      height: 80,
      backgroundColor: "var(--electric)",
      opacity: 0.1,
      mixBlendMode: "screen" as const,
      border: "none",
    },
    inspect: {
      width: 60,
      height: 60,
      backgroundColor: "transparent",
      border: "2px dashed var(--cyan)",
      borderRadius: "0%",
      rotate: 45,
    },
    launch: {
      width: 32,
      height: 32,
      backgroundColor: "var(--indigo-glow)",
      scale: 1.2,
      borderRadius: "4px",
    },
  };

  const activeVariant = cursorState || (isPointer ? "pointer" : "default");

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center overflow-hidden"
        animate={activeVariant}
        variants={variants}
        initial="default"
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.5,
        }}
        style={{
          x: pos.x - (variants[activeVariant as keyof typeof variants]?.width as number || 16) / 2,
          y: pos.y - (variants[activeVariant as keyof typeof variants]?.height as number || 16) / 2,
        }}
      >
        {cursorState === "inspect" && (
           <motion.div className="w-1/2 h-[1px] bg-[var(--cyan)] absolute" animate={{ rotate: -45 }} />
        )}
      </motion.div>

      {/* The Ambient Glow that follows slowly */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[2] rounded-full w-[400px] h-[400px]"
        animate={{
          x: pos.x - 200,
          y: pos.y - 200,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
          mass: 1,
        }}
        style={{
          background: "radial-gradient(closest-side, color-mix(in oklab, var(--electric) 15%, transparent), transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
