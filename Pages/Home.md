---
class: 
cssclass: dashboard
tags: 
주제: 
생성일: 2024-07-21 15:45
수정일: 2024년 07월 22일 오전 00시 23분
---

# 진행 중인 일 
```dataview  
LIST  
WHERE contains(file.folder, this.file.folder) AND file.name != "Home"
```

# 자주 볼 것
```dataview
LIST FROM #중요
```

# 최근 사용 
```dataview 
TABLE WITHOUT ID
link(file.path,file.name) AS "Note",
dateformat(file.mtime, "yyyy년 MM월 dd일- HH:mm") AS "수정시간" FROM "Folder" 
SORT file.mtime DESC LIMIT 5
```

# 리소스 

```dataview
TABLE FROM #중요 

```
