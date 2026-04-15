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
  /* 부모(div.center)의 너비 제한을 무시하고 화면 전체(100vw)를 덮도록 강제 위치 지정 */
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 280px;      /* 원하는 배너 높이 (빨간 상자 크기에 맞게 조절하세요) */
  z-index: -1;        /* 사이드바 메뉴나 본문 텍스트를 가리지 않도록 맨 뒤로 보냄 */
  pointer-events: none;
  margin: 0;
}

.page-banner img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0; /* 전체를 덮으므로 둥근 모서리 제거 */

  /* 글씨 가독성을 위한 투명도 및 그라데이션 (선택 사항) */
  opacity: 0.5;
  -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
  mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
}

/* 👇 모바일(800px 이하) 화면에서 상단으로 올라간 사이드바 배경 투명화 */
@media all and (max-width: 800px) {
  /* 캡처 화면에 나온 정확한 CSS 선택자를 타겟팅하여 덮어씌웁니다 */
  .page > #quartz-body .sidebar.left,
  .page > #quartz-body .sidebar.left:has(.explorer) {
    background-color: transparent !important;

    /* 혹시 모를 테두리 선이나 그림자도 함께 제거하여 깔끔하게 만듭니다 */
    border: none !important;
    box-shadow: none !important;
  }
}
`;

export default (() => Banner) satisfies QuartzComponentConstructor;
