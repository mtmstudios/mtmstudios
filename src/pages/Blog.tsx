import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { blogPosts, categories } from "@/data/blogPosts";
import { useIsMobile } from "@/hooks/use-mobile";

const appleEase = [0.16, 1, 0.3, 1] as const;

const categoryColors: Record<string, string> = {
  "Voice KI": "#00E5C0",
  "Chatbot": "#818CF8",
  "Automatisierung": "#34D399",
  "Beratung": "#F59E0B",
};

/* Bento span patterns — asymmetrical grid */
const bentoSpans = [
  "md:col-span-2",   // wide
  "md:col-span-1",   // square
  "md:col-span-1",   // square
  "md:col-span-1",   // square
  "md:col-span-2",   // wide
  "md:col-span-1",   // square
];

const getBentoSpan = (index: number) => bentoSpans[index % bentoSpans.length];

/* ─── Blog Card ─────────────────────────────────────────────── */
const BlogCard = ({
  post,
  index,
  isFeatured = false,
}: {
  post: (typeof blogPosts)[0];
  index: number;
  isFeatured?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const color = categoryColors[post.category] ?? "#00E5C0";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.65,
        delay: 0.04 + index * 0.07,
        ease: appleEase,
      }}
      className={isFeatured ? "md:col-span-3" : getBentoSpan(index)}
    >
      <Link to={`/blog/${post.slug}`} className="group block h-full">
        <div
          className={`relative h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-500 overflow-hidden flex flex-col text-center ${
            isFeatured ? "p-8 md:p-12" : "p-6 md:p-8"
          }`}
        >
          {/* Hover glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_center,hsl(var(--accent)/0.04),transparent_70%)]" />

          {/* Accent bar */}
          <div
            className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
            style={{ background: color }}
          />

          <div className="relative z-10 flex flex-col h-full">
            {/* Meta */}
            <div className="flex items-center justify-center gap-3 mb-5 flex-wrap">
              <span
                className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full"
                style={{
                  color,
                  background: `${color}18`,
                }}
              >
                {post.category}
              </span>
              <span className="text-xs text-foreground/40 flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                {post.readingTime} Min.
              </span>
              <span className="text-xs text-foreground/30">
                {new Date(post.date).toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h2
              className={`font-bold text-foreground group-hover:text-accent transition-colors duration-300 leading-snug mb-4 mx-auto ${
                isFeatured
                  ? "text-xl md:text-3xl max-w-2xl"
                  : "text-base md:text-lg flex-1"
              }`}
            >
              {post.title}
            </h2>

            {/* Excerpt */}
            <p
              className={`text-foreground/50 leading-relaxed mb-6 ${
                isFeatured
                  ? "text-base max-w-2xl"
                  : "text-sm line-clamp-3"
              }`}
            >
              {post.excerpt}
            </p>

            {/* CTA */}
            <div className="mt-auto">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-accent group-hover:gap-3 transition-all duration-300">
                {isFeatured ? "Weiterlesen" : "Lesen"}{" "}
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* ─── Page ──────────────────────────────────────────────────── */
const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const attemptAutoplay = async () => {
      try {
        await video.play();
      } catch {
        video.muted = true;
        try {
          await video.play();
        } catch {}
      }
    };
    attemptAutoplay();
  }, []);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (bgRef.current) {
          const scrollPosition = window.scrollY;
          const maxScroll = 300;
          const opacity = isMobile
            ? Math.max(0.25, 1 - (scrollPosition / maxScroll) * 0.75)
            : Math.max(0.1, 1 - (scrollPosition / maxScroll) * 0.9);
          bgRef.current.style.opacity = opacity.toString();
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  const filtered = activeCategory
    ? blogPosts.filter((p) => p.category === activeCategory)
    : blogPosts;

  const [featured, ...rest] = filtered;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "MTM Studios Blog",
    url: "https://mtmstudios.de/blog",
    description:
      "Praxiswissen zu KI-Automatisierung, Voice AI und Chatbots für den deutschen Mittelstand.",
    publisher: {
      "@type": "Organization",
      name: "MTM Studios",
      url: "https://mtmstudios.de",
    },
  };

  return (
    <div className="relative min-h-screen bg-background">
      <SEOHead
        title="Blog | KI-Automatisierung für den Mittelstand | MTM Studios"
        description="Praxiswissen zu KI-Telefonassistenten, Chatbots und n8n Automatisierungen — konkret, ohne Buzzwords, für den deutschen Mittelstand."
        canonical="https://mtmstudios.de/blog"
        jsonLd={jsonLd}
      />

      {/* Global background */}
      <div
        ref={bgRef}
        className="fixed inset-0 w-screen h-screen overflow-hidden"
        style={{ isolation: "isolate", zIndex: 0 }}
      >
        <img
          src="/videos/hero-background-still.jpg"
          alt=""
          loading="lazy"
          className="md:hidden w-full h-full object-cover absolute inset-0"
          style={{
            filter: "brightness(0.7) contrast(1.5)",
            pointerEvents: "none",
          }}
        />
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          // @ts-ignore
          webkit-playsinline=""
          preload="auto"
          onLoadedData={(e) => {
            const video = e.currentTarget;
            video.play().catch(() => {});
          }}
          className="hidden md:block w-full h-full object-cover"
          style={{
            mixBlendMode: "hard-light",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            filter: "brightness(0.7) contrast(2)",
            pointerEvents: "none",
          }}
        >
          <source src="/videos/hero-background.webm" type="video/webm" />
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
      </div>

      <div style={{ position: "relative", zIndex: 50 }}>
        <Navigation />
      </div>

      <main
        id="main"
        className="pt-24 pb-24 px-4 sm:px-6"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="mb-20 text-center pt-[8vh] md:pt-[12vh]">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: appleEase }}
              className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase text-accent/70 mb-6"
            >
              Blog
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={
                headerInView
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : {}
              }
              transition={{ duration: 0.7, delay: 0.1, ease: appleEase }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-5 leading-[0.95]"
            >
              KI-Praxiswissen für den Mittelstand
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: appleEase }}
              className="text-base md:text-lg text-foreground/50 max-w-2xl mx-auto leading-relaxed"
            >
              Keine Buzzwords. Keine leeren Versprechen. Nur konkrete Einblicke
              in das, was KI-Automatisierung heute wirklich leisten kann — und
              was nicht.
            </motion.p>
          </div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: appleEase }}
            className="flex flex-wrap justify-center gap-2 mb-14"
          >
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
                activeCategory === null
                  ? "bg-accent text-accent-foreground"
                  : "border border-white/[0.08] text-foreground/50 hover:border-white/[0.15] hover:text-foreground"
              }`}
            >
              Alle
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(cat === activeCategory ? null : cat)
                }
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
                  activeCategory === cat
                    ? "bg-accent text-accent-foreground"
                    : "border border-white/[0.08] text-foreground/50 hover:border-white/[0.15] hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Featured Article */}
          {featured && (
            <div className="mb-6">
              <BlogCard post={featured} index={0} isFeatured />
            </div>
          )}

          {/* Bento Article Grid — asymmetrical 3-col */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rest.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i + 1} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-foreground/40 py-20">
              Keine Artikel in dieser Kategorie.
            </p>
          )}
        </div>
      </main>

      <div style={{ position: "relative", zIndex: 10 }}>
        <Footer />
      </div>
    </div>
  );
};

export default Blog;
