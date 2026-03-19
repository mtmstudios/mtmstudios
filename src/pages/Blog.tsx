import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { blogPosts, categories } from "@/data/blogPosts";

const appleEase = [0.16, 1, 0.3, 1] as const;

const categoryColors: Record<string, string> = {
  "Voice KI": "#00E5C0",
  "Chatbot": "#818CF8",
  "Automatisierung": "#34D399",
  "Beratung": "#F59E0B",
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? blogPosts.filter(p => p.category === activeCategory)
    : blogPosts;

  const [featured, ...rest] = filtered;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "MTM Studios Blog",
    "url": "https://mtmstudios.de/blog",
    "description": "Praxiswissen zu KI-Automatisierung, Voice AI und Chatbots für den deutschen Mittelstand.",
    "publisher": {
      "@type": "Organization",
      "name": "MTM Studios",
      "url": "https://mtmstudios.de"
    }
  };

  return (
    <div className="relative min-h-screen bg-background">
      <SEOHead
        title="Blog | KI-Automatisierung für den Mittelstand | MTM Studios"
        description="Praxiswissen zu KI-Telefonassistenten, Chatbots und n8n Automatisierungen — konkret, ohne Buzzwords, für den deutschen Mittelstand."
        canonical="https://mtmstudios.de/blog"
        jsonLd={jsonLd}
      />

      <div style={{ position: "relative", zIndex: 50 }}>
        <Navigation />
      </div>

      <main id="main" className="pt-24 pb-24 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: appleEase }}
            className="mb-16"
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4">
              Blog
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
              KI-Praxiswissen für den Mittelstand
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
              Keine Buzzwords. Keine leeren Versprechen. Nur konkrete Einblicke in das, was KI-Automatisierung heute wirklich leisten kann — und was nicht.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: appleEase }}
            className="flex flex-wrap gap-2 mb-12"
          >
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === null
                  ? "bg-accent text-black"
                  : "border border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground"
              }`}
            >
              Alle
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-accent text-black"
                    : "border border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Featured Article */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: appleEase }}
              className="mb-10"
            >
              <Link to={`/blog/${featured.slug}`} className="group block">
                <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] hover:border-accent/30 transition-all duration-500 overflow-hidden p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                      style={{
                        color: categoryColors[featured.category] ?? "#00E5C0",
                        background: `${categoryColors[featured.category] ?? "#00E5C0"}18`,
                      }}
                    >
                      {featured.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {featured.readingTime} Min.
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(featured.date).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-300 leading-snug max-w-2xl">
                    {featured.title}
                  </h2>

                  <p className="text-muted-foreground text-base leading-relaxed mb-6 max-w-2xl">
                    {featured.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-medium text-accent group-hover:gap-3 transition-all duration-300">
                    Weiterlesen <ArrowRight className="w-4 h-4" />
                  </span>

                  {/* Decorative accent line */}
                  <div
                    className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
                    style={{ background: categoryColors[featured.category] ?? "#00E5C0" }}
                  />
                </div>
              </Link>
            </motion.div>
          )}

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: appleEase }}
              >
                <Link to={`/blog/${post.slug}`} className="group block h-full">
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] hover:border-accent/20 transition-all duration-500 p-6 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                        style={{
                          color: categoryColors[post.category] ?? "#00E5C0",
                          background: `${categoryColors[post.category] ?? "#00E5C0"}18`,
                        }}
                      >
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {post.readingTime} Min.
                      </span>
                    </div>

                    <h3 className="text-base md:text-lg font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300 leading-snug flex-1">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.date).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent group-hover:gap-2.5 transition-all duration-300">
                        Lesen <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20">
              Keine Artikel in dieser Kategorie.
            </p>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
