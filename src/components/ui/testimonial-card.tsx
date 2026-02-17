import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

export interface TestimonialAuthor {
  name: string;
  role: string;
  company: string;
}

interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  className?: string;
}

export function TestimonialCard({ author, text, className }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "w-[350px] shrink-0 rounded-xl border border-border/30 bg-white/5 backdrop-blur-md p-6 flex flex-col transition-all duration-300 hover:border-neon/40 hover:shadow-[0_0_30px_hsl(72_100%_60%/0.15)]",
        className
      )}
    >
      <Quote className="text-neon/30 mb-3" size={24} />
      <p className="text-muted-foreground leading-relaxed mb-5 text-sm flex-1">
        {text}
      </p>
      <div>
        <p className="text-sm font-semibold text-foreground">{author.name}</p>
        <p className="text-xs text-muted-foreground">
          {author.role}, {author.company}
        </p>
      </div>
    </div>
  );
}
