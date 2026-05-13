import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

interface City {
  name: string;
  slug: string;
}

const cities: City[] = [
  { name: "Stuttgart", slug: "stuttgart" },
  { name: "Ulm", slug: "ulm" },
  { name: "Düsseldorf", slug: "duesseldorf" },
  { name: "München", slug: "muenchen" },
  { name: "Esslingen", slug: "esslingen" },
];

interface RegionalSectionProps {
  contextPath?: string;
}

const RegionalSection = ({ contextPath }: RegionalSectionProps) => {
  const base = contextPath ?? "ki-agentur";
  const buildLink = (slug: string) => `/${base}/${slug}`;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8 }}
      className="py-16"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <MapPin className="w-4 h-4 text-foreground/30" />
          <span className="text-sm text-foreground/40 tracking-wide">
            Auch in deiner Region
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
          {cities.map((city) => (
            <Link
              key={city.slug}
              to={buildLink(city.slug)}
              className="rounded-full border border-white/10 bg-white/[0.03] text-foreground/70 text-sm px-5 py-2.5 hover:border-accent/40 hover:bg-white/[0.06] hover:text-foreground transition-all duration-200"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default RegionalSection;
