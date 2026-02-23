import { motion, useInView } from "motion/react";
import { useRef } from "react";
import BlurText from "@/components/BlurText";
import logoAvatar from "@/assets/logo-phone-avatar.png";

const appleEase = [0.16, 1, 0.3, 1] as const;

interface PhoneHeroProps {
  testPhoneNumber?: string;
}

const PhoneVisual = ({ testPhoneNumber }: { testPhoneNumber?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const barCount = 7;

  return (
    <div ref={ref} className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 320 580" className="w-full h-full max-w-[380px]" fill="none">
        {/* Solid background */}
        <rect x="20" y="10" width="280" height="560" rx="40" fill="hsl(var(--background))" />

        {/* Phone frame */}
        <motion.rect
          x="20" y="10" width="280" height="560" rx="40"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          strokeOpacity="0.3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.5, ease: appleEase }}
        />

        {/* Notch */}
        <motion.rect
          x="120" y="24" width="80" height="6" rx="3"
          fill="hsl(var(--accent))"
          fillOpacity="0.2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.3, duration: 0.4 }}
        />

        {/* Avatar circle */}
        <motion.circle
          cx="160" cy="130" r="28"
          fill="hsl(var(--accent)/0.1)"
          stroke="hsl(var(--accent)/0.25)"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.6, ease: appleEase }}
        />
        {/* Logo in avatar */}
        <defs>
          <clipPath id="avatarClip">
            <circle cx="160" cy="130" r="28" />
          </clipPath>
        </defs>
        <motion.image
          href={logoAvatar}
          x="140" y="110" width="40" height="40"
          clipPath="url(#avatarClip)"
          preserveAspectRatio="xMidYMid meet"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 1.8 }}
        />

        {/* Name */}
        <motion.text
          x="160" y="185" textAnchor="middle"
          fill="hsl(var(--foreground))"
          fontSize="16" fontWeight="600" fontFamily="system-ui"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.8, ease: appleEase }}
        >
          KI-Telefonassistent
        </motion.text>

        {/* Pulsing status */}
        <motion.text
          x="160" y="205" textAnchor="middle"
          fill="hsl(var(--accent))"
          fontSize="10" fontFamily="system-ui"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: [0, 0.5, 1, 0.5, 1] } : {}}
          transition={{ duration: 3, delay: 2.0, repeat: Infinity, ease: "easeInOut" }}
        >
          Bereit für Anrufe
        </motion.text>

        {/* Waveform glow */}
        <motion.circle
          cx="160" cy="270" r="50"
          fill="hsl(var(--accent))"
          fillOpacity="0.05"
          filter="url(#phoneGlow)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: [0, 0.6, 0.3, 0.6] } : {}}
          transition={{ duration: 4, repeat: Infinity, delay: 2.2 }}
        />
        <defs>
          <filter id="phoneGlow">
            <feGaussianBlur stdDeviation="25" />
          </filter>
        </defs>

        {/* Waveform bars — breathing */}
        {Array.from({ length: barCount }).map((_, i) => {
          const center = (barCount - 1) / 2;
          const dist = Math.abs(i - center) / center;
          const maxH = 60 * (1 - dist * 0.5);
          const minH = 14;
          return (
            <motion.rect
              key={i}
              x={109 + i * 15}
              width="8"
              rx="4"
              fill="hsl(var(--accent))"
              fillOpacity={i === Math.floor(center) ? 0.7 : 0.45}
              initial={{ y: 270, height: minH }}
              animate={inView ? {
                height: [minH, maxH, minH, maxH * 0.7, minH],
                y: [270 - minH / 2, 270 - maxH / 2, 270 - minH / 2, 270 - maxH * 0.7 / 2, 270 - minH / 2],
              } : {}}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: 2.2 + i * 0.12,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Invitation text */}
        <motion.text
          x="160" y="345" textAnchor="middle"
          fill="hsl(var(--muted-foreground))"
          fontSize="11" fontFamily="system-ui"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.8 } : {}}
          transition={{ duration: 0.6, delay: 2.5 }}
        >
          Teste jetzt live — ruf an und erlebe die KI
        </motion.text>

        {/* Call button — pulsing glow ring */}
        {testPhoneNumber && (
          <>
            <motion.circle
              cx="160" cy="420" r="36"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: [0, 0.25, 0.5, 0.25], scale: [1, 1.08, 1] } : {}}
              transition={{ duration: 2.5, repeat: Infinity, delay: 3.2 }}
            />
            {/* Green circle */}
            <motion.circle
              cx="160" cy="420" r="30"
              fill="#22c55e"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 2.8, ease: appleEase }}
            />
            {/* Phone icon */}
            <motion.path
              d="M152 413c0-1.1.9-2 2-2h1.5a1 1 0 0 1 .9.6l1.2 2.4a1 1 0 0 1-.2 1.1l-1.4 1.4a8 8 0 0 0 4.5 4.5l1.4-1.4a1 1 0 0 1 1.1-.2l2.4 1.2a1 1 0 0 1 .6.9V424a2 2 0 0 1-2 2 12 12 0 0 1-12-12z"
              fill="white"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 3.0 }}
            />
            {/* Label */}
            <motion.text
              x="160" y="468" textAnchor="middle"
              fill="#22c55e"
              style={{ fontSize: "12px", fontWeight: 500 }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.85 } : {}}
              transition={{ duration: 0.6, delay: 3.0 }}
            >
              Jetzt anrufen
            </motion.text>
            {/* Clickable area */}
            <foreignObject x="120" y="385" width="80" height="95">
              <a
                href={`tel:${testPhoneNumber}`}
                style={{ display: "block", width: "100%", height: "100%", cursor: "pointer" }}
                aria-label="Testbot anrufen"
              />
            </foreignObject>
          </>
        )}
      </svg>
    </div>
  );
};

const PhoneHero = ({ testPhoneNumber }: PhoneHeroProps) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        <BlurText
          text="Euer KI-Telefonassistent"
          className="text-3xl sm:text-5xl md:text-7xl font-bold text-foreground tracking-tight"
          delay={80}
          animateBy="words"
          direction="top"
        />

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: appleEase }}
        >
          Nimmt Anrufe entgegen, beantwortet Fragen, bucht Termine — rund um die Uhr.
        </motion.p>

        <motion.div
          className="w-full max-w-[380px] h-[500px] sm:h-[600px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: appleEase }}
        >
          <PhoneVisual testPhoneNumber={testPhoneNumber} />
        </motion.div>
      </div>
    </section>
  );
};

export default PhoneHero;
