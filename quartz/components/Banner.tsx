import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "./types";

function extractBannerSrc(raw?: string): string | null {
  if (!raw) return null;

  const trimmed = raw.trim();
  const backgrondPath = "/Obsidian/Resources/Background";

  // Obsidian embed: ![[image.jpg]]
  const obsidianMatch = trimmed.match(/^!\[\[(.+?)\]\]$/);
  if (obsidianMatch) {
    return `${backgrondPath}/${obsidianMatch[1]}`;
  }

  // plain path
  if (trimmed.startsWith(backgrondPath)) {
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
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 280px;
  z-index: -1;
  pointer-events: none;
  margin: 0;
  overflow: hidden;
}

.page-banner img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  opacity: 0.5;
}

.page-banner::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.15) 0%,
    rgba(0, 0, 0, 0.25) 45%,
    rgba(0, 0, 0, 0.85) 100%
  );
}
`;
export default (() => Banner) satisfies QuartzComponentConstructor;
