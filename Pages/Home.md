---
class: 
cssclass: dashboard
tags: 
주제: 
생성일: 2024-07-21 15:45
수정일: 2024년 07월 22일 오전 01시 14분
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

```dataviewjs
// 폴더 경로 설정
const folder = "Resources/BackGround/Images";

// Dataview API를 사용하여 폴더 내의 파일 가져오기
const pages = dv.pages(`#${folder}`).where(p => p.url);

// 테이블 헤더 설정
dv.table(["Name", "Image"], 
    // 각 파일의 이름과 URL을 이미지로 변환하여 테이블 행 생성
    pages.map(p => [
        p.file.name,
        p.url
    ])
);

