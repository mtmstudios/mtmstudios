import { motion, useInView } from "motion/react";
import { useRef } from "react";
import BlurText from "@/components/BlurText";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

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
      {/* Phone container with fixed aspect ratio */}
      <div className="relative w-full max-w-[380px]" style={{ aspectRatio: "320/600" }}>
        {/* SVG frame */}
        <svg viewBox="0 0 320 600" className="absolute inset-0 w-full h-full" fill="none" style={{ zIndex: 2 }}>
          <defs>
            <linearGradient id="phoneFrameGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="phoneScreenGlare" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="40%" stopColor="white" stopOpacity="0.03" />
              <stop offset="60%" stopColor="white" stopOpacity="0.06" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <filter id="phoneShadow"><feGaussianBlur stdDeviation="12" /></filter>
          </defs>
          <ellipse cx="163" cy="578" rx="110" ry="14" fill="hsl(var(--accent))" fillOpacity="0.08" filter="url(#phoneShadow)" />
          <rect x="23" y="14" width="280" height="560" rx="40" fill="hsl(var(--accent))" fillOpacity="0.06" />
          <rect x="20" y="10" width="280" height="560" rx="40" fill="hsl(var(--background))" />
          <motion.rect
            x="20" y="10" width="280" height="560" rx="40"
            stroke="url(#phoneFrameGrad)" strokeWidth="2.5" fill="none"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, ease: appleEase }}
          />
          <rect x="22" y="12" width="276" height="556" rx="38" fill="url(#phoneScreenGlare)" />
          <motion.rect
            x="120" y="24" width="80" height="6" rx="3"
            fill="hsl(var(--accent))" fillOpacity="0.2"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1.3, duration: 0.4 }}
          />
        </svg>

        {/* Video overlay — positioned to match SVG screen area */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: "8.33%",    /* 50/600 */
            left: "10%",     /* 32/320 */
            width: "80%",    /* 256/320 */
            height: "83.33%", /* 500/600 */
            borderRadius: "28px",
            zIndex: 1,
          }}
        >
          <video
            autoPlay loop muted playsInline
            className="w-full h-full object-cover"
            style={{ pointerEvents: "none" }}
          >
            <source src="/videos/phone-demo.mov" type="video/quicktime" />
            <source src="/videos/phone-demo.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Call button overlay */}
        {testPhoneNumber && (
          <div className="absolute inset-0" style={{ zIndex: 3 }}>
            <svg viewBox="0 0 320 600" className="w-full h-full" fill="none">
              <motion.circle
                cx="160" cy="500" r="36" fill="none" stroke="#22c55e" strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: [0, 0.25, 0.5, 0.25], scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 2.5, repeat: Infinity, delay: 3.2 }}
              />
              <motion.circle
                cx="160" cy="500" r="30" fill="#22c55e"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 2.8, ease: appleEase }}
              />
              <motion.path
                d="M152 493c0-1.1.9-2 2-2h1.5a1 1 0 0 1 .9.6l1.2 2.4a1 1 0 0 1-.2 1.1l-1.4 1.4a8 8 0 0 0 4.5 4.5l1.4-1.4a1 1 0 0 1 1.1-.2l2.4 1.2a1 1 0 0 1 .6.9V504a2 2 0 0 1-2 2 12 12 0 0 1-12-12z"
                fill="white"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 3.0 }}
              />
              <motion.text
                x="160" y="540" textAnchor="middle" fill="#22c55e"
                style={{ fontSize: "12px", fontWeight: 500 }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.85 } : {}}
                transition={{ duration: 0.6, delay: 3.0 }}
              >
                Jetzt anrufen
              </motion.text>
              <foreignObject x="120" y="465" width="80" height="95">
                <a
                  href={`tel:${testPhoneNumber}`}
                  style={{ display: "block", width: "100%", height: "100%", cursor: "pointer" }}
                  aria-label="Testbot anrufen"
                />
              </foreignObject>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

const PhoneHero = ({ testPhoneNumber }: PhoneHeroProps) => {
  return (
    <section className="flex flex-col items-center justify-start">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center gap-8">
            <BlurText
              text="Dein KI-Telefonassistent"
              className="text-3xl sm:text-5xl md:text-7xl font-bold text-foreground tracking-tight"
              delay={80}
              animateBy="words"
              direction="top"
            />
            <motion.p
              className="text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: appleEase }}
            >
              Nimmt Anrufe entgegen, beantwortet Fragen, bucht Termine — rund um die Uhr.
            </motion.p>
          </div>
        }
      >
        <PhoneVisual testPhoneNumber={testPhoneNumber} />
      </ContainerScroll>
    </section>
  );
};

export default PhoneHero;
