---
수정일: 2024년 08월 03일 오전 05시 31분
---

```dataview
TABLE WITHOUT ID
link(file.path,file.name) AS "제목",
dateformat(file.mtime, "yyyy년 MM월 dd일- HH:mm") AS "시간" FROM #obsidian
SORT file.mtime DESC LIMIT 5
```

~~~query 
tag:obsidian 
~~~