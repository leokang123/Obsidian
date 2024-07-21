---
class: 
cssclass: dashboard
tags: 
주제: 
생성일: 2024-07-21 15:45
수정일: 2024년 07월 22일 오전 03시 25분
---

<br />
<br />
<br />

---

- ![[lava.jpg|200]]
- ![[city.jpg|200]]
- ![[milkyway.jpg|200]]
- ![[beach1.jpg|200]]

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

