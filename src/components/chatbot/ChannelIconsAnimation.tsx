import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Bot, Globe, MessageCircle } from "lucide-react";

const appleEase = [0.16, 1, 0.3, 1] as const;

const channels = [
  {
    label: "WhatsApp",
    badge: "3",
    notification: "Neue Nachricht via WhatsApp",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill={active ? "#25D366" : "currentColor"}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Web",
    badge: "12",
    notification: "Live-Chat aktiv",
    icon: (active: boolean) => <Globe className={`w-5 h-5 ${active ? "text-accent" : ""}`} />,
  },
  {
    label: "Instagram",
    badge: "5",
    notification: "DM von @kunde",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill={active ? "#E1306C" : "currentColor"}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Messenger",
    badge: "2",
    notification: "Messenger-Anfrage",
    icon: (active: boolean) => <MessageCircle className={`w-5 h-5 ${active ? "text-blue-400" : ""}`} />,
  },
];

const RADIUS = 78;

const ChannelIconsAnimation = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const [activeIdx, setActiveIdx] = useState(-1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!inView) { setActiveIdx(-1); return; }
    let idx = 0;
    const interval = setInterval(() => {
      setActiveIdx(idx % channels.length);
      idx++;
    }, 2000);
    return () => clearInterval(interval);
  }, [inView]);

  // Slow orbit
  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setRotation(r => r + 0.3);
    }, 50);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div ref={ref} className="h-full flex flex-col items-center justify-center gap-3">
      <div className="relative w-[220px] h-[220px]">
        {/* Center bot node with pulse */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: appleEase }}
        >
          {/* Pulse ring */}
          {inView && (
            <motion.div
              className="absolute inset-0 -m-2 rounded-full border border-accent/20"
              animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <div className="w-12 h-12 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
            <Bot className="w-5 h-5 text-accent" />
          </div>
        </motion.div>

        {/* Orbiting channel icons */}
        {channels.map((channel, i) => {
          const baseAngle = (i * 360) / channels.length - 90;
          const angle = baseAngle + rotation;
          const rad = (angle * Math.PI) / 180;
          const cx = 110 + Math.cos(rad) * RADIUS;
          const cy = 110 + Math.sin(rad) * RADIUS;
          const isActive = i === activeIdx;

          return (
            <g key={channel.label}>
              {/* Dashed connection line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
                <motion.line
                  x1="110" y1="110"
                  x2={cx} y2={cy}
                  stroke={isActive ? "hsl(var(--accent)/0.25)" : "hsl(var(--foreground)/0.04)"}
                  strokeWidth="1"
                  strokeDasharray={isActive ? "4 3" : "2 4"}
                  animate={isActive ? { strokeDashoffset: [0, -14] } : {}}
                  transition={isActive ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                />
              </svg>

              {/* Icon node */}
              <motion.div
                className={`absolute w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isActive
                    ? "bg-accent/15 border border-accent/30 shadow-[0_0_14px_hsl(var(--accent)/0.2)] text-foreground"
                    : "bg-white/[0.04] border border-white/[0.08] text-muted-foreground"
                }`}
                style={{ left: cx - 22, top: cy - 22 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: appleEase }}
              >
                {channel.icon(isActive)}

                {/* Badge */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-accent text-[9px] font-bold text-background flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      {channel.badge}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </g>
          );
        })}
      </div>

      {/* Notification bar */}
      <AnimatePresence mode="wait">
        {activeIdx >= 0 && (
          <motion.div
            key={activeIdx}
            className="text-[10px] text-muted-foreground bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: appleEase }}
          >
            {channels[activeIdx].notification}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChannelIconsAnimation;
