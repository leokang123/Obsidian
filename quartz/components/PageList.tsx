import { FullSlug, isFolderPath, resolveRelative } from "../util/path";
import { QuartzPluginData } from "../plugins/vfile";
import { Date, getDate } from "./Date";
import { QuartzComponent, QuartzComponentProps } from "./types";
import { GlobalConfiguration } from "../cfg";

export type SortFn = (f1: QuartzPluginData, f2: QuartzPluginData) => number;

export function byDateAndAlphabetical(cfg: GlobalConfiguration): SortFn {
  return (f1, f2) => {
    if (f1.dates && f2.dates) {
      return getDate(cfg, f2)!.getTime() - getDate(cfg, f1)!.getTime();
    } else if (f1.dates && !f2.dates) {
      return -1;
    } else if (!f1.dates && f2.dates) {
      return 1;
    }

    const f1Title = f1.frontmatter?.title?.toLowerCase() ?? "";
    const f2Title = f2.frontmatter?.title?.toLowerCase() ?? "";
    return f1Title.localeCompare(f2Title);
  };
}

export function byDateAndAlphabeticalFolderFirst(
  cfg: GlobalConfiguration,
): SortFn {
  return (f1, f2) => {
    const f1IsFolder = isFolderPath(f1.slug ?? "");
    const f2IsFolder = isFolderPath(f2.slug ?? "");
    if (f1IsFolder && !f2IsFolder) return -1;
    if (!f1IsFolder && f2IsFolder) return 1;

    if (f1.dates && f2.dates) {
      return getDate(cfg, f2)!.getTime() - getDate(cfg, f1)!.getTime();
    } else if (f1.dates && !f2.dates) {
      return -1;
    } else if (!f1.dates && f2.dates) {
      return 1;
    }

    const f1Title = f1.frontmatter?.title?.toLowerCase() ?? "";
    const f2Title = f2.frontmatter?.title?.toLowerCase() ?? "";
    return f1Title.localeCompare(f2Title);
  };
}

type Props = {
  limit?: number;
  sort?: SortFn;
} & QuartzComponentProps;

export const PageList: QuartzComponent = ({
  cfg,
  fileData,
  allFiles,
  limit,
  sort,
}: Props) => {
  const sorter = sort ?? byDateAndAlphabeticalFolderFirst(cfg);
  let list = [...allFiles].sort(sorter);

  if (limit) {
    list = list.slice(0, limit);
  }

  return (
    <ul class="page-list-ul">
      {list.map((page) => {
        const title = page.frontmatter?.title ?? "";
        const tags = page.frontmatter?.tags ?? [];

        return (
          <li class="page-list-li">
            <div class="page-list-section">
              <div class="page-list-desc">
                <h3>
                  <a
                    href={resolveRelative(fileData.slug!, page.slug!)}
                    class="internal"
                  >
                    {title}
                  </a>
                </h3>
              </div>

              {page.dates && (
                <p class="page-list-meta">
                  <Date date={getDate(cfg, page)!} locale={cfg.locale} />
                </p>
              )}

              {tags.length > 0 && (
                <ul class="page-list-tags">
                  {tags.map((tag) => (
                    <li>
                      <a
                        class="internal tag-link"
                        href={resolveRelative(
                          fileData.slug!,
                          `tags/${tag}` as FullSlug,
                        )}
                      >
                        {tag}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

PageList.css = `
.page-list-ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.page-list-li {
  list-style: none;
  margin: 0 0 2rem 0;
  padding: 0;
}

.page-list-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.55rem;
  width: 100%;
  max-width: 100%;
}

.page-list-desc {
  width: 100%;
}

.page-list-desc h3 {
  margin: 0;
  line-height: 1.35;
}

.page-list-desc h3 a {
  display: inline-block;
  max-width: 100%;
  text-decoration: none;
  word-break: keep-all;
  overflow-wrap: anywhere;


  background: transparent !important;
  box-shadow: none !important;
  text-shadow: none !important;
  border-radius: 0 !important;
}

.page-list-meta {
  margin: 0;
}

.page-list-tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
}
`;
