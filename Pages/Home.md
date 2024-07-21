---
class: 
cssclass: dashboard, bannerimg
tags: 
주제: 
생성일: 2024-07-21 15:45
수정일: 2024년 07월 22일 오전 04시 52분
banner: "![[sky.jpg]]"
---
```widgets
type: clock
```
# Home

<br />

# 진행 중인 일 

- [[네이버]]
- [[잡다한 공부]]

<br />
<br />
<br />


```dataview
TABLE WITHOUT ID
link(file.path,file.name) AS "즐겨찾기"
FROM #중요
```

<br />
<br />
<br />

```dataview 
TABLE WITHOUT ID
link(file.path,file.name) AS "최근 사용",
dateformat(file.mtime, "yyyy년 MM월 dd일- HH:mm") AS "" FROM "Folder" 
SORT file.mtime DESC LIMIT 5
```

