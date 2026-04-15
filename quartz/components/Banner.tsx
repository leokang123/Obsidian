import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "./types";

function extractBannerSrc(raw?: string): string | null {
  if (!raw) return null;

  const trimmed = raw.trim();

  // Obsidian embed: ![[image.jpg]]
  const obsidianMatch = trimmed.match(/^!\[\[(.+?)\]\]$/);
  if (obsidianMatch) {
    return `/Obsidian/${obsidianMatch[1]}`;
  }

  // plain path
  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  return `/${trimmed}`;
}

function normalizeBannerY(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.min(1, Math.max(0, value));
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return Math.min(1, Math.max(0, parsed));
    }
  }

  return 0.5;
}

const Banner: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const bannerRaw = fileData.frontmatter?.banner as string | undefined;
  const bannerSrc = extractBannerSrc(bannerRaw);

  if (!bannerSrc) return null;

  const bannerY = normalizeBannerY(fileData.frontmatter?.banner_y);

  return (
    <div class="page-banner">
      <img
        src={bannerSrc}
        alt="page banner"
        style={`object-position: center ${bannerY * 100}%`}
      />
    </div>
  );
};

Banner.css = `
.page-banner {
  width: 100%;
  margin: 0 0 1.5rem 0;
}

.page-banner img {
  display: block;
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 18px;
}
`;

export default (() => Banner) satisfies QuartzComponentConstructor;
