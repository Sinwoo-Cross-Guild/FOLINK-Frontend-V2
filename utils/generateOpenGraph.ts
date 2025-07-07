const generateOpenGraph = <OG extends { title: string; description: string }>({
  title,
  description,
}: OG) => ({
  metadataBase: new URL("https://folink-me.kro.kr"),
  title: `FOLINK - ${title}`,
  description,
  icons: { icon: "/favicon.svg" },
  additionalLinkTags: [{ rel: "icon", href: "/favicon.svg" }],
  openGraph: {
    type: "website",
    title: `FOLINK - ${title}`,
    description,
    images: "/meta-image.png",
  },
  other: {
    "og:image": "/meta-image.png",
  },
});

export default generateOpenGraph;
