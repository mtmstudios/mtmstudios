import { LogoCloud } from "@/components/ui/logo-cloud";

const logos = [
  { src: "https://storage.efferd.com/logo/nvidia-wordmark.svg", alt: "Nvidia" },
  { src: "https://storage.efferd.com/logo/supabase-wordmark.svg", alt: "Supabase" },
  { src: "https://storage.efferd.com/logo/openai-wordmark.svg", alt: "OpenAI" },
  { src: "https://storage.efferd.com/logo/turso-wordmark.svg", alt: "Turso" },
  { src: "https://storage.efferd.com/logo/vercel-wordmark.svg", alt: "Vercel" },
  { src: "https://storage.efferd.com/logo/github-wordmark.svg", alt: "GitHub" },
  { src: "https://storage.efferd.com/logo/claude-wordmark.svg", alt: "Claude AI" },
  { src: "https://storage.efferd.com/logo/clerk-wordmark.svg", alt: "Clerk" },
];

const LogosSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm text-muted-foreground mb-8 tracking-widest uppercase">
          Trusted by experts
        </p>
        <LogoCloud logos={logos} />
      </div>
    </section>
  );
};

export default LogosSection;
