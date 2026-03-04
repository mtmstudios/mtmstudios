"use client"

import { useEffect, useMemo, useState } from "react"
import { useTheme } from "next-themes"
import {
  Cloud,
  fetchSimpleIcons,
  type ICloud,
  renderSimpleIcon,
  type SimpleIcon,
} from "react-icon-cloud"
import { useIsMobile } from "@/hooks/use-mobile"

export const renderCustomIcon = (icon: SimpleIcon, theme: string, size: number = 42) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510"
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff"
  const minContrastRatio = theme === "dark" ? 2 : 1.2

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  })
}

export type DynamicCloudProps = {
  iconSlugs: string[]
}

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>

export function IconCloud({ iconSlugs }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null)
  const { theme } = useTheme()
  const isMobile = useIsMobile()

  const cloudProps = useMemo(() => ({
    containerProps: {
      style: {
        display: "flex" as const,
        justifyContent: "center" as const,
        alignItems: "center" as const,
        width: "100%",
        paddingTop: isMobile ? 20 : 40,
      },
    },
    options: {
      reverse: true,
      depth: 1,
      wheelZoom: false,
      imageScale: isMobile ? 1.5 : 2,
      activeCursor: "default",
      tooltip: "native",
      initial: [0.1, -0.1] as [number, number],
      clickToFront: 500,
      tooltipDelay: 0,
      outlineColour: "#0000",
      maxSpeed: isMobile ? 0.03 : 0.04,
      minSpeed: isMobile ? 0.01 : 0.02,
      dragControl: !isMobile,
    },
  }), [isMobile])

  useEffect(() => {
    let attempts = 0;
    let cancelled = false;
    const load = () => {
      fetchSimpleIcons({ slugs: iconSlugs })
        .then((d) => { if (!cancelled) setData(d); })
        .catch(() => {
          if (!cancelled && attempts < 3) {
            attempts++;
            setTimeout(load, 1000 * attempts);
          }
        });
    };
    load();
    return () => { cancelled = true; };
  }, [iconSlugs])

  const renderedIcons = useMemo(() => {
    if (!data) return null
    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, theme || "dark", isMobile ? 36 : 42),
    )
  }, [data, theme, isMobile])

  if (!renderedIcons) {
    return <div style={{ minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center" }} />;
  }

  return (
    // @ts-ignore
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  )
}
