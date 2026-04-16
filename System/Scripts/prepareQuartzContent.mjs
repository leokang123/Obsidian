import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"

const rootDir = process.cwd()
const studiedDir = path.join(rootDir, "Studied")
const resourcesDir = path.join(rootDir, "Resources")
const attachmentsDir = path.join(resourcesDir, "Attachments")
const contentDir = path.join(rootDir, "content")

const sanitizeSegment = (value) =>
  String(value || "기타")
    .trim()
    .replace(/[\\/]/g, "／")
    .replace(/\s+/g, " ")

const parseSeries = (value) => {
  const number = Number.parseInt(String(value ?? ""), 10)
  if (!Number.isFinite(number) || number < 0) return 999
  return number
}

const ensureDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true })
}

const copyFile = async (from, to) => {
  await ensureDir(path.dirname(to))
  await fs.copyFile(from, to)
}

const walkMarkdownFiles = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name)
      if (entry.isDirectory()) return walkMarkdownFiles(fullPath)
      if (entry.isFile() && entry.name.endsWith(".md")) return [fullPath]
      return []
    }),
  )

  return files.flat()
}

const copyDirectory = async (fromDir, toDir, filter) => {
  const entries = await fs.readdir(fromDir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.name === ".DS_Store") continue
    if (filter && !filter(entry.name, entry.isDirectory())) continue

    const from = path.join(fromDir, entry.name)
    const to = path.join(toDir, entry.name)

    if (entry.isDirectory()) {
      await copyDirectory(from, to, undefined)
      continue
    }

    await copyFile(from, to)
  }
}

const createFallbackIndex = async () => {
  const fallback = `---
title: Home
---

# Jeonghoon Notes

주제 기준으로 자동 정리된 노트입니다.
`
  await fs.writeFile(path.join(contentDir, "index.md"), fallback, "utf8")
}

const main = async () => {
  await fs.rm(contentDir, { recursive: true, force: true })
  await ensureDir(contentDir)

  const markdownFiles = await walkMarkdownFiles(studiedDir)
  const seenTargets = new Set()

  for (const file of markdownFiles) {
    const relative = path.relative(studiedDir, file)
    if (relative === "index.md") {
      await copyFile(file, path.join(contentDir, "index.md"))
      continue
    }

    const raw = await fs.readFile(file, "utf8")
    const parsed = matter(raw)
    const subject = sanitizeSegment(parsed.data["주제"] ?? "기타")
    const series = parseSeries(parsed.data.series)
    const paddedSeries = String(series).padStart(3, "0")
    const target = path.join(contentDir, subject, `${paddedSeries} ${path.basename(file)}`)

    if (seenTargets.has(target)) {
      throw new Error(`Duplicate target detected: ${target}`)
    }

    seenTargets.add(target)
    await copyFile(file, target)
  }

  try {
    await fs.access(path.join(contentDir, "index.md"))
  } catch {
    await createFallbackIndex()
  }

  try {
    await fs.access(attachmentsDir)
    await copyDirectory(attachmentsDir, contentDir)
  } catch {}

  try {
    await fs.access(resourcesDir)
    await copyDirectory(resourcesDir, path.join(contentDir, "Resources"), (name) => name !== "Attachments")
  } catch {}
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
