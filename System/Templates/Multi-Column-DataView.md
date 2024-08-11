---
수정일: 2024년 08월 05일 오전 06시 05분
---

`````ad-multi-column
````ad-blue
```dataview
TABLE WITHOUT ID
link(file.path,file.name) AS "학습정리",
dateformat(file.mtime, "yyyy년 MM월 dd일 HH:mm") AS "" 
FROM #학습정리 AND "Studied"
SORT 주제, series ASC
```
````

````ad-purple
```dataview
TABLE WITHOUT ID
link(file.path,file.name) AS "중요",
dateformat(file.mtime, "yyyy년 MM월 dd일 HH:mm") AS "" 
FROM #중요 AND "Studied"
SORT 주제, series  ASC
```
````
`````