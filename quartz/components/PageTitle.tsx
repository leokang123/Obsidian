import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <div class={classNames(displayClass, "page-title")}>
      <h2>
        <a href={baseDir}>{title}</a>
      </h2>
      <p>CS, backend, workflow notes</p>
    </div>
  )
}

PageTitle.css = `
.page-title {
  margin: 0;
  display: grid;
  gap: 0.25rem;
}

.page-title h2 {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}

.page-title p {
  margin: 0;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--secondary);
  opacity: 0.7;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
