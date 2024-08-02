---
수정일: 2024년 08월 03일 오전 05시 32분
---

```dataview
TABLE WITHOUT ID
link(file.path,file.name) AS "옵시디언",
dateformat(file.mtime, "yyyy년 MM월 dd일- HH:mm") AS "수정일" FROM #obsidian
```
