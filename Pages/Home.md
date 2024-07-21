---
class: 
cssclass: dashboard
tags: 
주제: 
생성일: 2024-07-21 15:45
수정일: 2024년 07월 21일 오후 16시 28분
---

# 진행 중인 일 
- ### 네이버 
- ### 잡다한 공부 
- ### 백준

# 자주 볼 것
```dataview
LIST FROM #중요
```

# 최근 사용 
```dataview 
TABLE WITHOUT ID
link(file.path,file.folder + " / " + file.name) AS "Note",
dateformat(file.mtime, "yyyy년 MM월 dd일- HH:mm") AS "수정시간" FROM "Folder" 
SORT file.mtime DESC LIMIT 25 
```

# 리소스 
