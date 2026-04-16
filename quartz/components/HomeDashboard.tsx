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
          <p class="eyebrow">Structured by subject, refined for reading</p>
          <h2>정리된 학습 흐름을 바로 탐색할 수 있게 구성했습니다.</h2>
          <p class="description">
            옵시디언에서는 자유롭게 기록하고, 공개 페이지에서는 주제와 순서를 기준으로
            다시 배열합니다. 모바일에서는 탐색 바가 스크롤 흐름에 맞춰 자연스럽게 숨고
            다시 나타나도록 정리했습니다.
          </p>
        </div>

        <div class="dashboard-stats">
          {stats.map((stat) => (
            <div class="stat-card">
              <span class="label">{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>

        {topFolders.length > 0 && (
          <div class="dashboard-topics">
            <div class="section-header">
              <h3>주요 주제</h3>
              <p>최근에 계속 쌓이고 있는 주제부터 바로 이동할 수 있습니다.</p>
            </div>
            <div class="topic-grid">
              {topFolders.map((folder) => (
                <a
                  class="topic-card internal"
                  href={resolveRelative(fileData.slug!, folder.slug as FullSlug)}
                >
                  <span class="topic-label">{folder.label}</span>
                  <strong>{folder.count}개 노트</strong>
                  <span class="topic-meta">최근 업데이트 {formatDate(folder.latest)}</span>
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
