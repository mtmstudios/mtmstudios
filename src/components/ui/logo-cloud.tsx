import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn("relative", className)}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
      }}
      {...props}
    >
      <InfiniteSlider gap={48} duration={30}>
        {logos.map((logo) => (
          <img
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            className="h-6 w-auto shrink-0"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}
