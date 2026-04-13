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
  { name: "München", slug: "muenchen" },
  { name: "Esslingen", slug: "esslingen" },
  { name: "Ludwigsburg", slug: "ludwigsburg" },
  { name: "Reutlingen", slug: "reutlingen" },
  { name: "Berlin", slug: "berlin" },
  { name: "Hamburg", slug: "hamburg" },
  { name: "Köln", slug: "koeln" },
  { name: "Frankfurt", slug: "frankfurt" },
  { name: "Düsseldorf", slug: "duesseldorf" },
  { name: "Leipzig", slug: "leipzig" },
  { name: "Dortmund", slug: "dortmund" },
  { name: "Bremen", slug: "bremen" },
  { name: "Dresden", slug: "dresden" },
  { name: "Hannover", slug: "hannover" },
  { name: "Nürnberg", slug: "nuernberg" },
  { name: "Augsburg", slug: "augsburg" },
  { name: "Karlsruhe", slug: "karlsruhe" },
  { name: "Mannheim", slug: "mannheim" },
  { name: "Freiburg", slug: "freiburg" },
  { name: "Bonn", slug: "bonn" },
  { name: "Münster", slug: "muenster" },
  { name: "Wiesbaden", slug: "wiesbaden" },
  { name: "Heidelberg", slug: "heidelberg" },
  { name: "Mainz", slug: "mainz" },
  { name: "Aachen", slug: "aachen" },
  { name: "Kassel", slug: "kassel" },
  { name: "Erfurt", slug: "erfurt" },
  { name: "Heilbronn", slug: "heilbronn" },
  { name: "Ingolstadt", slug: "ingolstadt" },
  { name: "Regensburg", slug: "regensburg" },
  { name: "Würzburg", slug: "wuerzburg" },
  { name: "Bielefeld", slug: "bielefeld" },
  { name: "Wuppertal", slug: "wuppertal" },
  { name: "Duisburg", slug: "duisburg" },
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
