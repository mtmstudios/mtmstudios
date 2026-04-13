import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Clock, Tag, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { getBlogPost, blogPosts } from "@/data/blogPosts";
import { useContactFunnel } from "@/contexts/ContactFunnelContext";
import PageBackground from "@/components/PageBackground";

const appleEase = [0.16, 1, 0.3, 1] as const;

const categoryColors: Record<string, string> = {
  "Voice KI": "#00E5C0",
  "Chatbot": "#818CF8",
  "Automatisierung": "#34D399",
  "Beratung": "#F59E0B",
};

// Renders simple markdown-like content (## headings, **bold**, lists)
const renderContent = (content: string) => {
  const blocks = content.split("\n\n").filter(Boolean);

  return blocks.map((block, i) => {
    // H2
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="text-xl md:text-2xl font-bold text-foreground mt-10 mb-4 leading-snug">
          {block.replace("## ", "")}
        </h2>
      );
    }

    // Unordered list
    if (block.split("\n").every(l => l.startsWith("- "))) {
      const items = block.split("\n").map(l => l.replace("- ", ""));
      return (
        <ul key={i} className="list-none space-y-2 my-4">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-muted-foreground text-base leading-relaxed">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              <span dangerouslySetInnerHTML={{ __html: boldify(item) }} />
            </li>
          ))}
        </ul>
      );
    }

    // Ordered list (1. 2. 3.)
    if (block.split("\n").some(l => /^\d+\./.test(l))) {
      const items = block.split("\n").filter(l => /^\d+\./.test(l)).map(l => l.replace(/^\d+\.\s*/, ""));
      return (
        <ol key={i} className="list-none space-y-3 my-4">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-4 text-muted-foreground text-base leading-relaxed">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center mt-0.5">
                {j + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: boldify(item) }} />
            </li>
          ))}
        </ol>
      );
    }

    // Regular paragraph
    return (
      <p key={i} className="text-muted-foreground text-base leading-relaxed my-4"
         dangerouslySetInnerHTML={{ __html: boldify(block) }} />
    );
  });
};

const boldify = (text: string) =>
  text.replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { setIsOpen } = useContactFunnel();

  const post = slug ? getBlogPost(slug) : undefined;
  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts
    .filter(p => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "MTM Studios",
      "url": "https://mtmstudios.de"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MTM Studios",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.mtmstudios.de/assets/LOGO-2-WHITE-TARANSPERNT_1766676640443-Ng-FVsmn.png"
      }
    },
    "mainEntityOfPage": `https://mtmstudios.de/blog/${post.slug}`,
    "keywords": post.tags.join(", ")
  };

  const accentColor = categoryColors[post.category] ?? "#00E5C0";

  return (
    <div className="relative min-h-screen bg-background">
      <PageBackground />
      <SEOHead
        title={post.metaTitle}
        description={post.metaDescription}
        canonical={`https://mtmstudios.de/blog/${post.slug}`}
        jsonLd={jsonLd}
      />

      <div style={{ position: "relative", zIndex: 50 }}>
        <Navigation />
      </div>

      <main id="main" className="pt-24 pb-24 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: appleEase }}
            className="mb-10"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück zum Blog
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">

            {/* Article */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: appleEase }}
            >
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span
                  className="text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ color: accentColor, background: `${accentColor}18` }}
                >
                  {post.category}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {post.readingTime} Min. Lesezeit
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(post.date).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-snug mb-6 tracking-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-base md:text-lg text-foreground/70 leading-relaxed mb-8 pb-8 border-b border-white/10">
                {post.excerpt}
              </p>

              {/* Content */}
              <div className="prose-custom">
                {renderContent(post.content)}
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-muted-foreground" />
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs border border-white/10 rounded-full px-3 py-1 text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Block */}
              <div className="mt-12 rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center">
                <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">Kostenlose Beratung</p>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Bereit, das umzusetzen?
                </h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                  Kostenloses Erstgespräch — 30 Minuten, konkrete nächste Schritte, kein Verkaufsdruck.
                </p>
                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-accent text-black hover:bg-accent/90 font-semibold rounded-full px-7 py-3 text-sm transition-colors"
                >
                  Jetzt Gespräch vereinbaren
                </button>
              </div>

              {/* Related */}
              {related.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-lg font-bold text-foreground mb-6">Ähnliche Artikel</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {related.map(rel => (
                      <Link key={rel.slug} to={`/blog/${rel.slug}`} className="group">
                        <div className="rounded-xl border border-white/10 hover:border-accent/20 transition-all duration-300 p-5">
                          <span
                            className="text-xs font-semibold tracking-widest uppercase mb-3 block"
                            style={{ color: categoryColors[rel.category] ?? "#00E5C0" }}
                          >
                            {rel.category}
                          </span>
                          <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors leading-snug mb-2">
                            {rel.title}
                          </h3>
                          <span className="inline-flex items-center gap-1.5 text-xs text-accent group-hover:gap-2.5 transition-all">
                            Lesen <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.article>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: appleEase }}
              className="space-y-6"
            >
              {/* CTA Card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sticky top-28">
                <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">MTM Studios</p>
                <h3 className="text-base font-bold text-foreground mb-3 leading-snug">
                  KI-Automatisierung für deinen Betrieb
                </h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  Telefonassistenten, Chatbots und Workflows — in 48h live, ohne IT-Abteilung.
                </p>
                <button
                  onClick={() => setIsOpen(true)}
                  className="w-full bg-accent text-black hover:bg-accent/90 font-semibold rounded-full py-2.5 text-sm transition-colors"
                >
                  Kostenloses Gespräch
                </button>
                <a
                  href="https://wa.me/4915567077414"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-xs text-muted-foreground hover:text-foreground transition-colors mt-3"
                >
                  Oder direkt per WhatsApp
                </a>
              </div>

              {/* More Posts */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <h3 className="text-sm font-bold text-foreground mb-4">Weitere Artikel</h3>
                <div className="space-y-4">
                  {blogPosts
                    .filter(p => p.slug !== post.slug)
                    .slice(0, 4)
                    .map(p => (
                      <Link key={p.slug} to={`/blog/${p.slug}`} className="group block">
                        <p className="text-xs text-muted-foreground mb-0.5"
                           style={{ color: categoryColors[p.category] ?? "#00E5C0" }}>
                          {p.category}
                        </p>
                        <p className="text-sm text-foreground/80 group-hover:text-accent transition-colors leading-snug line-clamp-2">
                          {p.title}
                        </p>
                      </Link>
                    ))
                  }
                </div>
              </div>
            </motion.aside>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
