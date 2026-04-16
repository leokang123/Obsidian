import style from "./styles/homeDashboard.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"

type FolderStat = {
  slug: string
  label: string
  count: number
  latest: Date | null
}

const formatDate = (date: Date | null) => {
  if (!date) return "업데이트 대기"
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export default (() => {
  const HomeDashboard: QuartzComponent = ({ allFiles, fileData }: QuartzComponentProps) => {
    if (fileData.slug !== "index") {
      return null
    }

    const pages = allFiles.filter((page) => {
      const slug = page.slug
      return slug && slug !== "index" && !slug.startsWith("tags/") && !slug.endsWith("/index")
    })

    const folderMap = new Map<string, FolderStat>()
    for (const page of pages) {
      const slug = page.slug!
      const [folder] = slug.split("/")
      if (!folder) continue

      const current = folderMap.get(folder) ?? {
        slug: folder,
        label: folder.replaceAll("-", " "),
        count: 0,
        latest: null,
      }

      current.count += 1
      const modified = page.dates?.modified ?? null
      if (!current.latest || (modified && modified > current.latest)) {
        current.latest = modified
      }

      folderMap.set(folder, current)
    }

    const topFolders = [...folderMap.values()]
      .sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count
        const timeA = a.latest?.getTime() ?? 0
        const timeB = b.latest?.getTime() ?? 0
        return timeB - timeA
      })
      .slice(0, 4)

    const latestPage = [...pages].sort((a, b) => {
      const timeA = a.dates?.modified?.getTime() ?? 0
      const timeB = b.dates?.modified?.getTime() ?? 0
      return timeB - timeA
    })[0]

    const stats = [
      { label: "노트", value: `${pages.length}` },
      { label: "주제", value: `${folderMap.size}` },
      { label: "최근 업데이트", value: formatDate(latestPage?.dates?.modified ?? null) },
    ]

    return (
      <section class="home-dashboard">
        <div class="dashboard-copy">
          <p class="eyebrow">정리 방식</p>
          <h2>주제와 순서를 기준으로 조용히 정리해 둔 기록입니다.</h2>
          <p class="description">
            옵시디언에서는 자유롭게 적고, 여기서는 같은 주제의 글이 자연스럽게 이어지도록
            다시 묶었습니다. 필요한 글을 빠르게 찾을 수 있게 구조만 정리하고, 화면은 최대한
            차분하게 두었습니다.
          </p>
        </div>

        <div class="dashboard-stats" aria-label="홈 요약">
          {stats.map((stat) => (
            <div class="stat-card">
              <span class="label">{stat.label}</span>
              <span class="value">{stat.value}</span>
            </div>
          ))}
        </div>

        {topFolders.length > 0 && (
          <div class="dashboard-topics">
            <div class="section-header">
              <h3>주요 주제</h3>
              <p>자주 정리해 둔 주제들입니다.</p>
            </div>
            <div class="topic-grid">
              {topFolders.map((folder) => (
                <a
                  class="topic-card internal"
                  href={resolveRelative(fileData.slug!, folder.slug as FullSlug)}
                >
                  <span class="topic-label">{folder.label}</span>
                  <span class="topic-meta">
                    {folder.count}개 노트 · 최근 업데이트 {formatDate(folder.latest)}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </section>
    )
  }

  HomeDashboard.css = style
  return HomeDashboard
}) satisfies QuartzComponentConstructor
