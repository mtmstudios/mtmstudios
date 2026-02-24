import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

interface City {
  name: string;
  slug: string;
  available: boolean;
}

const cities: City[] = [
  { name: "Stuttgart", slug: "stuttgart", available: true },
  { name: "Ulm", slug: "ulm", available: true },
  { name: "München", slug: "muenchen", available: false },
  { name: "Augsburg", slug: "augsburg", available: false },
  { name: "Reutlingen", slug: "reutlingen", available: false },
];

interface RegionalSectionProps {
  contextPath?: string;
}

const RegionalSection = ({ contextPath }: RegionalSectionProps) => {
  const buildLink = (slug: string) =>
    contextPath ? `/${contextPath}/${slug}` : `/#`;

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

        <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto">
          {cities.map((city) =>
            city.available ? (
              <Link
                key={city.slug}
                to={buildLink(city.slug)}
                className="rounded-full border border-white/10 bg-white/[0.03] text-foreground/70 text-sm px-5 py-2.5 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200"
              >
                {city.name}
              </Link>
            ) : (
              <span
                key={city.slug}
                className="rounded-full border border-white/10 bg-white/[0.03] text-foreground/30 text-sm px-5 py-2.5 flex items-center gap-2"
              >
                {city.name}
                <span className="text-xs bg-white/[0.06] rounded-full px-2 py-0.5 text-foreground/25">
                  Bald
                </span>
              </span>
            )
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default RegionalSection;
