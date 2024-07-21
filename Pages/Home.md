---
class: 
cssclass: dashboard
tags: 
주제: 
생성일: 2024-07-21 15:45
수정일: 2024년 07월 22일 오전 01시 28분
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
const folder = "Resources/BackGround/Images"; 

const pages = dv.pages(`#${folder}`).where(p => p.url);

dv.table(["Name", "Image"], pages.map(p => [ 
p.file.name, 
`![${p.file.name}](${p.url})` 
]) );
```

