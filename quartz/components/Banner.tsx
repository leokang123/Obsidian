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
  /* 화면 최상단으로 위치를 강제 고정합니다 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;       /* 화면 전체 너비 */
  height: 280px;      /* 빨간 상자 영역에 맞는 원하는 높이로 조절하세요 */
  z-index: -1;        /* 이미지 때문에 제목, 검색창, 목차 등의 클릭이 방해받지 않도록 맨 뒤로 보냅니다 */
  pointer-events: none; /* 이미지가 마우스 이벤트를 가로채지 않도록 합니다 */
  margin: 0;
}

.page-banner img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0; /* 전체 너비를 차지하므로 둥근 모서리(border-radius)는 제거하는 것이 자연스럽습니다 */

  /* [선택 사항] 이미지가 너무 선명하면 위에 겹치는 글씨(Jeonghoon Notes 등)가 안 보일 수 있습니다. */
  opacity: 0.6; /* 이미지 투명도를 낮춰서 배경색과 섞이게 합니다 */

  /* [선택 사항] 아래쪽으로 갈수록 자연스럽게 사라지도록 그라데이션 마스크를 적용합니다 (매우 추천!) */
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
}
`;

export default (() => Banner) satisfies QuartzComponentConstructor;
